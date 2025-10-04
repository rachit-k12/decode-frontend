/**
 * Simple API utilities with fetch
 * Basic error handling and request helpers
 */

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

/**
 * Simple fetch wrapper with error handling
 */
export async function fetchAPI<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new APIError(
        `Request failed: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new APIError(error.message, 0, "Network Error");
    }
    throw new APIError("Unknown error occurred", 0, "Unknown");
  }
}
