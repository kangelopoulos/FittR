import React from "react";

/**
 * Allows for error message insertions into the GUI
 */
const Message = ({ message }) => {
  return <p className={`error-msg`}>{message}</p>;
};

export default Message;
