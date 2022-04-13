import React from "react";
/* neophodan css radi crtica barkoda */
import "./barcode.css";

function BarcodeComponent({ barcode, barcodeText }) {
  return (
    <div className="col-4 d-flex justify-content-center w-100">
      <div className="justify-content-center">
        <div className="barcode lines">{barcode}</div>
        <div id="barcodeNumbers" className="barcode numbers">{barcodeText}</ div>
      </div>
    </div>
  );
}

export default BarcodeComponent;
