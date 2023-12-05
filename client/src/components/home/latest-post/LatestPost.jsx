import { Link } from "react-router-dom";
import convertTimestamptoTime from "../../../utils/convertDate"

export const LatestPost = ({
  _id,
  title,
  image,
  category,
  _createdOn,
  _ownerId,
}) => {

  const dateTime = convertTimestamptoTime(_createdOn);

  return (
    <div className="item">
      <div className="glas-bg">
        <img src={image} />

        <div className="item-content">
          <div className="main-content">
            <div className="meta-category">
              <span>{category}</span>
            </div>
            <Link to={`/post/${_id}/details`}>
              <h4>{title}</h4>
            </Link>
            <ul className="post-info">
              <li>
                
              </li>
              <li>
                {dateTime}
              </li>
              <li>
              
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}