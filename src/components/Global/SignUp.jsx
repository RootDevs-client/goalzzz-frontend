import { ErrorMessage, Field, Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { ImSpinner6 } from 'react-icons/im';
import * as Yup from 'yup';
import OtpModal from '../Modal/OtpModal';

export default function SignUp({ setOpenTab }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState('');
  const [signUpFormSubmitted, setSignUpFormSubmitted] = useState(false);

  const handleSignUp = async (values, { resetForm }) => {
    setSignUpFormSubmitted(true);
    setShowEmail(values.email);
    values.provider = 'email';
    // values.image =

    const data = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.error(err);
      });

    if (data.status === false) {
      toast.error(data?.message);
      setSignUpFormSubmitted(false);
    } else {
      resetForm();
      toast.success('Otp send successfully!');
      setSignUpFormSubmitted(false);
      window.otpModal.showModal();
      window.authModal.close();
    }
  };

  return (
    <div className="text-black">
      <h4 className="text-lg font-semibold mb-1">Sign Up</h4>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Required'),
        })}
        onSubmit={handleSignUp}
      >
        <Form>
          <div className="mt-1">
            <label className="label">
              <span className="label-text text-sm font-medium">
                Name<span className="mr-2 text-red-600">*</span>
                <ErrorMessage
                  name="name"
                  component={({ children }) => (
                    <span className="text-sm text-red-600">({children})</span>
                  )}
                />
              </span>
            </label>
            <Field name="name">
              {({ field, meta }) => {
                return (
                  <>
                    <input
                      type="text"
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
            disabled={signUpFormSubmitted}
          >
            Sign Up{' '}
            {signUpFormSubmitted && <ImSpinner6 className="animate-spin" />}
          </button>
          <div className="divider">OR</div>

          <div className="mb-5">
            <button
              type="button"
              className="btn btn-sm btn-accent btn-outline font-normal text-gray-100 w-full mt-3 rounded-md"
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              <FcGoogle /> Sign Up With Google
            </button>
            {/* Sign Up with apple button */}
            {/* <button
              type="button"
              className="btn btn-sm btn-primary btn-outline font-normal text-gray-100 w-full mt-3 rounded-md"
            >
              <FaApple /> Sign Up With Apple
            </button> */}
          </div>
        </Form>
      </Formik>
      <OtpModal showEmail={showEmail} setOpenTab={setOpenTab} />
    </div>
  );
}
