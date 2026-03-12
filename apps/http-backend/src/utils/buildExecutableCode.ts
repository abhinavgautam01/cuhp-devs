import fs from "fs";
import path from "path";

const extensionMap: Record<string, string> = {
  python: "py",
  javascript: "js",
  node: "js",
  "c++": "cpp",
  gcc: "cpp",
  rust: "rs",
};

export function buildExecutableCode(
  problemSlug: string,
  runtime: string,
  userCode: string
) {

  const ext = extensionMap[runtime];

  if (!ext) {
    throw new Error(`Unsupported runtime: ${runtime}`);
  }

  const boilerplatePath = path.resolve(
    __dirname,
    "../../../problems",
    problemSlug,
    "boilerplate-full",
    `function.${ext}`
  );

  const boilerplate = fs.readFileSync(boilerplatePath, "utf8");

  // 🔥 Replace placeholder with user code
  return boilerplate.replace("## USER_CODE_HERE ##", userCode);
}