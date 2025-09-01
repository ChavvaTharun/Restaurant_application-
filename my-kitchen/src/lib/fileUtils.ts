import fs from "fs";
import path from "path";

export function readJSON(filename: string) {
  const filePath = path.join(process.cwd(), "src/data", filename);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
