import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import EditProfile from './pages/EditProfile';
import EditPost from './pages/EditPost';
import Upload from './pages/Upload';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import UnderConstruction from './pages/UnderConstruction';
import Navigation from './components/Navigation';
import ProtectRoute from './components/ProtectRoute';
import SignedProvider from './context/SignedContext';
import LoadingProvider from './context/LoadingContext';

function App() {
  return (
    <Router>
      <SignedProvider>
        <LoadingProvider>
          <Navigation />
          <Routes>
            {/* Protected Routes */}
            <Route path="/profile/:profileid" element={<ProtectRoute />}>
              <Route path="/profile/:profileid" element={<Profile />} />
            </Route>

            <Route path="/edit-profile/:profileId" element={<ProtectRoute />}>
              <Route
                path="/edit-profile/:profileId"
                element={<EditProfile />}
              />
            </Route>

            <Route path="/upload" element={<ProtectRoute />}>
              <Route path="/upload" element={<Upload />} />
            </Route>

            <Route path="/edit-moment/:postId" element={<ProtectRoute />}>
              <Route path="/edit-moment/:postId" element={<EditPost />} />
            </Route>
            {/* Protected Routes */}

            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/moment/:id" element={<Post />} />

            <Route path="/under-construction" element={<UnderConstruction />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </LoadingProvider>
      </SignedProvider>
    </Router>
  );
}

export default App;
