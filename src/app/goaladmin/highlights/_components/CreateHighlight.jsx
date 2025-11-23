'use client';

import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { uploadImageToCloudinary } from '@/lib/helpers/uploadImageToCloudinary';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ImSpinner } from 'react-icons/im';
import { IoIosFootball } from 'react-icons/io';
import * as Yup from 'yup';

export default function CreateHighlight({ query }) {
  const { token } = useAuthStore();
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [uploadImageMsg, setUploadImageMsg] = useState('');
  const [fixtureId, setFixtureId] = useState(query?.fixture_id ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [videoList, setVideoList] = useState(
    query?.video_list ? JSON.parse(query.video_list) : []
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();

  // Initial values
  const initialHighlightValue = {
    title: query?.title || '',
    thumbnail_type: 'none',
    video_type: query?.fixture_id ? 'sportmonk' : 'none',
    youtube_url: '',
    status: '1',
  };

  // Schema validation
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    video_type: Yup.string().oneOf(
      ['none', 'sportmonk', 'youtube'],
      'Video Type is required.'
    ),
    youtube_url: Yup.string().when('video_type', {
      is: 'youtube',
      then: () => Yup.string().required('Youtube Url is required.'),
    }),
    thumbnail_type: Yup.string().oneOf(
      ['none', 'image', 'url'],
      'Thumbnail Type is required.'
    ),
    image: Yup.mixed().when('thumbnail_type', {
      is: 'image',
      then: () => Yup.mixed().required('Thumbnail Image is required.'),
    }),
    highlight_image: Yup.string().when('thumbnail_type', {
      is: 'url',
      then: () => Yup.string().required('Thumbnail Url is required.'),
    }),
  });

  // Handle Highlight check
  const handleHighlightCheck = async (fixtureId) => {
    setIsLoading(true);
    setFixtureId(fixtureId);
    const { data } = await xoomBackendUrl.post(
      `/api/admin/fixtures/highlights`,
      {
        fixture_id: fixtureId,
      }
    );

    if (data.status) {
      if (data?.data.length === 0) {
        toast.success('No highlights available');
      } else {
        let videos = [];
        data.data.map((video) => videos.push(video.location));
        setVideoList(videos);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(data?.message);
    }
    setIsLoading(false);
  };

  // Handle submit form
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      let imageUrl = '';

      if (thumbnailImage) {
        const uploadPreset = 'Goalzzz';
        imageUrl = await uploadImageToCloudinary(thumbnailImage, uploadPreset);
      }

      const highlightValues = {
        ...values,
        highlight_image: imageUrl ? imageUrl : values.highlight_image,
        videos: videoList,
      };

      const { data } = await xoomBackendUrl.post(
        '/api/admin/highlights/create',
        highlightValues,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status) {
        push('/xoomadmin/highlights');
        toast.success('Highlight created successfully');
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-5">
      <Formik
        initialValues={initialHighlightValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className="space-y-4 bg-white mt-3 p-4 rounded-md">
            <div>
              <div className="form-control w-full">
                <label
                  className="label text-gray-700 font-medium flex items-center justify-start"
                  htmlFor="title"
                >
                  Title<span className="text-red-500">*</span>
                </label>
                <Field
                  id="title"
                  type="text"
                  className="input input-bordered w-full bg-white rounded"
                  name="title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="mt-1 text-red-500"
                />
              </div>

              <div className="form-control w-full">
                <label
                  htmlFor="short_description"
                  className="label font-medium flex items-center justify-start text-gray-700 "
                >
                  Short Description
                </label>
                <Field
                  as="textarea"
                  id="short_description"
                  rows={3}
                  className="textarea textarea-bordered bg-white rounded"
                  name="short_description"
                />
                <ErrorMessage
                  name="short_description"
                  component="div"
                  className="mt-1 text-red-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control w-full">
                  <label
                    htmlFor="type"
                    className="label font-medium flex items-center justify-start text-gray-700"
                  >
                    Video Type<span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="video_type"
                    className="input input-bordered w-full bg-white rounded"
                  >
                    <option value="none">None</option>
                    <option value="sportmonk">Sportmonk</option>
                    <option value="youtube">Youtube</option>
                  </Field>
                  <ErrorMessage
                    name="video_type"
                    component="div"
                    className="mt-1 text-red-500"
                  />
                </div>

                {values.video_type == 'sportmonk' && (
                  <div>
                    <label
                      className="label font-medium flex items-center justify-start text-gray-700"
                      htmlFor="fixture_id"
                    >
                      Fixture ID<span className="text-red-500">*</span>
                    </label>
                    <Field
                      id="fixture_id"
                      type="text"
                      className="input input-bordered w-full bg-white rounded"
                      name="fixture_id"
                      onChange={(e) => {
                        handleChange(e);
                        const fixtureId = e.target.value;
                        handleHighlightCheck(fixtureId, setFieldValue);
                      }}
                    />
                  </div>
                )}

                {values.video_type == 'youtube' && (
                  <div>
                    <label
                      className="label font-medium flex items-center justify-start text-gray-700"
                      htmlFor="youtube_url"
                    >
                      Youtube Url<span className="text-red-500">*</span>
                    </label>
                    <Field
                      id="youtube_url"
                      type="text"
                      className="input input-bordered w-full bg-white rounded"
                      name="youtube_url"
                      onChange={(e) => {
                        handleChange(e);
                        const url = e.target.value;
                        const videoId = url.split('v=')[1];
                        setFieldValue('thumbnail_type', 'url');
                        setFieldValue(
                          'highlight_image',
                          `https://img.youtube.com/vi/${videoId}/0.jpg`
                        );
                      }}
                    />
                    <ErrorMessage
                      name="youtube_url"
                      component="div"
                      className="mt-1 text-red-500"
                    />
                  </div>
                )}

                {values.video_type == 'sportmonk' && (
                  <div className="mb-5">
                    <label className="label font-medium flex items-center justify-start text-gray-700">
                      Video List
                    </label>
                    {!isLoading ? (
                      <div className="flex flex-col dark:border-[#1b2e4b]">
                        {fixtureId ? (
                          videoList?.length > 0 ? (
                            videoList.map((highlight, index) => (
                              <p
                                key={index}
                                className="mb-2 rounded-md border border-white-light bg-[#eee] px-4 py-2.5 dark:border-[#1b2e4b] dark:hover:bg-[#eee]/10"
                              >
                                {highlight}
                              </p>
                            ))
                          ) : (
                            <p className="mb-2 rounded-md border border-white-light bg-[#eee] px-4 py-2.5 dark:border-[#1b2e4b] dark:hover:bg-[#eee]/10">
                              No Highlights Available!
                            </p>
                          )
                        ) : (
                          <p className="mb-2 rounded-md border border-white-light bg-[#eee] px-4 py-2.5 dark:border-[#1b2e4b] dark:hover:bg-[#eee]/10">
                            Enter Fixture ID!
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="animate-bounce">
                        <IoIosFootball className="animate-spin text-3xl text-green-400" />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="w-100">
                <div>
                  <label
                    className="label font-medium flex items-center justify-start text-gray-700"
                    htmlFor="type"
                  >
                    Thumbnail Image Type
                  </label>
                  <div>
                    <Field
                      as="select"
                      className="input input-bordered w-full bg-white rounded"
                      name="thumbnail_type"
                    >
                      <option value="none">None</option>
                      <option value="url">Url</option>
                      <option value="image">Image</option>
                    </Field>
                    <ErrorMessage
                      name="thumbnail_type"
                      component="div"
                      className="mt-1 text-red-500"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-12">
                <label className="form-control w-full">
                  {values?.thumbnail_type === 'url' && (
                    <>
                      <div className="label">
                        <span className="label-text font-medium">
                          Image Url <span className="text-red-500">*</span>{' '}
                          <ErrorMessage
                            name="highlight_image"
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
                        name="highlight_image"
                      />
                      {values?.highlight_image &&
                        /^(ftp|https):\/\/[^ "]+$/.test(
                          values?.highlight_image
                        ) && (
                          <img
                            src={values.highlight_image}
                            alt="Image"
                            className="aspect-video w-52 object-cover rounded-md mt-3"
                          />
                        )}
                    </>
                  )}
                </label>
                {values.thumbnail_type === 'image' && (
                  <div>
                    <div className="label">
                      <span className="label-text font-medium">
                        Upload Image <span className="text-red-500">*</span>{' '}
                        {uploadImageMsg && (
                          <span className="text-sm text-red-600">
                            ({uploadImageMsg})
                          </span>
                        )}
                      </span>
                    </div>
                    <imgDropSingle
                      className="mt-3"
                      value={thumbnailImage}
                      onChange={(image) => {
                        setUploadImageMsg('');
                        setThumbnailImage(image);
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label
                  className="label font-medium flex items-center justify-start text-gray-700"
                  htmlFor="type"
                >
                  Status
                </label>
                <div>
                  <Field
                    as="select"
                    name="status"
                    className="input input-bordered w-full bg-white rounded"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </Field>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="btn btn-success rounded-md btn-sm mt-3 text-gray-700"
                  disabled={isSubmitting}
                >
                  Create Highlight{' '}
                  {isSubmitting && <ImSpinner className="ml-2 animate-spin" />}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
