import { FilecloudPayload } from "@/lib/api/types";
import { FileAsset, FileAssetType, FileSet } from "@/lib/domain/file-set";

const SUPPORTED_IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "avif",
]);

function normaliseKind(explicitType: string | undefined, url: string): FileAssetType {
  const type = explicitType?.toLowerCase().trim();
  if (type === "video") return "video";
  if (type === "pdf") return "pdf";
  if (type === "image" || type === "photo") return "image";

  const extension = extractExtension(url);
  if (!extension) return "unknown";

  if (SUPPORTED_IMAGE_EXTENSIONS.has(extension)) {
    return "image";
  }
  if (extension === "mp4" || extension === "mov" || extension === "m4v") {
    return "video";
  }
  if (extension === "pdf") {
    return "pdf";
  }
  return "unknown";
}

function extractExtension(url: string): string | null {
  const name = extractFilename(url);
  if (!name) return null;
  const parts = name.split(".");
  if (parts.length < 2) return null;
  return parts[parts.length - 1]?.toLowerCase() ?? null;
}

function extractFilename(url: string): string | null {
  try {
    const parsed = new URL(url);
    const base = parsed.pathname.split("/").filter(Boolean).pop();
    return base ? decodeURIComponent(base) : null;
  } catch (error) {
    const segments = url.split("/");
    const base = segments[segments.length - 1];
    return base || null;
  }
}

function humanizeFilename(name: string | null): string | null {
  if (!name) return null;
  const withoutExt = name.includes(".") ? name.slice(0, name.lastIndexOf(".")) : name;
  return withoutExt
    .replace(/[\-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function mapFilecloudPayloadToFileSet(slug: string, payload: FilecloudPayload): FileSet {
  const assets: FileAsset[] = payload.files.map((file, index) => {
    const filename = extractFilename(file.file);
    const humanName = humanizeFilename(filename);
    const extension = extractExtension(file.file) ?? undefined;
    const kind = normaliseKind(file.type, file.file);

    return {
      id: `${slug}-${index}`,
      url: file.file,
      kind,
      name: file.description?.trim() || humanName || `Asset ${index + 1}`,
      description: file.description?.trim(),
      extension,
    } satisfies FileAsset;
  });

  return {
    slug,
    title: payload.title,
    description: payload.description?.trim(),
    assets,
  } satisfies FileSet;
}
