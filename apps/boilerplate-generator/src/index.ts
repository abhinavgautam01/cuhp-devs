import fs from "fs";
import path from "path";

/* ----------------------------- PARSER ----------------------------- */

function parseStructure(data: string) {
  const lines = data.split("\n").map((l) => l.trim());

  const result = {
    problemName: "",
    functionName: "",
    inputs: [] as { type: string; name: string }[],
    output: { type: "", name: "" },
  };

  for (const line of lines) {
    if (line.startsWith("Problem Name:")) {
      result.problemName = line.replace("Problem Name:", "").trim();
    }

    if (line.startsWith("Function Name:")) {
      result.functionName = line.replace("Function Name:", "").trim();
    }

    if (line.startsWith("Input Field:")) {
      const [, rest] = line.split(":");
      if (!rest) continue;
      const [type, name] = rest.trim().split(" ");
      if (!type || !name) continue;
      result.inputs.push({ type, name });
    }

    if (line.startsWith("Output Field:")) {
      const [, rest] = line.split(":");
      if (!rest) continue;
      const [type, name] = rest.trim().split(" ");
      if (!type || !name) continue;
      result.output = { type, name };
    }
  }

  return result;
}

/* ----------------------------- TYPE MAPS ----------------------------- */

const mapCppType = (type: string) =>
  type === "int"
    ? "int"
    : type === "list<int>"
      ? "vector<int>"
      : type === "string"
        ? "string"
        : type === "bool"
          ? "bool"
          : type;

const mapRustType = (type: string) =>
  type === "int"
    ? "i32"
    : type === "list<int>"
      ? "Vec<i32>"
      : type === "string"
        ? "String"
        : type === "bool"
          ? "bool"
          : type;

const mapPythonType = (type: string) =>
  type === "int"
    ? "int"
    : type === "list<int>"
      ? "List[int]"
      : type === "string"
        ? "str"
        : type === "bool"
          ? "bool"
          : "Any";

/* ----------------------------- FUNCTION BOILERPLATES ----------------------------- */

function generateCppBoilerplate(parsed: any) {
  const returnType = mapCppType(parsed.output.type);
  const params = parsed.inputs
    .map((i: any) => `${mapCppType(i.type)} ${i.name}`)
    .join(", ");

  return `${returnType} ${parsed.functionName}(${params}) {
    ${returnType} result;
    // Your code goes here
    return result;
}`;
}

function generateRustBoilerplate(parsed: any) {
  const returnType = mapRustType(parsed.output.type);
  const params = parsed.inputs
    .map((i: any) => `${i.name}: ${mapRustType(i.type)}`)
    .join(", ");

  return `fn ${parsed.functionName}(${params}) -> ${returnType} {
    let result: ${returnType} = Default::default();
    // Your code goes here
    result
}`;
}

function generatePythonBoilerplate(parsed: any) {
  const returnType = mapPythonType(parsed.output.type);
  const params = parsed.inputs
    .map((i: any) => `${i.name}: ${mapPythonType(i.type)}`)
    .join(", ");

  return `from typing import *

def ${parsed.functionName}(${params}) -> ${returnType}:
    result = None
    # Your code goes here
    return result
`;
}

function generateJsBoilerplate(parsed: any) {
  const params = parsed.inputs.map((i: any) => i.name).join(", ");

  return `function ${parsed.functionName}(${params}) {
    let result;
    // Your code goes here
    return result;
}
`;
}

/* ----------------------------- FULL BOILERPLATES ----------------------------- */

function generateCppFullBoilerplate(parsed: any) {
  const args = parsed.inputs.map((i: any) => i.name).join(", ");

  return `#include <iostream>
using namespace std;

## USER_CODE_HERE ##

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

${parsed.inputs
  .map((i: any) => `    ${mapCppType(i.type)} ${i.name}; cin >> ${i.name};`)
  .join("\n")}

    auto result = ${parsed.functionName}(${args});
    cout << result;
    return 0;
}`;
}

