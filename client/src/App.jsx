import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/user/Login';
import Register from './components/user/Register'
import Live from './components/live/Live';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, addUsers } from './reducers/User';
import { GetWatch } from './functions/Watch'
import { addWatch } from './reducers/Watch';
import ManageUser from './components/manageUser/ManageUser';
import { GetUser } from './functions/User'
import { GetCategory } from './functions/Category';
import Video from './components/video/Video';
import { AddCategoryReducer } from './reducers/Category';
import Sport from './components/sport/Sport';
import ManageVideo from './components/manangeVideo/ManageVideo';
import { GetVideo } from './functions/Video';
import { AddVideoReducer } from './reducers/Video';
import { AddCommentReducer } from './reducers/Comment';
import { GetComment } from './functions/Comment';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

function App() {

  const dispatch = useDispatch();
  const User = useSelector(state => state.User);

  useEffect(() => {
    const CheckUser = () => {
      const username = window.localStorage.getItem("user");
      const isAdmin = window.localStorage.getItem("isAdmin");
      if (username) {
        dispatch(addUser({ username: username, isAdmin: isAdmin }));
      }
    }

    const GetUsers = async () => {
      const users = await GetUser();
      dispatch(addUsers({ users }))
    }

    const GetComments = async () => {
      const comment = await GetComment();
      dispatch(AddCommentReducer({ comment }))
    }

    const GetVideos = async () => {
      const videos = await GetVideo();
      dispatch(AddVideoReducer({ video: videos }));
    }

    const FetchCategory = async () => {
      const category = await GetCategory();
      dispatch(AddCategoryReducer({ category: category.map(cat => cat.category) }));
    }

    const FetchWatch = async () => {
      let list = JSON.parse(window.localStorage.getItem("lists"));

      if (!list) {

        let req = { username: User.username };
        list = await GetWatch(req);

        if (list) {
          dispatch(addWatch({ lists: list.list }));
        }
        else {
          dispatch(addWatch({ lists: [] }));
        }
      }

    }
    CheckUser();
    GetUsers();
    GetVideos();
    GetComments();
    FetchWatch();
    FetchCategory();
  }, [])

  return (
    <GoogleOAuthProvider clientId="1045489467062-clci15u88ajefk8pk827189rc8gn3usf.apps.googleusercontent.com">
      <div className="App">
        <Router>
          <Navbar />
          <div className='body'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/live' element={<Live />} />
              <Route path='/manageuser' element={<ManageUser />} />
              <Route path='/video' element={<Video />} />
              <Route path='/sport' element={<Sport />} />
              <Route path='/managevideo' element={<ManageVideo />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
              <Route path="/resetpassword/:id" element={<ResetPassword />} />
            </Routes>
          </div>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
