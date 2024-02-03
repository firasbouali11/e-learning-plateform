import React, { useEffect, useState } from 'react'
import CourseSlider from "../components/Course_slider"
import { Container } from '@material-ui/core'
import Courses from '../components/Courses'
import UserProfileP3 from '../components/userprofile/Userprofile3'
import { motion } from "framer-motion";


function CategoryCourses() {
    const [popular, setPopular] = useState([])  // tableau des cours populaire
    const [courses, setCourses] = useState([])  // tableau des cours
    const [page, setPage] = useState(1)    // state de nombre de  page  actuelle

    const [level, setLevel] = useState("all")   // state de level du cours
    const [priceTop, setPriceTop] = useState(500)  // state du prix le plus haut
    const [priceBottom, setPriceBottom] = useState(0) // state du prix le plus bas
    const [rate, setRate] = useState(0)   // state du rate d'un cours

    useEffect(() => {   // avoir les cours populaires lors du chargement de la page
        fetch("http://localhost:5555/courses/popular")
            .then(resp => resp.json())
            .then(data => setPopular([...data]))
    }, [])
 
    useEffect(() => { // avoir 4 cours par page
        fetch("http://localhost:5555/courses/courses?page=" + page + "&limit=4")
            .then(resp => resp.json())
            .then(data => setCourses(data.results))
    }, [page])

    const filterCourses = () => {  // avoir les cours filtrés
        fetch("http://localhost:5555/courses/filter", {
            headers: {
                "content-type": "application/json"
            },
            method: "post",
            body: JSON.stringify({
                priceTop: priceTop,
                priceBottom: priceBottom,
                rate: rate,
                level: level,
            })
        })
            .then(resp => resp.json())
            .then(data => setCourses(data))
    }

    // const filterByCategory = () => {

    // }

    
    const pageVariants = {  // l'aniamtion du transition de la page
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
        <motion.div   // gere l'animation de transition de la page
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
       style={{ marginTop: 150 }}>
            <h1 className="title" data-aos="zoom-in" data-aos-delay="1000"> Popular Courses</h1>
            <Container data-aos="fade-right" data-aos-offset="0" data-aos-duration="1000">
                <CourseSlider teacher={false} items={popular} />   {/* le sliders des cours populaires */}
            </Container>
            <div data-aos="fade-up" data-aos-offset="300">
                <UserProfileP3 /> 
            </div>
            <div data-aos="fade-up" data-aos-offset="300">
                {/* les cours affichés */}
            <Courses courses={courses} page={page} setPage={setPage} setRate={setRate} setPriceBottom={setPriceBottom} setPriceTop={setPriceTop} setLevel={setLevel} search={filterCourses} />
            </div>
        </motion.div>
    )
}

export default CategoryCourses
