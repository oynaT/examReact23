
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import { useNavigate, useParams } from "react-router-dom";
import * as blogService from '../../services/blogService';
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validUrl = /^https?:\/\//;

const CreateSchema = Yup.object().shape({
    title: Yup.string().trim()
        .min(4, "Item name must contain atleast 4 characters")
        .required("Item title is required"),
    category: Yup.string().trim().min(4, "Item category must contain atleast 4 characters"),
    //image: Yup.string().required("Item image is required"),
    image: Yup.string().matches(validUrl, "Enter a valid URL! Url should start with http:// or https://").required(),
    summary: Yup.string().trim().required("Item title is required"),
});


export default function PostEdit() {

    const navigate = useNavigate();
    const { postId } = useParams();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState({
        title: '',
        category: '',
        image: '',
        summary: '',
    });
    const [errMsg, setErrMsg] = useState({
        message: "",
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
            const result = await blogService.edit(postId, values, user.accessToken);
            toast.success(`${values.title} was created successfully`);
            navigate(`/post/${postId}/details`);
        } catch (error) {
            toast.error(result.message);
        }
    }

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
                                    <Formik
                                        initialValues={{
                                            title: post.title || '',
                                            category: post.category || '',
                                            image: post.image || '',
                                            summary: post.summary || '',
                                        }}
                                        validationSchema={CreateSchema}
                                        enableReinitialize={true}
                                        onSubmit={editPostSubmitHandler}
                                    >
                                        {({ values, errors, touched, isValid, dirty }) => (
                                            <Form id="blog" onSubmit={editPostSubmitHandler}>
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <label htmlFor="title">Post title:</label>
                                                            <Field
                                                                id="title"
                                                                type="text"
                                                                name="title"
                                                                placeholder="Enter title."
                                                                className="edit-name"
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
                                                                className="edit-category"
                                                            />
                                                            {errors.category && touched.category ? (
                                                                <p className="alert">{errors.category}</p>
                                                            ) : null}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <Field
                                                                id="summary"
                                                                // as="textarea"
                                                                type="text"
                                                                name="summary"
                                                                placeholder="Enter summary."
                                                                className="edit-summary"
                                                            />
                                                            {errors.summary && touched.summary ? (
                                                                <p className="alert">{errors.summary}</p>
                                                            ) : null}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <label htmlFor="image">Image:</label>
                                                            <Field type="text"
                                                                name="image"
                                                                placeholder="Link to image of the post"
                                                                className="edit-image"
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
                                                                type="submit" id="form-submit" className={!(isValid && dirty) ? 'inactive' : 'edit-btn'}>Edit Post
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