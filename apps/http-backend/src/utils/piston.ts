import axios from "axios";

const PISTON_URL = "http://localhost:2000/api/v2/execute";

export const executeCode = async (
  language: string,
  version: string,
  code: string,
  stdin: string
) => {
  const res = await axios.post(PISTON_URL, {
    language,
    version,
    files: [
      {
        content: code,
      },
    ],
    stdin,
    run_timeout: 3000,
    compile_timeout: 10000,
  });

  return res.data;
};