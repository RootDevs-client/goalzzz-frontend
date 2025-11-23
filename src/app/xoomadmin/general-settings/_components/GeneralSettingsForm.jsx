import { ErrorMessage, Field } from 'formik';
import Select from 'react-select';

import { countries } from '@/lib/countrySelect/countries';
import { timeZoneData } from './timeZone';

export default function GeneralSettingsForm({
  setTimezoneOption,
  timezoneOption,
  setFieldValue,
  setLanguageOption,
  languageOption,
  setAllowedCountries,
  allowedCountries,
}) {
  const languageOptions = [{ value: 'english', label: 'English' }];

  return (
    <>
      <h4 className="text-lg font-semibold">General Settings</h4>
      <div className="mb-8 p-2">
        <div className="grid-col-1 grid gap-5 md:grid-cols-2">
          <div className="form-control mt-3">
            <label className="label-text mb-1" htmlFor="company_name">
              Company Name <span className="text-red-500">*</span>
            </label>
            <Field
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
              name="company_name"
            />
            <ErrorMessage
              name="company_name"
              component="div"
              className="mt-1 text-red-500"
            />
          </div>

          <div className="form-control mt-3">
            <label className="label-text mb-1" htmlFor="site_title">
              Site Title <span className="text-red-500">*</span>
            </label>
            <Field
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
              name="site_title"
            />
            <ErrorMessage
              name="site_title"
              component="div"
              className="mt-1 text-red-500"
            />
          </div>
        </div>

        <div className="grid-col-1 grid gap-5 md:grid-cols-2">
          <div className="form-control mt-3">
            <label className="label-text mb-1" htmlFor="timezone">
              Time Zone <span className="text-red-500">*</span>
            </label>
            <Select
              isSearchable={true}
              placeholder="Select a time zone"
              options={timeZoneData}
              onChange={(timezoneOption) => {
                setTimezoneOption(timezoneOption);
                setFieldValue('timezone', timezoneOption);
              }}
              value={timezoneOption}
            />
          </div>
          <div className="form-control mt-3">
            <label className="label-text mb-1" htmlFor="language">
              Language <span className="text-red-500">*</span>
            </label>
            <Select
              isSearchable={true}
              placeholder="Select a language"
              options={languageOptions}
              onChange={(languageOption) => {
                setLanguageOption(languageOption);
                setFieldValue('language', languageOption);
              }}
              value={languageOption}
            />
          </div>
        </div>

        <div className="grid-col-1 grid gap-5 md:grid-cols-2">
          <div className="form-group mt-3">
            <label className="label-text mb-1" htmlFor="days_news">
              Number Of Days (Fetch news before today)
            </label>
            <Field
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
              name="days_news"
              type="number"
            />
            <ErrorMessage
              name="days_news"
              component="div"
              className="mt-1 text-red-500"
            />
          </div>
          <div className="form-group mt-3">
            <label className="label-text mb-1" htmlFor="days_highlight">
              Number Of Days (Fetch highlights before today)
            </label>
            <Field
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
              name="days_highlight"
              type="number"
            />
            <ErrorMessage
              name="days_highlight"
              component="div"
              className="mt-1 text-red-500"
            />
          </div>
        </div>

        <div className="form-group mt-3">
          <label className="label-text mb-1" htmlFor="allowedCountries">
            Allowed Countries
          </label>
          <Select
            isMulti
            isSearchable={true}
            placeholder="Select allowed countries"
            options={countries}
            onChange={(selectedOptions) => {
              setAllowedCountries(selectedOptions);
              setFieldValue('allowedCountries', selectedOptions);
            }}
            value={allowedCountries}
          />
        </div>
      </div>
    </>
  );
}
