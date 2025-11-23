'use client';

import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';
import { ImSpinner6 } from 'react-icons/im';
import * as Yup from 'yup';

export default function SubscriptionCreate() {
  const [formSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();

  const { token } = useAuthStore();

  const initialValues = {
    title: '',
    duration_type: '',
    duration: '1',
    price: '',
    status: '1',
    descriptions: [''],
  };

  const subscriptionSchema = Yup.object().shape({
    title: Yup.string().required('Required!'),
    duration_type: Yup.string().required('Required!'),
    duration: Yup.string().required('Required!'),
    price: Yup.string().required('Required!'),
    status: Yup.string().required('Required!'),
    descriptions: Yup.array().min(1, 'Required!'),
  });

  // Form Submit Handler
  const handleSubmit = async (values) => {
    setFormSubmitting(true);

    try {
      const { data: subscriptionCreateRes } = await xoomBackendUrl.post(
        '/api/admin/subscriptions/create',
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (subscriptionCreateRes.status) {
        toast.success('Subscription Created Successfully!');
        router.push('/xoomadmin/subscriptions');
      }
    } catch (error) {
      setFormSubmitting(false);
      console.error('Something went wrong!');
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
            <Link href="/xoomadmin/subscriptions" className="no-underline">
              Subscription
            </Link>
          </li>
          <li className="font-medium">Create</li>
        </ul>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5">Create A Subscription</h2>

        <div className="w-full rounded-box">
          <Formik
            initialValues={initialValues}
            validationSchema={subscriptionSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue }) => (
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

                  <div className="col-span-6">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Duration Type<span className="text-red-500">*</span>{' '}
                          <ErrorMessage
                            name="duration_type"
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
                        name="duration_type"
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue('duration', 1);
                        }}
                      >
                        <option value="">Select One</option>
                        <option value="day">Daily</option>
                        <option value="week">Weekly</option>
                        <option value="month">Monthly</option>
                        <option value="year">Yearly</option>
                      </Field>
                    </label>
                  </div>

                  <div className="col-span-6">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Duration <span className="text-red-500">*</span>
                          <ErrorMessage
                            name="duration"
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
                        name="duration"
                        type="number"
                      />
                    </label>
                  </div>

                  <div className="col-span-6">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Price($) <span className="text-red-500">*</span>
                          <ErrorMessage
                            name="price"
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
                        name="price"
                        type="number"
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
                  <div className="col-span-6">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text font-medium">
                          Description <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <FieldArray name="descriptions">
                        {(arrayHelpers) => (
                          <div>
                            {values.descriptions.map((description, index) => (
                              <div
                                key={index}
                                className="flex items-center mb-3 gap-3"
                              >
                                <Field
                                  className="input input-bordered w-full bg-white"
                                  name={`descriptions[${index}]`}
                                />
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-error btn-outline btn-sm rounded"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <AiOutlineMinus />
                                  </button>
                                )}
                              </div>
                            ))}
                            <div className="mt-3">
                              <button
                                type="button"
                                className="btn btn-primary btn-outline btn-sm rounded"
                                onClick={() => arrayHelpers.push('')}
                              >
                                <AiOutlinePlus /> Add
                              </button>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </label>
                  </div>
                  <div className="col-span-12 text-right">
                    <button
                      type="submit"
                      className="btn btn-sm btn-success rounded-md text-gray-600 mt-4 disabled:bg-blue-800 disabled:text-blue-100"
                      disabled={formSubmitting}
                    >
                      Create Subscription{' '}
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
