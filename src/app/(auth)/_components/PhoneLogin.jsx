'use client';

import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import * as Yup from 'yup';
import AppInfo from './AppInfo';

export default function PhoneLogin({ phone = '', countries = [] }) {
  const { push } = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || {}); // Fix: Ensure selectedCountry is never undefined
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (phone) {
      const matchedCountry = countries.find((c) =>
        phone.startsWith(c.dialCode)
      );
      if (matchedCountry) {
        setSelectedCountry(matchedCountry);
        setPhoneNumber(phone.replace(matchedCountry.dialCode, ''));
      }
    }
    setIsCheckingPhone(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  const handleLogin = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const fullPhoneNumber = `${selectedCountry?.dialCode || ''}${
        values?.phone || phoneNumber
      }`;
      const { data } = await xoomBackendUrl.post('/api/user/auth', {
        phone: fullPhoneNumber,
      });

      if (data.status) {
        setIsLoading(false);
        setAuth(data?.data?.accessToken, data?.data?.user);
        resetForm();
        push('/home');
      } else {
        setIsLoading(false);
        toast.error('Invalid Credentials');
      }
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.status === 402) {
        toast.error('Subscription Expired or Cancelled, Please register again');
      } else {
        toast.error('Invalid Credentials');
      }
      console.error(error);
    }
  };

  if (isCheckingPhone) {
    return (
      <div
        className="flex items-center min-h-[600px] justify-center"
        aria-label="Loading..."
        role="status"
      >
        <svg
          className="h-12 w-12 animate-spin stroke-gray-500"
          viewBox="0 0 256 256"
        >
          <line
            x1={128}
            y1={32}
            x2={128}
            y2={64}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1="195.9"
            y1="60.1"
            x2="173.3"
            y2="82.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1={224}
            y1={128}
            x2={192}
            y2={128}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          ></line>
          <line
            x1="195.9"
            y1="195.9"
            x2="173.3"
            y2="173.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1={128}
            y1={224}
            x2={128}
            y2={192}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          ></line>
          <line
            x1="60.1"
            y1="195.9"
            x2="82.7"
            y2="173.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1={32}
            y1={128}
            x2={64}
            y2={128}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1="60.1"
            y1="60.1"
            x2="82.7"
            y2="82.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          ></line>
        </svg>
      </div>
    );
  }

  return (
    <div className="mt-10 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 rounded-lg border border-gray-300 shadow-lg overflow-hidden">
      <div className="flex flex-col items-center justify-center bg-primary text-white p-6 lg:p-10">
        <AppInfo />
        {/* <p className="text-gray-300 text-sm mt-3">Don’t have an account?</p>
        <Link
          href={'/register'}
          className="mt-2 bg-white text-primary font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          Register
        </Link> */}
      </div>
      <div className="p-6 lg:p-10 bg-white">
        <h4 className="text-2xl font-semibold text-gray-800">Login</h4>
        <Formik
          initialValues={{ phone: phoneNumber }}
          enableReinitialize
          validationSchema={Yup.object({
            phone: Yup.string()
              .required('Phone number is required')
              .matches(/^\d+$/, 'Phone number must be numeric'),
          })}
          onSubmit={handleLogin}
        >
          {({ setFieldValue }) => (
            <Form className="mt-4 relative overflow-visible">
              <label className="block text-gray-700 font-medium">
                Select Country
              </label>
              <Select
                menuShouldScrollIntoView={false}
                options={countries}
                getOptionLabel={(e) => `${e?.flag || ''} ${e?.label || ''}`}
                getOptionValue={(e) => e?.value || ''}
                onChange={(selectedOption) =>
                  setSelectedCountry(selectedOption || {})
                }
                value={selectedCountry || {}}
                className="mt-1"
                isSearchable
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />

              <label className="block mt-4 text-gray-700 font-medium">
                Phone Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-md p-2 mt-1 focus-within:ring-2 focus-within:ring-primary">
                <span className="text-gray-500 mr-2">
                  {selectedCountry?.dialCode || ''}
                </span>
                <Field
                  name="phone"
                  className="w-full outline-none"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  type="tel"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setFieldValue('phone', e.target.value);
                  }}
                />
              </div>
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-600 text-sm mt-1"
              />

              <button
                type="submit"
                className="mt-6 w-full bg-primary text-white font-semibold py-2 rounded-md shadow hover:bg-opacity-90 transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Logging In...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
