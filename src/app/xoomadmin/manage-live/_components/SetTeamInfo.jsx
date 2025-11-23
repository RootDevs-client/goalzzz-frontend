import { ErrorMessage, Field } from 'formik';

export default function SetTeamInfo({
  values,
  teamOneImage,
  teamTwoImage,
  setTeamOneImage,
  setTeamTwoImage,
}) {
  return (
    <div className="mt-3 grid grid-cols-1 divide-x rounded-md bg-white p-2 py-4 shadow md:grid-cols-2">
      <div className="p-3">
        <h4 className="text-lg text-gray-700 font-medium capitalize">
          Team One
        </h4>
        <div className="form-group mt-3">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <Field
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="team_one_name"
          />
          <ErrorMessage
            name="team_one_name"
            component="div"
            className="mt-1 text-red-500"
          />
        </div>

        <div className="form-group mt-3">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Image Type
          </label>
          <Field
            as="select"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="team_one_image_type"
          >
            <option value="">Select One</option>
            <option value="url">Url</option>
            <option value="image">Image</option>
          </Field>
          <ErrorMessage
            name="team_one_image_type"
            component="div"
            className="mt-1 text-red-500"
          />
        </div>

        {values?.team_one_image_type === 'url' && (
          <>
            <div className={`my-3`}>
              <label className="block text-gray-700 font-medium text-sm mb-2">
                Image Url
              </label>
              <Field
                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                name="team_one_image"
              />
              <ErrorMessage
                name="team_one_image"
                component="div"
                className="text-red-500"
              />
            </div>
            {values?.team_one_image && (
              <img
                src={values.team_one_image}
                alt="Image"
                className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
              />
            )}
          </>
        )}

        {values.team_one_image_type === 'image' && (
          <div>
            <imgDropSingle
              className="mt-3"
              value={teamOneImage}
              onChange={(image) => setTeamOneImage(image)}
            />
          </div>
        )}
      </div>
      <div className="p-3">
        <h4 className="text-lg text-gray-700 font-medium capitalize">
          Team Two
        </h4>
        <div className="form-group mt-3">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <Field
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="team_two_name"
          />
          <ErrorMessage
            name="team_two_name"
            component="div"
            className="mt-1 text-red-500"
          />
        </div>

        <div className="form-group mt-3">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Image Type
          </label>
          <Field
            as="select"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="team_two_image_type"
          >
            <option value="">Select One</option>
            <option value="url">Url</option>
            <option value="image">Image</option>
          </Field>
          <ErrorMessage
            name="team_two_image_type"
            component="div"
            className="text-red-500"
          />
        </div>

        {values.team_two_image_type === 'url' && (
          <>
            <div className={`my-3`}>
              <label className="block text-gray-700 font-medium text-sm mb-2">
                Image Url
              </label>
              <Field
                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
                name="team_two_image"
              />
              <ErrorMessage
                name="team_two_image"
                component="div"
                className="text-red-500"
              />
            </div>
            {values.team_two_image && (
              <img
                src={values.team_two_image}
                alt="Image"
                className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
              />
            )}
          </>
        )}

        {values.team_two_image_type === 'image' && (
          <imgDropSingle
            className="mt-3"
            value={teamTwoImage}
            onChange={(image) => setTeamTwoImage(image)}
          />
        )}
      </div>
    </div>
  );
}
