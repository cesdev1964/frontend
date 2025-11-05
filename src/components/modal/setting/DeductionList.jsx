import React, { useState } from "react";
import { SearchDropdown } from "../../searchDropdown";
import { onlyDecimal } from "../../../util/inputFormat";

export default function DeductionList({
  listItem,
  onAddItem,
  deductionDropdown,
  deleteAll,
  onChangeSelect,
  setListItem,
  propName,
  isOpenNewDeduction,
  setIsOpenNewDeduction,
  error = {},
}) {
  const [itemData, setItemData] = useState({
    stepNumber: 0,
    deductionTypeId: null,
    amount: "",
  });

  const handleAllItem = () => {
    setIsOpenNewDeduction(false);
    setListItem([]);
  };

  const handleDeleteItem = (index) => {
    setListItem(listItem.filter((select) => select.stepNumber !== index));
  };

  const handleChangeSelectEaseItem = (index, field, selected) => {
    const updated = [...listItem];

    updated[index][field] = selected ? selected.value : null;
    setListItem(updated);
  };

  const handleOpenSection = () => {
    setIsOpenNewDeduction(true);
    setListItem([
      ...listItem,
      { stepNumber: 0, deductionTypeId: null, amount: "" },
    ]);
  };

  const handleAddItem = (e) => {
    //e.preventDefault(); เป็นคำสั่งที่ช่วยไม่ให้ r-render เวลาใช้งานปุ่ม
    e.preventDefault();

    setListItem([...listItem, itemData]);

    setListItem([
      ...listItem,
      { stepNumber: listItem.length, deductionTypeId: null, amount: "" },
    ]); //ตอนเปิด
  };

  return (
    <>
      {!isOpenNewDeduction || listItem.length === 0 ? (
        <>
          <div className="d-flex flex-column align-items-center justify-content-center mb-4">
            <button
              className="btn btn-primary mt-2"
              onClick={handleOpenSection}
            >
              <i className="bi bi-plus-circle fs-4"></i>
              เพิ่มประเภทการหักเงิน
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex flex-column align-items-center justify-content-center mb-4 w-100">
            <div className="d-flex justify-content-end w-100">
              <button
                className="btn btn-outline-primary mb-2"
                onClick={handleAllItem}
              >
                ลบทั้งหมด
              </button>
            </div>
            {/* ส่วนของ card สายอนุมัติ */}
            {listItem.length > 0 &&
              listItem.map((item, index) => (
                <div
                  className="filter-container"
                  key={item.stepNumber}
                  style={{ width: "400px" }}
                >
                  <div className="d-flex align-items-top justify-content-end mb-2">
                    <a
                      style={{ cursor: "pointer", marginTop: 0 }}
                      onClick={() => handleDeleteItem(item.stepNumber)}
                    >
                      <i
                        className="bi bi-trash-fill text-center text-danger"
                        title="ลบ"
                      ></i>
                    </a>
                  </div>
                  <div className="row">
                    <div className="col-7">
                      <label className="form-label">
                        ประเภทการหักเงิน
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <SearchDropdown
                        data={deductionDropdown}
                        handleSelectChange={(selected) =>
                          handleChangeSelectEaseItem(index, propName, selected)
                        }
                        placeholder="ประเภทการหักเงิน"
                        value={deductionDropdown.find(
                          (i) => i.value === item.deductionTypeId
                        )}
                        className={`${
                          error[`deductionType_${index}`]
                            ? "border border-danger rounded-2"
                            : ""
                        }`}
                      />
                       {error[`deductionType_${index}`] ? (
                        <p
                          className="text-danger"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {error[`deductionType_${index}`]}
                        </p>
                      ) : null}
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteItem(item.stepNumber)}
                      ></a>
                    </div>
                    <div className="col-5">
                      <label className="form-label">
                        จำนวนเงิน
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="amount"
                        className={`form-control ${
                          error[`amount_${index}`]  ? "border border-danger" : ""
                        }`}
                        // className="form-control"
                        value={item.amount ?? ""}
                        placeholder="กรอกจำนวนเงิน"
                        onChange={(e) =>
                          setListItem((prev) => {
                            const value = onlyDecimal(e.target.value);
                            if (prev.length === 0) {
                              return [{ [propName]: null, amount: value }];
                            }
                            const newList = [...prev];
                            newList[index] = {
                              ...newList[index],
                              amount: value,
                            };
                            return newList;
                          })
                        }
                      />
                      {error[`amount_${index}`] ? (
                        <p
                          className="text-danger"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {error[`amount_${index}`]}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            <button
              className="btn btn-primary mt-2"
              onClick={(e) => handleAddItem(e)}
              disabled={listItem.length === 5}
            >
              <i className="bi bi-plus-circle fs-4"></i>
              เพิ่มประเภทการหักเงินเพิ่มเติม
            </button>
          </div>
        </>
      )}
    </>
  );
}
