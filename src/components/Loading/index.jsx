import React from "react";
import loading from "../../loading.png";
import "./styles.css";

Loading.propTypes = {};

function Loading(props) {
  return (
    <div className="App-header">
      <img src={loading} className="App-logo" alt="logo" />
    </div>
  );
}

export default Loading;
