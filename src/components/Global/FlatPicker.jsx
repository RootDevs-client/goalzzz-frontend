import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/dark.css';
import Flatpickr from 'react-flatpickr';

function FlatPicker({
  setFieldValue,
  placeholder,
  inputField,
  enableTime,
  allowInput,
  defaultDate,
}) {
  return (
    <Flatpickr
      render={({ defaultValue, value, ...props }, ref) => (
        <input
          id={inputField}
          className="h-4"
          name={inputField}
          ref={ref}
          {...props}
          required
          placeholder={placeholder || 'YYYY-MM-DD HH:MM'}
        />
      )}
      options={{
        onChange: function (selectedDates, dateStr) {
          setFieldValue(inputField, dateStr);
        },
        enableTime: enableTime || 'true',
        disableMobile: 'true',
        allowInput: allowInput || 'false',
        defaultDate: defaultDate || '',
      }}
      className="input input-bordered w-full bg-white"
    />
  );
}

export default FlatPicker;
