function Input({  type = "text",  name,  value,  onChange,  placeholder,  required = false,  readOnly = false,}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      className={`p-2 border rounded w-full ${
        readOnly ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  );
}

export default Input;
