// import { client } from "./lib/client";

import { client } from "./client";

export function getFileUrl(fileRef: unknown) {
  if (!fileRef || typeof fileRef !== 'object' || !('asset' in fileRef)) return null;
  const asset = (fileRef as { asset?: { _ref?: string } }).asset;
  if (!asset || typeof asset._ref !== 'string') return null;
  // Sanity file asset _ref is in the form: "file-<hash>-<ext>"
  // Use the Sanity CDN URL pattern
  const [, id, ext] = asset._ref.split('-');
  return `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${id}.${ext}`;
}
