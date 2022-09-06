import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase";
import "../pages/style/home.css";

const Home = () => {
  const [postLists, setPostList] = useState([]);
  const [filter,setFilter] = useState();
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFilter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };
    getPosts();
  }, []);
 

  const updateProduct = (cat) => {
    const updateList = postLists.filter((x) => x.option === cat);
    setFilter(updateList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className=" d-flex justify-content-center mt-4 ">
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
          })}
      </>
    );
  };


  return (
    <>
    
      <div className=" container">
        <div className="row">
        <ShowProducts/>
        
        </div>
      </div>
    </>
  );
};

export default Home;
