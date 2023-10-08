import React, { createElement } from "react";
import { useSelector } from "react-redux";

const createNode = (data) => {
  if (!data?.type || data?.type === "undefined" || !data?.value) {
    return;
  }
  if (data?.type === "file") {
    return createElement("img", {
      src: data?.value,
      alt: data?.value,
      key: data?.id,
    });
  } else {
    return createElement(data?.element, { key: data?.id }, data?.value);
  }
};

export const ResultField = () => {
  const usingTools = useSelector((state) => state.main.usingTools);

  return (
    <div className="result-field">
      <div className="container">
        {!!usingTools.length &&
          usingTools?.map((element) => createNode(element))}
      </div>
    </div>
  );
};
