import React , { useState,useEffect} from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const old = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          // background: "gray",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "green",
            textAlign: "center",
            alignItems: "center",
            height: "10px",
            borderRadius: "6px",
          }}
        >
          <span
            style={{
              background: "white",
              border: "1px solid green",
              color: "green",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>

        <div
          style={{
            width: "100%",
            background: "green",
            textAlign: "center",
            alignItems: "center",
            height: "10px",
            borderRadius: "6px",
          }}
        >
          <span
            style={{
              background: "white",
              border: "1px solid green",
              color: "green",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>

        <div
          style={{
            width: "100%",
            background: "green",
            textAlign: "center",
            alignItems: "center",
            height: "10px",
            borderRadius: "6px",
          }}
        >
          <span
            style={{
              background: "white",
              border: "1px solid green",
              color: "green",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>

        <div
          style={{
            width: "100%",
            background: "green",
            textAlign: "center",
            alignItems: "center",
            height: "10px",
            borderRadius: "6px",
          }}
        >
          <span
            style={{
              background: "white",
              border: "1px solid green",
              color: "green",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>

        <div
          style={{
            width: "100%",
            background: "green",
            textAlign: "center",
            alignItems: "center",
            height: "10px",
            borderRadius: "6px",
          }}
        >
          <span
            style={{
              background: "white",
              border: "1px solid green",
              color: "green",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>
        <div
          style={{
            width: "100%",
            background: "green",
            textAlign: "center",
            alignItems: "center",
            height: "10px",
            borderRadius: "6px",
          }}
        >
          <span
            style={{
              background: "white",
              border: "1px solid green",
              color: "green",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({
  customActiveTab,
}) => {

  // const [customActiveTab, setcustomActiveTab] = useState("6")
console.log("progress value", typeof customActiveTab)

const [first, setfirst] = useState("");
const [second, setsecond] = useState("");
const [thired, setthired] = useState("");
const [fourth, setfourth] = useState("");
const [fifth, setfifth] = useState("");
const [sixth, setsixth] = useState("");
  useEffect(() => {
    if(customActiveTab === "1") {
      setfirst("1");
    }
    if(customActiveTab === "2") {
      setfirst("1");
      setsecond("2");
    }
    if(customActiveTab === "3") {
      setfirst("1");
      setsecond("2");
      setthired("3");
    }
    if(customActiveTab === "4") {
      setfirst("1");
      setsecond("2");
      setthired("3");
      setfourth("4");
    }

    if(customActiveTab === "5") {
      setfirst("1");
      setsecond("2");
      setthired("3");
      setfourth("4");
      setfifth("5");
    }
    if(customActiveTab === "6") {
      setfirst("1");
      setsecond("2");
      setthired("3");
      setfourth("4");
      setfifth("5");
      setsixth("6");
    }
  }, [customActiveTab])
  

  return (
    <div>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          margin: "12px 90px 0px 90px",
          // background: "gray",
        }}
      >
        <div
          style={{
            width: "100%",
            background: second !== "" ? "green" : "gray",
            textAlign: "left",
            alignItems: "center",
            height: "7px",
            borderRadius: "",
            position: "relative",
          }}
        >
          <span
            style={{
              background: "white",
              border: first !== "" ? "1px solid green" : "1px solid gray",
              color: first !== "" ? "green" : "gray",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              position: "absolute",
              top: "-10px",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>

        <div
          style={{
            width: "100%",
            background: thired !== "" ? "green" : "gray",
            textAlign: "left",
            alignItems: "center",
            height: "7px",
            borderRadius: "",
            position: "relative",
          }}
        >
          <span
            style={{
              background: "white",
              border: second !== "" ? "1px solid green" : "1px solid gray",
              color: second !== "" ? "green" : "gray",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              position: "absolute",
              top: "-10px",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>

        <div
          style={{
            width: "100%",
            background: fourth !== "" ? "green" : "gray",
            textAlign: "left",
            alignItems: "center",
            height: "7px",
            borderRadius: "",
            position: "relative",
          }}
        >
          <span
            style={{
              background: "white",
              border: thired !== "" ? "1px solid green" : "1px solid gray",
              color: thired !== "" ? "green" : "gray",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              position: "absolute",
              top: "-10px",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>

        <div
          style={{
            width: "100%",
            background: fifth !== "" ? "green" : "gray",
            textAlign: "left",
            alignItems: "center",
            height: "7px",
            borderRadius: "",
            position: "relative",
          }}
        >
          <span
            style={{
              background: "white",
              border: fourth !== "" ? "1px solid green" : "1px solid gray",
              color: fourth !== "" ? "green" : "gray",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              position: "absolute",
              top: "-10px",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>

        <div
          style={{
            width: "100%",
            background: sixth !== "" ? "green" : "gray",
            textAlign: "left",
            alignItems: "center",
            height: "7px",
            borderRadius: "",
            position: "relative",
          }}
        >
          <span
            style={{
              background: "white",
              border: fifth !== "" ? "1px solid green" : "1px solid gray",
              color: fifth !== "" ? "green" : "gray",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              position: "absolute",
              top: "-10px",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
          {/* <span
        style={{
          background: "white",
          border:"1px solid green",
          color:"green",
          padding: "2px",
          borderRadius: "20px",
          textAlign:"center",
          alignItems:"center",
          alignContent:"center",
          position:"absolute",
          // top:"-10px"
          // width: "auto",
          left: "165px",
          top: "-10px",
        }}
      >
        <AiOutlineCheckCircle size={18}/>
      </span> */}
        </div>

        <div
          style={{
            width: "1%",
            background: sixth !== "" ? "green" : "gray",
            textAlign: "left",
            alignItems: "center",
            height: "7px",
            borderRadius: "",
            position: "relative",
          }}
        >
          <span
            style={{
              background: "white",
              border: sixth !== "" ? "1px solid green" : "1px solid gray",
              color: sixth !== "" ? "green" : "gray",
              padding: "2px",
              borderRadius: "20px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              position: "absolute",
              top: "-10px",
              // width: "auto",
            }}
          >
            <AiOutlineCheckCircle size={18} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
