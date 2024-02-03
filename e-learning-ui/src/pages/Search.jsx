import { Grid } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import CourseCard from '../components/CourseCard'



function Search(props) {

    const [courses,setCourses] = useState([])
    useEffect(()=>{
        fetch("http://localhost:5555/courses/search?title="+props.title)
        .then(resp => resp.json())
        .then(data => setCourses(data))
        .catch(e => console.log(e))
    },[props.title])
    return (
        <div style={{marginTop:150}}>
            <h1 style={{paddingLeft:50}}>Search: {props.title} </h1>
            <Grid container>
            {courses.map(data => (
                <Grid item md={3}>
                <CourseCard teacher={false} title={data.title} rate={data.rate} cover={data.cover} id={data._id} course={data} setCartCount={props.setCartCount} />
                </Grid>
            ))}
            </Grid>
        </div>
    )
}

export default Search
