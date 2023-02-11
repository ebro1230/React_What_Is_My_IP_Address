import React, { useState, useEffect } from "react";

export default function Flag(props) {
  return (
    <>
      <div className="Flag">
        <img src={props.flag} />
      </div>
    </>
  );
}
