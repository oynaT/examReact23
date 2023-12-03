
import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import * as blogService from '../../services/blogService';

const CreateSchema = Yup.object().shape({
    title: Yup.string()
    .min(4, "Item name must contain atleast 4 characters")
    .required("Item title is required"),
    category: Yup.string().min(4, "Item category must contain atleast 4 characters"),
    image: Yup.string().required("Item image is required"),
    summary: Yup.string().required("Item title is required"),
  });

  export const PostCreate = ({}) => {
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
        //setPost(state => [...state, newPost]);
        toast.success(`${newPost.title} was created successfully`);
        navigate('/posts');
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
                                    summary: '',}}
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
                                                            className="create-name"
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
                                                            className="create-name"
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
              placeholder="Link to image of the item"
              className="create-image" 
            />
                                                   
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


// export const PostCreate = ({
//     onCreatePostSubmit,
// }) => {
//     const { isAuthenticated } = useContext(AuthContext);
//     const { values, onChange, onSubmit } = useForm(onCreatePostSubmit, {
//         title: '',
//         category: '',
//         image: '',
//         summary: '',
//     });

//     const [errors, setErrors] = useState({});

//     const minLength = (e, limit) => {
//         setErrors(state => ({
//             ...state,
//             [e.target.name]: values[e.target.name].length < limit,
//         }));
//     }
    

//     return (
//         <>
//             <div className="heading-page header-text">
//                 <section className="page-heading">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-12">
//                                 <div className="text-content">
//                                     <h4>Blog Post</h4>
//                                     <h2>Create your post</h2>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>

//             <section className="register-section">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-12">
//                             <div className="down-contact register-wrap">
//                                 <div className="sidebar-heading">
//                                     <h2>Create</h2>
//                                 </div>
//                                 <div className="content">
//                                     <form id="blog" method="POST" onSubmit={onSubmit}>
//                                         <div className="row">
//                                             <div className="col-md-12 col-sm-12">
//                                                 <fieldset>
//                                                     <label htmlFor="title">Post title:</label>
//                                                     <input type="text" id="title" placeholder="Title" required=""
//                                                         name="title"
//                                                        
//                                                         value={values.title}
//                                                         onBlur={(e) => minLength(e, 4)}
//                                                     />
//                                                     {errors.title &&
//                                                         <p className="form-error">
//                                                             Title should be at least 4 charaters long!
//                                                         </p>
//                                                     }
//                                                 </fieldset>
//                                             </div>

//                                             <div className="col-md-12 col-sm-12">
//                                                 <fieldset>
//                                                     <label htmlFor="category">Category:</label>
//                                                     <input type="text" id="categoty" placeholder="Category" required=""
//                                                         name="category"
//                                                        
//                                                         value={values.category}
//                                                         onBlur={(e) => minLength(e, 4)}
//                                                     />
//                                                     {errors.category &&
//                                                         <p className="form-error">
//                                                             Category should be at least 4 charaters long!
//                                                         </p>
//                                                     }
//                                                 </fieldset>
//                                             </div>
//                                             <div className="col-md-12 col-sm-12">
//                                                 <fieldset>
//                                                     <label htmlFor="summary">Summary:</label>
//                                                     <input type="text" id="summary" placeholder="Summary"
//                                                         name="summary"
//                                                        
//                                                         value={values.summary}
//                                                         onBlur={(e) => minLength(e, 10)}
//                                                     />
//                                                     {errors.category &&
//                                                         <p className="form-error">
//                                                             Summary should be at least 10 charaters long!
//                                                         </p>
//                                                     }
//                                                 </fieldset>
//                                             </div>
//                                             <div className="col-md-12 col-sm-12">
//                                                 <fieldset>
//                                                     <label htmlFor="image">Image:</label>
//                                                     <input type="text" id="image" placeholder="Image URL"
//                                                         name="image"
//                                                        
//                                                         value={values.image}
//                                                     // onBlur={(e) => minLength(e, 10)}
//                                                     />
                                                   
//                                                 </fieldset>
//                                             </div>
//                                             <div className="col-md-12 col-sm-12">
//                                                 <fieldset>

//                                                     <button
//                                                         type="submit" id="form-submit" className="main-button" >Create Post
//                                                     </button>

//                                                 </fieldset>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };