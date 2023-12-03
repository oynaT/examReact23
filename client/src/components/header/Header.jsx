import { Link } from 'react-router-dom'
import AuthContext from '../../contexts/authContext';
import { useContext } from 'react';

export default function Header() {

    const {
        isAuthenticated,
        username,
    } = useContext(AuthContext);

    return (

        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/"> <h2>Blog<em>.</em></h2></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home
                                    {/* <span className="sr-only">(current)</span> */}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/posts">All Blogs</Link>
                            </li>
                            {isAuthenticated && (
                                <>
                                    {/* <li className="nav-item">
                                    <Link className="nav-link" to="/post/details">Post Details</Link>
                                </li> */}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/post/create">Create Post</Link>
                                    </li>
                                </>
                            )}

                            <li className="nav-item">
                                <Link className="nav-link" to="/post/search">Search</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li> */}
                            {!isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                            ) : (<>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout">Logout</Link>
                                </li>
                                <li className="nav-item">
                                    <b>Welcome, <span style={{ color: '#4AD36A' }}> {username}</span></b>
                                </li>
                            </>)}
                            {/* {isAuthenticated && ( 
                            <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                            <li className="nav-item">
                                    <b>Welcome, <span style={{color: '#4AD36A' }}> {username}</span></b>
                            </li>
                            </>
                            )}  */}

                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    );
};