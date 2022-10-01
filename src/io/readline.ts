
import fs from "fs";

export function readline(filename: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err: any, buffer: any) => {
      if (err) {
        reject(err)
      }
      else {
        let data = buffer.toString().split(/\n|\r\n/)
        resolve(data)
      }
    })
  })
}