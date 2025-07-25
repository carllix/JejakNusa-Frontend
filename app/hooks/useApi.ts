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




export function useGet<T = any>(endpoint: string) {
  return useApi<T>(() => apiService.get<T>(endpoint));
}


export function usePost<T = any>(endpoint: string) {
  return useApi<T>((data: any) => apiService.post<T>(endpoint, data));
}


export function usePut<T = any>(endpoint: string) {
  return useApi<T>((data: any) => apiService.put<T>(endpoint, data));
}


export function usePatch<T = any>(endpoint: string) {
  return useApi<T>((data: any) => apiService.patch<T>(endpoint, data));
}


export function useDelete<T = any>(endpoint: string) {
  return useApi<T>(() => apiService.delete<T>(endpoint));
}


export function useUpload<T = any>(endpoint: string) {
  return useApi<T>((formData: FormData) => apiService.upload<T>(endpoint, formData));
}


export function useFetch<T = any>(endpoint: string, autoExecute: boolean = true) {
  const { data, loading, error, execute, reset } = useGet<T>(endpoint);

  
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