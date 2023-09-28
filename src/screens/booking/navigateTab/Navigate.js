import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { setNumber } from '../../../store/Components/Data_List/action';
// import { setDataLength, setPageNumber } from '../../../store/Components/Pagination/action';
// import { setManifestTab } from '../../../store/parentFilter/ParentFilter';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { setCmFilter } from '../../../store/dataList/DataList';

const Navigate = () => {
  const dispatch = useDispatch();
  // const number = useSelector(state => state.data_list.number);
  // const [order_active_btn, setorder_active_btn] = useState(1);
  // user.is_superuser
  const user = useSelector(state => state.authentication.userdetails)
  const [menu, setMenu] = useState(false);
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);

  useEffect(() => {
    dispatch(setCmFilter(""))
  }, [])

  return (
    <div className="mt-0 parent_tab" >

      {/* Approved */}
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <span className="header_tab">
            {"Approved"}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-start">
          <DropdownItem>
            <i className="fa fa-clock font-size-16 align-middle me-1" />
            <span onClick={() => dispatch(setCmFilter("A 24Hr"))}> {"Last 24 Hr"}</span>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-clock font-size-16 align-middle me-1" />
            <span onClick={() => dispatch(setCmFilter("A >24 <48Hr"))}> {">24 <48 Hr"}</span>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-clock font-size-16 align-middle me-1" />
            <span onClick={() => dispatch(setCmFilter("A >48Hr"))}> {">48 Hr"}</span>
          </DropdownItem>
          <div className="dropdown-divider" />

        </DropdownMenu>
      </Dropdown>

      {/* Pending */}
      <Dropdown
        isOpen={menu1}
        toggle={() => setMenu1(!menu1)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <span className="header_tab">
            {"Pending"}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-start">
          <DropdownItem>
            <i className="fa fa-clock font-size-16 align-middle me-1" />
            <span onClick={() => dispatch(setCmFilter("P 24Hr"))}> {"Last 24 Hr"}</span>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-clock font-size-16 align-middle me-1" />
            <span onClick={() => dispatch(setCmFilter("P >24 <48Hr"))}> {">24 <48 Hr"}</span>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-clock font-size-16 align-middle me-1" />
            <span onClick={() => dispatch(setCmFilter("P >48Hr"))}> {">48 Hr"}</span>
          </DropdownItem>
          <div className="dropdown-divider" />

        </DropdownMenu>
      </Dropdown>

      {/* Rejected */}
      {(user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE") &&
        <Dropdown
          isOpen={menu2}
          toggle={() => setMenu2(!menu2)}
          className="d-inline-block"
        >
          <DropdownToggle
            className="btn header-item "
            id="page-header-user-dropdown"
            tag="button"
          >
            <span className="header_tab">
              {"Rejected"}
            </span>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-start">
            <DropdownItem>
              <i className="fa fa-clock font-size-16 align-middle me-1" />
              <span onClick={() => dispatch(setCmFilter("R 24Hr"))}> {"Last 24 Hr"}</span>
            </DropdownItem>
            <DropdownItem >
              <i className="fa fa-clock font-size-16 align-middle me-1" />
              <span onClick={() => dispatch(setCmFilter("R >24 <48Hr"))}> {">24 <48 Hr"}</span>
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-clock font-size-16 align-middle me-1" />
              <span onClick={() => dispatch(setCmFilter("R >48Hr"))}> {">48 Hr"}</span>
            </DropdownItem>
            <div className="dropdown-divider" />

          </DropdownMenu>
        </Dropdown>
      }
    </div>

  )
}

export default Navigate