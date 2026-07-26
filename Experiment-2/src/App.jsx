import { useSelector, useDispatch } from "react-redux";

import {
  setPost,
  setMedia,
  setSearch,
  setPlatform,
  savePost,
  editPost,
  deletePost,
} from "./features/posts/postsSlice";

import {
  selectTotalPosts,
} from "./features/posts/postSelectors";

import "./App.css";


function App() {

  const dispatch = useDispatch();


  const {
    post,
    media,
    platform,
    posts,
    editingIndex,
    search,
  } = useSelector((state) => state.posts);



  const totalPosts = useSelector(selectTotalPosts);



  const availablePlatforms = [
    "Facebook",
    "Instagram",
    "Twitter",
    "LinkedIn"
  ];



  const handleSavePost = () => {

    if (post.trim() === "") {
      alert("Please write a post first!");
      return;
    }


    const newPost = {

      post,

      media: media
        ? media.name
        : "No File",

      platform,

      createdAt:
        new Date().toLocaleString(),

    };


    dispatch(savePost(newPost));

  };




  const handleEditPost = (index) => {

    dispatch(editPost(index));

  };



  const handleDeletePost = (index) => {

    dispatch(deletePost(index));

  };



  const handlePublish = () => {

    if (post.trim() === "") {

      alert("Please write a post first!");
      return;

    }


    alert("🎉 Post Published Successfully!");

  };




  const filteredPosts = posts.filter((item) =>

    item.post
      .toLowerCase()
      .includes(search.toLowerCase())

  );




  return (

    <div className="container">


      <h3>
        Welcome! Create your social media post below.
      </h3>


      <h1>
        Post Manager
      </h1>


      <h3>
        Total Posts: {totalPosts}
      </h3>



      <textarea

        placeholder="Write your post here..."

        value={post}

        onChange={(e) =>
          dispatch(setPost(e.target.value))
        }

      />



      <h2>
        Select Platform
      </h2>


      <div className="platforms">

        {availablePlatforms.map((item) => (

          <label key={item}>

            <input

              type="radio"

              name="platform"

              value={item}

              checked={platform === item}

              onChange={(e) =>
                dispatch(setPlatform(e.target.value))
              }

            />

            {item}

          </label>

        ))}

      </div>





      <input

        type="text"

        className="search-bar"

        placeholder="Search Posts..."

        value={search}

        onChange={(e) =>
          dispatch(setSearch(e.target.value))
        }

      />





      <p className="character-count">

        Characters: {post.length}

      </p>




      <p className="last-edit">

        Last Edited:
        {new Date().toLocaleTimeString()}

      </p>





      <div className="upload">


        <label className="upload-btn">

          Choose File


          <input

            type="file"

            hidden

            onChange={(e) =>
              dispatch(setMedia(e.target.files[0]))
            }

          />


        </label>



        <span className="file-name">

          {media
            ? media.name
            : "No file chosen"}

        </span>



      </div>





      <button

        className="save-btn"

        onClick={handleSavePost}

      >

        {
          editingIndex !== null
            ? "Update Post"
            : "Save Post"
        }


      </button>





      <button

        className="publish-btn"

        onClick={handlePublish}

      >

        Publish

      </button>





      <hr />



      <h2>
        Saved Posts
      </h2>





      {
        filteredPosts.length === 0

        ?

        <p className="no-posts">
          No posts available.
        </p>


        :

        filteredPosts.map((item,index)=>(


          <div

            className="post-card"

            key={index}

          >


            <p>
              <b>Post:</b> {item.post}
            </p>


            <p>
              <b>Media:</b> {item.media}
            </p>


            <p>
              <b>Platform:</b> {item.platform}
            </p>


            <p>
              <b>Created:</b> {item.createdAt}
            </p>




            <button

              className="edit-btn"

              onClick={() =>
                handleEditPost(index)
              }

            >

              Edit

            </button>





            <button

              className="delete-btn"

              onClick={() =>
                handleDeletePost(index)
              }

            >

              Delete

            </button>



          </div>


        ))

      }



    </div>

  );

}


export default App;