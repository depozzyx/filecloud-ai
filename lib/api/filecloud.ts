import "server-only";

import { FilecloudResponse } from "@/lib/api/types";
import { FileSet } from "@/lib/domain/file-set";
import { mapFilecloudPayloadToFileSet } from "@/lib/mappers/filecloud";

const BASE_URL = "https://datastore.goldsyacht.com/filecloud/fileset";

export async function fetchFileSet(slug: string): Promise<FileSet | null> {
  if (!slug) {
    return null;
  }

  const url = `${BASE_URL}/${encodeURIComponent(slug)}/`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as FilecloudResponse;
    if (!payload.data || payload.status?.toLowerCase() !== "ok") {
      return null;
    }

    return mapFilecloudPayloadToFileSet(slug, payload.data);
  } catch (error) {
    return null;
  }
}
