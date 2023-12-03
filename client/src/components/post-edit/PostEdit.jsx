
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import { useNavigate, useParams } from "react-router-dom";
import * as blogService from '../../services/blogService';

export default function PostEdit() {

    const navigate = useNavigate();
    const { postId } = useParams();
    const { isAuthenticated } = useContext(AuthContext);
    const [post, setPost] = useState({
        title: '',
        category: '',
        image: '',
        summary: '',
    });

    useEffect(() => {
        blogService.getOne(postId)
            .then(result => {
                setPost(result);
            });
    }, [postId]);

    const editPostSubmitHandler = async (e) => {
        e.preventDefault();
        const values = Object.fromEntries(new FormData(e.currentTarget));
        try {
            await blogService.edit(postId, values);
            navigate(`/post/${postId}/details`);
        } catch (err) {
            // Error notification
            console.log(err);
        }
    }

    const onChange = (e) => {
        setPost(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Blog Post Edit</h4>
                                    <h2>Edit your post</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="register-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="down-contact register-wrap">
                                <div className="sidebar-heading">
                                    <h2>Edit blog post</h2>
                                </div>
                                <div className="content">
                                    <form id="blog" onSubmit={editPostSubmitHandler}>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="title">Post title:</label>
                                                    <input type="text" id="title" placeholder="Title" required=""
                                                        name="title"
                                                        onChange={onChange}
                                                        value={post.title}
                                                    />
                                                </fieldset>
                                            </div>

                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="category">Category:</label>
                                                    <input type="text" id="categoty" placeholder="Category" required=""
                                                        name="category"
                                                        onChange={onChange}
                                                        value={post.category}
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="summary">Summary:</label>
                                                    <input type="text" id="summary" placeholder="Summary"
                                                        name="summary"
                                                        onChange={onChange}
                                                        value={post.summary}
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="image">Image:</label>
                                                    <input type="text" id="image" placeholder="Image URL"
                                                        name="image"
                                                        onChange={onChange}
                                                        value={post.image}
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <button
                                                        type="submit" id="form-submit" className="main-button">Edit Post
                                                    </button>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};