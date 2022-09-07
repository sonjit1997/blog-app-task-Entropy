import React from 'react';
import '../component/navbar.css'
import Login from "../pages/Login";

const Navbar = ({isAuth,signUserOut}) => {
    const goCreatePost = () => {
        window.location.href = "/createpost";
      };
    
      const goHome = () => {
        window.location.href = "/";
      };
  return (
    <>
        <div
          className="nav nav-pills nav-fill gap-2 p-1 mt-1 small bg-white border rounded-5 shadow-sm"
          id="pillNav2"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-5 "
              id="home-tab2"
              type="button"
              onClick={goHome}
            >
              <h6 className="mt-1 text text-light">HOME</h6>
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
                <h6 className="mt-1 text text-light">Createpost</h6>
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
                    className="btn-close"
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
        </div>
      </>
  );
}

export default Navbar;
