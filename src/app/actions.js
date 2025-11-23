import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function revalidatePathHandler(path) {
  revalidatePath(path);
}

export const setCookie = (name, value, options = {}) => {
  const cookieStore = cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    ...options,
  });
};

export const removeCookie = (name) => {
  const cookieStore = cookies();
  cookieStore.delete(name);
};
