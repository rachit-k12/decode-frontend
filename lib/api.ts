/**
 * Simple API utilities with fetch
 * Basic error handling and request helpers
 */

// API base URL - using the real endpoint
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://10.7.29.62:8000/api/v1";

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
      mode: "cors", // Enable CORS
      credentials: "omit", // Don't send cookies for cross-origin requests
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
      // Better error messages for common issues
      if (error.message.includes("Failed to fetch")) {
        throw new APIError(
          "Unable to connect to the API. Please check if the server is running.",
          0,
          "Network Error"
        );
      }
      throw new APIError(error.message, 0, "Network Error");
    }
    throw new APIError("Unknown error occurred", 0, "Unknown");
  }
}

/**
 * Fetch dashboard data for a specific user
 */
export async function fetchDashboardData(username: string) {
  return fetchAPI<any>(`${API_BASE_URL}/dashboard/${username}`);
}
