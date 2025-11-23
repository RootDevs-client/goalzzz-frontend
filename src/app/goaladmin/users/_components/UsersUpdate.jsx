'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetSingleUser from '@/lib/hooks/admin/useGetSingleUser';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaHome } from 'react-icons/fa';
import { ImSpinner6 } from 'react-icons/im';
import { RiCloseCircleFill } from 'react-icons/ri';
import * as Yup from 'yup';

export default function UsersUpdate({ id }) {
  const { token } = useAuthStore();
  const { singleUser, singleUserLoading } = useGetSingleUser(token, id);
  const [userImage, setUserImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!singleUserLoading) {
      setInitialValues({
        name: singleUser?.name || '',
        email: singleUser?.email || '',
        image: singleUser?.image || '',
        status: singleUser?.status || '',
      });
    }

    setShowImage(!!singleUser?.image);
  }, [singleUser, singleUserLoading]);

  const userSchema = Yup.object().shape({
    name: Yup.string().required('Required!'),
    email: Yup.string().required('Required!'),
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

      const { data: userUpdateRes } = await xoomBackendUrl.put(
        `/api/admin/users/${id}`,
        {
          ...values,
          image: uploadedImageUrl ? uploadedImageUrl : values.image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (userUpdateRes.status) {
        toast.success('User Updated Successfully!');
        router.push('/goaladmin/users');
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
            <Link href="/goaladmin/dashboard">
              <FaHome className="text-xl" />
            </Link>
          </li>
          <li className="font-medium">
            <Link href="/goaladmin/users" className="no-underline">
              Users
            </Link>
          </li>
          <li className="font-medium">Create</li>
        </ul>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5">Update A User</h2>

        {singleUserLoading ? (
          <GlobalLoading />
        ) : (
          <div className="w-full rounded-box">
            <Formik
              initialValues={initialValues}
              validationSchema={userSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {() => (
                <Form>
                  <div className="grid grid-cols-12 gap-x-5 gap-y-3">
                    <div className="col-span-6">
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
                    <div className="col-span-6">
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

                    <div className="col-span-12">
                      <div>
                        <div className="label">
                          <span className="label-text font-medium">
                            User Image
                          </span>
                        </div>
                        {showImage && singleUser?.image && (
                          <div className="relative">
                            <img
                              src={singleUser.image}
                              alt="Image"
                              className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1 mt-4"
                            />
                            <RiCloseCircleFill
                              className="cursor-pointer absolute text-2xl text-red-600 -top-[10px] left-[80px]"
                              onClick={() => setShowImage(false)}
                            />
                          </div>
                        )}

                        {!showImage && (
                          <imgDropSingle
                            className="mt-3"
                            value={userImage}
                            onChange={(image) => setUserImage(image)}
                          />
                        )}
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
                        Update user{' '}
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
        )}
      </div>
    </div>
  );
}
