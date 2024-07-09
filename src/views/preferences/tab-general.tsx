import React, { useState } from "react";

export function TabGeneral() {
  const [isShow, setIsShow] = useState(true);

  const handleShowTabContent = () => {
    isShow ? setIsShow(false) : setIsShow(true);
  };

  return (
    <>
      <div
        className={"btn text-primary"}
        onClick={handleShowTabContent}
        role={"none"}
      >
        general
      </div>
      <div className={isShow ? "" : "d-none"}>this is just a test</div>
    </>
  );
}
