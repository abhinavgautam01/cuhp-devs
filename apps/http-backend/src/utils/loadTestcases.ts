import fs from "fs";
import path from "path";

export function loadTestcases(slug: string) {
  const base = path.join(
    process.cwd(),
    "..",
    "problems",
    slug,
    "tests"
  );

  const inputs = fs.readdirSync(`${base}/input`);
  const outputs = fs.readdirSync(`${base}/output`);

  return inputs.map((file, i) => ({
    stdin: fs.readFileSync(`${base}/input/${file}`, "utf-8"),
    expected: fs.readFileSync(`${base}/output/${outputs[i]}`, "utf-8"),
  }));
}