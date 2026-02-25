import axios from "axios";

const JUDGE0 = "http://localhost:2358";

export async function createBatchSubmissions(batch: any[]) {
  const { data } = await axios.post(
    `${JUDGE0}/submissions/batch`,
    { submissions: batch }
  );
  return data;
}

export async function getBatch(tokens: string[]) {
  const { data } = await axios.get(
    `${JUDGE0}/submissions/batch`,
    { params: { tokens: tokens.join(","), base64_encoded: false } }
  );
  return data.submissions;
}