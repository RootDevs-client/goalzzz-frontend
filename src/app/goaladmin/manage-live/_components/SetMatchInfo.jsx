import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/dark.css';
import { ErrorMessage, Field } from 'formik';
import Flatpickr from 'react-flatpickr';

export default function SetMatchInfo({ values, setFieldValue }) {
  return (
    <div className="rounded-md bg-white p-4">
      <h4 className="text-lg text-gray-700 font-medium capitalize">Match information</h4>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="form-group">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Match Title <span className="text-red-500">*</span>
          </label>
          <Field
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="match_title"
          />
          <ErrorMessage
            name="match_title"
            component="div"
            className="mt-1 text-red-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Match Time <span className="text-red-500">*</span>
          </label>
          <Flatpickr
            render={({ defaultValue, value, ...props }, ref) => (
              <input
                id="date_picker"
                className="h-4"
                name="time"
                ref={ref}
                {...props}
                required
                placeholder="YYYY-MM-DD HH:MM"
              />
            )}
            options={{
              onChange: function (selectedDates, dateStr) {
                setFieldValue('time', dateStr);
              },
              enableTime: 'true',
              disableMobile: 'true',
              allowInput: 'false',
              defaultDate: values?.time || '',
            }}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400 relative"
          ></Flatpickr>
          <ErrorMessage
            name="time"
            component="div"
            className="mt-1 text-red-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Fixture ID
          </label>
          <Field
            type="text"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="fixture_id"
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="form-group">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Is Hot Match? <span className="text-red-500">*</span>
          </label>
          <Field
            as="select"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="is_hot"
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </Field>
          <ErrorMessage
            name="is_hot"
            component="div"
            className="mt-1 text-red-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <Field
            as="select"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="status"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </Field>
          <ErrorMessage
            name="status"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Sports Type <span className="text-red-500">*</span>
          </label>
          <Field
            as="select"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            name="sports_type_name"
          >
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="tennis">Tennis</option>
            <option value="baseball">Baseball</option>
            <option value="volleyball">Volleyball</option>
            <option value="golf">Golf</option>
            <option value="cricket">Cricket</option>
            <option value="rugby">Rugby</option>
            <option value="swimming">Swimming</option>
            <option value="table_tennis">Table Tennis</option>
          </Field>
          <ErrorMessage
            name="sports_type_name"
            component="div"
            className="text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
