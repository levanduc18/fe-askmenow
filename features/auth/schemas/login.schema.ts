import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu ít nhất 6 ký tự' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
