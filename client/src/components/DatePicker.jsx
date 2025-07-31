const DatePicker = ({ value, onChange, label }) => (
  <div>
    {label && <label className="block text-gray-700">{label}</label>}
    <input
      type="date"
      value={value}
      onChange={onChange}
      className="mt-1 w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
    />
  </div>
);

export default DatePicker;
