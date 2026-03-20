import axios from "axios";

const PISTON_URL =
  process.env.PISTON_URL || "http://localhost:2000/api/v2/execute";
const PISTON_RUNTIMES_URL =
  process.env.PISTON_RUNTIMES_URL || "http://localhost:2000/api/v2/runtimes";

type PistonRuntime = {
  language: string;
  version: string;
  aliases?: string[];
};

let runtimeCache: PistonRuntime[] | null = null;

const getPistonRuntimes = async () => {
  if (runtimeCache) {
    return runtimeCache;
  }

  const res = await axios.get<PistonRuntime[]>(PISTON_RUNTIMES_URL, {
    timeout: 10000,
  });

  runtimeCache = Array.isArray(res.data) ? res.data : [];
  return runtimeCache;
};

const findMatchingRuntime = (
  runtimes: PistonRuntime[],
  language: string,
  version: string
) => {
  const normalizedLanguage = language.trim().toLowerCase();
  const normalizedVersion = version.trim();

  return runtimes.find((runtime) => {
    const runtimeNames = [
      runtime.language,
      ...(runtime.aliases ?? []),
    ].map((value) => value.toLowerCase());

    return (
      runtimeNames.includes(normalizedLanguage) &&
      runtime.version === normalizedVersion
    );
  });
};

export const executeCode = async (
  language: string,
  version: string,
  code: string,
  stdin: string
) => {
  try {
    const runtimes = await getPistonRuntimes();

    if (runtimes.length === 0) {
      throw new Error(
        `No runtimes are installed in Piston at ${PISTON_RUNTIMES_URL}`
      );
    }

    const resolvedRuntime = findMatchingRuntime(runtimes, language, version);

    if (!resolvedRuntime) {
      throw new Error(
        `Runtime ${language}@${version} is not installed in Piston`
      );
    }

    const res = await axios.post(
      PISTON_URL,
      {
        language: resolvedRuntime.language,
        version: resolvedRuntime.version,
        files: [
          {
            content: code,
          },
        ],
        stdin,
        run_timeout: 3000,
        compile_timeout: 10000,
      },
      {
        timeout: 15000,
      }
    );

    return res.data;
  } catch (error: any) {
    const apiMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Unknown Piston error";

    throw new Error(`Piston request failed at ${PISTON_URL}: ${apiMessage}`);
  }
};
