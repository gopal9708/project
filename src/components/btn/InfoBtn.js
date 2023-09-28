import React from "react";
import PropTypes from "prop-types";

const Info_Btn = ({ btn_name, btn_type }) => {
  return (
    <button type={btn_type} className="btn btn-info">
      {btn_name}
    </button>
  );
};

export default Info_Btn;

Info_Btn.propTypes = {
  btn_name: PropTypes.string,
  btn_type: PropTypes.string,
};
