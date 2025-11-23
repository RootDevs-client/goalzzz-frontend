import { Field } from 'formik';

export default function SocialLinksForm() {
  return (
    <div>
      <h4 className="text-lg font-semibold">Apps & Social Links</h4>
      <div className="p-2">
        <div className="form-control mt-3">
          <label className="label-text mb-1" htmlFor="facebook">
            Facebook
          </label>
          <Field
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="facebook"
          />
        </div>
        <div className="form-control mt-3">
          <label className="label-text mb-1" htmlFor="youtube">
            Youtube
          </label>
          <Field
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="youtube"
          />
        </div>
        <div className="form-control mt-3">
          <label className="label-text mb-1" htmlFor="instagram">
            Instagram
          </label>
          <Field
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="instagram"
          />
        </div>
      </div>
    </div>
  );
}
