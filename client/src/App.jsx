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
import AdminPrivateRoute from "./components/AdminPrivateRoute"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
import PostPage from "./pages/PostPage"
import Search from "./pages/Search"
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
            <Route path="/search" element = {<Search/>} />

            <Route element={<PrivateRoute/>}>
              <Route path="/dashboard" element = {<Dashboard/>} />
              <Route element={<AdminPrivateRoute/>} />
              <Route path="/CreatePost" element={<CreatePost/>} />
              <Route path="/update-post/:postId" element={<UpdatePost/>}/>
             
            </Route>

            <Route path="/post/:slug" element={<PostPage/>} />

          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
