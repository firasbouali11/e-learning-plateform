import React, { useEffect, useState } from 'react'
import UserProfileP1 from '../components/userprofile/Userprofile1'
import UserProfileP2 from '../components/userprofile/Userprofile2'
import UserProfileP3 from '../components/userprofile/Userprofile3'
import UserProfileP4 from '../components/userprofile/Userprofile4'
import Footer from '../components/Footer'
import { Container } from '@material-ui/core'
import { motion } from "framer-motion";


function UserProfile() {



    const user = JSON.parse(localStorage.getItem("user"))
    const [courses,setCourses] = useState([])
    const [userr,setUserr] = useState({})
    // const [user,setUser] = useState({})
    useEffect(()=>{
        fetch("http://localhost:5555/users/"+user._id)
        .then(resp => resp.json())
        .then(data => {
            // console.log("user:",data)
            setUserr({...data})
        })
    },[])

    useEffect(()=>{
        console.log("user",userr.username)
        fetch("http://localhost:5555/users/my_courses/",{
            headers:{
                "content-type":"application/json"
            },
            method:"post",
            body:JSON.stringify({
                cc:userr.courses
            })
        })
        .then(resp => resp.json())
        .then(data =>setCourses(data))
        .catch(e => console.log(e))
    },[userr])

    
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
            <UserProfileP1 username={userr.username} courses={courses} />
            <Container>
            <UserProfileP2 courses={courses} />
            </Container>
            <div data-aos="fade-up">
            <UserProfileP3 />
            </div>
            <UserProfileP4 courses={courses} />
            <Footer />
        </motion.div>
    )
}

export default UserProfile
