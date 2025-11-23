import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

const MAX_AGE = 60 * 2; // 2 Minutes;

export async function POST(request) {
  const values = await request.json();

  const { data } = await xoomBackendUrl.post('/api/user/register', values);

  if (data?.status) {
    const serialized = serialize('_temp', data?.data?.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: MAX_AGE,
      path: '/',
    });
    return NextResponse.json(
      { status: true },
      {
        status: 200,
        headers: { 'Set-Cookie': serialized },
      }
    );
  } else {
    return NextResponse.json(
      { status: false, message: data?.message },
      {
        status: 200,
      }
    );
  }
}
