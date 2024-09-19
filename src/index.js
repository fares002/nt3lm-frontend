import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './components/homePage';
import LoginForm from './components/loginForm';
import SignupForm from './components/registraion';
import About from './components/About';
import ContactPage from './components/contactPage';
import AddCourse from './components/addCourse';
import CourseTable from './components/viewAllCourses'
import EditCourse from './components/editCourse';
import CourseDetails from './components/courseDetails';
import AddVideosToCourse from './components/addVideoToCourse';
import CourseVideos from './components/courseVideos'
import Landing from './components/landing'
import Dashboard from './components/myCourses';
import UserProfile from './components/profile'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignupForm/>}/>
        <Route path='/about'element={<About/>}/>
        <Route path='/contact'element={<ContactPage/>}/>
        <Route path='/addcourse' element={<AddCourse/>}/>
        <Route path='/allCourses' element={<CourseTable/>}/>
        <Route path='/editCourse' element={<EditCourse/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path='/courses/:courseId/addVideos' element={<AddVideosToCourse/>}/>
        <Route path='/courses/:courseId/Videos' element={<CourseVideos/>}/>
        <Route path='/mycourses'element = {<Dashboard/>}/>
        <Route path='/profile' element= {<UserProfile/>}/>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

