import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInventoryTab } from '../../../store/parentFilter/ParentFilter';

const InventoryTab = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inventory_tab = useSelector((state) => state.parentfilter.inventory_tab);
    return (
        <>
        <div className="mt-0 m-3 parent_tab">
          <div
            className="header_tab"
            style={{
              background: inventory_tab === 1 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInventoryTab(1));
              navigate("/Inventory");
            }}
          >
            Stock List
          </div>
          <div
            className="header_tab"
            style={{
              background: inventory_tab === 2 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInventoryTab(2));
              navigate("/wms/inventory/binlist");
            }} 
          >
            Bin List
          </div>
          <div
            className="header_tab"
            style={{
              background: inventory_tab === 3 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInventoryTab(3));
              navigate("/wms/inventory/emptybin");
            }}
          >
             Empty BIN  
          </div>

          <div
            className="header_tab"
            style={{
              background: inventory_tab === 4 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInventoryTab(4));
              navigate("/wms/inventory/OccupiedBin");
            }}
          >
           Occupied Bin
          </div>
          
          <div
            className="header_tab"
            style={{
              background: inventory_tab === 5 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInventoryTab(5));
              navigate("/wms/inventory/CycleCount");
            }}
          >
           Cycle Count
          </div>
          <div
            className="header_tab"
            style={{
              background: inventory_tab === 6 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInventoryTab(6));
              navigate("/wms/inventory/CountRecorder");
            }}
          >
           Count Recorder
          </div>
          <div
            className="header_tab"
            style={{
              background: inventory_tab === 7 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInventoryTab(7));
              navigate("/wms/inventory/SingleCount");
            }}
          >
           Single Count
          </div>
          <div
            className="header_tab"
            style={{
              background: inventory_tab === 8 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setInventoryTab(8));
              navigate("/wms/inventory/SingleCountRecorder");
            }}
          >
           Single Count Recorder
          </div>

          </div>
      </>
      )
}

export default InventoryTab