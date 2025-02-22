import * as fs from "fs";

export function ReadFile(path: string): string | null {
  try {
    return fs.readFileSync("example.txt", "utf-8");
  }
  catch(e: any) {
    return null;
  }  
}
