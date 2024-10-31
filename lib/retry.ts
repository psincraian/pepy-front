export interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  timeout: number;
}

export class RetryError extends Error {
  constructor(
    message: string,
    public attempts: number,
    public lastError?: Error
  ) {
    super(message);
    this.name = "RetryError";
  }
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig
): Promise<T> {
  const startTime = Date.now();
  let attempts = 0;
  let lastError: Error | undefined;

  while (attempts < config.maxAttempts) {
    try {
      if (Date.now() - startTime > config.timeout) {
        throw new RetryError(
          "Operation timed out",
          attempts,
          lastError
        );
      }

      return await fn();
    } catch (error) {
      attempts++;
      lastError = error as Error;

      if (attempts === config.maxAttempts) {
        throw new RetryError(
          `Failed after ${attempts} attempts`,
          attempts,
          lastError
        );
      }

      const delay = Math.min(
        config.baseDelay * Math.pow(2, attempts - 1),
        config.maxDelay
      );

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new RetryError(
    "Unexpected retry loop termination",
    attempts,
    lastError
  );
}