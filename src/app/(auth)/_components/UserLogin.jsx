'use client';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import AppInfo from './AppInfo';

export default function UserLogin() {
  const { push } = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const { data } = await xoomBackendUrl.post('/api/user/auth', values);

      if (data.status) {
        setAuth(data?.data?.accessToken, data?.data?.user);
        toast.success('Login successful!');
        resetForm(); // Reset the form after successful login
        push('/home');
      } else {
        toast.error('Invalid Credentials');
      }
    } catch (error) {
      if (error?.response?.status === 402) {
        toast.error('Subscription Expired or Cancelled, Please register again');
      } else {
        toast.error('Invalid Credentials');
      }
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-10 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 rounded-lg border border-primary shadow ">
      <div className="rounded-l-md items-center flex-col justify-center bg-primary text-white flex py-4">
        <AppInfo />
        <p className="text-gray-400 text-sm">Don&apos;t have an account?</p>
        <Link
          href={'/register'}
          className="btn btn-link rounded-full mt-3 text-white btn-sm"
        >
          Register
        </Link>
      </div>
      <div className="p-2 lg:p-5">
        <h4 className="text-2xl font-semibold">Login</h4>
        <Formik
          initialValues={{ phone: '', password: '' }}
          validationSchema={Yup.object({
            phone: Yup.string().required('Phone number is required'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={handleLogin}
        >
          <Form>
            <label className="label">Phone Number</label>
            <Field name="phone" className="input input-bordered w-full" />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-600 text-sm"
            />

            <label className="label mt-2">Password</label>
            <Field
              name="password"
              type="password"
              className="input input-bordered w-full"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 text-sm"
            />

            <button
              type="submit"
              className="mt-4 btn btn-secondary w-full rounded-md text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
