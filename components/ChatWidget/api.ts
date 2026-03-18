const BASE_URL = process.env.NEXT_PUBLIC_RAG_BACKEND_URL;
const API_KEY_NAME = process.env.NEXT_PUBLIC_API_KEY_NAME ?? "";
const API_KEY_VALUE = process.env.NEXT_PUBLIC_API_KEY_VALUE ?? "";

const TIMEOUT_MS = 15000;

export async function sendMessageToBot(
  query: string,
  history: { role: string; content: string }[]
) {
  const cleanHistory = history.map(({ role, content }) => ({ role, content }));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [API_KEY_NAME]: API_KEY_VALUE,
      },
      body: JSON.stringify({ query, history: cleanHistory }),
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json();
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}