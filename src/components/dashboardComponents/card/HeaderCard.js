import React from "react";
import "./HeaderCard.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ServerAddress } from "../../../constants/ServerAddress";
// import { useSelector } from "react-redux";

const HeaderCard = ({
  Headlogo,
  headColor,
  title,
  description,
  naviLink,
  filter_by_value,
}) => {
  const navigate = useNavigate();
  console.log("Color", headColor);

  // const accessToken = useSelector((state) => state.authetication.access_token);

  // const getData = () => {
  //   axios
  //     .get(
  //       ServerAddress +
  //       `/`,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((resp) => {
  //       console.log(resp)
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur in , ${err}`);
  //     });
  // };

  // useLayoutEffect(() => {
  //   getData();
  // }, [])


// Axios Using Async and Await method//------------------------
// const getData = async () => {
//   try {
//     const resp = await axios.get(ServerAddress + '/', {
//       headers: { Authorization: `Bearer ${accessToken}` }
//     });
//     console.log(resp);
//   } catch (err) {
//     alert(`Error Occur in , ${err}`);
//   }
// };

// useEffect(() => {
//   getData();
// }, []);


  return (
    <>
      <div className="Dash_card">
        <div
          className="Dash_card1"
          style={{
            background: `${headColor}`,
            boxShadow: `0px 2px 3px ${headColor}`,
            cursor: "pointer",
          }}
          // style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(naviLink, { state: { filter_by: filter_by_value } });
          }}
        >
          <div className="card-content1">{Headlogo}</div>
        </div>
        <div className="card-content">
          <span className="card-ti">{title}</span><br/>
          <span style={{margin:"10px"}} className="card-description">{description}</span>
          {/* <h2 className="card-ti">{title}</h2>
          <p 
          // className="card-description"
          >{description}</p> */}
        </div>
      </div>
    </>
  );
};

export default HeaderCard;
