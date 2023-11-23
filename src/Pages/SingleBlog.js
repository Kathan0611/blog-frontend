import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlogs] = useState({});

  useEffect(() => {
    const fetchSingleBlog = async () => {
      const res = await axios.get(
        `http://localhost:9000/api/v1/get/blog/${id}`,
        {
          headers: {
            Authorization: ` Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBlogs(res.data);
    };
    fetchSingleBlog();
  }, [id]);
  return (
    <>
      <div className="container shadow my-3">
        <div className="col-xl-12 my-3 d-flex item-center justify-content-center bg-light">
          <div className="row">
            <h1 className=" my-3">{blog.title}</h1>
            <img
              // src={`http://localhost:9000/${blog.thumbnail}`}
              src={`http://localhost:9000/${blog.thumbnail}`}
              className="img img-responsive img-rounded my-3"
              alt="404"
            />
            <p className="my-3">{blog.description}</p>
          </div>
        </div>
        <button onClick={() => Navigate("/")} className="btn btn-primary">
          Back To Post
        </button>
      </div>
    </>
  );
};

export default SingleBlog;
