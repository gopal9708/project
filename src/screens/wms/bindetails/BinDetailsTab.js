import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setBinDetailsTab } from '../../../store/parentFilter/ParentFilter';


const BinDetailsTab = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bindetails_tab = useSelector((state) => state.parentfilter.bindetails_tab);

    return (
        <>
        <div className="mt-0 m-3 parent_tab">
          <div
            className="header_tab"
            style={{
              background: bindetails_tab === 1 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setBinDetailsTab(1));
             navigate("/wms/bindetails/BinDetails");
            }} 
          >  
            BIN SET        
          </div>
          <div
            className="header_tab"
            style={{
              background: bindetails_tab === 2 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setBinDetailsTab(2));
              navigate("/wms/bindetails/binsize/BinSize");
            }}
          >
            BIN SIZE
          </div>
          <div
            className="header_tab"
            style={{
              background: bindetails_tab === 3 ? "#d6e8ff" : "#F8F8FB",
            }}
            onClick={() => {
              dispatch(setBinDetailsTab(3));
             navigate("/wms/bindetails/binproperty/BinProperty");
            }}
          >
            BIN PROPERTY
          </div>
      </div>
      </>
    )
}

export default BinDetailsTab