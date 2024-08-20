import React, { useState, useRef } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="parent-container">
      <button onClick={openSidebar} className="open-button">
        Open Sidebar
      </button>
      {isOpen && (
        <>
          <div className="overlay" onClick={closeSidebar}></div>
          <div className="sidebar">
            <div
              style={{
                height: "100%",
                // width: "100%",
                position: "sticky",
              }}
            >
              <button onClick={closeSidebar} className="close-button">
                Close Sidebar
              </button>
            </div>
            {/* Sidebar content goes here */}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
