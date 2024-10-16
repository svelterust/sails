import fs from "fs/promises";
import { env } from "$env/dynamic/private";
import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Helpers for storage
const folder = "storage/";
await fs.mkdir(folder, { recursive: true });
const s3 = () => env.AWS_ACCESS_KEY_ID && env.AWS_ENDPOINT_URL_S3 && env.AWS_SECRET_ACCESS_KEY && env.BUCKET_NAME && env.AWS_REGION;
const s3Client = s3() ? new S3Client({ region: env.AWS_REGION, endpoint: env.AWS_ENDPOINT_URL_S3 }) : null;

// Get URL for path
export function urlFor(path: string): string {
  return "/" + folder + path;
}

// Uploads file and returns redirect URL
export async function upload(path: string, data: Buffer): Promise<string | null> {
  if (s3Client) {
    const params = {
      Bucket: env.BUCKET_NAME,
      Key: path,
      Body: data,
    };
    await s3Client.send(new PutObjectCommand(params));
  } else {
    await Bun.write(folder + path, data.buffer);
  }
  return urlFor(path);
}

// Downloads file and returns Blob
export async function download(path: string): Promise<ReadableStream | Blob | null> {
  if (s3Client) {
    const params = {
      Bucket: env.BUCKET_NAME,
      Key: path,
    };
    const data = await s3Client.send(new GetObjectCommand(params));
    if (data.Body) {
      return data.Body.transformToWebStream();
    }
  } else {
    return Bun.file(folder + path);
  }
  return null;
}

// List files in path and returns path to files
export async function list(path: string = ""): Promise<string[]> {
  if (s3Client) {
    const params = {
      Bucket: env.BUCKET_NAME,
      Prefix: path,
    };
    const data = await s3Client.send(new ListObjectsV2Command(params));
    if (data.Contents) {
      return data.Contents.flatMap((item) => (item.Key ? [item.Key] : []));
    }
  } else {
    return fs.readdir(folder + path);
  }
  return [];
}

// Remove file from system
export async function remove(path: string): Promise<void> {
  if (s3Client) {
    const params = {
      Bucket: env.BUCKET_NAME,
      Key: path,
    };
    await s3Client.send(new DeleteObjectCommand(params));
  } else {
    await fs.unlink(folder + path);
  }
}
