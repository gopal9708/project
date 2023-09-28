import React from 'react'
import { Spinner } from "reactstrap";
import "./../../assets/scss/forms/loader.scss";

function Loader() {
  return (
    <Spinner type="border" className="custom-spinner" color="white"/>
  )
}

export default Loader