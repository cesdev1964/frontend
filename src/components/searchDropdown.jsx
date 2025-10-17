import Select from "react-select";

export const SearchDropdown = ({
  data = [],
  handleSelectChange,
  value = null,
  placeholder = "",
  className = "",
  customComponent = {},
  style
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
        className={className}
        components={customComponent}
        // styles={style}
      />
    </>
  );
};
