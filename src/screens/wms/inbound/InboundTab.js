import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInBoundTab } from '../../../store/parentFilter/ParentFilter';
const InboundTab = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inbound_tab = useSelector((state) => state.parentfilter.OutBoundTab);
    return (
        <>
        <div className="mt-0 m-3 parent_tab">
          <div
            className="header_tab"
            style={{
              background: inbound_tab === 1 ? "#D6E8FF" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInBoundTab(1));
             navigate("/Inbound");
            }}
          >
            ASN
          </div>
          <div
            className="header_tab"
            style={{
              background: inbound_tab === 2 ? "#D6E8FF" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInBoundTab(2));
               navigate("/wms/Inbound/Predelivery/PreDelivery");
            }}
          >
            PRE DELIVERY
          </div>
          <div
            className="header_tab"
            style={{
              background: inbound_tab === 3 ? "#D6E8FF" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInBoundTab(3));
                navigate("/wms/Inbound/preload/PreLoad");
            }}
          >
            PRE LOAD
          </div>
          <div
            className="header_tab"
            style={{
              background: inbound_tab === 4 ? "#D6E8FF" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInBoundTab(4));
                navigate("/wms/Inbound/sorting/Sorting");
            }}
          >
            SORTING
          </div>
          <div
            className="header_tab"
            style={{
              background: inbound_tab === 4 ? "#D6E8FF" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInBoundTab(4));
                navigate("/wms/Inbound/sorted/Sorted");
            }}
          >
            SORTED
          </div>
          <div
            className="header_tab"
            style={{
              background: inbound_tab === 5 ? "#D6E8FF" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInBoundTab(5));
                navigate("/wms/Inbound/shortage/Shortage");
            }}
          >
            SHORTAGE
          </div>
          <div
            className="header_tab"
            style={{
              background: inbound_tab === 6 ? "#D6E8FF" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInBoundTab(6));
                navigate("/wms/Inbound/moreqty/MoreQty");
            }}
            >
            MORE QTY
          </div>
          <div
            className="header_tab"
            style={{
              background: inbound_tab === 7 ? "#D6E8FF" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInBoundTab(7));
               navigate("/wms/Inbound/receivinglist/ReceivingList");
            }}
            >
            RECEIVING LIST
          </div>
            </div>
      </>
    )
}
export default InboundTab