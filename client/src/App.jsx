import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import SignIn from "./pages/Signin"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from './components/PrivateRoute'
function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/about" element = {<About/>} />
            <Route path="/projects" element = {<Projects/>} />
            <Route path="/signin" element = {<SignIn/>} />
            <Route path="/signup" element = {<SignUp/>} />
            <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element = {<Dashboard/>} />
            </Route>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
