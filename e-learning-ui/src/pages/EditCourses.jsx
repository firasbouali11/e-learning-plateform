import React, { useState, useEffect,useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import TeacherChapterCard from '../components/TeacherChapterCard';
import { Button, Modal } from '@material-ui/core';
import TeacherCourseCard from '../components/TeacherCourseCard';
import AddIcon from '@material-ui/icons/Add';
import Footer from "../components/Footer"
import Modals from "../components/Modals"
import {EditCourseTitle} from "../components/Modals"
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom"
import { motion } from "framer-motion";






const EditCourses = () => {
  const teacher = JSON.parse(localStorage.getItem("teacher"))

  const [courses, setCourses] = useState([])
  const [id, setId] = useState("")
  const [cover, setCover] = useState("")
  const [appear, setAppear] = useState(false)
  
  const CHAPTER = useRef(null)
  const [chapters, setChapters] = useState([])
  const [open, setOpen] = React.useState(false);
  const [openTitle, setOpenTitle] = React.useState(false);


  useEffect(()=>{
    fetch("http://localhost:5555/teachers/my_courses/"+teacher._id)
    .then(resp => resp.json())
    .then(data => {setCourses(data)})
    .catch(e => console.log(e))
  },[])

  useEffect(()=>{
    fetch("http://localhost:5555/chapters/"+id)
    .then(resp => resp.json())
    .then(data => setChapters(data))
    .catch(e => console.log(e))
  },[id])

  const uploadChapter = ()=>{
    CHAPTER.current.click()
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenTitle = () => {
    setOpenTitle(true);
  };

  const handleCloseTitle = () => {
    setOpenTitle(false);
  };
  const history = useHistory()

  const save =  () => {
    Swal.fire({
      icon: 'success',
      title: 'Course Updated',
      showConfirmButton: false,
      timer: 2000
    })
    history.push("/")
  }

  
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

  return (
    <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
   style={{ marginTop: 150 }} >
      <div>
        <center>
          <h1 className="title" data-aos="zoom-in" data-aos-offset="0" >Edit courses</h1>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container style={{ marginTop: "1%", marginLeft: "5%", marginRight: "5%", width: "80%", border: "none" }}>
                {courses.map((item, i) => {
                  return (
                    <Grid item md={4} onClick={e => {setId(item._id);setAppear(true);setCover(item.cover)}} data-aos="fade-up" data-aos-delay={i*100}>
                      <center>
                        <TeacherCourseCard course={item} handleOpenTitle={handleOpenTitle} />
                      </center>
                    </Grid >
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </center>
      </div>
      { appear && chapters.length ? 
      <div data-aos="fade-down" data-aos-offset="0" >
        <center>
          <Grid container spacing={3} >
            <Grid item xs={12}>
              <Paper style={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%", width: "80%", backgroundColor: "rgba(0, 0, 0, 0.7)", position: "relative" }}>
                <Grid container >
                  {chapters.map((item, i) => {
                    return (
                      <Grid item md={4}>
                        <center>
                          <TeacherChapterCard chapter={item} cover={cover} />
                        </center>
                      </Grid >
                    )
                  })}
                </Grid>
                <Button color="primary" aria-label="add" variant="contained" style={{ position: "absolute", top: "0", left: "0", width: 100, height: 70 }} onClick={handleOpen}>
                  <AddIcon />
                </Button>
                <input type="file" name="" id="" ref={CHAPTER} style={{display:"none"}} />
                <Button variant="contained" style={{ backgroundColor: "#FFFFFF", margin: "2%", width: "10%" }} onClick={save}>
                  Save
                </Button>
              </Paper>


            </Grid>
          </Grid>
        </center>
      </div>
      : null}
      <Footer />
      <Modals open={open} handleOpen={handleOpen} handleClose={handleClose} course_id={id} n_chapter={chapters.length}/>
      <EditCourseTitle open={openTitle} handleOpen={handleOpenTitle} handleClose={handleCloseTitle} course_id={id} />
    </motion.div>
  );
}

export default EditCourses