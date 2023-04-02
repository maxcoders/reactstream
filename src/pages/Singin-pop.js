import { Iclose } from "../icons";
import { logo2 } from "../lang/Vars";

const Popup = ({ setIsOpenPopup }) => {
  return (
    <div
      onClick={setIsOpenPopup.bind(this, false)}
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.6)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "white",
          borderRadius: "8px",
          width: "250px",
          padding: "20px 10px",
          animation: "dropTop .3s linear",
        }}
      >
        {/* Header */}
        <div
          style={{ borderBottom: "1px solid lightgray", paddingBottom: "10px" }}
        >
          <div
            onClick={setIsOpenPopup.bind(this, false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <Iclose />
          </div>
          <img width={150} src={logo2} />
        </div>
        {/* Body */}
        <div>
          <p>login with phone</p>
        </div>
        {/* Footer */}
        <footer
          style={{ borderTop: "1px solid lightgray", paddingTop: "10px" }}
        >
          login with socials
        </footer>
      </div>
    </div>
  );
};
export default Popup;
