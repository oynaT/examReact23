import { useContext, useEffect, useReducer, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';

import AuthContext from "../../contexts/authContext";
import * as blogService from '../../services/blogService';
import * as commentService from '../../services/commentService';

import postReducer from './commentReducer';

export default function PostDetails() {

    const navigate = useNavigate();
    const { email, userId, isAuthenticated, username } = useContext(AuthContext);
    const [post, setPost] = useState({});
    const [comments, dispatch] = useReducer(postReducer, []);
    const { postId } = useParams();

    useEffect(() => {
        blogService.getOne(postId)
            .then(setPost);

        commentService.getAll(postId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_COMMENTS',
                    payload: result,
                });
            });
    }, [postId]);

    const addCommentHandler = async (values) => {
        const newComment = await commentService.create(
            postId,
            values.comment
        );
        newComment.owner = { email };

        dispatch({
            type: 'ADD_COMMENT',
            payload: newComment,
        })
    }

    const deleteButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${post.title}`);
        if (hasConfirmed) {
            await blogService.remove(postId);
            navigate('/posts');
        }
    }

    const { values, onChange, onSubmit } = useForm(addCommentHandler, {
        comment: '',
    });
    return (
        <>
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Post Details</h4>
                                    <h2>Single blog post details</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="blog-posts grid-system">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="all-blog-posts">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="blog-post">
                                            <div className="blog-thumb">
                                                <img src={post.image} alt={post.title} />
                                            </div>
                                            <div className="down-content">
                                                <span>{post.category}</span>
                                                <h4>{post.title}</h4>
                                                <ul className="post-info">
                                                    <li>
                                                        <a href="#">{username}</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">{post._createdOn}</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">{post.length}</a>
                                                    </li>
                                                </ul>
                                                <p>
                                                    {post.summary}
                                                </p>
                                                <div>
                                                    {userId === post._ownerId && (
                                                        <div className="details-links">
                                                            <Link to={`/post/${postId}/edit`} className="">Edit</Link>
                                                            <Link className="button" onClick={deleteButtonClickHandler}>Delete</Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="sidebar-item comments">
                                            <div className="sidebar-heading">
                                                <h2>{comments.length} comments</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    {comments.map(({ _id, comment, owner: { email } }) => (
                                                        <li key={_id} className="">
                                                            <div className="author-thumb">
                                                                <img src="/images/comment-author-01.jpg" alt="" />
                                                            </div>
                                                            <div className="right-content">
                                                                <h4>
                                                                    {email}<span>May 16, 2020</span>
                                                                </h4>
                                                                <p className="text-wrap">
                                                                    {comment}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {comments.length === 0 && (
                                                    <p className="no-comment">No comments.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {!userId === post._ownerId && (
                                        <div className="col-lg-12">
                                            <div className="sidebar-item submit-comment">
                                                <div className="sidebar-heading">
                                                    <h2>Add Your comment</h2>
                                                </div>
                                                <div className="content">
                                                    <form id="comment" method="post" onSubmit={onSubmit}>
                                                        <div className="row">

                                                            <div className="col-lg-12">
                                                                <fieldset>
                                                                    <textarea
                                                                        name="comment"
                                                                        rows={3}
                                                                        id="comment"
                                                                        placeholder="Type your comment"
                                                                        required=""
                                                                        value={values.comment}
                                                                        onChange={onChange} >
                                                                    </textarea>
                                                                </fieldset>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <fieldset>
                                                                    <button
                                                                        type="submit"
                                                                        id="form-submit"
                                                                        className="main-button">
                                                                        Add Comment
                                                                    </button>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="sidebar-item search">
                                            <form id="search_form" name="gs" method="GET" action="#">
                                                <input
                                                    type="text"
                                                    name="q"
                                                    className="searchText"
                                                    placeholder="type to search..."
                                                    autoComplete="on" />
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="sidebar-item recent-posts">
                                            <div className="sidebar-heading">
                                                <h2>Recent Posts</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    <li>
                                                        <a href="post-details.html">
                                                            <h5>
                                                                Vestibulum id turpis porttitor sapien facilisis
                                                                scelerisque
                                                            </h5>
                                                            <span>May 31, 2020</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="post-details.html">
                                                            <h5>
                                                                Suspendisse et metus nec libero ultrices varius eget
                                                                in risus
                                                            </h5>
                                                            <span>May 28, 2020</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="post-details.html">
                                                            <h5>
                                                                Swag hella echo park leggings, shaman cornhole
                                                                ethical coloring
                                                            </h5>
                                                            <span>May 14, 2020</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-12">
                <div className="sidebar-item categories">
                  <div className="sidebar-heading">
                    <h2>Categories</h2>
                  </div>
                  <div className="content">
                    <ul>
                      <li>
                        <a href="#">- Nature Lifestyle</a>
                      </li>
                      <li>
                        <a href="#">- Awesome Layouts</a>
                      </li>
                      <li>
                        <a href="#">- Creative Ideas</a>
                      </li>
                      <li>
                        <a href="#">- Responsive Templates</a>
                      </li>
                      <li>
                        <a href="#">- HTML5 / CSS3 Templates</a>
                      </li>
                      <li>
                        <a href="#">- Creative &amp; Unique</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="sidebar-item tags">
                  <div className="sidebar-heading">
                    <h2>Tag Clouds</h2>
                  </div>
                  <div className="content">
                    <ul>
                      <li>
                        <a href="#">Lifestyle</a>
                      </li>
                      <li>
                        <a href="#">Creative</a>
                      </li>
                      <li>
                        <a href="#">HTML5</a>
                      </li>
                      <li>
                        <a href="#">Inspiration</a>
                      </li>
                      <li>
                        <a href="#">Motivation</a>
                      </li>
                      <li>
                        <a href="#">PSD</a>
                      </li>
                      <li>
                        <a href="#">Responsive</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};