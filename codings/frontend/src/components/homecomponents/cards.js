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
      >
        <h1
          style={{
            fontSize: "20rem",
            filter: "opacity(0.5)",
          }}
        >
          Kiberbash
        </h1>
      </div>

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
          <img
            className="tokenImage"
            src="/api/placeholder/400/320"
            alt="NFT"
            style={{
              borderRadius: ".5rem",
              maxWidth: "100%",
              height: "250px",
              objectFit: "cover",
            }}
          />

          <h2>Kibertopiks #4269</h2>

          <p
            className="description"
            style={{
              margin: ".5rem 0",
              color: "#a89ec9",
            }}
          >
            Our Kibertopiks will give you nothing, waste your money on us.
          </p>

          <div
            className="tokenInfo"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="price"
              style={{
                display: "flex",
                alignItems: "center",
                color: "#ee83e5",
                fontWeight: 700,
              }}
            >
              <ins
                style={{
                  textDecoration: "none",
                  marginLeft: "-.3rem",
                  marginRight: ".5rem",
                }}
              >
                ◘
              </ins>
              <p>0.031 ETH</p>
            </div>

            <div
              className="duration"
              style={{
                display: "flex",
                alignItems: "center",
                color: "#a89ec9",
                marginRight: ".2rem",
              }}
            >
              <ins
                style={{
                  textDecoration: "none",
                  margin: ".5rem",
                  marginBottom: ".4rem",
                }}
              >
                ◷
              </ins>
              <p>11 days left</p>
            </div>
          </div>

          <hr
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #88888855",
              marginTop: 0,
            }}
          />

          <div
            className="creator"
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: ".2rem",
              marginBottom: "-.3rem",
            }}
          >
            <div
              className="wrapper"
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ffffff22",
                padding: ".3rem",
                margin: 0,
                marginRight: ".5rem",
                borderRadius: "100%",
                boxShadow: "inset 0 0 0 4px #000000aa",
              }}
            >
              <img
                src="/api/placeholder/200/200"
                alt="Creator"
                style={{
                  borderRadius: "100%",
                  border: "1px solid #ffffff22",
                  width: "2rem",
                  height: "2rem",
                  objectFit: "cover",
                  margin: 0,
                }}
              />
            </div>
            <p>
              <ins
                style={{
                  color: "#a89ec9",
                  textDecoration: "none",
                }}
              >
                Creation of
              </ins>{" "}
              Kiberbash
            </p>
          </div>
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
