import fs from "fs"
import { resolve } from "path";
import { once } from "node:events"
export default async (options) => {
  const file = resolve(process.cwd(), options?.destination);

  const stream = fs.createWriteStream(file, { flags: "a", encoding: "utf-8" });
  await once(stream, 'open')

  return stream;
}