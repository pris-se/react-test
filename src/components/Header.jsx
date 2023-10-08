import React, { useEffect, useState } from "react";

export const Header = () => {
const [showResult, setShowResult] = useState(false)
const onClickHandler = () => {
  setShowResult(!showResult)
}
useEffect(() => {
  if(showResult) {
    document.querySelector("body").classList.add("show-result")
  } else {
    document.querySelector("body").classList.remove("show-result")
  }
}, [showResult])

  return (
    <header className="header">
      <div className="header__body">
        <div className="header__logo">REACT EDITOR Test</div>
      <button className="btn --mobile" onClick={onClickHandler}>
        { showResult ? "Show result" : "Show working field" }
      </button>
      </div>
    </header>
  );
};
