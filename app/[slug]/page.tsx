import { notFound } from "next/navigation";

import FileSetClient from "@/components/file-set/file-set-client";
import { fetchFileSet } from "@/lib/api/filecloud";

interface FileSetPageProps {
  params: { slug: string };
}

export const revalidate = 0;

export default async function FileSetPage({ params }: FileSetPageProps) {
  const slug = decodeURIComponent(params.slug);
  const fileSet = await fetchFileSet(slug);

  if (!fileSet) {
    notFound();
  }

  return <FileSetClient fileSet={fileSet} />;
}
