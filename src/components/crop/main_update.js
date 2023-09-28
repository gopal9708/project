import React, { useState, useLayoutEffect } from "react";
import "./main.scss";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";
import { CgMergeVertical, CgMergeHorizontal } from "react-icons/cg";
import { IoMdUndo, IoMdRedo, IoIosImage } from "react-icons/io";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import storeData from "./linkedlist";
import Modal from "react-bootstrap/Modal";
const main_update = ({
  modal,
  modal_set,
  upload_image,
  result_image,
  img_data,
  heading,
}) => {
  const filterElement = [
    {
      name: "brightness",
      maxValue: 200,
    },
    {
      name: "grayscale",
      maxValue: 200,
    },
    {
      name: "contrast",
      maxValue: 200,
    },
    {
      name: "hueRotate",
      maxValue: 200,
    },
  ];
  const [crop, setCrop] = useState();
  const [details, setdetails] = useState("");
  const handleCloseM = () => modal_set(false);

  const imageCrop = () => {
    const canvas = window.document.createElement("canvas");
    const scaleX = details.naturalWidth / details.width;
    const scaleY = details.naturalHeight / details.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      details,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Url = canvas.toDataURL("image/jpg");
    setState({
      ...state,
      image: base64Url,
    });
  };

  const [property, setProperty] = useState(
    {
      name: "brightness",
      maxValue: 200,
    },
    {
      name: "hueRotate",
      maxValue: 200,
    },
    {
      name: "contrast",
      maxValue: 200,
    },
    {
      name: "saturate",
      maxValue: 200,
    },
    {
      name: "sepia",
      maxValue: 200,
    },
    {
      name: "grayscale",
      maxValue: 200,
    },
    {
      name: "brightness",
      maxValue: 200,
    }
  );
  const [state, setState] = useState({
    image: img_data,
    brightness: 100,
    grayscale: 0,
    sepia: 0,
    saturate: 100,
    contrast: 100,
    hueRotate: 0,
    rotate: 0,
    vertical: 1,
    horizontal: 1,
  });

  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setState({
          ...state,
          image: reader.result,
        });
        const stateData = {
          image: reader.result,
          brightness: 100,
          grayscale: 0,
          sepia: 0,
          saturate: 100,
          contrast: 100,
          hueRotate: 0,
          rotate: 0,
          vertical: 1,
          horizontal: 1,
        };
        storeData.insert(stateData);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const leftRotate = () => {
    setState({
      ...state,
      rotate: state.rotate - 90,
    });
    const stateData = state;
    stateData.rotate = state.rotate - 90;
    storeData.insert(stateData);
  };
  const rightRotate = () => {
    setState({
      ...state,
      rotate: state.rotate + 90,
    });
    const stateData = state;
    stateData.rotate = state.rotate + 90;
    storeData.insert(stateData);
  };
  const verticalFlip = () => {
    setState({
      ...state,
      vertical: state.vertical === 1 ? -1 : 1,
    });
    const stateData = state;
    stateData.vertical = state.vertical === 1 ? -1 : 1;
    storeData.insert(stateData);
  };
  const horizonatalFlip = () => {
    setState({
      ...state,
      horizontal: state.horizontal === 1 ? 1 : -1,
    });
    const stateData = state;
    stateData.horizontal = state.horizontal === 1 ? 1 : -1;
    storeData.insert(stateData);
  };
  const redo = () => {
    const data = storeData.redoEdit();
    if (data) {
      setState(data);
    }
  };
  const undo = () => {
    const data = storeData.undoEdit();
    if (data) {
      setState(data);
    }
  };

  const downloadImage = () => {
    const canvas = window.document.createElement("canvas");
    canvas.width = details.naturalHeight;
    canvas.height = details.naturalHeight;
    const ctx = canvas.getContext("2d");

    ctx.filter = `brightness(${state.brightness}%) grayscale(${state.grayscale}%) contrast(${state.contrast}%) hue-rotate(${state.hueRotate}deg)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((state.rotate * Math.PI) / 180);
    ctx.scale(state.vertical, state.horizontal);

    ctx.drawImage(
      details,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    const link = document.createElement("a");
    link.download = "Edit_image.jpg";
    link.href = canvas.toDataURL();
    link.click();
  };

  const saveImage = () => {
    console.log("runnning PArt 1");
    const canvas = window.document.createElement("canvas");
    // details.crossOrigin = 'anonymous';
    console.log("runnning PArt 2");
    canvas.width = details.naturalHeight;
    canvas.height = details.naturalHeight;
    const ctx = canvas.getContext("2d");
    console.log("runnning PArt 3");
    ctx.filter = `brightness(${state.brightness}%) grayscale(${state.grayscale}%) contrast(${state.contrast}%) hue-rotate(${state.hueRotate}deg)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((state.rotate * Math.PI) / 180);
    ctx.scale(state.vertical, state.horizontal);

    ctx.drawImage(
      details,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    const base64Image1 = canvas.toDataURL();
    let base64Image2 = window.open(base64Image1);
    result_image(base64Image2);
    canvas.toBlob((blob) => {
      const myBlob = blob;
      myBlob.name = "image.jpeg";
      myBlob.lastModified = new Date();
      const myFile = new File([myBlob], "image.png", {
        type: myBlob.type,
      });
      upload_image(myFile);
    });

    // setblob_image(myFile);
    // const link =document.createElement('a')
    // link.download = 'Edit_image.jpg'
    // link.href =canvas.toDataURL()
    // link.click()
  };

  return (
    <>
      <Modal contentClassName="content-test" show={modal} onHide={handleCloseM}>
        <Modal.Header closeButton>
          {/* <!-- <Modal.Title>Update Your Image:</Modal.Title> --> */}
        </Modal.Header>
        <Modal.Body>
          <div className="image_editor">
            <div className="card">
              <div className="card_header">
                <h3>----UPDATE {heading} IMAGE----</h3>
              </div>
              <div className="card_body">
                <div className="sidebar">
                  <div className="side_body">
                    <div className="filter_section">
                      <span>Filters</span>
                      <div className="filter_key">
                        {filterElement.map((item, index) => {
                          return (
                            <button
                              className={
                                property.name === item.name ? "active" : ""
                              }
                              onClick={() => setProperty(item)}
                              key={index}
                            >
                              {item.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="filter_slider">
                      <div className="label_bar">
                        <label htmlFor="range">{property.name}</label>
                        <span>100%</span>
                      </div>
                      <input
                        name={property.name}
                        onChange={inputHandle}
                        value={state[property.name]}
                        max={property.maxValue}
                        type="range"
                      />
                    </div>
                    <div className="rotate_section">
                      <label htmlFor="">Rotate & Flip</label>
                      <div className="icon">
                        <div onClick={leftRotate}>
                          <RotateLeftOutlinedIcon />
                        </div>
                        <div onClick={rightRotate}>
                          <RotateRightOutlinedIcon />
                        </div>
                        <div onClick={verticalFlip}>
                          <CgMergeVertical />
                        </div>
                        <div onClick={horizonatalFlip}>
                          <CgMergeHorizontal />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="reset">
                    {/* <button className="save" onClick={()=>{
                    downloadImage();
                  }}>Download Image</button> */}
                    <button
                      onClick={() => {
                        saveImage();
                        modal_set(false);
                      }}
                      className="save"
                    >
                      Save Image
                    </button>
                  </div>
                </div>
                <div className="image_section">
                  <div className="image">
                    {state.image ? (
                      <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                        <img
                          onLoad={(e) => setdetails(e.currentTarget)}
                          style={{
                            filter: `brightness(${state.brightness}%) grayscale(${state.grayscale}%) contrast(${state.contrast}%) hue-rotate(${state.hueRotate}deg)`,
                            transform: `rotate(${state.rotate}deg) scale(${state.vertical}) scale(${state.horizontal})`,
                          }}
                          src={state.image}
                          alt=""
                        />
                      </ReactCrop>
                    ) : (
                      <label htmlFor="choose">
                        <IoIosImage />
                        <span>Choose Image</span>
                      </label>
                    )}
                  </div>
                  <div className="image_select">
                    <button onClick={undo} className="undo">
                      <IoMdUndo />
                    </button>
                    <button onClick={redo} className="redo">
                      <IoMdRedo />
                    </button>
                    {crop && (
                      <button onClick={imageCrop} className="crop">
                        Crop Image
                      </button>
                    )}

                    <label htmlFor="choose">Choose Image</label>
                    <input onChange={imageHandle} type="file" id="choose" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default main_update;
