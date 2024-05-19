import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import PrivateRoute from "./components/Routing/PrivateRoute"
import Home from "./components/GeneralScreens/Home"
import LoginScreen from "./components/AuthScreens/LoginScreen"
import RegisterScreen from "./components/AuthScreens/RegisterScreen"
import ForgotPasswordScreen from "./components/AuthScreens/ForgotPasswordScreen"
import ResetPasswordScreen from "./components/AuthScreens/ResetPasswordScreen"
import Header from "./components/GeneralScreens/Header"
import Footer from "./components/GeneralScreens/Footer"
import Profile from "./components/ProfileScreens/Profile"
import EditProfile from './components/ProfileScreens/EditProfile'
import ChangePassword from './components/ProfileScreens/ChangePassword'
import NotFound from './components/GeneralScreens/NotFound'
import AddQuestion from "./components/QuestionScreens/AddQuestion"
import DetailQuestion from "./components/QuestionScreens/DetailQuestion"
import EditQuestion from "./components/QuestionScreens/EditQuestion"
import AuthContextProvider from './context/AuthContext'



function App() {

  return (
    <AuthContextProvider>
    <Router>
      <div className='App'>
        <Routes>
            <Route path="/" element={<LayoutsWithHeader />}>
                <Route path='*' element={<NotFound />}/>

                <Route exact path='/' element={<PrivateRoute />}>
                    <Route exact path='/' element={<Home />} />
                </Route>

                <Route exact path="/question/:slug" element={<DetailQuestion />} />

                <Route exact path='/addquestion' element={<PrivateRoute />}>
                    <Route exact path='/addquestion' element={<AddQuestion/>} />
                </Route>

                <Route exact path='/profile' element={<PrivateRoute />}>
                    <Route exact path='/profile' element={<Profile />} />
                </Route>

                <Route exact path='/edit_profile' element={<PrivateRoute />}>
                  <Route exact path='/edit_profile' element={<EditProfile />} />
                </Route>

                <Route exact path='/change_Password' element={<PrivateRoute />}>
                      <Route exact path='/change_Password' element={<ChangePassword />} />
                </Route>

                <Route exact path='/question/:slug/like' element={<PrivateRoute />}>
                    <Route exact path='/question/:slug/like' element={<DetailQuestion />} />
                </Route>

                <Route exact path='/question/:slug/edit' element={<PrivateRoute />}>
                    <Route exact path='/question/:slug/edit' element={<EditQuestion />} />
                </Route>

                <Route exact path='/question/:slug/delete' element={<PrivateRoute />}>
                    <Route exact path='/question/:slug/delete' element={<DetailQuestion />} />
                </Route>

                <Route exact path='/question/:slug/addQuestion' element={<PrivateRoute />}>
                    <Route exact path='/question/:slug/addAnswer' element={<DetailQuestion />} />
                </Route>

            </Route>

            <Route exact path="login" element={<LoginScreen />} />

            <Route exact path="register" element={<RegisterScreen />} />

            <Route exact path="forgotpassword" element={<ForgotPasswordScreen />} />

            <Route exact path="resetpassword" element={<ResetPasswordScreen />} />
        </Routes>
      </div>
    </Router>
    </AuthContextProvider>
  )
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

export default App
