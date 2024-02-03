import React, { useState, useEffect } from 'react'
import { Grid, Avatar, Divider, Container, Button } from '@material-ui/core'
import CourseSlider from "../components/Course_slider"
import CourseCard from "../components/CourseCard"
import Pagination from '@material-ui/lab/Pagination'
import Footer from '../components/Footer'
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";



function TeacherProfile() {

    const teacher = JSON.parse(localStorage.getItem("teacher"))
    const [t, setT] = useState({})
    const [participents, setParticipents] = useState(0)
    const [c, setC] = useState([])
    const [popular, setPopular] = useState([])

    useEffect(() => {
        if (teacher) {
            fetch("http://localhost:5555/teachers/getTeacher/" + teacher._id)
                .then(resp => resp.json())
                .then(data => { setT(data); console.log(data); const cc = Object.values(data.courses); setC(cc) })
                .catch(e => console.log(e))
        }
    }, [])

    useEffect(() => {
        fetch("http://localhost:5555/teachers/my_courses/" + t._id)
            .then(resp => resp.json())
            .then(data => setC(data))
            .catch(e => console.log(e))
    }, [t])

    useEffect(() => {
        fetch("http://localhost:5555/teachers/popularOfTeacher/" + t._id)
            .then(resp => resp.json())
            .then(data => setPopular([...data]))
    }, [t])

    const caclulateReview = () => {
        let sum = 0
        for (let e of c) {
            sum += e.rate
        }
        return sum / c.length
    }
    useEffect(() => {
        let a = 0
        for (let e of c) {
            a += e.number_of_students
        }
        setParticipents(a)
    }, [c])

    
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
       style={{ marginTop: 150 }}>
            <Grid container >
                <Grid item md={5} style={{ paddingLeft: 50 }}>
                    <div>
                        <div style={{ marginLeft: 30, marginBottom: 10 }} data-aos="fade-right">
                            <span style={{ fontSize: 30,fontFamily:"Proxima",fontWeight:"bold" }}>{t.fullName}</span>

                            <span style={{ display: "block",fontFamily:"Gilroy" }}>{t.occupation} </span>
                        </div>
                        <Grid container>
                            <Grid item md={6} data-aos="fade-right" data-aos-delay="100">
                                <Avatar alt="Remy Sharp" style={{ width: 200, height: 200 }} src={t.profileImage} />
                            </Grid>
                            <Grid item style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
                                <p data-aos="fade-right" data-aos-delay="200" style={{ fontFamily:"Gilroy" }}>{participents} Students</p>
                                <p data-aos="fade-right" data-aos-delay="300" style={{ fontFamily:"Gilroy" }}>{caclulateReview()} Review</p>
                                <p data-aos="fade-right" data-aos-delay="400" style={{ fontFamily:"Gilroy" }}>{c.length} Courses</p>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item md={5}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Divider orientation="vertical" style={{ height: 250 }} flexItem />
                        <p style={{ paddingLeft: 50 }} data-aos="fade-left" data-aos-delay="500" style={{ fontFamily:"Gilroy",paddingLeft:60 }}>{t.description} </p>
                    </div>
                </Grid>
            </Grid>
            <h1 className="title" data-aos="zoom-in" data-aos-offset="0">Popular Courses </h1>
            <Container data-aos="fade-right">
                <CourseSlider teacher={true} items={popular} />
            </Container>
            {/* <UserProfileP3 /> */}
            
            <h1 className="title" data-aos="zoom-in" data-aos-offset="0" >My courses<Link to="/edit-courses"><Button size="small">
                <EditIcon />
            </Button></Link></h1>
            
            <Grid container >
                {c.map((data, i) => (
                    <Grid item md={3} data-aos="fade-up" data-aos-delay={i * 100} data-aos-offset="600" >

                        <CourseCard teacher={true} title={data.title} rate={data.rate} cover={data.cover} />

                    </Grid>
                ))}

            </Grid>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                <Pagination size="large" count={teacher ? Math.ceil(teacher.courses.length / 8) : 1} color="primary" />
            </div>
            <Footer />
        </motion.div>
    )
}

export default TeacherProfile
