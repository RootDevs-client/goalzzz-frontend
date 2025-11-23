'use client';

import FlatPicker from '@/components/Global/FlatPicker';
import SunEditor from '@/components/Global/SunEditor';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { uploadImageToCloudinary } from '@/lib/helpers/uploadImageToCloudinary';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaHome } from 'react-icons/fa';
import { ImSpinner6 } from 'react-icons/im';
import * as Yup from 'yup';

export default function NewsCreate() {
  const { token } = useAuthStore();
  const [newsImage, setNewsImage] = useState(null);
  const [newsFormSubmitting, setNewsFormSubmitting] = useState(false);
  const [uploadNewsImageMsg, setUploadNewsImageMsg] = useState('');
  const router = useRouter();

  const initialValues = {
    title: '',
    description: '',
    news_image_type: 'url',
    news_image: '',
    publish_date: '',
    status: '1',
  };

  const newsSchema = Yup.object().shape({
    title: Yup.string().required('Required!'),
    description: Yup.string().required('Required!'),
    news_image_type: Yup.string().required('Required!'),
    news_image: Yup.string().when('news_image_type', {
      is: 'url',
      then: () =>
        Yup.string().url('Provide a valid image url!').required('Required!'),
      // otherwise: () => Yup.string()
    }),
    publish_date: Yup.string().required('Required!'),
    status: Yup.string().required('Required!'),
  });

  // Form Submit Handler
  const handleSubmit = async (values) => {
    setNewsFormSubmitting(true);

    if (values.news_image_type === 'image' && newsImage === null) {
      setUploadNewsImageMsg('Image is Required!');
      setNewsFormSubmitting(false);
    } else {
      try {
        setUploadNewsImageMsg('');
        let uploadedImageUrl = null;

        if (newsImage) {
          const uploadPreset = 'Goalzzz';
          uploadedImageUrl = await uploadImageToCloudinary(
            newsImage,
            uploadPreset
          );
        }

        const { data: newsCreateRes } = await xoomBackendUrl.post(
          '/api/admin/news/create',
          {
            ...values,
            news_image: newsImage ? uploadedImageUrl : values.news_image,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (newsCreateRes.status) {
          toast.success('News Created Successfully!');
          router.push('/xoomadmin/news');
        }
      } catch (error) {
        setNewsFormSubmitting(false);
        console.error('Something went wrong!', error);
      }
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
            <Link href="/xoomadmin/news" className="no-underline">
              News
            </Link>
          </li>
          <li className="font-medium text-gray-700">Create</li>
        </ul>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5">Create A News</h2>

        <div className="w-full rounded-box">
          <Formik
            initialValues={initialValues}
            validationSchema={newsSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-12 gap-x-5 gap-y-3">
                  <div className="col-span-12">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Title <span className="text-red-500">*</span>{' '}
                          <ErrorMessage
                            name="title"
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
                        name="title"
                      />
                    </label>
                  </div>

                  <div className="col-span-12">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Description <span className="text-red-500">*</span>{' '}
                          <ErrorMessage
                            name="description"
                            component={({ children }) => (
                              <span className="text-sm text-red-600">
                                ({children})
                              </span>
                            )}
                          />
                        </span>
                      </div>

                      <SunEditor
                        height={200}
                        setFieldValue={setFieldValue}
                        inputFiled="description"
                      />
                    </label>
                  </div>

                  <div className="col-span-6">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          News Image Type{' '}
                          <span className="text-red-500">*</span>{' '}
                          <ErrorMessage
                            name="news_image_type"
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
                        name="news_image_type"
                      >
                        <option value="">Select One</option>
                        <option value="url">Url</option>
                        <option value="image">Image</option>
                      </Field>
                    </label>
                  </div>

                  <div className="col-span-12">
                    <label className="form-control w-full">
                      {values?.news_image_type === 'url' && (
                        <>
                          <div className="label">
                            <span className="label-text font-medium">
                              Image Url <span className="text-red-500">*</span>{' '}
                              <ErrorMessage
                                name="news_image"
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
                            name="news_image"
                          />
                          {values?.news_image &&
                            /^(ftp|https):\/\/[^ "]+$/.test(
                              values?.news_image
                            ) && (
                              <img
                                src={values.news_image}
                                alt="Image"
                                className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1 mt-4"
                              />
                            )}
                        </>
                      )}
                    </label>
                    {values.news_image_type === 'image' && (
                      <div>
                        <div className="label">
                          <span className="label-text font-medium">
                            Upload Image <span className="text-red-500">*</span>{' '}
                            {uploadNewsImageMsg && (
                              <span className="text-sm text-red-600">
                                ({uploadNewsImageMsg})
                              </span>
                            )}
                          </span>
                        </div>
                        <imgDropSingle
                          className="mt-3"
                          value={newsImage}
                          onChange={(image) => {
                            setUploadNewsImageMsg('');
                            setNewsImage(image);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-span-6">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Publish Date <span className="text-red-500">*</span>
                          <ErrorMessage
                            name="publish_date"
                            component={({ children }) => (
                              <span className="text-sm text-red-600">
                                ({children})
                              </span>
                            )}
                          />
                        </span>
                      </div>
                      <FlatPicker
                        setFieldValue={setFieldValue}
                        values={values}
                        inputField="publish_date"
                      />
                    </label>
                  </div>
                  <div className="col-span-6">
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
                      className="btn btn-sm btn-success rounded-md text-fray-600 mt-4 disabled:bg-blue-800 disabled:text-blue-100"
                      disabled={newsFormSubmitting}
                    >
                      Create News{' '}
                      {newsFormSubmitting && (
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
