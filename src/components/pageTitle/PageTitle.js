import React from "react";
import { Helmet } from "react-helmet";
import * as company_details from "../../constants/CompanyDetails";

const PageTitle = ({ page }) => {
  return (
    <Helmet>
      <title>
        {" "}
        {page} | {company_details.WebApp_Name}{" "}
      </title>
    </Helmet>
  );
};

export default PageTitle;
