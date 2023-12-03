
import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
//import useForm from '../../hooks/useForm';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import * as authService from '../../services/authService';

const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, "Username should be at least 5 characters")
        .matches(
            /[a-zA-Z0-9]+/g,
            "Username must contain only latin letters and digits"
        )
        .required("Username is required"),
    email: Yup.string()
        .email()
        .matches(/^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/, "Email must be valid")
        .required("Email is required"),
    password: Yup.string()
        .min(5, "Password must be at least 5 characters long")
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
});

export default function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errMsg, setErrMsg] = useState({
        message: "",
    });

    const { loginSubmitHandler } = useContext(AuthContext);

    const handleSubmit = async (values) => {
        console.log(values);
        try {
            const result = await authService.register(values.username, values.email, values.password);
            toast.success(`Welcome ${values.username}`);
            loginSubmitHandler(result);
            //navigate("/posts");
        } catch (error) {
            toast.error(error.message);
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
                                    <h4>Register</h4>
                                    <h2>For our blog</h2>
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
                                    <h2>Register here</h2>
                                </div>

                                <div className="content">
                                    <Formik
                                        initialValues={{
                                            username: "",
                                            email: "",
                                            password: "",
                                            confirmPassword: "",
                                        }}
                                        validationSchema={RegisterSchema}
                                        onSubmit={handleSubmit}  >
                                        {({ values, errors, touched, isValid, dirty }) => (
                                            <Form id="register" method="post">
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <label htmlFor="username">Username:</label>
                                                            <Field
                                                                id="username"
                                                                name="username"
                                                                placeholder="Enter your Username"
                                                                className="register-user"
                                                            />
                                                            {errors.username && touched.username ? (
                                                                <p className="alert">{errors.username}</p>
                                                            ) : null}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <label htmlFor="email">Email:</label>
                                                            <Field
                                                                name="email"
                                                                id="email"
                                                                className="register-email"
                                                                placeholder="Enter your Email"
                                                            />
                                                            {errors.email && touched.email ? (
                                                                <p className="alert">{errors.email}</p>
                                                            ) : null}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <label htmlFor="password">Password:</label>
                                                            <Field
                                                                type="password"
                                                                // id="password"
                                                                name="password"
                                                                placeholder="Enter your Password"
                                                                value={values.password}
                                                                autoComplete="password"
                                                            />
                                                            {errors.password && touched.password ? (
                                                                <p className="alert">{errors.password}</p>
                                                            ) : null}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <label htmlFor="confirm-password">Confirm Password:</label>
                                                            <Field
                                                                type="password"
                                                                id="confirm-password"
                                                                name="confirmPassword"
                                                                placeholder="Repeat your Password"
                                                                value={values.confirmPassword}
                                                                autoComplete="confirm-password"
                                                            />
                                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                                <p className="alert">{errors.confirmPassword}</p>
                                                            ) : null}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <button
                                                                type="submit"
                                                                disabled={!(isValid && dirty)}
                                                                id="form-submit" className={
                                                                    !(isValid && dirty) ? "inactive-register" : "register-btn"
                                                                }>Register
                                                            </button>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <p className="field">
                                                            <span>If you already have profile <a href="/login">Login</a></span>
                                                        </p>
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

// export default function Register() {

//     const { registerSubmitHandler } = useContext(AuthContext);
//     const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     return (
//         <>
//             <div className="heading-page header-text">
//                 <section className="page-heading">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-12">
//                                 <div className="text-content">
//                                     <h4>Register</h4>
//                                     <h2>For our blog</h2>
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
//                                     <h2>Register here</h2>
//                                 </div>
//                                 <div className="content">
//                                     <form id="register" method="post" onSubmit={onSubmit}>
//                                         <div className="row">
//                                             <div className="col-md-12 col-sm-12">
//                                                 <fieldset>
//                                                     <label htmlFor="username">Username:</label>
//                                                     <input type="text" id="username" placeholder="Username" required=""
//                                                         name="username"
//
//                                                         value={values.username}
//                                                         autoComplete="username"/>
//                                                 </fieldset>
//                                             </div>

//                                             <div className="col-md-12 col-sm-12">
//                                                 <fieldset>
//                                                     <label htmlFor="email">Email:</label>
//                                                     <input type="email" id="email" placeholder="Your email" required=""
//                                                         name="email"
//                                                         value={values.email}
//
//                                                         autoComplete="email" />
//                                                 </fieldset>
//                                             </div>
//                                             <div className="col-md-12 col-sm-12">
//                                                 <fieldset>
//                                                     <label htmlFor="pass">Password:</label>
//                                                     <input type="password" id="password" placeholder="Password"
//                                                         name="password"
//
//                                                         value={values.password}
//                                                         autoComplete="password"
//                                                     />
//                                                 </fieldset>
//                                             </div>
//                                             <div className="col-md-12 col-sm-12">
//                                                 <fieldset>
//                                                     <label htmlFor="confirm-password">Confirm Password:</label>
//                                                     <input type="password" id="confirm-password" placeholder="Confirm Password:"
//                                                         name="confirmPassword"
//
//                                                         value={values.confirmPassword}
//                                                         autoComplete="confirm-password"
//                                                     />
//                                                 </fieldset>
//                                             </div>
//                                             <div className="col-md-12 col-sm-12">
//                                                 <fieldset>
//                                                     <button
//                                                         type="submit" id="form-submit" className="main-button">Register
//                                                     </button>
//                                                 </fieldset>
//                                             </div>
//                                             <div className="col-md-12 col-sm-12">
//                                                 <p className="field">
//                                                     <span>If you already have profile <a href="/login">Login</a></span>
//                                                 </p>
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