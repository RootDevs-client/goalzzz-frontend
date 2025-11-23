import getAccessToken from '@/lib/axios/getAccessToken';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import getRandomString from '@/lib/helpers/getRandomString';
import cookie from 'cookie';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  pages: {
    signIn: '/',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        phone: { label: 'Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const cookies = cookie.parse(req.headers.cookie);

        // Admin Login
        if (credentials?.adminLogin === 'true') {
          try {
            const { data } = await xoomBackendUrl.post('/api/admin/login', {
              email: credentials?.email,
              password: credentials?.password,
            });

            if (data?.status === false) {
              throw new Error(data?.message);
            } else {
              const user = data?.data;
              return user; // return the user's data
            }
          } catch (err) {
            throw new Error(err.message);
          }
        } else {
          // User Otp Verify & Sign In
          if (credentials?.signUp === 'true') {
            try {
              const { data } = await xoomBackendUrl.post(
                '/api/user/verify-email',
                { otp: credentials?.otp },
                {
                  headers: {
                    token: cookies?._temp,
                  },
                }
              );

              if (data.status === false) {
                throw new Error(data?.message);
              }

              const user = data?.data;

              return user; // return the user's data
            } catch (err) {
              throw new Error(err.message);
            }
          } else {
            try {
              // User Sign In
              const { data } = await xoomBackendUrl.post('/api/user/auth', {
                phone: credentials?.phone,
                password: credentials?.password,
              });

              if (data?.status === false) {
                throw new Error(data?.message);
              } else {
                const user = data?.user;
                return user; // return the user's data
              }
            } catch (err) {
              throw new Error(err.message);
            }
          }
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 12, // Expire in 12 Hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Handle Manual Auth
      if (account?.provider === 'credentials') {
        if (user) {
          return {
            ...token,
            ...user,
          };
        }
      }

      // Handle Social Auth
      if (account?.provider === 'google' || account?.provider === 'apple') {
        const values = {
          name: user?.name,
          email: user?.email,
          password: getRandomString(10),
          image: user?.image,
          provider: account?.provider,
        };
        const { data } = await xoomBackendUrl.post(
          '/api/user/register',
          values
        );
        const userData = data?.data;

        if (userData) {
          return {
            ...token,
            ...userData,
          };
        }
      }

      // Get Access Token
      if (new Date().getTime() < token?.expiresIn) return token;

      const role = token?.role === 'user' ? 'user' : 'admin';
      return await getAccessToken(token, role);
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
