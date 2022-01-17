import React, { Component } from "react";
import { Badge } from "react-bootstrap";
const YourID = ({ id }) => {
  return <h6 className="border-2 border-gray-300 m-4 mt-2 mb-2 p-2">Your ID <span className="border-l-2 border-gray-500 pl-1 text-2xl font-bold ">{id}</span></h6>;
};
export default YourID;
