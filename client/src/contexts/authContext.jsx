import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as authService from '../services/authService';
import usePersistedState from "../hooks/usePersistedState";
import { ToastContainer, toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});

    const loginSubmitHandler = async (values) => {
        try {
            const result = await authService.login(values.email, values.password);
            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            toast.success(`Welcome ${values.email}`);
            navigate("/posts");
        } catch (error) {
            toast.error(error.message);
        }

    };

    // const registerSubmitHandler = async (values) => {
    //     try {
    //         const result = await authService.register(values.username, values.email, values.password);
    //         setAuth(result);
    //         localStorage.setItem('accessToken', result.accessToken);
    //         navigate("/posts");
    //     } catch (error) {
    //         toast.error(error.message);
    //     }
    // };

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
    };

    const values = {
        loginSubmitHandler,
        //registerSubmitHandler,
        logoutHandler,
        user: auth,
        username: auth.username || auth.email,
        email: auth.email,
        userId: auth._id,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;
