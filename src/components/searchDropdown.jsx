import Select from "react-select";

export const SearchDropdown = ({
  data = [],
  handleSelectChange,
  value = null,
  placeholder = "",
}) => {
  return (
    <>
      <Select
        options={data}
        value={value}
        onChange={handleSelectChange}
        // isClearable
        isSearchable
        placeholder={placeholder}
      />
    </>
  );
};
