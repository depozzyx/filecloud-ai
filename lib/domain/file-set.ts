export type FileAssetType = "video" | "pdf" | "image" | "unknown";

export interface FileAsset {
  id: string;
  url: string;
  kind: FileAssetType;
  name: string;
  description?: string;
  extension?: string;
}

export interface FileSet {
  slug: string;
  title: string;
  description?: string;
  assets: FileAsset[];
}
