import React from "react";
import "../../styles/farmer/style.css"
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="ENTER NEW CATEGORY"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary btn">
          ADD
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
