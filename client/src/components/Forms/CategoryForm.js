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
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary btn">
          Add
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
