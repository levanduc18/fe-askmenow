import { post,  } from '@/lib/axios';

type LoginResponse = {
  accessToken: string;
};

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  return await post<LoginResponse>('/auth/login', { email, password });
}

export async function logout(): Promise<void> {
  return await post('/auth/logout');
}


