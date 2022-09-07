import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Createpost from "./pages/Createpost";
import Navbar from "./component/Navbar";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.href = "/";
    });
  };

  

  return (
    <Router>
      <Navbar isAuth={isAuth} signUserOut={signUserOut} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} setIsAuth={setIsAuth} />
          <Route path="/createpost" element={<Createpost />} />
        </Routes>
    </Router>
  );
}

export default App;
