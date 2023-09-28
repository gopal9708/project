import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOutBoundTab } from '../../../store/parentFilter/ParentFilter';

const OutBoundTab = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const outbound_tab = useSelector((state) => state.parentfilter.OutBoundTab);
    return (
        <>
        <div className="mt-0 m-3 parent_tab">
          <div
            className="header_tab"
            style={{
              background: outbound_tab === 1 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setOutBoundTab(1));
              navigate("/Outbound");
            }}
          >
            DN
          </div>
          <div
            className="header_tab"
            style={{
              background: outbound_tab === 2 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setOutBoundTab(2));
              navigate("/wms/Outbound/Preorder");
            }}
          >
            PRE ORDER
          </div>
          <div
            className="header_tab"
            style={{
              background: outbound_tab === 3 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setOutBoundTab(3));
               navigate("/wms/Outbound/neworder/NewOrder");
            }}
          >
            NEW ORDER
          </div>
          <div
            className="header_tab"
            style={{
              background: outbound_tab === 4 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setOutBoundTab(4));
               navigate("/wms/Outbound/backorder/BackOrder");
            }}
          >
            BACK ORDER
          </div>
          <div
            className="header_tab"
            style={{
              background: outbound_tab === 5 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setOutBoundTab(5));
               navigate("/wms/Outbound/prepick/PrePick");
            }}
          >
            PRE PICK
          </div>
          <div
            className="header_tab"
            style={{
              background: outbound_tab === 6 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setOutBoundTab(6));
               navigate("/wms/Outbound/Picked/Picked");
            }}
          >
            PICKED
          </div>
          <div
            className="header_tab"
            style={{
              background: outbound_tab === 7 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setOutBoundTab(7));
               navigate("/wms/Outbound/pickinglist/PickingList");
            }}
          >
            PICKING LIST
          </div>
          <div
            className="header_tab"
            style={{
              background: outbound_tab === 8 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setOutBoundTab(8));
               navigate("/wms/Outbound/shippinglist/ShippingList");
            }}
            >
            SHIPPING LIST
          </div>
          <div
            className="header_tab"
            style={{
              background: outbound_tab === 9 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setOutBoundTab(9));
              navigate("/wms/Outbound/proofofdelivery/ProofOfDelivery");
            }}
            >
            PROOF OF DELIVERY
          </div>
            </div>
      </>
    )
}

export default OutBoundTab