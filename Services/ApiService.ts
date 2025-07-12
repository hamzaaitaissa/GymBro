export class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = "https://localhost:7082";
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  private async fetchWithErrorHandling<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      defaultHeaders["Authorization"] = `Bearer ${this.token}`;
    }

    const finalOptions: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
      // Remove credentials if you don't use cookies
    };
console.log("Final headers being sent:", finalOptions.headers);
    try {
      const response = await fetch(url, finalOptions);

      if (response.status === 401) {
        this.token = null;
        throw new Error("Authentication failed (401)");
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      }
      return (await response.text()) as unknown as T;
    } catch (error) {
      console.error(`API call failed for ${endpoint}: `, error);
      throw error;
    }
  }

async get<T>(
  endpoint: string,
  customHeaders: Record<string, string> = {}
): Promise<T> {
  return this.fetchWithErrorHandling<T>(endpoint, {
    method: "GET",
    headers: customHeaders,
  });
}

async post<T>(
  endpoint: string,
  data: unknown,
  customHeaders: Record<string, string> = {}
): Promise<T> {
  return this.fetchWithErrorHandling<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: customHeaders,
  });
}

async put<T>(
  endpoint: string,
  data: unknown,
  customHeaders: Record<string, string> = {}
): Promise<T> {
  return this.fetchWithErrorHandling<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: customHeaders,
  });
}

  async delete<T>(endpoint: string): Promise<T> {
    return this.fetchWithErrorHandling<T>(endpoint, {
      method: "DELETE",
    });
  }
}
