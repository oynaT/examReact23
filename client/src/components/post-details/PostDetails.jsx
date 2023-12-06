import { useContext, useEffect, useReducer, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';

import AuthContext from "../../contexts/authContext";
import * as blogService from '../../services/blogService';
import * as commentService from '../../services/commentService';
import { toast } from "react-toastify";
import postReducer from './commentReducer';

export default function PostDetails() {

    const navigate = useNavigate();
    const { email, userId, isAuthenticated } = useContext(AuthContext);
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
        try {
            const newComment = await commentService.create(
                postId,
                values.comment
            );
            newComment.owner = { email };

            dispatch({
                type: 'ADD_COMMENT',
                payload: newComment,
            })
            values.comment = "";
            toast.success(`Commend was added successfully.`);

        } catch (error) {
            toast.error(`Something went wrong.`);
        }
    }


    const deleteButtonClickHandler = async () => {
        try {
            const hasConfirmed = confirm(`Are you sure you want to delete ${post.title}`);
            if (hasConfirmed) {
                await blogService.remove(postId);
                toast.success(`${post.title} was delete successfully`);
                navigate('/posts/');
            }
        } catch (error) {
            toast.error(`${post.title} can't be deleted`);
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
                                                {/* <ul className="post-info">
                                                    <li>
                                                        <a href="#">{post._createdOn}</a>
                                                    </li>
                                                </ul> */}
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
                                                                <img src="/images/user-coment.png" alt="" />
                                                            </div>
                                                            <div className="right-content">
                                                                <h4>
                                                                    {email}
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

                                    {userId != post._ownerId && (
                                        <div className="col-lg-12">
                                            {isAuthenticated &&(
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
                                            )}
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

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};