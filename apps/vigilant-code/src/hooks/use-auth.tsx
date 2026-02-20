import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient, setBaseURL } from '@/lib/axios';


interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthUser {
  id: string;
  username: string;
  workspace: string;
}

interface LoginResponse {
  user: AuthUser;
}

interface SetupStatus {
  assigned: boolean;
  setupPath?: string;
}


const authApi = {
  login: async (workspace: string, credentials: LoginCredentials): Promise<LoginResponse> => {
    await setBaseURL(workspace);
    const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  me: async (): Promise<AuthUser> => {
    const { data } = await apiClient.get<AuthUser>('/auth/me');
    return data;
  },

  checkSetup: async (workspace: string, username: string): Promise<SetupStatus> => {
    const { data } = await apiClient.get<SetupStatus>('/auth/setup-status', {
      params: { workspace, username },
    });
    return data;
  },
};


export function useAuth() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isAuthError,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.me,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const {
    mutateAsync: login,
    isPending: isLoggingIn,
    error: loginError,
    reset: resetLogin,
  } = useMutation({
    mutationFn: ({
      workspace,
      credentials,
    }: {
      workspace: string;
      credentials: LoginCredentials;
    }) => authApi.login(workspace, credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });

  const { mutateAsync: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth'] });
      queryClient.clear();
    },
  });

  const setupPoller = (workspace: string, username: string, enabled: boolean) =>
    useQuery({
      queryKey: ['auth', 'setup', workspace, username],
      queryFn: () => authApi.checkSetup(workspace, username),
      enabled,
      refetchInterval: (query) => (query.state.data?.assigned ? false : 3000),
      retry: false,
    });

  return {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoadingUser,
    isAuthError,

    login,
    isLoggingIn,
    loginError,
    resetLogin,

    logout,
    isLoggingOut,

    setupPoller,
  };
}