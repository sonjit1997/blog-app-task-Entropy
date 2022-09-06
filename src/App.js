import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Createpost from "./pages/Createpost";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

 

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.href = "/";
    });
  };

  const goCreatePost=()=>{
    window.location.href = '/createpost';
  }

  const goHome=()=>{
    window.location.href = '/';
  }


  return (
    <Router>
      <>
        <ul
          className="nav nav-pills nav-fill gap-2 p-1 small bg-white border rounded-5 shadow-sm"
          id="pillNav2"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-5 "
              id="home-tab2"
              type="button"
              onClick={goHome}
            >
              <h6 className="mt-1 text text-light" >HOME</h6>
            </button>
          </li>
          {isAuth ? (
            <li className="nav-item" role="presentation">
              <button
                className="nav-link rounded-5 "
                id="home-tab3"
                type="button"
                onClick={goCreatePost}
              >
                <h6 className="mt-1 text text-light" >Createpost</h6>
               
              </button>
            </li>
          ) : (
            ""
          )}
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-5 "
              id="home-tab1"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              {!isAuth ? (
                <h6 className="mt-1 text text-light" id="text">
                  Login
                </h6>
              ) : (
                <h6
                  className="mt-1 text text-light"
                  id="text"
                  onClick={signUserOut}
                >
                  LogOut
                </h6>
              )}
            </button>
            {!isAuth ? (
              <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <div className="offcanvas-header">
                  <h6
                    className="offcanvas-title text text-secondary fw-bolder"
                    id="offcanvasRightLabel"
                  >
                    Login
                  </h6>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <hr />
                <div className="offcanvas-body">
                  <Login />
                </div>
              </div>
            ) : (
              ""
            )}
          </li>
        </ul>
      </>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} setIsAuth={setIsAuth} />
        <Route path="/createpost" element={<Createpost />} />
      </Routes>
    </Router>
  );
}

export default App;
