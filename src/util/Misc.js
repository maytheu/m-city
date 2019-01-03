import React from "react";

export const validate = element => {
  let error = [true, ""];
  if (element.validation.requirred) {
    const valid = /\S+@\S+\.\S+/.test(element.value) 
    const msg = `${!valid ? "This must be a valid email" : ""}`;
    error = !valid ? [valid, msg] : error;
  }

  if (element.validation.requirred) {
    const valid = element.value.trim() !== "";
    const msg = `${!valid ? "This field is required" : ""}`;
    error = !valid ? [valid, msg] : error;
  }
  return error;
};
