export const PACKAGE_NAME_PATTERN = /^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9])$/i;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validatePackageName(name: string): ValidationResult {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return { isValid: false };
  }

  if (!PACKAGE_NAME_PATTERN.test(trimmedName)) {
    return {
      isValid: false,
      error: "Package names must start and end with a letter or number, and can only contain letters, numbers, dots, hyphens, and underscores."
    };
  }

  return { isValid: true };
}