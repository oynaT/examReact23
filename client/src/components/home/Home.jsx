import { Link } from 'react-router-dom';
import * as blogService from '../../services/blogService';
import { LatestPost } from "./latest-post/LatestPost";
import { useState, useEffect } from "react";

export default function Home({
  username,
}) {
  const [latestPosts, setlatestPosts] = useState([]);

  useEffect(() => {
    blogService.getLatestPost()
      .then(result => {
        setlatestPosts(result)
      });
  }, [])

  return (
    <>
      <div className="heading-page header-text">
        <section className="page-heading">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-content">
                  <h4>Home</h4>
                  <h2>Welcome Blogers</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container owl-banner-new">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-content">
              <h4>Read</h4>
              <h3>Our top 3 post</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="main-banner header-text">
        <div className="container container-fluid">
          <div className="owl-custom owl-banner-new owl-carousel owl-drag">

            {latestPosts.map(post => <LatestPost key={post._id} {...post} />)}

            {!latestPosts.length === 0 && (
              <p className="no-articles">No games yet</p>)}

          </div>
        </div>
      </div>

      <div className="container owl-banner-new blog-posts">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-button"><Link to="/posts">View All Posts</Link></div>
          </div>
        </div>
      </div>
    </>
  );
};