import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NoPage from './components/NoPage';
import CoursePage from './components/CoursePage';
import Login from './components/navbarComponents/Login';
import Register from './components/navbarComponents/Register';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
const baseURL = "https://course-evaluations-api.onrender.com"

const App = () => {
  const [courses, setCourses] = useState(null);
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(baseURL + '/api/courses');
        console.log(response)
        const json = await response.json();
        
        setCourses(json);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Once courses are fetched, generate the dynamic course routes
  const generateCourseRoutes = () => {
    if (!courses) return null;

    return Object.values(courses).map((course) => (
      <Route
        key={course._id}
        path={`/${course.title}`}
        element={<CoursePage course={course} />}
        errorElement={<NoPage />}
      />
    ));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} errorElement={<NoPage />} />
          <Route path="/evaluation" element={<Home />} errorElement={<NoPage />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} errorElement={<NoPage />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>} errorElement={<NoPage />} />
          {courses ? generateCourseRoutes() : null}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
