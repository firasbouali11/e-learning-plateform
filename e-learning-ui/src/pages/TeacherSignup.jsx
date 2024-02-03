import React, { useRef, useState } from 'react'
import { Paper, Grid, TextField, Button, Container } from '@material-ui/core';
import Axios from "axios"
import Footer from '../components/Footer';
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import { motion } from "framer-motion";





function TeacherSignup() {
  const profileImage = useRef(null)
  const CV = useRef(null)
  const [imageProfile, setImageProfile] = useState("")
  const [cv, setCV] = useState("")
  const [fullName, setFullName] = useState("")
  const [skills, setSkills] = useState("")
  const [description, setDescription] = useState("")
  const [birthday, setBirthday] = useState("")
  const [occupation, setOccupation] = useState("")

  const [btncv, setbtncv] = useState("upload")
  const [btnimage, setbtnimage] = useState("upload")

  const history = useHistory()

  const user = JSON.parse(localStorage.getItem("user"))

  const becomeTeacher = () => {
    fetch(" http://localhost:5555/teachers", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        fullName: fullName,
        skills: skills,
        description: description,
        birthday: birthday,
        occupation: occupation,
        cv: cv,
        profileImage: imageProfile,
        user_id: user._id
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.error=="missing fields") {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Missing fields!',
          })
        }
        else if(data.error=="already a teacher"){
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Already a teacher!',
          })
        }
        else{
          // console.log(data)
          localStorage.setItem("teacher",JSON.stringify(data))
          Swal.fire({
            icon: 'success',
            title: 'You are now a teacher',
            showConfirmButton: false,
            timer: 1500
          })
          history.push("/")
        }
      })
  }


  const uploadProfileImage = () => {
    profileImage.current.click()
  }
  const uploadCV = () => {
    CV.current.click()
  }

  const getProfileImage = async (file) => {
    let data = new FormData()
    data.append("cloud_name", "firas1230")
    data.append("upload_preset", "e-learning")
    data.append("file", file[0])
    Axios.post("https://api.cloudinary.com/v1_1/firas1230/image/upload", data)
      .then(data => {
        setImageProfile(data.data.url)
        setbtnimage("done")
      })

  }
  const getCV = async (file) => {

    let data = new FormData()
    data.append("cloud_name", "firas1230")
    data.append("upload_preset", "e-learning")
    data.append("file", file[0])
    Axios.post("https://api.cloudinary.com/v1_1/firas1230/image/upload", data)
      .then(data => {
        setCV(data.data.url)
        setbtncv("done")
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
        <h1 style={{ textAlign: "center" , marginTop: 150, fontFamily:"Proxima", fontSize:60}}>Become a Teacher</h1>
        <Paper elevation={5} style={{ background: "#152238", width: "100%", borderRadius: 20, padding: "50px 20px" }} >
          <Grid container>
            <Grid item md={6}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField label="Full Name" variant="filled" style={{ margin: 15, background: "white" }} value={fullName} onChange={e => setFullName(e.currentTarget.value)} />
                <TextField label="Date of birth" variant="filled" style={{ margin: 15, background: "white" }} value={birthday} onChange={e => setBirthday(e.currentTarget.value)} />
                <div style={{ margin: 15 }}>
                  <p style={{ color: "white", fontFamily:"Gilroy" }}>Upload your profile image</p>
                  <div style={{ background: "white", height: 60, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button variant="contained" onClick={uploadProfileImage} disabled={btnimage==="done" ? true :false}>{btnimage}</Button>
                  </div>
                </div>
                <input type="file" ref={profileImage} style={{ display: "none" }} onChange={e => getProfileImage(e.currentTarget.files)} />
                <div style={{ margin: 15 }}>
                  <p style={{ color: "white", fontFamily:"Gilroy" }}>Upload your CV</p>
                  <div style={{ background: "white", height: 60, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button variant="contained" onClick={uploadCV} disabled={btncv==="done" ? true :false}>{btncv}</Button>
                  </div>
                </div>
                <input type="file" ref={CV} style={{ display: "none" }} onChange={e => getCV(e.currentTarget.files)} />
              </div>
            </Grid>
            <Grid item md={6}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField label="Current Occupation" variant="filled" value={occupation} onChange={e => setOccupation(e.currentTarget.value)} style={{ margin: 15, background: "white" }} />
                <TextField label="Skills" variant="filled" value={skills} onChange={e => setSkills(e.currentTarget.value)} style={{ margin: 15, background: "white" }} />
                <TextField label="Small Profile Description" onChange={e => setDescription(e.currentTarget.value)} value={description} variant="filled" multiline rows={5} style={{ margin: 15, background: "white" }} />
              </div>

            </Grid>

          </Grid>
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <Button variant="contained" onClick={e => becomeTeacher()} >Save</Button>
          </div>
        </Paper>
      </Container>
      <Footer />
    </motion.div>
  )
}

export default TeacherSignup
