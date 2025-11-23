import { ErrorMessage, Field, FieldArray } from 'formik';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

export default function SetStreamingSources({ values }) {
  return (
    <FieldArray name="streaming_sources">
      {(arrayHelpers) => (
        <div className="mt-3 rounded-md bg-white p-4 shadow">
          <h4 className="text-lg text-gray-700 font-medium capitalize">
            Streaming Sources
          </h4>
          {values.streaming_sources.map((streamSource, sourceIndex) => (
            <div
              className="mt-3 rounded border border-gray-200 p-4"
              key={sourceIndex}
            >
              <div className="mb-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-600">
                    Streaming Source: {sourceIndex + 1}
                  </p>
                  {sourceIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(sourceIndex)}
                    >
                      <AiOutlineClose className="rounded bg-gray-200 text-2xl hover:bg-red-300 hover:text-rose-600" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="mt-3">
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Stream Title <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                      name={`streaming_sources[${sourceIndex}].stream_title`}
                      id={`streaming_sources[${sourceIndex}].stream_title`}
                    />
                    <ErrorMessage
                      name={`streaming_sources[${sourceIndex}].stream_title`}
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Is Premium? <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                      name={`streaming_sources[${sourceIndex}].is_premium`}
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Field>
                  </div>

                  <div className="form-group mt-3">
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Resolution <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                      name={`streaming_sources[${sourceIndex}].resolution`}
                    >
                      <option value="" disabled>
                        Select One
                      </option>
                      <option value="1080p">1080p</option>
                      <option value="720p">720p</option>
                      <option value="480p">480p</option>
                      <option value="360p">360p</option>
                    </Field>
                    <ErrorMessage
                      name={`streaming_sources[${sourceIndex}].resolution`}
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Platform <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                      name={`streaming_sources[${sourceIndex}].platform`}
                    >
                      <option value="both">Both</option>
                      <option value="android">Android</option>
                      <option value="ios">IOS</option>
                    </Field>
                  </div>

                  <div className="form-group mt-3">
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Portrait Watermark(json)
                    </label>
                    <Field
                      as="textarea"
                      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                      name={`streaming_sources[${sourceIndex}].portrait_watermark`}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Landscape Watermark(json)
                    </label>
                    <Field
                      as="textarea"
                      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                      name={`streaming_sources[${sourceIndex}].landscape_watermark`}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                      name={`streaming_sources[${sourceIndex}].stream_status`}
                    >
                      <option value="1">Active</option>
                      <option value="0">In-Active</option>
                    </Field>
                  </div>

                  <div className="form-group mt-3">
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Stream Type <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name={`streaming_sources[${sourceIndex}].stream_type`}
                      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                    >
                      <option value="">Select One</option>
                      <option value="root_stream">Root Stream</option>
                      {/* <option value="restricted">Restricted</option> */}
                      <option value="m3u8">M3u8</option>
                      {/* <option value="web">Web</option> */}
                    </Field>
                    <ErrorMessage
                      name={`streaming_sources[${sourceIndex}].stream_type`}
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  {streamSource.stream_type !== 'root_stream' && (
                    <div className="form-group mt-3">
                      <label className="block text-gray-700 font-medium mb-2 text-sm">
                        Stream URL <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                        name={`streaming_sources[${sourceIndex}].stream_url`}
                      />
                      <ErrorMessage
                        name={`streaming_sources[${sourceIndex}].stream_url`}
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Restricted */}

              {streamSource.stream_type === 'restricted' && (
                <FieldArray name={`streaming_sources[${sourceIndex}].headers`}>
                  {(arrayHelpers) => (
                    <div className="mt-6">
                      {streamSource.headers.map((headers, headersIndex) => (
                        <div
                          key={headersIndex}
                          className="relative mt-3 rounded border border-gray-200 bg-gray-50 p-4 shadow"
                        >
                          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="w-full">
                              <div className="form-group">
                                <label className="block text-gray-700 font-medium mb-2 text-sm">
                                  Key <span className="text-red-500">*</span>
                                </label>
                                <Field
                                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                                  name={`streaming_sources[${sourceIndex}].headers[${headersIndex}].key`}
                                />
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="form-group">
                                <label className="block text-gray-700 font-medium mb-2 text-sm">
                                  Value <span className="text-red-500">*</span>
                                </label>
                                <Field
                                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                                  name={`streaming_sources[${sourceIndex}].headers[${headersIndex}].value`}
                                />
                              </div>
                            </div>
                            {/* {headersIndex > 0 && ( */}
                            <div
                              className={`${
                                headersIndex > 0
                                  ? 'absolute right-1 top-1 block'
                                  : ' hidden'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  arrayHelpers.remove(headersIndex)
                                }
                              >
                                <AiOutlineClose className="rounded bg-gray-200 text-2xl hover:bg-red-300 hover:text-rose-600" />
                              </button>
                            </div>
                            {/* )} */}
                          </div>
                        </div>
                      ))}
                      <div className="mt-3 flex flex-row-reverse">
                        <button
                          className="btn btn-primary btn-outline btn-sm rounded"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({ key: '', value: '' })
                          }
                        >
                          <AiOutlinePlus />
                          Header
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              )}

              {/* Root streams */}
              {streamSource.stream_type === 'root_stream' && (
                <FieldArray
                  name={`streaming_sources[${sourceIndex}].root_streams`}
                >
                  {(arrayHelpers) => (
                    <div className="mt-6">
                      {streamSource.root_streams?.map(
                        (root_stream, root_streamIndex) => (
                          <div
                            key={root_streamIndex}
                            className="relative mt-3 rounded border border-gray-200 bg-gray-50 p-4 shadow"
                          >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                              <div className="w-full">
                                <div className="form-group">
                                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                                    Type <span className="text-red-500">*</span>
                                  </label>
                                  <Field
                                    as="select"
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                                    name={`streaming_sources[${sourceIndex}].root_streams[${root_streamIndex}].root_stream_type`}
                                  >
                                    <option value="flussonic">Flussonic</option>
                                  </Field>
                                </div>
                              </div>
                              <div className="w-full">
                                <div className="form-group">
                                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                                    Status{' '}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <Field
                                    as="select"
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                                    name={`streaming_sources[${sourceIndex}].root_streams[${root_streamIndex}].root_stream_status`}
                                  >
                                    <option value="1">Active</option>
                                    <option value="0">In-Active</option>
                                  </Field>
                                </div>
                              </div>
                              <div className="w-full">
                                <div className="form-group">
                                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                                    Stream Url{' '}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <Field
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                                    name={`streaming_sources[${sourceIndex}].root_streams[${root_streamIndex}].root_stream_stream_url`}
                                  />
                                </div>
                              </div>
                              <div className="w-full">
                                <div className="form-group">
                                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                                    Stream Key{' '}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <Field
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                                    name={`streaming_sources[${sourceIndex}].root_streams[${root_streamIndex}].root_stream_stream_key`}
                                  />
                                </div>
                              </div>

                              <div
                                className={`${
                                  root_streamIndex > 0
                                    ? 'absolute right-2 top-2 block'
                                    : ' hidden'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.remove(root_streamIndex)
                                  }
                                >
                                  <AiOutlineClose className="rounded bg-gray-200 text-2xl hover:bg-red-300 hover:text-rose-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      <div className="mt-3 flex flex-row-reverse">
                        <button
                          className="btn btn-primary btn-outline btn-sm rounded"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              root_stream_type: 'flussonic',
                              root_stream_status: '1',
                              root_stream_stream_url: '',
                              root_stream_stream_key: '',
                            })
                          }
                        >
                          <AiOutlinePlus />
                          Add Root Streams
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              )}
            </div>
          ))}

          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary btn-outline btn-sm rounded"
              onClick={() =>
                arrayHelpers.push({
                  stream_title: `Server SD`,
                  platform: 'both',
                  is_premium: '0',
                  stream_status: '1',
                  resolution: '480p',
                  stream_type: '',
                  stream_url: '',
                  portrait_watermark:
                    '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
                  landscape_watermark:
                    '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
                  headers: [
                    { key: 'Origin', value: '' },
                    { key: 'Referer', value: '' },
                  ],
                  root_streams: [
                    {
                      root_stream_type: 'flussonic',
                      root_stream_status: '1',
                      root_stream_stream_url: '',
                      root_stream_stream_key: '',
                    },
                  ],
                })
              }
            >
              <AiOutlinePlus /> Streaming
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
}
