import { ErrorMessage, Field, Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { ImSpinner6 } from 'react-icons/im';
import * as Yup from 'yup';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [signInValidityMsg, setSignInValidityMsg] = useState('');
  const [signInFormSubmitted, setSignInFormSubmitted] = useState(false);

  const handleSignIn = (values, { resetForm }) => {
    setSignInFormSubmitted(true);

    signIn('credentials', {
      ...values,
      adminLogin: false,
      signUp: false,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        setSignInFormSubmitted(false);
        setSignInValidityMsg(callback?.error);
      }
      if (callback?.ok && !callback?.error) {
        resetForm();
        setSignInValidityMsg('');
        setSignInFormSubmitted(false);
        window.authModal.close();
        toast.success('Sign In Successfully!');
      }
    });
  };

  return (
    <div className="text-black">
      <h4 className="text-lg font-semibold mb-1">Sign In</h4>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={handleSignIn}
      >
        <Form>
          <div className="mt-2">
            <label className="label">
              <span className="label-text text-sm font-medium">
                Email<span className="mr-2 text-red-600">*</span>
                <ErrorMessage
                  name="email"
                  component={({ children }) => (
                    <span className="text-sm text-red-600">({children})</span>
                  )}
                />
                {signInValidityMsg && (
                  <span className="text-sm text-red-600">
                    ({signInValidityMsg})
                  </span>
                )}
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
                      } input input-bordered w-full bg-white`}
                      {...field}
                    />
                  </>
                );
              }}
            </Field>
          </div>
          <div className="mt-2">
            <label className="label">
              <span className="label-text text-sm font-medium">
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
                      } input input-bordered w-full bg-white`}
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
          <button
            type="submit"
            className="mt-4 btn btn-sm btn-secondary w-full rounded-md text-white disabled:bg-rose-900 disabled:text-rose-100"
            disabled={signInFormSubmitted}
          >
            Sign In{' '}
            {signInFormSubmitted && <ImSpinner6 className="animate-spin" />}
          </button>
          <div className="divider">OR</div>

          <div className="mb-5">
            <button
              type="button"
              className="btn btn-sm btn-accent btn-outline font-normal text-gray-100 w-full mt-3 rounded-md"
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              <FcGoogle /> Sign In With Google
            </button>

            {/* Sign Up with apple button */}
            {/* <button
              type="button"
              className="btn btn-sm btn-primary btn-outline font-normal text-gray-100 w-full mt-3 rounded-md"
            >
              <FaApple /> Sign In With Apple
            </button> */}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
