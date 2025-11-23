import { FaTrashAlt } from 'react-icons/fa';

export default function LogoAndIconForm({
  values,
  setFieldValue,
  setSiteIcon,
  siteIcon,
  setSiteLogo,
  siteLogo,
}) {
  return (
    <div className="w-100">
      <h4 className="text-lg font-semibold">Logo & Icon</h4>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 p-2">
        <div className="mt-4">
          <label htmlFor="email" className="mb-3 text-sm font-bold text-black">
            Site Logo
          </label>

          {values?.site_logo ? (
            <div className="flex items-center gap-3">
              <img
                src={values.site_logo}
                alt="Uploaded Image"
                className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
              />
              <button
                type="button"
                className="rounded bg-red-500 p-1"
                onClick={() => setFieldValue('site_logo', '')}
              >
                <FaTrashAlt className="hover:fill-secondary-400 h-5 w-5 fill-white transition-colors" />
              </button>
            </div>
          ) : (
            <imgDropSingle
              value={siteLogo}
              onChange={(image) => setSiteLogo(image)}
            />
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="mb-3 text-sm font-bold text-black">
            Site Icon
          </label>

          {values?.site_icon ? (
            <div className="flex items-center gap-3">
              <img
                src={values.site_icon}
                alt="Uploaded Image"
                className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
              />
              <button
                type="button"
                className="rounded bg-red-500 p-1"
                onClick={() => setFieldValue('site_icon', '')}
              >
                <FaTrashAlt className="hover:fill-secondary-400 h-5 w-5 fill-white transition-colors" />
              </button>
            </div>
          ) : (
            <imgDropSingle
              value={siteIcon}
              onChange={(image) => setSiteIcon(image)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
