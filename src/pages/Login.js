import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleLogIn, facebookLogIn } from "../utils/firbaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { login } from "../store/authReducer";
import { logo2, secondhost } from "../lang/Vars";
import { Iclose } from "../icons";
import { h } from "../lang";
import { loginUser } from "../store/userReducer";
function PageAuth() {
  console.log(secondhost);
  const { user } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const go = useNavigate();

  const logins = (data) => {
    const d = {};
    d.f = "dfsg45345dfdfggerrg9fg9wdf98sdfv98sfg98s9gf8s98s";
    d.name = data.user.displayName;
    d.email = data.user.email;
    d.provider = data.providerId;
    d.img = data.user.photoURL;
    d.phone = data.user.phoneNumber;
    d.phone = data.user.phoneNumber;
    d.uid = data.user.uid;
    dispatch(login(data.user.uid));
    localStorage.setItem("auth", data.user.uid);
    console.log(JSON.stringify(d));
    dispatch(loginUser(JSON.stringify(d)));
    localStorage.setItem("user", JSON.stringify(d));
    if (d.email.length > 0) {
      fetch(secondhost, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },

        // mode: "cors",

        body: JSON.stringify(d),
      })
        //.then((response) => response.json())
        .then((e) => go("/me"))
        .catch((e) => console.log("error", e));
    }
    console.log("compl", userInfo);
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleLogIn).then((data) => {
      logins(data);
    });
  };
  const loginWithFacebook = () => {
    signInWithPopup(auth, facebookLogIn).then((data) => {
      logins(data);
    });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    signOut(auth).then(() => {
      dispatch(login(false));
    });
  };
  console.log("login render");
  return (
    <div className="fwh fr bg1 ac">
      <div className="pa r t cp p5 z2">
        <Link to="/">
          <Iclose />
        </Link>
      </div>
      <div className="w300 f1 fr g p cc">
        <p className="pt">
          <img width={300} src={logo2} />
        </p>
        <div className="f1 fr g">
          <div className="ac">
            <div className="r bgb cp p10_ cw" onClick={loginWithGoogle}>
              Login with Google
            </div>
          </div>
          <div className="ac">
            <div className="r bgb cp p10_ cw" onClick={loginWithFacebook}>
              Login with Facebook
            </div>
          </div>
        </div>

        <div className="ac ts">
          {h.h21}
          <a href="/terms">{h.h22}</a> & <a href="/policy">{h.h23}</a>
        </div>

        <div>
          <div className="ac pb ts">{h.h24}</div>
        </div>
      </div>
    </div>
  );
}
export default PageAuth;
