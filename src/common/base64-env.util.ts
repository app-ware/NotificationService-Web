import { ConfigService } from '@nestjs/config';

/**
 * Reads a credential stored in env as base64-encoded JSON. Base64 keeps multi-line secrets
 * (a service-account private key, .p8 contents) on one line, so they live safely in a plain
 * .env file. Build the values with `npm run encode-credentials` (scripts/encode-credentials.mjs).
 *
 * Throws at startup with the variable's name - never its value - when missing or malformed.
 */
export function readBase64JsonEnv<T>(config: ConfigService, name: string): T {
  const encoded = config.get<string>(name);
  if (!encoded) {
    throw new Error(`${name} is not configured - see README "Credentials".`);
  }
  try {
    return JSON.parse(Buffer.from(encoded, 'base64').toString('utf8')) as T;
  } catch {
    throw new Error(`${name} is not valid base64-encoded JSON - regenerate it with \`npm run encode-credentials\`.`);
  }
}
