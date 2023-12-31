
import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import { useNavigate, redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import * as blogService from '../../services/blogService';

const validUrl = /^https?:\/\//;

const CreateSchema = Yup.object().shape({

    title: Yup.string().trim()
        .min(4, "Item name must contain atleast 4 characters")
        .required("Item title is required"),
    category: Yup.string().trim().min(4, "Item category must contain atleast 4 characters"),
    //image: Yup.string().url('myst be valid http://'),
    image: Yup.string().matches(validUrl, "Enter a valid URL! Url should start with http:// or https://").required(),
    summary: Yup.string().trim().required("Item title is required"),
});

export const PostCreate = ({ }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        category: '',
        image: '',
        summary: '',
    });
    const [errMsg, setErrMsg] = useState({
        message: "",
    });

    const onCreatePostSubmit = async (values) => {
        const newPost = await blogService.create(values, user.accessToken);
        try {
            toast.success(`${newPost.title} was created successfully`);
            //setPost(state => [...state, newPost]);
            navigate("/posts", { state: "/posts" });
        } catch (error) {
            toast.error(newPost.message);
        }
    };

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
                                    <Formik
                                        initialValues={{
                                            title: '',
                                            category: '',
                                            image: '',
                                            summary: '',
                                        }}
                                        validationSchema={CreateSchema}
                                        onSubmit={onCreatePostSubmit}
                                    >
                                        {({ values, errors, touched, isValid, dirty }) => (
                                            <Form id="blog">
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <label htmlFor="title">Post title:</label>
                                                            <Field
                                                                id="title"
                                                                type="text"
                                                                name="title"
                                                                placeholder="Enter title."
                                                                className="create-name"
                                                            />
                                                            {errors.title && touched.title ? (
                                                                <p className="alert">{errors.title}</p>
                                                            ) : null}

                                                        </fieldset>
                                                    </div>

                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <label htmlFor="category">Category:</label>
                                                            <Field
                                                                id="category"
                                                                type="text"
                                                                name="category"
                                                                placeholder="Enter Category."
                                                                className="create-category"
                                                            />
                                                            {errors.category && touched.category ? (
                                                                <p className="alert">{errors.category}</p>
                                                            ) : null}

                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <label htmlFor="summary">Summary:</label>
                                                            <Field
                                                                id="summary"
                                                                // as="textarea"
                                                                type="text"
                                                                name="summary"
                                                                placeholder="Enter summary."
                                                                className="create-summary"
                                                            />
                                                            {errors.summary && touched.summary ? (
                                                                <p className="alert">{errors.summary}</p>
                                                            ) : null}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <label htmlFor="image">Image:</label>
                                                            <Field type="url"
                                                                name="image"
                                                                placeholder="Link to image of the post"
                                                                className="create-image"
                                                            />
                                                            {errors.image && touched.image ? (
                                                                <p className="alert">{errors.image}</p>
                                                            ) : null}

                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <button
                                                                disabled={!(isValid && dirty)}
                                                                type="submit" id="form-submit" className={!(isValid && dirty) ? 'inactive' : 'create-btn'}>Create Post
                                                            </button>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
