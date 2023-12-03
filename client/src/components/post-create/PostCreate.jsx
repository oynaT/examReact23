
import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import useForm from '../../hooks/useForm';
import { useNavigation } from "react-router-dom";

export const PostCreate = ({
    onCreatePostSubmit,
}) => {
    const { isAuthenticated } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(onCreatePostSubmit, {
        title: '',
        category: '',
        image: '',
        summary: '',
    });

    const [errors, setErrors] = useState({ });

    const minLength = (e, limit) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < limit,
        }));
    }

    // const urlValidate = (e) => {
    //     setErrors(state => ({
    //         ...state,
    //         [e.target.name]: values[e.target.name].,
    //     }));
    // }

    const isFormValid = Object.values(errors).some(tr => tr);
   

    return (
        <>
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Blog Post</h4>
                                    <h2>Create your post</h2>
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
                                    <h2>Create</h2>
                                </div>
                                <div className="content">
                                    <form id="blog" method="POST" onSubmit={onSubmit}>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="title">Post title:</label>
                                                    <input type="text" id="title" placeholder="Title" required=""
                                                        name="title"
                                                        onChange={onChange}
                                                        value={values.title}
                                                        onBlur={(e) => minLength(e, 4)}
                                                    />
                                                    {errors.title &&
                                                        <p className="form-error">
                                                            Title should be at least 4 charaters long!
                                                        </p>
                                                    }
                                                </fieldset>
                                            </div>

                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="category">Category:</label>
                                                    <input type="text" id="categoty" placeholder="Category" required=""
                                                        name="category"
                                                        onChange={onChange}
                                                        value={values.category}
                                                        onBlur={(e) => minLength(e, 4)}
                                                    />
                                                    {errors.category &&
                                                        <p className="form-error">
                                                            Category should be at least 4 charaters long!
                                                        </p>
                                                    }
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="summary">Summary:</label>
                                                    <input type="text" id="summary" placeholder="Summary"
                                                        name="summary"
                                                        onChange={onChange}
                                                        value={values.summary}
                                                        onBlur={(e) => minLength(e, 10)}
                                                    />
                                                     {errors.category &&
                                                        <p className="form-error">
                                                            Summary should be at least 10 charaters long!
                                                        </p>
                                                    }
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="image">Image:</label>
                                                    <input type="text" id="image" placeholder="Image URL"
                                                        name="image"
                                                        onChange={onChange}
                                                        value={values.image}
                                                        // onBlur={(e) => minLength(e, 10)}
                                                    />
                                                          {/* {errors.image &&
                                                        <p className="form-error">
                                                            Summary should be at least 10 charaters long!
                                                        </p>
                                                    } */}
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    {!isFormValid && (
                                                        <button
                                                        type="submit" id="form-submit" className="main-button" >Create Post
                                                    </button>
                                                    )}
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