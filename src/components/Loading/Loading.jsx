import React from "react";
import { DNA } from "react-loader-spinner";

function Loading() {
  return (
    <div>
      <div
        className="loaders "
        style={{
          height: "100vh",
          
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </div>
  );
}

export default Loading;
