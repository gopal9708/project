import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBtn = ({ btn_name, form_path, icon }) => {
  const navigate = useNavigate();
  const handleAction = () => {
    navigate(form_path);
  };
  return (
    <Button
      style={{ padding: "5.8px" }}
      type="button"
      className="btn-rounded mb-2 me-2 mt-3 btn btn-success"
      onClick={handleAction}
    >
      {icon} {btn_name}
    </Button>
  );
};

export default NavBtn;
