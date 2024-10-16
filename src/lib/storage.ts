export const folder = "storage/";

// Get URL for path
export function urlFor(path: string): string {
  return "/" + folder + path;
}

// Uploads file and returns redirect URL
export async function upload(path: string, data: Blob): Promise<string> {
  await Bun.write(folder + path, data);
  return urlFor(path);
}

// Downloads file and returns Blob
export async function download(path: string): Promise<Blob> {
  return Bun.file(folder + path);
}
