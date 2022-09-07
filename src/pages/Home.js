import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase";
import "../pages/style/home.css";

const Home = () => {
  const [postLists, setPostList] = useState([]);
  const [filter, setFilter] = useState();
  const [input, setInput] = useState();
  const [searchItem, setSearchItem] = useState([]);
  const [show, setShow] = useState(false);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFilter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const searchHandeler = () => {
    if (input !== "") {
      const searchpost = postLists.filter((titel) => {
        return Object.values(titel)
          .join(" ")
          .toLowerCase()
          .includes(input.toLowerCase());
      });
      setSearchItem(searchpost);
      setShow(true);
      setInput("")
    }
  };

  const updateProduct = (cat) => {
    const updateList = postLists.filter((x) => x.option === cat);
    setFilter(updateList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className=" d-flex justify-content-center mt-2 ">
          <button
            className="btn btn-outline-danger me-3 p-2 "
            id="option"
            onClick={() => updateProduct("Tech")}
          >
            Technical
          </button>
          <button
            className="btn btn-outline-danger me-3 p-2"
            id="option"
            onClick={() => updateProduct("Entertainment")}
          >
            Entertainment
          </button>
          <button
            className="btn btn-outline-danger me-3 p-2 "
            id="option"
            onClick={() => updateProduct("Community")}
          >
            Community
          </button>
        </div>
        {filter?.map((post, index) => {
          return (
            <div className="col-md-4 mb-2 mt-5" key={index}>
              <div className="card p-0  text-center  card-overlay">
                <div className="card-body mt-0 p-0">
                  <div className="card-title p-1" id="title">
                    <h3> {post.title.substring(0, 20)}</h3>
                  </div>
                  <div className="postTextContainer text-success p-1">
                    <q>{post.postText.substring(0, 420)}</q>{" "}
                  </div>
                  <h6
                    className="bg-danger text-light mb-0 p-1 fw-bolder"
                    id="author"
                  >
                    Written by {post.author.name}
                  </h6>
                </div>
              </div>
            </div>
          );
        })};
      </>
    );
  };

  return (
    <>
      <div className="container d-flex justify-content-center mt-4">
        <ul
          className="nav-pills nav-fill bg-light p-0 small rounded-5 shadow-sm"
          id="search"
        >
          <li className="nav-item d-flex p-2" role="presentation">
            <input
              className="nav-link rounded-p5 bg-light "
              id="input"
              placeholder="Search blogs which you want to see..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="bg-light" id="iconbtn" onClick={searchHandeler}>
              <i className="bi bi-search" id="icon"></i>
            </button>
          </li>
        </ul>
      </div>

      <div className=" container">
        <div className="row">
          {show ? (
            searchItem.map((post, index) => {
              return (
                <div className="col-md-4 mb-2 mt-5" key={index}>
                  <div className="card p-0  text-center  card-overlay">
                    <div className="card-body mt-0 p-0">
                      <div className="card-title p-1" id="title">
                        <h3> {post.title.substring(0, 20)}</h3>
                      </div>
                      <div className="postTextContainer text-success p-1">
                        <q>{post.postText.substring(0, 420)}</q>{" "}
                      </div>
                      <h6
                        className="bg-danger text-light mb-0 p-1 fw-bolder"
                        id="author"
                      >
                        Written by {post.author.name}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <ShowProducts />
          )}
          ;
        </div>
      </div>
    </>
  );
};

export default Home;
