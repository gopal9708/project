import React from "react";

const Title = ({ title, parent_title }) => {
  return (
    <>
      <div className="row mt-1">
        <div className="col-12">
          <div className="page-title-box d-sm-flex justify-content-between mt-1 mx-3">
            <h2 className="font-size-17">{title}</h2>
            <div className="page-title-right">
              <nav className="" aria-label="breadcrumb">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item font-size-13">
                    <span>{parent_title}</span>
                  </li>
                  <li
                    className="active breadcrumb-item font-size-13"
                    aria-current="page"
                  >
                    <span>{title}</span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
