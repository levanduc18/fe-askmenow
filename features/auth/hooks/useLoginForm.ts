import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@/features/auth/schemas/login.schema';
import { login } from '@/features/auth/services/auth.service';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import { getProfile } from '@/features/users/services/user.service';

export const useLoginForm = () => {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const { accessToken } = await login(data.email, data.password);
      setAccessToken(accessToken);

      const profile = await getProfile();
      setUser(profile);
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      // TODO: thêm toast
    }
  };

  return { form, onSubmit };
};
