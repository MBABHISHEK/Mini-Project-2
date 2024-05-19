import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import PrivateRoute from "./components/Routing/PrivateRoute";
import Home from "./components/GeneralScreens/Home";
import LoginScreen from "./components/AuthScreens/LoginScreen";
import RegisterScreen from "./components/AuthScreens/RegisterScreen";
import ForgotPasswordScreen from "./components/AuthScreens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/AuthScreens/ResetPasswordScreen";
import Header from "./components/GeneralScreens/Header";
import Footer from "./components/GeneralScreens/Footer";
import Profile from "./components/ProfileScreens/Profile";
import EditProfile from './components/ProfileScreens/EditProfile';
import ChangePassword from './components/ProfileScreens/ChangePassword';
import NotFound from './components/GeneralScreens/NotFound';
import AddQuestion from "./components/QuestionScreens/AddQuestion";
import DetailQuestion from "./components/QuestionScreens/DetailQuestion";
import EditQuestion from "./components/QuestionScreens/EditQuestion";
import AuthContextProvider from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/" element={<LayoutsWithHeader />}>
              <Route path="*" element={<NotFound />} />
              
              <Route path="/" element={<PrivateRoute />}>
                <Route index element={<Home />} />
              </Route>

              <Route path="/question/:slug" element={<DetailQuestion />} />

              <Route path="/addquestion" element={<PrivateRoute />}>
                <Route index element={<AddQuestion />} />
              </Route>

              <Route path="/profile" element={<PrivateRoute />}>
                <Route index element={<Profile />} />
              </Route>

              <Route path="/edit_profile" element={<PrivateRoute />}>
                <Route index element={<EditProfile />} />
              </Route>

              <Route path="/change_password" element={<PrivateRoute />}>
                <Route index element={<ChangePassword />} />
              </Route>

              <Route path="/question/:slug/like" element={<PrivateRoute />}>
                <Route index element={<DetailQuestion />} />
              </Route>

              <Route path="/question/:slug/edit" element={<PrivateRoute />}>
                <Route index element={<EditQuestion />} />
              </Route>

              <Route path="/question/:slug/delete" element={<PrivateRoute />}>
                <Route index element={<DetailQuestion />} />
              </Route>

              <Route path="/question/:slug/addAnswer" element={<PrivateRoute />}>
                <Route index element={<DetailQuestion />} />
              </Route>

            </Route>

            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
            <Route path="/resetpassword" element={<ResetPasswordScreen />} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

const LayoutsWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
