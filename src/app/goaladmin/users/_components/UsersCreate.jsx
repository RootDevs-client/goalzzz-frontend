'use client';

import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { ImSpinner6 } from 'react-icons/im';
import * as Yup from 'yup';

export default function UsersCreate() {
  const { token } = useAuthStore();

  const [userImage, setUserImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    image: '',
    status: '1',
  };

  const userSchema = Yup.object().shape({
    name: Yup.string().required('Required!'),
    email: Yup.string().required('Required!'),
    password: Yup.string().required('Required!'),
    status: Yup.string().required('Required!'),
  });

  // Form Submit Handler
  const handleSubmit = async (values) => {
    setFormSubmitting(true);

    try {
      let uploadedImageUrl = null;

      if (userImage) {
        const formData = new FormData();

        formData.append('file', userImage);
        formData.append('upload_preset', 'Goalzzz');

        const { data: uploadedImage } = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        uploadedImageUrl = uploadedImage.secure_url;
      }

      const { data: userCreateRes } = await xoomBackendUrl.post(
        '/api/admin/users/create',
        {
          ...values,
          image: uploadedImageUrl ? uploadedImageUrl : values.image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (userCreateRes.status) {
        toast.success('User Created Successfully!');
        router.push('/xoomadmin/users');
      } else {
        toast.error('This email already exist!');
        setFormSubmitting(false);
      }
    } catch (error) {
      setFormSubmitting(false);
      console.error('Something went wrong!', error);
    }
  };

  return (
    <div>
      <div className="text-sm breadcrumbs p-5">
        <ul>
          <li>
            <Link href="/xoomadmin/dashboard">
              <FaHome className="text-xl" />
            </Link>
          </li>
          <li className="font-medium">
            <Link href="/xoomadmin/users" className="no-underline">
              Users
            </Link>
          </li>
          <li className="font-medium">Create</li>
        </ul>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5">Create A User</h2>

        <div className="w-full rounded-box">
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="grid grid-cols-12 gap-x-5 gap-y-3">
                  <div className="col-span-4">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Name <span className="text-red-500">*</span>{' '}
                          <ErrorMessage
                            name="name"
                            component={({ children }) => (
                              <span className="text-sm text-red-600">
                                ({children})
                              </span>
                            )}
                          />
                        </span>
                      </div>
                      <Field
                        className="input input-bordered w-full bg-white"
                        name="name"
                      />
                    </label>
                  </div>
                  <div className="col-span-4">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Email <span className="text-red-500">*</span>{' '}
                          <ErrorMessage
                            name="email"
                            component={({ children }) => (
                              <span className="text-sm text-red-600">
                                ({children})
                              </span>
                            )}
                          />
                        </span>
                      </div>
                      <Field
                        className="input input-bordered w-full bg-white"
                        name="email"
                        type="email"
                      />
                    </label>
                  </div>
                  <div className="col-span-4">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Password <span className="text-red-500">*</span>{' '}
                          <ErrorMessage
                            name="password"
                            component={({ children }) => (
                              <span className="text-sm text-red-600">
                                ({children})
                              </span>
                            )}
                          />
                        </span>
                      </div>
                      <div className="relative">
                        <Field
                          className="input input-bordered w-full bg-white"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
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
                    </label>
                  </div>

                  <div className="col-span-12">
                    <div>
                      <div className="label">
                        <span className="label-text font-medium">
                          User Image
                        </span>
                      </div>
                      <imgDropSingle
                        className="mt-3"
                        value={userImage}
                        onChange={(image) => setUserImage(image)}
                      />
                    </div>
                  </div>

                  <div className="col-span-4">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Status <span className="text-red-500">*</span>{' '}
                          <ErrorMessage
                            name="status"
                            component={({ children }) => (
                              <span className="text-sm text-red-600">
                                ({children})
                              </span>
                            )}
                          />
                        </span>
                      </div>
                      <Field
                        as="select"
                        className="select select-bordered w-full bg-white"
                        name="status"
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </Field>
                    </label>
                  </div>
                  <div className="col-span-12 text-right">
                    <button
                      type="submit"
                      className="btn btn-sm btn-success rounded-md text-white mt-4 disabled:bg-blue-800 disabled:text-blue-100"
                      disabled={formSubmitting}
                    >
                      Create user{' '}
                      {formSubmitting && (
                        <ImSpinner6 className="text-base animate-spin" />
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
