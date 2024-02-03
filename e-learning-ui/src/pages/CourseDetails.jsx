import React, { useState, useEffect, createContext } from 'react'
import Chapters from '../components/Chapters'
import Comments, { CommentForm } from '../components/Comments'
import { Button, Grid } from '@material-ui/core'
import Footer from '../components/Footer'
import Video from '../components/Video'
import { motion } from "framer-motion";
import Swal from "sweetalert2"
import { useHistory } from 'react-router-dom'



export const ThemeContext = createContext()

const pageVariants = {
  initial: {
    opacity: 0

  },
  in: {
    opacity: 1

  },
  out: {
    opacity: 0
  }
};

function CourseDetails() {

  const [selectedIndex, setSelectedIndex] = React.useState(1);  // indice du chapitre a affiché

  const handleListItemClick = (event, index) => {  // changer l'indice du chapitre
    setSelectedIndex(index);
    
  };
 
  const [course, setCourse] = useState({}) // l'objet du cours choisie
  const [progress, setProgress] = useState(0)   // le progres du cours 
  const [chapters, setChapters] = useState([]) // tableau des chapitre de ce cours 
  const [video, setVideo] = useState("")   // le lien du video du chapitre
  const [comments, setComments] = useState([]) // les commentaires de ce cours

  const user = JSON.parse(localStorage.getItem("user"))   // lobjet de l'utilisateur a partir du localStorage

  const history = useHistory()  // instance de navigation

  useEffect(() => {   // avoir le cours a partir de l'id du cours
    const tab = window.location.href.split("/")
    const id = tab[tab.length - 1]   // recuperer l'id du cours a partir de l'url
    fetch("http://localhost:5555/courses/getCourse/" + id,{
      method:"post",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        userid:user._id
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.error){
          Swal.fire({   // pop up si j'ai pas acheter le cours et je veux l'accéder
            title:"warning",
            icon:"warning",
            text:data.error
          })
          history.goBack()
        } 
        setCourse(data)

      })
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {   // 
    const tab = window.location.href.split("/")
    const id = tab[tab.length - 1]  
    fetch("http://localhost:5555/courses/getCourse/" +id)
    .then(resp => resp.json())  
    .then(data => { setCourse(data) })
    .catch(e => {console.log(e)})
    },[])

    
  useEffect(() => {    // mise a jour du progrée de chaque etudiant dans ce cours
    const tab = window.location.href.split("/")
    const id = tab[tab.length - 1]
    console.log(id)
    fetch("http://localhost:5555/users/progress/" + id,{ 
      headers:{
      "content-type":"application/json"
      },
      method:"post",
      body:JSON.stringify({
          user_id:user._id
      })})
      .then(resp => resp.json())
      .then(data => { setProgress(data)})
      .catch(e => console.log(e))
  }, [])


  useEffect(() => {
    const tab = window.location.href.split("/")
    const id = tab[tab.length - 1]
    fetch(" http://localhost:5555/chapters/" + id)
      .then(resp => resp.json())
      .then(data => setChapters(data))
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    const tab = window.location.href.split("/")
    const id = tab[tab.length - 1]
    fetch("http://localhost:5555/comments/" + id)
      .then(resp => resp.json())
      .then(data => setComments(data))
      .catch(e => console.log(e))
  }, [])

  function FinishChapter(){
    const tab = window.location.href.split("/")
    const id = tab[tab.length - 1]  
    if(progress<selectedIndex){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'You should complete the previous chapter!',
      })
    }else if(progress<chapters.length-1){
      Swal.fire({
        icon: 'success',
        title: 'You finished this chapter,<br> you can now go to the next chapter!',
      })
      setProgress(progress+1)
    }else{
      Swal.fire({
        icon: 'success',
        title: 'You finished this Course, Congratulation!',
      })

    }

    fetch("http://localhost:5555/users/progress/"+id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          user_id : user._id ,
          currentChapter : progress+1
      })
    }).then(()=>{console.log(progress)})
  }

  return (

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <h1 style={{ textAlign: "center", marginTop: 150 }} data-aos="zoom-in">{course.title} </h1>
        <div>
          <Grid container>
            <Grid item md={8} style={{ padding: "0 2%" }} data-aos="fade-right" data-aos-delay="300">
              <Video url={video} />
            </Grid>
            <Grid item md={4} style={{ padding: "0 2%" }} data-aos="fade-left" data-aos-delay="300">
              <Chapters chapters={chapters} setUrl={setVideo} handleListItemClick={handleListItemClick} selectedIndex={selectedIndex}/>
            </Grid>

          </Grid>
          <div style={{ width: "60%" }}>
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <Button variant="contained" color="primary" onClick={()=>FinishChapter()}>
                I finished this chapter
            </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: 50 }}>
              <Button variant="contained" color="primary"  onClick={async()=>{await setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : 0);  setVideo(chapters[selectedIndex-1>0?selectedIndex-1:0].video)}}>
                Previous Chapter
            </Button>
              <Button variant="contained" color="primary" onClick={async()=>{await setSelectedIndex(selectedIndex < chapters.length - 1 ? selectedIndex + 1 : selectedIndex); setVideo(chapters[selectedIndex+1<chapters.length?selectedIndex+1:selectedIndex].video)}}>
                Next Chapter
            </Button>
            </div>
          </div>
          <br />
          <h1 style={{ marginLeft: 50, marginTop: 100 }} data-aos="zoom-up">Comments & Feedbacks</h1>
          {comments.map((comment) => (
            <div data-aos="fade-right" >
              <Comments comment={comment} />
            </div>
          ))}
          <div data-aos="fade-up">
            <CommentForm />

          </div>
          <Footer />
        </div>
      </motion.div>
  )
}

export default CourseDetails
