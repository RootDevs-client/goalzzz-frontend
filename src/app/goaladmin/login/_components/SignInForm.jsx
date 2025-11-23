'use client';

import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { ImSpinner6 } from 'react-icons/im';
import * as Yup from 'yup';

export default function SignInForm() {
  const { replace } = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [loginFormSubmitted, setLoginFormSubmitted] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email!').required(' Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // Form Submit Handler
  const onSubmit = async (values) => {
    setLoginFormSubmitted(true);
    values.adminLogin = true;

    try {
      const { data } = await xoomBackendUrl.post('/api/admin/login', {
        email: values?.email,
        password: values?.password,
      });

      if (data.status) {
        setAuth(data?.data?.accessToken, data?.data, true);
        replace('/xoomadmin/dashboard');
      } else {
        toast.error('Invalid Credentials');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form>
            <div className="form-control mt-5 w-full">
              <label className="label">
                <span className="block text-gray-700 font-medium text-sm mb-1">
                  Email<span className="mr-2 text-red-600">*</span>
                  <ErrorMessage
                    name="email"
                    component={({ children }) => (
                      <span className="text-sm text-red-600">({children})</span>
                    )}
                  />
                </span>
              </label>
              <Field name="email">
                {({ field, meta }) => {
                  return (
                    <>
                      <input
                        type="email"
                        className={`${
                          meta.touched && meta.error
                            ? 'input-error'
                            : 'input-neutral'
                        } input input-bordered w-full`}
                        {...field}
                      />
                    </>
                  );
                }}
              </Field>
            </div>
            <div className="form-control mt-3 w-full">
              <label className="label">
                <span className="block text-gray-700 font-medium text-sm mb-1">
                  Password<span className="mr-2 text-red-600">*</span>
                  <ErrorMessage
                    name="password"
                    component={({ children }) => (
                      <span className="text-sm text-red-600">({children})</span>
                    )}
                  />
                </span>
              </label>
              <Field name="password">
                {({ field, meta }) => {
                  return (
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`${
                          meta.touched && meta.error
                            ? 'input-error'
                            : 'input-neutral'
                        } input input-bordered w-full`}
                        {...field}
                      />
                      {showPassword ? (
                        <BsEye
                          onClick={() => setShowPassword(false)}
                          className="absolute right-3 top-3 cursor-pointer text-2xl"
                        />
                      ) : (
                        <BsEyeSlash
                          onClick={() => setShowPassword(true)}
                          className="absolute right-3 top-3 cursor-pointer text-2xl"
                        />
                      )}
                    </div>
                  );
                }}
              </Field>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="btn btn-error text-white w-full disabled:bg-rose-800 disabled:text-rose-100"
                disabled={loginFormSubmitted}
              >
                {loginFormSubmitted ? 'Requesting...' : 'Login'}
                {loginFormSubmitted && <ImSpinner6 className="animate-spin" />}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