function generateRustFullBoilerplate(parsed: any) {
  const args = parsed.inputs.map((i: any) => i.name).join(", ");

  return `use std::io::{self, Read};

## USER_CODE_HERE ##

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut iter = input.split_whitespace();

${parsed.inputs
  .map(
    (i: any) =>
      `    let ${i.name}: i32 = iter.next().unwrap().parse().unwrap();`,
  )
  .join("\n")}

    let result = ${parsed.functionName}(${args});
    println!("{}", result);
}`;
}

function generatePythonFullBoilerplate(parsed: any) {
  const args = parsed.inputs.map((i: any) => i.name).join(", ");

  return `## USER_CODE_HERE ##

import sys
input_data = list(map(int, sys.stdin.read().strip().split()))

${parsed.inputs
  .map((i: any, idx: number) => `${i.name} = input_data[${idx}]`)
  .join("\n")}

result = ${parsed.functionName}(${args})
print(result)
`;
}

function generateJsFullBoilerplate(parsed: any) {
  const args = parsed.inputs.map((i: any) => i.name).join(", ");

  return `## USER_CODE_HERE ##

const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);

${parsed.inputs
  .map((i: any, idx: number) => `const ${i.name} = Number(input[${idx}]);`)
  .join("\n")}

const result = ${parsed.functionName}(${args});
console.log(result);
`;
}

/* ----------------------------- GENERATOR CORE ----------------------------- */

function generateForSlug(slug: string) {
  const basePath = path.join(process.cwd(), "..", "problems", slug);
  const structurePath = path.join(basePath, "Structure.md");

  if (!fs.existsSync(structurePath)) {
    console.log(`⚠️  Skipping ${slug} (no Structure.md)`);
    return;
  }

  const parsed = parseStructure(fs.readFileSync(structurePath, "utf-8"));

  const boilerplateDir = path.join(basePath, "boilerplate");
  const boilerplateFullDir = path.join(basePath, "boilerplate-full");

  fs.mkdirSync(boilerplateDir, { recursive: true });
  fs.mkdirSync(boilerplateFullDir, { recursive: true });

  fs.writeFileSync(
    path.join(boilerplateDir, "function.cpp"),
    generateCppBoilerplate(parsed),
  );
  fs.writeFileSync(
    path.join(boilerplateDir, "function.rs"),
    generateRustBoilerplate(parsed),
  );
  fs.writeFileSync(
    path.join(boilerplateDir, "function.py"),
    generatePythonBoilerplate(parsed),
  );
  fs.writeFileSync(
    path.join(boilerplateDir, "function.js"),
    generateJsBoilerplate(parsed),
  );

  fs.writeFileSync(
    path.join(boilerplateFullDir, "function.cpp"),
    generateCppFullBoilerplate(parsed),
  );
  fs.writeFileSync(
    path.join(boilerplateFullDir, "function.rs"),
    generateRustFullBoilerplate(parsed),
  );
  fs.writeFileSync(
    path.join(boilerplateFullDir, "function.py"),
    generatePythonFullBoilerplate(parsed),
  );
  fs.writeFileSync(
    path.join(boilerplateFullDir, "function.js"),
    generateJsFullBoilerplate(parsed),
  );

  console.log(`✅ Generated for ${slug}`);
}

/* ----------------------------- ENTRY ----------------------------- */

const arg = process.argv[2];
const problemsRoot = path.join(process.cwd(), "..", "problems");

if (!arg) {
  console.log("Provide problem slug or 'all'");
  process.exit(1);
}

if (arg === "all") {
  const slugs = fs
    .readdirSync(problemsRoot)
    .filter((f) => fs.statSync(path.join(problemsRoot, f)).isDirectory());

  for (const slug of slugs) {
    generateForSlug(slug);
  }

  console.log("🔥 All problems generated");
} else {
  generateForSlug(arg);
}
