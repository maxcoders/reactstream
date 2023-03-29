import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Me from "./pages/Me";
import Login from "./pages/Login";
import StreamStart from "./pages/StreamStart";
import Stream from "./pages/Stream";
import T from "./pages/t";
import T2 from "./pages/t2";

// import Games from "./pages/Games"
// import Room from "./pages/Room"
// import Live from "./pages/Live"
// import Profile from "./pages/Profile"
//import Admin from "./admin/index";
// import Admingames from "./admin/Games"
// import Adminusers from "./admin/Users"
// import Page404 from "./pages/404";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/me" element={<Me />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/streamstart" element={<StreamStart />}></Route>
        <Route path="/stream/:id" element={<Stream />}></Route>

        {/* <Route path="/games" element={<Games />}></Route>
          <Route path="/live" element={<Live />}>
            <Route path="/live/:roomId" element={<Live />}></Route>
          </Route>
          <Route path="/room" element={<Room />}>
            <Route path="/room/:roomId" element={<Room />}></Route>
          </Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin/games" element={<Admingames />}></Route>
          <Route path="/admin/users" element={<Adminusers />}></Route>
          <Route path="/admin/settings" element={<Adminsettings />}></Route>
        */}
        {/* <Route path="/admin" element={<Admin />}></Route>
        <Route path="*" element={<Page404 />}></Route> */}
        <Route path="/t" element={<T />}></Route>
        <Route path="/t2" element={<T2 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
