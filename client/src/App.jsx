import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import ProfilePage from './pages/profilepage/ProfilePage';
import Navbar from './components/navbar/Navbar';
import Favorites from './pages/favorites/Favorites';
// import ForgotPassword from './pages/Forgot Password/ForgotPassword';
import About from './pages/about/About.jsx';
import SeeAllTemplates from './components/admin/templatesCrud/SeeAllTemplates.jsx';
import CreateTemplate from './components/admin/templatesCrud/CreateTemplate.jsx';
import UpdateTemplate from './components/admin/templatesCrud/UpdateTemplate.jsx';
import MetricsTemplates from './components/admin/templatesCrud/MetricsTemplates.jsx';

import ActivateUserByEmail from './components/admin/userCrud/ActivateUserByEmail.jsx';
import CreateAdminUser from './components/admin/userCrud/createAdminUser.jsx';
import ViewUsers from './components/admin/userCrud/seeAllUsers.jsx';
import EmailAllUsers from './components/admin/userCrud/EmailAllUsers.jsx';
import DisableUserByEmail from './components/admin/userCrud/disableUserByEmail.jsx';

import { AuthContextProvider } from './components/context/authContex.jsx';
import CartPage from './pages/cartPage/CartPage.jsx';
import PaySuccess from './components/paySuccess/PaySuccess.jsx';
import PayCancel from './components/payCancel/PayCancel.jsx';
import Prueba from './components/Prueba.jsx';
import DashboardPage from './components/admin/dashboardPage/DashboardPage.jsx';

function App() {
  const { pathname } = useLocation();

  const showNavbar = pathname !== '/' && !pathname.startsWith('/dashboard');

  return (
    <div>
      <ToastContainer />
      { showNavbar && <Navbar /> }
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Detail/:id' element={<Detail />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          {/* <Route path='/ForgotPassword' element={<ForgotPassword />} /> */}
          <Route path='/Profile' element={<ProfilePage />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/cartPage' element={<CartPage />} />
          <Route path='/About' element={<About />} />
          <Route path='/dashboard' element={<DashboardPage />}>
            <Route path='seeAllTemplates' element={<SeeAllTemplates />} />
            <Route path='createTemplate' element={<CreateTemplate />} />
            <Route path='updateTemplate' element={<UpdateTemplate />} />
            <Route path='metricsTemplates' element={<MetricsTemplates />} />
            <Route path='disableuserbyemail' element={<DisableUserByEmail />} />
            <Route path='allusers' element={<ViewUsers />} />
            <Route path='createadmin' element={<CreateAdminUser />} />
            <Route path='activateuserbyemail' element={<ActivateUserByEmail />} />
            <Route path='emailallusers' element={<EmailAllUsers />} />
            <Route path='prueba' element={<Prueba />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
