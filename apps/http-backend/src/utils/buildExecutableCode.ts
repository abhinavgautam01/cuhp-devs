import fs from "fs";
import path from "path";

export function buildExecutableCode(
  problemSlug: string,
  language: string,
  userCode: string
) {
  const filePath = path.join(
    process.cwd(),
    "..",
    "problems",
    problemSlug,
    "boilerplate-full",
    `function.${language === "JavaScript" ? "js" : language}`
  );

  const boilerplate = fs.readFileSync(filePath, "utf-8");

  return boilerplate.replace("## USER_CODE_HERE ##", userCode);
}