// import viteLogo from '/vite.svg'
import { AuthProvider } from './contexts/authContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as blogService from '../src/services/blogService';

import About from "./components/about/About"
import Contact from './components/contact/Contact';

import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import PostCatalog from './components/post-catalog/PostCatalog';
import PostDetails from './components/post-details/PostDetails';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import { PostCreate } from './components/post-create/PostCreate';
import  PostEdit from './components/post-edit/PostEdit';
import Search from './components/search/Search';
import AuthGuard from './components/guards/AuthGuard';
import { ToastContainer, toast } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
      blogService.getAll()
          .then(result => {
            setPosts(result)
          })
  }, []);

  const onCreatePostSubmit = async (data) => {
      const newPost = await blogService.create(data);

      setPosts(state => [...state, newPost]);

      navigate('/posts');
  };

  return (
    <>
      <AuthProvider>
        <Header />

        <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

        <Routes>
          <Route path='/' element={<Home posts={posts} />} />
          <Route path='/posts' element={<PostCatalog posts={posts}/>} />
          <Route path='/post/create' element={<AuthGuard> <PostCreate onCreatePostSubmit={onCreatePostSubmit} /> </AuthGuard>} />
          <Route path='/post/:postId/edit' element={<AuthGuard><PostEdit /></AuthGuard>} />
          
          <Route path='/post/:postId/details' element={<PostDetails />} />

          <Route path="/post/search" element={<Search />} />
          
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />

          <Route path='/logout' element={<Logout />} />

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes >

        <Footer />
      </AuthProvider>
    </>
  )
}
export default App
