export function validatePrivacyText(text: string, filename: string): void;
export function buildPrivacyReceipt(root: string, kind: string, targetReceipt?: string): { bytes: Buffer; fileCount: number };
export function validatePrivacyPath(root: string, kind: string, writeReceipt?: boolean): number;
