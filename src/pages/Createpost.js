import React, { useState} from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../Firebase";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import '../pages/style/createpost.css'

const Createpost = () => {
  const [title, setTitle] = useState("");
  const [option, setOption] = useState();
  const [postText, setPostText] = useState("");

  const handleSelect = (e) => {
    setOption(e.label);
    
  };

  const Options = [
    {
      label: "Tech",
    },
    {
      label: "Entertainment",
    },
    {
      label: "Community",
    },
  ];

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      option,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };


  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1 className="tag">Create A Post</h1>
        <div className="inputGp">
          <label> Title :</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Category : </label>
          <Select
                    className=" text text-info"
                    options={Options}
                    onChange={handleSelect}
                    id="select"
                  />
        </div>
        <div className="inputGp">
          <label> Post :</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost} className="button"> Submit Post</button>
      </div>
    </div>
  );
}

export default Createpost;
