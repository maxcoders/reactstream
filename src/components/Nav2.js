import { Ihome, Icam, Iuser } from "../icons";
import { NavLink } from "react-router-dom";
export default function Nav() {
  return (
    <div className="f p g b1 jc">
      <NavLink to="/">
        <Ihome />
      </NavLink>
      <NavLink to="/streamstart">
        <Icam />
      </NavLink>
      <NavLink to="/me">
        <Iuser />
      </NavLink>
    </div>
  );
}
