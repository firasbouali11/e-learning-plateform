import React, { useState, useEffect } from 'react'
import CourseSlider from "../components/Course_slider"
import { Container, Grid, Button } from '@material-ui/core'
import CategoryCard from "../components/CategoryCard"
import Testimonials from "../components/Testimonials"
import TeacherCard from "../components/TeacherCard"
import Contact from "../components/Contact"
import Footer from '../components/Footer'
import pub from "../assets/pub.jpg"
import teacher from "../assets/teacher.jpg"
import { motion } from "framer-motion";
import { useHistory } from 'react-router-dom'


function Home(props) {
    const history = useHistory()
    const [popular, setPopular] = useState([])
    const [categories, setCategories] = useState([])
    const [contacts, setContacts] = useState([])
    const [teachers, setTeachers] = useState([])
    useEffect(() => {
        fetch("http://localhost:5555/courses/popular")
            .then(resp => resp.json())
            .then(data => setPopular([...data]))
    }, [])

    useEffect(() => {
        fetch(" http://localhost:5555/categories/")
            .then(resp => resp.json())
            .then(data => setCategories([...data]))
    }, [])

    useEffect(() => {
        fetch("http://localhost:5555/contacts/approved")
            .then(resp => resp.json())
            .then(data => setContacts([...data]))
    }, [])

    useEffect(() => {
        fetch("http://localhost:5555/teachers")
            .then(resp => resp.json())
            .then(data => setTeachers(data))
            .catch(e => console.log(e))
    }, [])

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
            <div className="header-background" >
                <img src={pub} alt="background" style={{ width: "100%", height: "100%" }} />
            </div>
            <h1 className="title" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="100" data-aos-offset="0"> Top selling courses </h1>
            <Container data-aos="fade-right">
                <CourseSlider items={popular} setCartCount={props.setCartCount} />
            </Container>
            <Grid container style={{ marginTop: 50 }}>
                <Grid item md={4} style={{ width: "100%" }} >
                    <img src={teacher} alt="teacher" style={{ width: "100%", height: "100%" }} data-aos="fade-right" />
                </Grid>
                <Grid item md={8} style={{ textAlign: "center" }} data-aos="fade-left">
                    <h2 style={{ padding: 30,fontFamily:"Proxima" }}>Join the teachers community and contribute into building this plateform, this will allow you to benefit from special offers and much more..
                    <br></br>Don't miss your chance and Apply Now !</h2>
                    <Button variant="contained" color="primary" onClick={e => history.push("/teacher-signup")} >Become a teacher</Button>
                </Grid>

            </Grid>
            <h1 className="title" data-aos="zoom-in">Top Categories</h1>
            <Grid container justify="space-around">
                {categories.map((data, i) => (
                    <Grid item md={3} data-aos="fade-up" data-aos-delay={i * 200} data-aos-offset="300">
                        <CategoryCard title={data.category} data-aos="fade-up" />
                    </Grid>
                ))}

            </Grid>
            <h1 className="title" data-aos="zoom-in">Testimonials</h1>
            <div data-aos="fade-up">
                <Testimonials contacts={contacts} />

            </div>
            <h1 className="title" data-aos="zoom-in">Our Teachers</h1>
            <Grid container >
                {teachers.map((data, i) => {
                    return (
                        // <div style={{ display: "inline" }}   >
                        <Grid item md={3} data-aos="fade-up" data-aos-delay={i * 200} data-aos-offset="400">
                            <TeacherCard teacher={data} />
                        </Grid>

                        // </div>
                    )
                }
                )}
            </Grid>
            <h1 className="title" data-aos="zoom-in">Contact Us</h1>
            <div data-aos="fade-up">
                <Contact />
            </div>
            <Footer />
        </motion.div>
    )
}

export default Home
