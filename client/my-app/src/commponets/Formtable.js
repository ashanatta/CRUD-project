import React from "react";
import "../App.css";
import { MdClose } from "react-icons/md";

const Formtable = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  // Provide default values if rest is undefined

  return (
    <div className="addcontainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleClose}>
          <MdClose />
        </div>

        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
          value={rest.name}
        />

        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={rest.email}
        />

        <label htmlFor="mobile">Mobile: </label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          onChange={handleOnChange}
          value={rest.mobile}
        />
        <label htmlFor="Age">Age: </label>
        <input
          type="text"
          id="Age"
          name="Age"
          onChange={handleOnChange}
          value={rest.Age}
        />

        <button className="btn">submit</button>
      </form>
    </div>
  );
};

export default Formtable;
