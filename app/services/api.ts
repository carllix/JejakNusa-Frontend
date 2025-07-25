import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:5001/api';
const TOKEN_KEY = 'jejak_nusa_token';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: any;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = await this.getToken();

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          message: data.message || `HTTP error! status: ${response.status}`,
          status: response.status,
          ...data,
        };
      }

      return data;
    } catch (error) {
      if (error && typeof error === 'object' && 'success' in error) {
        throw error;
      }
      
      throw {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'GET',
    });
  }

  
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
    });
  }

  
  async upload<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const token = await this.getToken();
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          message: data.message || `HTTP error! status: ${response.status}`,
          status: response.status,
          ...data,
        };
      }

      return data;
    } catch (error) {
      if (error && typeof error === 'object' && 'success' in error) {
        throw error;
      }
      
      throw {
        success: false,
        message: error instanceof Error ? error.message : 'Upload error occurred',
      };
    }
  }
}


export const apiService = new ApiService();


export default ApiService;