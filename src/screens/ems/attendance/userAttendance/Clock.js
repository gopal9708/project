import React, { useState } from "react";

const Clock = () => {
  let time = new Date().toLocaleTimeString();
  const [ctime, setctime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setctime(time);
  };
  setInterval(UpdateTime, 1000);
  return (
    <>
      <h1>{ctime}</h1>
      {/* <button onClick={UpdateTime}>get time</button> */}
    </>
  );
};
export default Clock;
