'use client';

import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import * as Yup from 'yup';

import GlobalLoading from '@/components/Global/GlobalLoading';
import { useAuthStore } from '@/lib/auth-store';
import { uploadImageToCloudinary } from '@/lib/helpers/uploadImageToCloudinary';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ImSpinner } from 'react-icons/im';

export default function UpdateHighlight({ highlightId }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [videoList, setVideoList] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [uploadImageMsg, setUploadImageMsg] = useState('');

  const { token } = useAuthStore();

  const { push } = useRouter();
  const {
    isLoading: highlightLoading,
    data: highlight,
    refetch: highlightRefetch,
  } = useQuery(
    'admin-single-highlight',
    async () => {
      try {
        const { data } = await xoomBackendUrl.get(
          `/api/admin/highlights/${highlightId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data?.data) {
          const {
            title,
            short_description,
            status,
            thumbnail_type,
            video_type,
            youtube_url,
            fixture_id,
            videos,
            highlight_image,
          } = data.data;

          setInitialValues({
            title: title || '',
            short_description: short_description || '',
            status: status || '1',
            thumbnail_type: thumbnail_type || 'none',
            video_type: video_type || 'none',
            youtube_url: youtube_url || '',
            fixture_id: fixture_id || '',
            videos: videos || '',
            highlight_image: highlight_image || '',
          });

          setVideoList(videos);

          return data.data;
        } else {
          console.error('Invalid response format:', data);
          // Handle the error or return a default value
          return null;
        }
      } catch (error) {
        console.error('Failed to fetch highlight data:', error);
        // Handle the error or return a default value
        return null;
      }
    },
    {
      cacheTime: 0,
    }
  );

  if (highlightLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

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
      then: () => Yup.string().required('Image Url is required.'),
    }),
  });

  const handleSubmit = async (values) => {
    setIsUpdating(true);
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

      const { data } = await xoomBackendUrl.put(
        `/api/admin/highlights/${highlightId}`,
        highlightValues,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status) {
        push('/goaladmin/highlights');
        toast.success('Highlight updated successfully');
        setIsUpdating(false);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form className="space-y-4 bg-white mt-3 p-4 rounded-md">
              <div>
                <div className="form-control w-full">
                  <label
                    className="label font-medium flex items-center justify-start text-gray-700"
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
                      disabled={true}
                      readOnly={true}
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

                  {values.video_type === 'sportmonk' && (
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
                        disabled={true}
                        readOnly={true}
                      />
                    </div>
                  )}

                  {values.video_type === 'youtube' && (
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
                        disabled={
                          values.video_type === 'youtube' ? false : true
                        }
                        readOnly={
                          values.video_type === 'youtube' ? false : true
                        }
                      />
                      <ErrorMessage
                        name="youtube_url"
                        component="div"
                        className="mt-1 text-red-500"
                      />
                    </div>
                  )}

                  {values.video_type === 'sportmonk' &&
                    videoList &&
                    videoList.length > 0 && (
                      <div className="mb-5">
                        <label className="label font-medium flex items-center justify-start text-gray-700">
                          Video List
                        </label>
                        {videoList.map((highlight, index) => (
                          <p
                            key={index}
                            className="mb-2 text-sm rounded-md border border-white-light bg-[#eee] px-4 py-2.5 dark:border-[#1b2e4b] dark:hover:bg-[#eee]/10"
                          >
                            {highlight}
                          </p>
                        ))}
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
                          {/* {uploadImageMsg && (
                            <span className="text-sm text-red-600">
                              ({uploadImageMsg})
                            </span>
                          )} */}
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
                    disabled={isUpdating}
                  >
                    Update Highlight{' '}
                    {isUpdating && <ImSpinner className="ml-2 animate-spin" />}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
