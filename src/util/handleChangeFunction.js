export const handleChangeInput = (e, setState) => {
  const { name, value } = e.target;
  setState((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleSelectChange = (name, selected, setState) => {
  setState((prevData) => ({
    ...prevData,
    [name]: selected ? selected.value : null,
  }));
};

export const handleChangeCheckbox = (e, setState, isTrue, isFalse) => {
  setState((prev) => ({
    ...prev,
    isactive: e.target.checked ? isTrue : isFalse,
  }));
};
