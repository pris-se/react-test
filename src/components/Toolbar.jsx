import React from "react";
import { tools } from "../data";
import { Thumb } from "./Thumb";

export const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="tools">
        {tools.map((data) => (
          <Thumb className="tool" data={data} key={data?.id} />
        ))}
      </div>
    </div>
  );
};
