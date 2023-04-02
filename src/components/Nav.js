import { Isearch, Inotification } from "../icons";
import { logo, navMenu } from "./fetch/lanquage";
import { NavLink } from "react-router-dom";
export default function Nav() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 1000,
          gap: 10,
          padding: 10,
        }}
      >
        <div>{logo.name}</div>
        <div className="f g">
          {navMenu.map((d, i) => (
            <NavLink key={i} to="/">
              <button>{d.name}</button>
            </NavLink>
          ))}
        </div>
        <div>
          <NavLink to="/seach">
            <Isearch />
          </NavLink>
          <NavLink to="/noti">
            <Inotification />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
