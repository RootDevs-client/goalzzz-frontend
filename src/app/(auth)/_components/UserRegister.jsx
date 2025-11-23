'use client';
import { useAuthStore } from '@/lib/auth-store';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import AppInfo from './AppInfo';

export default function UserRegister() {
  const [registerFormSubmitted, setRegisterFormSubmitted] = useState(false);
  const { push } = useRouter();

  const setRegister = useAuthStore((state) => state.setRegister);

  const handleRegister = (values, { resetForm }) => {
    setRegisterFormSubmitted(true);
    setRegister(values);
    resetForm();
    push('/package');
  };

  return (
    <>
      <div className="mt-10 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 rounded-lg border border-primary shadow">
        <div className="flex rounded-l-md items-center flex-col justify-center bg-primary text-white py-4">
          <AppInfo />

          <p className="text-gray-400 text-sm">Already have an account?</p>
          <Link
            href={'/login'}
            className="btn btn-link rounded-full mt-3 text-white btn-sm"
          >
            Login
          </Link>
        </div>
        <div className="p-2 lg:p-5">
          <h4 className="text-2xl font-semibold">Register</h4>
          <Formik
            initialValues={{ phone: '', password: '' }}
            validationSchema={Yup.object({
              phone: Yup.string().required('Phone number is required'),
              password: Yup.string().required('Password is required'),
            })}
            onSubmit={handleRegister}
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
                disabled={registerFormSubmitted}
              >
                {registerFormSubmitted ? 'Processing' : 'Register'}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
