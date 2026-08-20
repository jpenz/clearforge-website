/**
 * Shared upload validation for the contact and /start intake forms.
 * OWASP File Upload guidance: extension/MIME allowlist, server-side magic
 * byte verification (the browser Content-Type is untrusted), size cap,
 * UUID storage names with the original filename kept only as metadata.
 */

export const UPLOAD_MAX_BYTES = 10 * 1024 * 1024;

export const UPLOAD_TYPES: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "application/vnd.ms-powerpoint": ".ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    ".pptx",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
};

/** First-bytes signatures per claimed type family. */
export function magicBytesMatch(mime: string, data: ArrayBuffer): boolean {
  const b = new Uint8Array(data.slice(0, 8));
  const startsWith = (sig: number[]) => sig.every((v, i) => b[i] === v);
  if (mime === "application/pdf") return startsWith([0x25, 0x50, 0x44, 0x46]); // %PDF
  if (
    mime === "application/msword" ||
    mime === "application/vnd.ms-powerpoint" ||
    mime === "application/vnd.ms-excel"
  ) {
    return startsWith([0xd0, 0xcf, 0x11, 0xe0]); // legacy OLE container
  }
  // Modern office formats are ZIP containers
  return startsWith([0x50, 0x4b, 0x03, 0x04]) || startsWith([0x50, 0x4b, 0x05, 0x06]);
}

export interface ValidatedUpload {
  ok: true;
  extension: string;
  data: ArrayBuffer;
  originalName: string;
  contentType: string;
}

export interface RejectedUpload {
  ok: false;
  reason: string;
}

export async function validateUpload(
  file: File,
): Promise<ValidatedUpload | RejectedUpload> {
  const extension = UPLOAD_TYPES[file.type];
  if (!extension) {
    return {
      ok: false,
      reason: "Attach a PDF, Word, Excel, or PowerPoint file.",
    };
  }
  if (file.size > UPLOAD_MAX_BYTES) {
    return { ok: false, reason: "Files up to 10MB, please." };
  }
  const data = await file.arrayBuffer();
  if (!magicBytesMatch(file.type, data)) {
    return {
      ok: false,
      reason: "That file does not match its type. Re-export it and retry.",
    };
  }
  return {
    ok: true,
    extension,
    data,
    originalName: file.name.slice(0, 120),
    contentType: file.type,
  };
}
