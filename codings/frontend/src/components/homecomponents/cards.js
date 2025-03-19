import React from "react";

const NFTCard = () => {
  return (
    <div
      style={{
        margin: 0,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        backgroundColor: "rgb(22, 20, 24)",
        color: "#eee",
        userSelect: "none",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        className="bg"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      <div
        className="nft"
        style={{
          userSelect: "none",
          maxWidth: "300px",
          margin: "5rem auto",
          border: "1px solid #ffffff22",
          backgroundColor: "#282c34",
          background:
            "linear-gradient(0deg, rgba(40,44,52,1) 0%, rgba(17,0,32,.5) 100%)",
          boxShadow: "0 7px 20px 5px #00000088",
          borderRadius: ".7rem",
          backdropFilter: "blur(7px)",
          WebkitBackdropFilter: "blur(7px)",
          overflow: "hidden",
          transition: ".5s all",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="main"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            padding: "1rem",
          }}
        >
          <h2>
            Kibertopiks #4269 <br></br>
            Kibertopiks #4269 <br></br>Kibertopiks #4269 <br></br>Kibertopiks
            #4269 <br></br>Kibertopiks #4269 <br></br>
          </h2>
        </div>
      </div>

      <style jsx>{`
        .nft::before {
          position: fixed;
          content: "";
          box-shadow: 0 0 100px 40px #ffffff08;
          top: -10%;
          left: -100%;
          transform: rotate(-45deg);
          height: 60rem;
          transition: 0.7s all;
          z-index: -1;
        }

        .nft:hover {
          border: 1px solid #ffffff44;
          box-shadow: 0 7px 50px 10px #000000aa;
          transform: scale(1.015);
          filter: brightness(1.3);
        }

        .nft:hover::before {
          filter: brightness(0.5);
          top: -100%;
          left: 200%;
        }
      `}</style>
    </div>
  );
};

export default NFTCard;
