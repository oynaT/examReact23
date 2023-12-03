
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import  useForm from '../../hooks/useForm';

export default function Register() {

    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

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
                                    <form id="register" method="post" onSubmit={onSubmit}>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="username">Username:</label>
                                                    <input type="text" id="username" placeholder="Username" required=""
                                                        name="username"
                                                        onChange={onChange}
                                                        value={values.username}
                                                        autoComplete="username"/>
                                                </fieldset>
                                            </div>

                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" id="email" placeholder="Your email" required=""
                                                        name="email"
                                                        value={values.email}
                                                        onChange={onChange}
                                                        autoComplete="email" />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="pass">Password:</label>
                                                    <input type="password" id="password" placeholder="Password"
                                                        name="password"
                                                        onChange={onChange}
                                                        value={values.password}
                                                        autoComplete="password"
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="confirm-password">Confirm Password:</label>
                                                    <input type="password" id="confirm-password" placeholder="Confirm Password:"
                                                        name="confirmPassword"
                                                        onChange={onChange}
                                                        value={values.confirmPassword}
                                                        autoComplete="confirm-password"
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <button
                                                        type="submit" id="form-submit" className="main-button">Register
                                                    </button>
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <p className="field">
                                                    <span>If you already have profile <a href="/login">Login</a></span>
                                                </p>
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