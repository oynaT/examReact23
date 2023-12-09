// import viteLogo from '/vite.svg'
import { AuthProvider } from './contexts/authContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import PostCatalog from './components/post-catalog/PostCatalog';
import PostDetails from './components/post-details/PostDetails';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import { PostCreate } from './components/post-create/PostCreate';
import PostEdit from './components/post-edit/PostEdit';
import Search from './components/search/Search';
import AuthGuard from './components/guards/AuthGuard';
import NotFound from './components/not-found/NotFound';

function App() {
 
  return (
    <>
      <AuthProvider>
        <Header />

        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<PostCatalog />} />
          <Route path='/post/create' element={<AuthGuard> <PostCreate /> </AuthGuard>} />
          <Route path='/post/:postId/edit' element={<AuthGuard><PostEdit /></AuthGuard>} />
          <Route path='/post/:postId/details' element={<PostDetails />} />
          <Route path="/post/search" element={<Search />} />
          <Route path='/logout' element={<AuthGuard> <Logout /></AuthGuard>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='*' element={<NotFound />} />
        </Routes >

        <Footer />
      </AuthProvider>
    </>
  )
}
export default App
