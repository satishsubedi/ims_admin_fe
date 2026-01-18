import React from "react";
import { useState } from "react";

const handleOnChange = (e, setForm, form) => {
  const { name, value } = e.target;
  return setForm({ ...form, [name]: value });
};

const UseForm = () => {
  const initialState = {};
  const [form, setForm] = useState(initialState);

  return {
    handleOnChange: (e) => handleOnChange(e, setForm, form),
    form,
    setForm,
  };
};

export default UseForm;
