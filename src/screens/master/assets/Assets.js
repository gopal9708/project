import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Nav_Btn from "../../../components/btn/NavBtn";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import AssetDataTitle from "../../../data/master/assets/AssetDataTitle";
import AssetsDataFormat from "../../../data/master/assets/AssetDataFormat";
import Navigate from "../navigateTab/Navigate";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Assets = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const cm_value = useSelector((state) => state.datalist.cm_filter);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const branchname = useSelector((state) => state.filtervalue.data_a);
  const assettype = useSelector((state) => state.filtervalue.data_b);
  const loggertype = useSelector((state) => state.filtervalue.data_c);
  const boxtype = useSelector((state) => state.filtervalue.data_d);

  // // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  // // Permissions
  // const user_permissions = useSelector(
  //   (state) => state.permissions.user_permissions
  // );

  // let is_superuser = useSelector(
  //   (state) => state.authentication.userdetails.is_superuser
  // );

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);
  const [data, setdata] = useState([])

  const get_asset = async () => {
    try {
      const response = await axios.get(
        ServerAddress +
        `master/get_latest_asset/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log("resp is====== ===>", response);
      setdata(response.data.asset)

    } catch (err) {
      alert(`Error While Loading Client , ${err}`);
    }
  };


  useEffect(() => {
    get_asset();
  }, []);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Asset" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Asset" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  //For Modal

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (data.length > 0) {
      handleShow()
    }
  }, [data])


  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px", color: "red" }}>Please Update Calibration These Are Going To Be Expired Or Already Expired...</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <table
            className="topheader table-light"
            style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
          >
            <thead
              style={{
                position: "sticky",
                top: "0",
              }}
            >
              <tr style={{ lineHeight: 2, borderWidth: 1 }}>
                <th style={{ position: "relative", textAlign: "center" }}>Asset Id</th>
                <th style={{ position: "relative", textAlign: "center" }}>Product Id</th>
                <th style={{ position: "relative", textAlign: "center" }}>callibration From</th>
                <th style={{ position: "relative", textAlign: "center" }}>Callibration To</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "12px", textAlign: "left" }}>

              {(
                data.map((asset, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        borderWidth: 1,
                      }}
                    >
                      <td>{asset.asset_id}</td>
                      <td>{asset.product_id}</td>
                      <td>{asset.callibration_from}</td>
                      <td>{asset.callibration_to}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" size="sm" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <PageTitle page="Assets" />
      <Title title="Assets " parent_title="Masters" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                onClick={() => dispatch(setPageNumber(1))}
              >
                {(can_add || user.is_superuser) && (
                  <>
                    <Nav_Btn
                      btn_name="Update Assets Callibration"
                      icon={<MdAdd size={15} />}
                      form_path="/master/assets/assetscallibration"
                    />
                    <Nav_Btn
                      btn_name="Update Assign Branch"
                      icon={<MdAdd size={15} />}
                      form_path="/master/assets/assignbranch"
                    />
                    <Nav_Btn
                      btn_name="Add Asset"
                      icon={<MdAdd size={15} />}
                      form_path="/master/add-asset"
                    />
                  </>
                )}
                {/* Filter Tool */}
                <Filter type={"assets"} />
              </div>
            </div>
            {(user.user_department_name === "ADMIN" || user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER") &&
              (
                <Navigate />
              )
            }
          </div>

          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={AssetDataTitle}
            Data_Format={AssetsDataFormat}
            path={`master/get-asset-info/?search=${search}&p=${page_num}&records=${data_len}&branch_name=${[
              branchname,
            ]}&asset_type=${assettype}&logger_type=${loggertype}&box_type=${boxtype}&data=&value=${cm_value}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default Assets;
