import React from "react";
import { BeatLoader } from "react-spinners";

const Typing = () => {
  return (
    <div className="is-typing-main">
      <div className="is-typing-content">
        <BeatLoader color="#fff" size={10} />
      </div>
    </div>
  );
};

export default Typing;
