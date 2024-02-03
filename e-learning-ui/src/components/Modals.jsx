import React ,{useEffect, useRef, useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';


//css
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function TransitionsModal({ open, handleClose,course_id,n_chapter }) {
    const classes = useStyles();
    const CHAPTER = useRef(null) // refrence pour le chapitre input type file

    const [btncover,setbtncover] = useState("upload")  // state  pour la photo de couverture
    const [video,setVideo] = useState("upload") // state pour la video du chapitre 
    const [title,setTitle] = useState("")  // state pour le titre du cours

    const uploadCover = ()=>{   // declanche l'evenement de click a l'input type file
        CHAPTER.current.click()
    }

    const getChapter = (file)=>{   // fonction qui appload le le video d'un chapitre dans le cloud
        let data = new FormData()
        data.append("cloud_name", "firas1230")
        data.append("upload_preset", "e-learning")
        data.append("file", file[0])
        Axios.post("https://api.cloudinary.com/v1_1/firas1230/video/upload", data)
      .then(data => {
          setVideo(data.data.url)
          console.log(data.data.url)
        setbtncover("done")
      })
      }

    const uploadChapter = ()=>{   // finction qui met a jour la base de données des chapitres
        fetch("http://localhost:5555/chapters/",{
            headers:{
                "content-type":"application/json"
            },
            method:"post",
            body:JSON.stringify({
                course_id:course_id,
                title:title,
                video:video,
                n_chapter:n_chapter,
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))
    }

    

    return (
        <div>
            {/* ce modal est le responsable pour la creation d'un nouveau chapitre si le tutor veut edite le cours */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {/* le titre du chapitre */}
                        <TextField label="Chapter title" variant="filled" style={{ background: "grey" }} value={title} onChange={e => { setTitle(e.currentTarget.value) }} />
                        <p>Upload the chapter video </p>
                        {/* l'upload d'un nouveau video du chapitre */}
                        <div style={{ background: "grey", height: 60, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button variant="contained" onClick={uploadCover}>{btncover}</Button>
                        </div>
                        <input type="file" name="" id="" ref={CHAPTER} style={{display:"none"}} onChange={e => getChapter(e.currentTarget.files)} />
                        {/* ajouter le chapitre */}
                        <div style={{display:"flex",justifyContent:"center", margin:"30px 0" }}  >
                            <Button color="primary" variant="contained" onClick={uploadChapter} >ADD</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
export function EditCourseTitle({ open, handleClose,course_id }) {
    const classes = useStyles();
    const [course,setCourse] =  useState({})
    const [title,setTitle] = useState("")

    const updateTitle = ()=>{
        fetch("http://localhost:5555/courses/"+course_id,{
            headers:{
                "content-type":"application/json"
            },
            method:"PATCH",
            body:JSON.stringify({
                title:title,
                level:course.level,
                description:course.description,
                price:course.price,
                cover:course.cover

            })
        })
        .then(resp => resp.json())
        .then(data => {console.log(data);setCourse({...course,title:title})})
        .catch(e => console.log(e))
    }

    useEffect(()=>{
        fetch("http://localhost:5555/courses/getCourse/"+course_id)
        .then(resp => resp.json())
        .then(data => {setCourse(data);setTitle(data.title)})
        .catch(e => console.log(e))
    },[course_id])

    

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        
                        <TextField label="Course title" variant="filled" style={{ background: "white" }} value={title} onChange={e => setTitle(e.currentTarget.value)}  />
                        <div>
                            <Button color="primary" variant="contained" onClick={updateTitle} >Update</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
