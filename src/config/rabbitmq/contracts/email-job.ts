/**
 * `email.send` payload - CONTRACT, keep identical in NurseryServices-Web.
 *
 * Nursery reads the center's data and body text from its DB and sends variables; this
 * service owns the HTML layouts (templates/email/<templateId>.hbs) and renders them.
 * Payloads may carry credentials (parent PIN) - never log them.
 */
export interface EmailJob {
  jobId: string;
  correlationId?: string;
  createdAt: string;
  to: string | string[];
  subject: string;
  /** Overrides MAIL_FROM for this one send. */
  from?: string;
  /** Layout id. Missing, null or unknown → the default layout (1). */
  templateId?: number | null;
  /**
   * Layout variables. `bodyHtml` is inserted unescaped (center-authored HTML from
   * MailBodyTemplate); every other value is HTML-escaped.
   */
  variables: Record<string, string | null | undefined>;
  meta?: Record<string, string | number>;
}

/** What a send produced - handed to MailResultPublisher (a no-op until `email.result` exists). */
export interface EmailResult {
  jobId: string;
  success: boolean;
  /** Provider message id when the send succeeded. */
  providerId?: string;
  error?: string;
  meta?: Record<string, string | number>;
}
