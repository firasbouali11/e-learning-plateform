import React,{useState,useEffect} from "react";
import "./App.css";
import Home from "./pages/Home";
import CategoryCourses from "./pages/CategoryCourses";
import Login from "./pages/Login";
import Panier from "./pages/Panier";
import Navbar from "./components/Navbar";
import EditCourses from "./pages/EditCourses";
import Userprofile from "./pages/UserProfile";
import { Route, Switch ,Redirect} from "react-router-dom";
import TeachSignup from "./pages/TeacherSignup";
import CourseUpload from "./pages/CourseUpload";
import CourseDetails from "./pages/CourseDetails";
import TeacherProfile from "./pages/TeacherProfile";
import Signup from "./pages/Signup";
import AOS from "aos"
import 'aos/dist/aos.css';
import { AnimatePresence} from "framer-motion";
import ParticleComponent from "./components/ParticleComponent";
import Search from "./pages/Search";
AOS.init({
  offset:300
})

const user = JSON.parse(localStorage.getItem("user"))

function App() {
  const [cartCount,setCartCount] = useState(0)
  useEffect(()=>{
    if(user){
      fetch(" http://localhost:5555/cart/byuser/"+user._id)
      .then(resp => resp.json())
      .then(data => {
        const a = Array(data)[0]
        setCartCount(a.length)
      })
      .catch(e => console.log(e))
    }
  },)

  let listener = null
  const [scrollState, setScrollState] = useState("top")
  const [background,setBackground] = useState("rgba(255,255,255,0)")
  const [searchtitle,setsearchtitle] = useState("")

  useEffect(() => {
    listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 100) {
        if (scrollState !== "firas") {
          setScrollState("firas")
          setBackground("linear-gradient(180deg, #152238 14%, rgba(28, 46, 74, 0.61) 130%, rgba(35, 57, 93, 0.44) 190%)")
        }
      } else {
        if (scrollState !== "top") {
          setScrollState("top")
          setBackground("rgba(255,255,255,0)")
        }
      }
    })
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [scrollState])
  return (
    <div>
      <AnimatePresence>   {/* gestion des  */}
    <ParticleComponent />  {/* le components des particules dans le background */}
      <Switch> {/* le components qui sert a selectionner la page voulue */}
        <Route exact path="/">  {/* l'interface de la page d'accueil */}
          <Navbar setsearchtitle={setsearchtitle} cartCount={cartCount} background={background}/> {/* le component du navbar */}
          <Home setCartCount={setCartCount}/>
        </Route>
        <Route path="/categories"> {/* l'interface de la page des cours */}
          <Navbar setsearchtitle={setsearchtitle} cartCount={cartCount} background="linear-gradient(180deg, #152238 14%, rgba(28, 46, 74, 0.61) 130%, rgba(35, 57, 93, 0.44) 190%)" />
          <CategoryCourses setCartCount={setCartCount}/>
        </Route>
        <Route path="/cart">   {/* l'interface du panier */}
          {localStorage.getItem("token") ? <>    {/* verification si l'utilisateur est authentifié */}
          <Navbar setsearchtitle={setsearchtitle} cartCount={cartCount} background="linear-gradient(180deg, #152238 14%, rgba(28, 46, 74, 0.61) 130%, rgba(35, 57, 93, 0.44) 190%)" />
          <Panier setCartCount={setCartCount}/>
          </> : <Login />}
        </Route>
        <Route path="/login"> {/* l'interface du login */}
          <Login />
        </Route>
        <Route path="/signup"> {/* l'interface du signup */}
          <Signup />
        </Route>
        <Route path="/edit-courses"> {/* l'interface de l'edite des cours  */}
          <Navbar setsearchtitle={setsearchtitle} cartCount={cartCount} background="linear-gradient(180deg, #152238 14%, rgba(28, 46, 74, 0.61) 130%, rgba(35, 57, 93, 0.44) 190%)" />
          {localStorage.getItem("teacher") ? <EditCourses /> : localStorage.getItem("token") ? <TeachSignup /> : <Login /> } 
        </Route>
        <Route path="/profile"> {/* l'interface du profile */}
          <Navbar setsearchtitle={setsearchtitle} cartCount={cartCount} background="linear-gradient(180deg, #152238 14%, rgba(28, 46, 74, 0.61) 130%, rgba(35, 57, 93, 0.44) 190%)" />
          {localStorage.getItem("token") ? <Userprofile /> : <Login />}  {/* verification si l'utilisateur est authentifié */ }
        </Route>
        <Route path="/teacher-signup">  {/* l'interface du teacher singup */}
          <Navbar setsearchtitle={setsearchtitle} cartCount={cartCount} background="linear-gradient(180deg, #152238 14%, rgba(28, 46, 74, 0.61) 130%, rgba(35, 57, 93, 0.44) 190%)" />
          {localStorage.getItem("token") ? <TeachSignup /> : <Login />}  {/* verification si l'utilisateur est authentifié */}
        </Route>
        <Route path="/course-upload">  {/* l'interface de l'upload des cours */}
          <Navbar setsearchtitle={setsearchtitle} cartCount={cartCount} background="linear-gradient(180deg, #152238 14%, rgba(28, 46, 74, 0.61) 130%, rgba(35, 57, 93, 0.44) 190%)" />
          {localStorage.getItem("teacher") ? <CourseUpload /> : localStorage.getItem("token") ? <TeachSignup /> : <Login /> } {/* verification si l'utilisateur est un tutor*/}
        </Route>
        <Route path="/details">  {/* l'interface d'un cours */}
          <Navbar setsearchtitle={setsearchtitle} cartCount={cartCount} background="linear-gradient(180deg, #152238 14%, rgba(28, 46, 74, 0.61) 130%, rgba(35, 57, 93, 0.44) 190%)" />
          <CourseDetails />
        </Route>
        <Route path="/teacher-profile"> {/* l'interface du profile de tutor */}
          <Navbar setsearchtitle={setsearchtitle} cartCount={cartCount} background="linear-gradient(180deg, #152238 14%, rgba(28, 46, 74, 0.61) 130%, rgba(35, 57, 93, 0.44) 190%)" />
          {localStorage.getItem("teacher") ? <TeacherProfile /> : localStorage.getItem("token") ? <TeachSignup /> : <Login /> } {/* verification si l'utilisateur est un tutor */}
        </Route>
        <Route path="/search"> {/* l'interface qui affiche les cours recherché */}
        <Navbar setsearchtitle={setsearchtitle} cartCount={cartCount} background="linear-gradient(180deg, #152238 14%, rgba(28, 46, 74, 0.61) 130%, rgba(35, 57, 93, 0.44) 190%)" />
          <Search title={searchtitle} setCartCount={setCartCount} />
        </Route>
      </Switch>
      </AnimatePresence>
    </div>
  );
}


export default App;