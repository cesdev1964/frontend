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

  const styles={
    valueContainer: base => ({
    ...base,
    "flex-wrap": "nowrap", 
    "white-space": "nowrap",
     overflow: "hidden",
    'text-overflow': 'ellipsis'
    
  }),
  }
  return (
    <div>
      <Select
        options={data}
        value={value}
        onChange={handleSelectChange}
        // isClearable
        isSearchable
        placeholder={placeholder}
        className={className}
        components={customComponent}
        // styles={styles}
      />
    </div>
  );
};
