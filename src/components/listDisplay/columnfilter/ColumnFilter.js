/* eslint-disable */
import "../../../assets/scss/custom/components/list_display/columnFilter.scss";
import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { MdFilterListAlt, MdClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FiSquare, FiCheckSquare } from "react-icons/fi";

const ColumnFilter = ({ column_list, selected_data, setselected_data }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [list] = useState(column_list);

  const setColumns = item => {
    let indx = selected_data.indexOf(item);
    let o_indx = list.indexOf(item);
    let temp_list = [...selected_data];

    if (indx > -1) {
      temp_list[indx] = "Removed";
    } else {
      temp_list[o_indx] = item;
    }
    setselected_data(temp_list);
  };

  return (
    <>
      <Button
        type="button"
        className="btn-rounded fluid mb-2 me-2 mt-3 btn btn-success"
        onClick={handleShow}
      >
        <MdFilterListAlt />
        Column Filter
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "300px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {" "}
            <h3>Column Filter</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ paddingTop: "0px" }}>
          {list.map((item, index) => {
            let in_list = selected_data.indexOf(item) > -1;
            return (
              
              <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div onClick={() => setColumns(item)}>
                {in_list ? (
                  <FiCheckSquare size={20} />
                ) : (
                  <FiSquare size={20} />
                )}
              </div>
                
              <div style={{ size: 20 }}>{item}</div>
              </div>
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ColumnFilter;