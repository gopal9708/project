import React, { useState, useEffect } from 'react';
 
import { setTripTab } from '../../../store/parentFilter/ParentFilter';
import PageTitle from '../../../components/pageTitle/PageTitle';
 
const TripTab = ({setfilter_by , filter_by}) => {
   
    return (
        <>
        <PageTitle page="Trip" />
  
        <div className="mt-0 m-3 parent_tab">
          <div
            className="header_tab"
            style={{
              background: filter_by === "all" ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              setfilter_by(`all`);
            }}
          >
           All
          </div>
          <div
            className="header_tab"
            style={{
              background: filter_by === `moving` ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              setfilter_by(`moving`);
            }}
          >
            Moving
          </div>
          <div
            className="header_tab"
            style={{
              background: filter_by === "stopped" ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              setfilter_by(`stopped`);

            }}
          >
            Stopped
          </div>
          <div
            className="header_tab"
            style={{
              background: filter_by === "Idling" ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              setfilter_by(`Idling`);

            }}
          >
            Idling
          </div>
          <div
            className="header_tab"
            style={{
              background: filter_by === "Device Offline" ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              setfilter_by(`Device Offline`);

            }}
          >
             Device Offline
          </div>
          <div
            className="header_tab"
            style={{
              background: filter_by === "No Device" ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              setfilter_by(` No Device `);

            }}
            >
            No Device
          </div>
          <div
            className="header_tab"
            style={{
              background: filter_by === "Subscription Expired " ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              setfilter_by(` Subscription Expired   `);

            }}
            >
            Subscription Expired
          </div>
          <div
            className="header_tab"
            style={{
              background: filter_by === "No Subscription Attached" ? "#d6e9ff" : "#F8F8FB",
            }}
            onClick={() => {
              setfilter_by(` No Subscription Attached  `);

            }}  
            >
             No Subscription Attached
          </div>
            </div>
      </>
    )
}

export default TripTab