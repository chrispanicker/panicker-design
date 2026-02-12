// import { client } from "./lib/client";

import { client } from "./client";

export function getFileUrl(fileRef: any) {
  if (!fileRef || !fileRef.asset?._ref) return null;
  // Sanity file asset _ref is in the form: "file-<hash>-<ext>"
  // Use the Sanity CDN URL pattern
  const [, id, ext] = fileRef.asset._ref.split('-');
  return `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${id}.${ext}`;
}
