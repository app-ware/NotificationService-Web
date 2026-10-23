export interface DispatchFailure {
  deviceToken: string;
  reason: string;
}

/** Per-platform result. Token-level failures are expected (stale tokens) and never thrown. */
export interface DispatchOutcome {
  successCount: number;
  failures: DispatchFailure[];
}

export interface PushDispatchResult {
  fcm?: DispatchOutcome;
  apn?: DispatchOutcome;
  /** Non-fatal notes, e.g. iOS recipients existed but the job carried no APN bundle. */
  warnings: string[];
}

export const emptyOutcome = (): DispatchOutcome => ({ successCount: 0, failures: [] });

export function mergeOutcomes(outcomes: DispatchOutcome[]): DispatchOutcome {
  return {
    successCount: outcomes.reduce((sum, o) => sum + o.successCount, 0),
    failures: outcomes.flatMap((o) => o.failures),
  };
}
