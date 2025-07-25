import { useState, useCallback } from 'react';
import { apiService, ApiResponse, ApiError } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

// Generic hook for API calls
export function useApi<T = any>(
  apiCall: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiCall(...args);
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
        return response.data;
      } catch (error) {
        const errorMessage = 
          error && typeof error === 'object' && 'message' in error
            ? (error as ApiError).message
            : 'An unexpected error occurred';

        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        throw error;
      }
    },
    [apiCall]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Specific hooks for common API patterns

// GET request hook
export function useGet<T = any>(endpoint: string) {
  return useApi<T>(() => apiService.get<T>(endpoint));
}

// POST request hook
export function usePost<T = any>(endpoint: string) {
  return useApi<T>((data: any) => apiService.post<T>(endpoint, data));
}

// PUT request hook
export function usePut<T = any>(endpoint: string) {
  return useApi<T>((data: any) => apiService.put<T>(endpoint, data));
}

// PATCH request hook
export function usePatch<T = any>(endpoint: string) {
  return useApi<T>((data: any) => apiService.patch<T>(endpoint, data));
}

// DELETE request hook
export function useDelete<T = any>(endpoint: string) {
  return useApi<T>(() => apiService.delete<T>(endpoint));
}

// Upload hook
export function useUpload<T = any>(endpoint: string) {
  return useApi<T>((formData: FormData) => apiService.upload<T>(endpoint, formData));
}

// Hook for data fetching with automatic execution
export function useFetch<T = any>(endpoint: string, autoExecute: boolean = true) {
  const { data, loading, error, execute, reset } = useGet<T>(endpoint);

  // Auto-execute on mount if autoExecute is true
  useState(() => {
    if (autoExecute) {
      execute();
    }
  });

  return {
    data,
    loading,
    error,
    refetch: execute,
    reset,
  };
}

export default useApi;