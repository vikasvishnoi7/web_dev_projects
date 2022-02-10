import React from 'react';
import './static/scss/app.scss';
import 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Header from './components/presentation/header';
import Footer from './components/presentation/footer';
import LandingPage from './components/presentation/landingPage';
import GettingStarted from './components/presentation/gettingStarted';
import Login from './components/presentation/login';
import Register from './components/presentation/register';
import AboutUs from './components/presentation/aboutUs';
import Contacts from './components/presentation/contact';
import Education from './components/presentation/education';
import Finalize from './components/presentation/finalizePage';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <div>

      <Header></Header>

      <Routes>
        <Route path="/education" element={<PrivateRoute><Education /></PrivateRoute>}></Route>
        <Route path="/contact" element={<PrivateRoute><Contacts /></PrivateRoute>}></Route>
        <Route path="/getting-started" element={<PrivateRoute><GettingStarted /></PrivateRoute>}></Route>
        <Route path="/resume-templates" element={<PrivateRoute><GettingStarted /></PrivateRoute>}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/finalize" element={<PrivateRoute><Finalize /></PrivateRoute>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
      <Footer></Footer>
    </div>

  );
}

export default App;