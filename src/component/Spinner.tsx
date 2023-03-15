import React from "react";
import { Spinner as SpinnerFB } from "flowbite-react";

const Spinner = () => {
  return (
    // <div className="d-flex justify-content-center align-items-center mt-2">
    //   <div className="spinner-border" role="status" style={{width:'50px', height: '50px'}}>
    //     <span className="sr-only">Loading...</span>
    //   </div>
    // </div>
    <div className="flex justify-center items-center mt-2">
      <SpinnerFB color="success" aria-label="Extra large spinner example" className="w-[100px] h-[100px]"/>
    </div>
  );
};

export default Spinner;
