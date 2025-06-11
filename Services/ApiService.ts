/* eslint-disable @typescript-eslint/no-unused-vars */
export class ApiService {
  private baseUrl: string;
  private token: string | null = null;
  /**
   *
   */
  constructor() {
    //ASP.NET Core API
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
    }
    if (this.token) {
      defaultHeaders["Authorization"] = `Bearer ${this.token}`;
    }
    const defaultOptions: RequestInit = {
      headers: defaultHeaders,
      credentials: "include",
    };

    const finalOptions = { ...defaultOptions, ...options,headers: {
        ...defaultHeaders,
        ...(options.headers || {}), 
      }, };

    try {
      const response = await fetch(url, finalOptions);
      if(response.status ==401){
        this.token =null;
        throw new Error('Authentication failed');
      }
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }
      return (await response.text()) as unknown as T;
    } catch (error) {
      console.error(`API call failed for ${endpoint}: `, error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.fetchWithErrorHandling<T>(endpoint, {
      method: "GET",
    });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.fetchWithErrorHandling<T>(endpoint, {
        method:'POST',
        body: JSON.stringify(data)
    });
  }

  async put<T>(endpoint: string, data: unknown):Promise<T>{
    return this.fetchWithErrorHandling<T>(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.fetchWithErrorHandling<T>(endpoint, {
      method: 'DELETE',
    });
  }

  async login(endpoint:string,credentials:{email:string; password:string}):Promise<{token:string; user:unknown}>{
    const response = await this.fetchWithErrorHandling<{token:string; user:unknown}>(endpoint,{
        method:'POST',
        body: JSON.stringify(credentials)
    })
    if(response.token){
        this.setToken(response.token)
    }
    return response
  }

  logout() {
    this.token = null;
  }
}
