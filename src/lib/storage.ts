// Support local filesystem and Tigris (TODO)
export const folder = "storage/";

// Uploads file and returns redirect URL
export async function upload(path: string, data: Blob): Promise<string> {
  await Bun.write(folder + path, data);
  return "/" + folder + path;
}

// Downloads file and returns Blob
export async function download(path: string): Promise<Blob> {
  return Bun.file(folder + path);
}
