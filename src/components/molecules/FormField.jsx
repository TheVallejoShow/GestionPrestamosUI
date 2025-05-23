import InputLogin from "../atoms/InputLogin";

export default function FormField ({ label, id, type, value, onChange, placeholder, required }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 font-medium">{label}</label>
      <InputLogin
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}