import React from "react";
import { IoIosNotifications } from "react-icons/io"; // Importing notification icon from react-icons

const Header = () => {
  // Inline styles for the header and icon
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "86px 20px", // Original padding value
    color: "white",
    position: "relative", // Important for positioning the notification icon
  };

  const eventLineStyle = {
    width: "100%",
    height: "1px",
    backgroundColor: "#ff996e", // Event line color
    marginTop: "-12px", // Original margin
    position:"fixed",
  };

  const notificationIconContainerStyle = {
    position: "fixed",
    top: "10px", // Adjust to move it closer or farther from the top of the screen
    right: "20px", // Adjust to move it left or right
    cursor: "pointer",
  };

  const notificationIconStyle = {
    fontSize: "30px",
    color: "black", // Icon color
    padding: "10px",
    borderRadius: "50%",
    transition: "background-color 0.3s ease", // Smooth hover effect
  };

  const notificationCountStyle = {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    color: "white",
    borderRadius: "50%",
    padding: "5px",
    fontSize: "12px",
    fontWeight: "bold",
  };

  return (
    <header style={headerStyle}>
      <div style={eventLineStyle}></div> {/* Event line styled inline */}
      <div style={notificationIconContainerStyle}>
        <div style={notificationIconStyle}>
          <IoIosNotifications size={32} />
        </div>
        <span style={notificationCountStyle}></span> {/* Notification count */}
      </div>
    </header>
  );
};

export default Header;
