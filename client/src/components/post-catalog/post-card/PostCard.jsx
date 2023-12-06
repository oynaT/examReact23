import { Link } from "react-router-dom";
import React from "react";
import convertTimestamptoTime from "../../../utils/convertDate"

export const PostCard = ({
  _id,
  title,
  category,
  image,
  summary,
  _createdOn,
}) => {
 
  const dateTime = convertTimestamptoTime(_createdOn);

  return (
    <div className="col-xl-6 col-lg-6 col-md-6 col-xs-6">
      <div className="blog-post">
        <div className="blog-thumb">
          <img src={image} />
        </div>
        <div className="down-content">
          <span>{category}</span>
          <Link to={`/post/${_id}/details`}>
            <h4>{title}</h4>
          </Link>
          <ul className="post-info">
            <li>
             {dateTime} 
              </li>
          </ul>
          <p>
            {summary}
          </p>
          <div className="details-links ">
            <Link
              to={`/post/${_id}/details`}>
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}