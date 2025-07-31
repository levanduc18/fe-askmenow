import { get } from '@/lib/axios';
import { User } from '@/types/user';

export async function getProfile(): Promise<User> {
  return await get<User>('/users/profile');
}
