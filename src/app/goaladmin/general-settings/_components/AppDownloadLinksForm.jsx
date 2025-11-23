import { Field } from 'formik';

export default function AppDownloadLinksForm() {
  return (
    <div>
      <h4 className="text-lg font-semibold">App Download Links</h4>
      <div className="p-2">
        <div className="form-control mt-3">
          <label className="label-text mb-1" htmlFor="android_download_link">
            Android
          </label>
          <Field
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="android_download_link"
          />
        </div>
        <div className="form-control mt-3">
          <label className="label-text mb-1" htmlFor="ios_download_link">
            Ios
          </label>
          <Field
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="ios_download_link"
          />
        </div>
      </div>
    </div>
  );
}
