import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/authReducer";
import { useNavigate } from "react-router-dom";
import Nav2 from "../components/Nav2";
import { Icog, Iusercog, Ilogout } from "../icons";
import { h } from "../lang";
import { Link } from "react-router-dom";
import { logo1 } from "../lang/Vars";
import { useEffect } from "react";
import { logoutUser } from "../store/userReducer";
export default function Me() {
  const { user } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);

  const go = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    dispatch(login(false));
    dispatch(logoutUser({}));
    go("/");
  };

  return (
    <div className="fwh fr bg1">
      <div className="f1 fr p">
        {userInfo && (
          <div className="f g">
            <p className="bold txl f1">{h.h1}</p>
            <p className="f ac">
              <Icog />
            </p>
            <p className="f ac">
              <Iusercog />
            </p>
            <p className="f ac cp" onClick={logout}>
              <Ilogout />
            </p>
          </div>
        )}
        <div className="f1 fr g10 p ac">
          <div>
            <img width={80} src={userInfo ? JSON.parse(userInfo).img : logo1} />
          </div>
          <div className="">{userInfo ? JSON.parse(userInfo).name : h.h25}</div>
          {!user && (
            <Link className="gb1 cw p10_ r" to="/login">
              {h.h26}
            </Link>
          )}
        </div>
      </div>
      <Nav2 />
    </div>
  );
}
