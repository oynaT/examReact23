import { Link } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../contexts/authContext";
import  useForm from '../../hooks/useForm';
import React from "react";


export default function Login() {

    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        email: '',
        password: '',
    });

    return (
        <>
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Login</h4>
                                    <h2>In blog</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="login-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="down-contact login-wrap">
                                <div className="sidebar-heading">
                                    <h2>Login here</h2>
                                </div>
                                <div className="content">
                                    <form id="login" onSubmit={onSubmit}>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" id="email" placeholder="Your email" required=""
                                                        name="email"
                                                        onChange={onChange}
                                                        value={values.email}
                                                        autoComplete="email"
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <label htmlFor="pass">Password:</label>
                                                    <input type="password" id="login-password" placeholder="Password"
                                                        name="password"
                                                        onChange={onChange}
                                                        value={values.password}
                                                        autoComplete="password"
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <fieldset>
                                                    <button
                                                        type="submit" id="form-submit" className="main-button">Login
                                                    </button>
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <p className="field">
                                                    <span>If you don't account? <Link to="/register">Register</Link></span>
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