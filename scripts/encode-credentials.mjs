#!/usr/bin/env node
/**
 * Builds the two push-credential env values from the local keys/ folder (see keys/README.md):
 *
 *   FIREBASE_SERVICE_ACCOUNT_B64  <- keys/serviceAccountKey.json
 *   APN_CONFIG_B64                <- keys/apn.json, with every `keyFile` replaced by the .p8 contents
 *
 * Usage:
 *   npm run encode-credentials                 # writes both lines into ./.env (other lines kept)
 *   npm run encode-credentials -- --env <file> # writes them into another env file
 *   npm run encode-credentials -- --print      # prints them instead (careful: secrets on screen)
 *
 * A bundle whose .p8 is missing locally is left out of APN_CONFIG_B64 (with a warning) - it then
 * falls back to the default key, so its iOS sends fail until the key is added and this re-run.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const keysDir = join(root, 'keys');
const args = process.argv.slice(2);
const print = args.includes('--print');
const envIndex = args.indexOf('--env');
const envFile = resolve(root, envIndex >= 0 ? args[envIndex + 1] : '.env');

const b64 = (value) => Buffer.from(typeof value === 'string' ? value : JSON.stringify(value), 'utf8').toString('base64');

function readJson(file) {
  const path = join(keysDir, file);
  if (!existsSync(path)) {
    console.error(`Missing keys/${file} - see keys/README.md.`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(path, 'utf8'));
}

function inlineKey(entry, label) {
  const p8 = join(keysDir, entry.keyFile);
  if (!existsSync(p8)) {
    console.warn(`! ${label}: keys/${entry.keyFile} not found - left out (falls back to the default key).`);
    return null;
  }
  return { key: readFileSync(p8, 'utf8'), keyId: entry.keyId, teamId: entry.teamId };
}

const serviceAccount = readJson('serviceAccountKey.json');
const apnFile = readJson('apn.json');

const defaultKey = inlineKey(apnFile.default, 'default');
if (!defaultKey) {
  console.error('The default APN key is required.');
  process.exit(1);
}
const bundles = {};
for (const [bundleId, entry] of Object.entries(apnFile.bundles ?? {})) {
  const key = inlineKey(entry, bundleId);
  if (key) bundles[bundleId] = key;
}

const values = {
  FIREBASE_SERVICE_ACCOUNT_B64: b64(serviceAccount),
  APN_CONFIG_B64: b64({ production: apnFile.production, default: defaultKey, bundles }),
};

if (print) {
  for (const [name, value] of Object.entries(values)) console.log(`${name}=${value}`);
} else {
  let env = existsSync(envFile) ? readFileSync(envFile, 'utf8') : '';
  for (const [name, value] of Object.entries(values)) {
    const line = `${name}=${value}`;
    const pattern = new RegExp(`^${name}=.*$`, 'm');
    env = pattern.test(env) ? env.replace(pattern, line) : `${env.replace(/\s*$/, '\n')}${line}\n`;
  }
  writeFileSync(envFile, env);
  console.log(`Wrote FIREBASE_SERVICE_ACCOUNT_B64 and APN_CONFIG_B64 to ${envFile}`);
}
console.log(`Firebase project: ${serviceAccount.project_id} | APN bundles with their own key: ${Object.keys(bundles).join(', ') || '(none - default only)'}`);
