import React, { useRef, useState } from 'react'
import { Paper, Grid, TextField, Button, Container, LinearProgress } from '@material-ui/core';
import Axios from "axios"
import Footer from '../components/Footer';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';




function TeacherSignup() {
  const CHAPTERS = useRef(null)
  const COVER = useRef(null)
  let chapters = []
  const [loading, setLoading] = useState(false)
  const [cover, setCover] = useState("")
  const [displayedChapters, setDisplayedChapters] = useState([])
  const [title, settitle] = useState("")
  const [level, setlevel] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [category, setcategory] = useState("5f5f90748749b61cf070294f")

  const [btnchapters, setbtnchapters] = useState("upload")
  const [btncover, setbtncover] = useState("upload")
  const [progress, setProgress] = useState(0);
  const history = useHistory()


  const teacher = JSON.parse(localStorage.getItem("teacher"))


  const uploadChapters = () => {
    CHAPTERS.current.click()
  }
  const uploadCover = () => {
    COVER.current.click()
  }

  const getChapters = async (files) => {
    for (let i = 0; i < files.length; i++) {
      let data = new FormData()
      data.append("cloud_name", "firas1230")
      data.append("upload_preset", "e-learning")
      data.append("file", files[i])
      let aa = await Axios.post("https://api.cloudinary.com/v1_1/firas1230/video/upload", data)
      console.log(aa)
      chapters.push({
        "title": files[i].name.split(".")[0],
        "n_chapter": i + 1,
        "video": aa.data.url
      })
      await setProgress( prevState => (prevState + (1/files.length)*100))
    }
    setLoading(true)
    setbtnchapters("done")
    console.log(chapters)
    setDisplayedChapters(chapters)
  }

  const getCover = (file) => {

    let data = new FormData()
    data.append("cloud_name", "firas1230")
    data.append("upload_preset", "e-learning")
    data.append("file", file[0])
    Axios.post("https://api.cloudinary.com/v1_1/firas1230/image/upload", data)
      .then(data => {
        setCover(data.data.url)
        setbtncover("done")
      })
  }

  const uploadCourse = () => {
    fetch("http://localhost:5555/courses", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        category: category,
        price: price,
        description: description,
        cover: cover,
        level: level,
        author: teacher._id
      })
    })
      .then(data => data.json())
      .then(async (data) => {

        console.log(data)
        if (!data.error) {
          for (let chapter of displayedChapters) {
            let x = await fetch("http://localhost:5555/chapters", {
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                course_id: data._id,
                title: chapter.title,
                video: chapter.video,
                n_chapter: chapter.n_chapter
              })
            })

          }
          fetch(" http://localhost:5555/teachers/uploadCourse/" + data._id, {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              teacher_id: teacher._id
            })
          })
            .then(aa => {
              console.log("done")
              Swal.fire({
                title:"Upload",
                icon:"success",
                text:"the course is added successfuly !"
              })
              history.push("/")
            })
        }
      })

      
      
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
  >
      <Container data-aos="zoom-in">
        <h1 style={{ textAlign: "center", marginTop: 150 }} >Upload a new course</h1>
        <Paper elevation={5} style={{ background: "#152238", width: "100%", borderRadius: 20, padding: "50px 20px" }} >
          <Grid container>
            <Grid item md={6}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField label="Course Title" variant="filled" style={{ margin: 15, background: "white" }} value={title} onChange={e => settitle(e.currentTarget.value)} />
                <TextField label="Course Level" variant="filled" style={{ margin: 15, background: "white" }} value={level} onChange={e => setlevel(e.currentTarget.value)} />
                <TextField label="Course Description" variant="filled" multiline rows={5} style={{ margin: 15, background: "white" }} value={description} onChange={e => setdescription(e.currentTarget.value)} />
              </div>

            </Grid>
            <Grid item md={6}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField label="Course Price" variant="filled" style={{ margin: 15, background: "white" }} value={price} onChange={e => setprice(e.currentTarget.value)} />
                <div style={{ margin: 15 }}>
                  <p style={{ color: "white" }}>Upload the course chapters:</p>
                  <p style={{ color: "white", fontSize: 10 }}>Each pdf file or video represents a chapter of the course</p>
                  <div style={{ background: "white", height: 60, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button variant="contained" disabled={btnchapters==="done" ? true :false} onClick={uploadChapters}>{btnchapters}</Button>
                  </div>
                  <div style={{width:"100%"}}>
                    <LinearProgress style={{height:10}} variant="determinate" value={progress} />
                  </div>
                </div>
                <input type="file" ref={CHAPTERS} style={{ display: "none" }} multiple onChange={e => getChapters(e.currentTarget.files)} />
                <div style={{ margin: 15 }}>
                  <p style={{ color: "white" }}>Upload the course cover</p>
                  <div style={{ background: "white", height: 60, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button variant="contained" disabled={btncover==="done" ? true :false} onClick={uploadCover}>{btncover}</Button>
                  </div>
                </div>
                <input type="file" ref={COVER} style={{ display: "none" }} onChange={e => getCover(e.currentTarget.files)} />
              </div>
            </Grid>
          </Grid>

        </Paper>
        {!loading ? null :
          <Paper elevation={5} style={{ marginTop: 50, width: "100%" }}>
            <Grid container>
              {displayedChapters.map((data) => (
                <Grid item md={4} style={{ padding: "1%" }}>
                  <div style={{ width: "100%" }}>
                    {/* <img src={gardening} alt={"aa"} style={{ width: "100%", height: "100%" }} /> */}
                    <video src={data.video} style={{ width: "100%", height: "100%" }} ></video>
                    <p>Chapter {data.n_chapter}: {data.title.split(".")[0]}</p>
                  </div>
                </Grid>
              ))}
            </Grid>
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <Button variant="contained" onClick={uploadCourse}>Upload</Button>
            </div>
          </Paper>
        }
      </Container>
      <Footer />
    </motion.div>
  )
}

export default TeacherSignup
