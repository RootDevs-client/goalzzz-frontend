import { ErrorMessage, Field, Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner6 } from 'react-icons/im';
import { RxCross2 } from 'react-icons/rx';
import * as Yup from 'yup';

export default function OtpModal({ showEmail, setOpenTab }) {
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [otpValidityMsg, setOtpValidityMsg] = useState('');

  // Otp Handler
  const otpSubmitHandler = async (values, { resetForm }) => {
    setOtpSubmitted(true);

    signIn('credentials', {
      otp: values.otp,
      adminLogin: false,
      signUp: true,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        setOtpValidityMsg(callback?.error);
        setOtpSubmitted(false);
        toast.error(callback?.error);
      }
      if (callback?.ok && !callback?.error) {
        setOtpValidityMsg('');
        setOpenTab('sign-in');
        resetForm();
        toast.success('Sign Up Successfully!');
        window.authModal.close();
      }
    });
  };

  return (
    <dialog className="modal" id="otpModal">
      <div className="modal-box rounded-none -skew-y-[1deg] p-0 w-full sm:w-[400px] h-fit overflow-y-hidden bg-white ">
        <form method="dialog">
          <button className="absolute cursor-pointer right-2 top-2 outline-none">
            <RxCross2 className="text-xl text-secondary" />
          </button>
        </form>

        <div className="flex gap-2 absolute top-0 right-14">
          <button
            onClick={() => setOpenTab('sign-up')}
            className={`bg-secondary text-gray-200 p-1 w-28 text-center`}
          >
            Check Otp
          </button>
        </div>
        <div className="skew-y-[1deg] mt-12 p-4">
          <Formik
            initialValues={{
              otp: '',
            }}
            validationSchema={Yup.object({
              otp: Yup.string().required('Required'),
            })}
            onSubmit={otpSubmitHandler}
          >
            <Form>
              <div className="mt-1 backdrop-blur-none">
                <p className="py-4">
                  Enter the OTP within 2 minutes, which you received at{' '}
                  <b>{showEmail}</b>
                </p>
                <label className="label">
                  <span className="label-text text-sm font-medium">
                    Otp<span className="mr-2 text-red-600">*</span>
                    <ErrorMessage
                      name="otp"
                      component={({ children }) => (
                        <span className="text-sm text-red-600">
                          ({children})
                        </span>
                      )}
                    />
                    {otpValidityMsg && (
                      <span className="text-sm text-red-600">
                        ({otpValidityMsg})
                      </span>
                    )}
                  </span>
                </label>
                <Field name="otp">
                  {({ field, meta }) => {
                    return (
                      <>
                        <input
                          type="text"
                          className={`${(meta.touched && meta.error) || otpValidityMsg
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
              <button
                type="submit"
                className="mt-4 btn btn-sm btn-secondary w-full rounded-md text-white disabled:bg-rose-900 disabled:text-rose-100"
                disabled={otpSubmitted}
              >
                Submit {otpSubmitted && <ImSpinner6 className="animate-spin" />}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </dialog>
  );
}
