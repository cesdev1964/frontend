export default function InputTextField({
  label = "",
  name ="",
  onChange,
  error = "",
  value = "",
  isRequire = false,
  placeholder ="",
}) {
  return (
    <>
      <label className="form-label">
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        name={name}
        type="text"
        className={`form-control ${error ? "border border-danger" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && isRequire ? <p className="text-danger">{error}</p> : null}
    </>
  );
}
