import React,{useEffect,useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import { motion } from "framer-motion";



const user = JSON.parse(localStorage.getItem("user"))


function Panier (props) {
   
    const [cs, setCourse] = useState([])
    const payAllCourses=()=>{
        cs.map((item) => {
            payCourse(item.course._id)
            deleteCourse(item._id)
    })
        
    }
    const payCourse =(course_id) =>{
        fetch("http://localhost:5555/users/buyCourse/"+course_id , {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id:user._id
        })
    })
      .then(resp => resp.json())
      .then(data =>  console.log(data))
      .catch(e => console.log(e))
    }

    const deleteCourse = (id_cart) =>{
        fetch("http://localhost:5555/cart/" , {
        method: 'delete',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:id_cart
        })
    })
      .then(resp => resp.json())
      .then(data =>  console.log(data))
      .catch(e => console.log(e))
      
      fetch("http://localhost:5555/cart/"+user._id)
      .then(resp => resp.json())
      .then(data => {setCourse(data);props.setCartCount(data.length)})
      .catch(e => console.log(e))
    }

    let Total=0;
    useEffect(() => {
        fetch("http://localhost:5555/cart/"+user._id)
        .then(resp => resp.json())
        .then(data => {setCourse(data);props.setCartCount(data.length)})
        .catch(e => console.log(e))
       })
   
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
        <Grid container spacing={3} style={{marginTop:150}}>
            <Grid item xs={6} data-aos="fade-right" data-aos-delay="500">
                <Paper style={{marginTop:"5%",marginLeft:"5%",textAlign:"center", backgroundColor:"rgba(0, 0, 0, 0.7)"}}>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell><h3 style={{marginLeft:"5%",color:"white"}}>Courses</h3></TableCell>
                                <TableCell><h3 style={{marginLeft:"5%",color:"white"}}>Price</h3></TableCell>
                                <TableCell><h3 style={{marginLeft:"5%",color:"white"}}>Action</h3></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{backgroundColor: "rgba(255, 255, 255, 0.2)", borderSpacing:"20px"}}>
                            {cs.map((item, i) => {
                                {Total=item.course.price+Total}
                                return (
                                    <TableRow key={`row-${i}`}>
                                        <TableCell>
                                            <Grid container>
                                                <Grid item xs={6}> <img src={item.course.cover} alt="" width={150} height={100} /> </Grid>
                                                <Grid item xs={6} style={{verticalAlign:"center"}}>
                                                    <span style={{color:"white"}}>
                                                        {item.course.description}
                                                    </span>
                                                </Grid>
                                                        
                                            </Grid>
                                        </TableCell>
                                        <TableCell>
                                             <span style={{color:"white"}}>{item.course.price} DT</span>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={()=>deleteCourse(item._id)}
                                                color="secondary"
                                            >
                                                <DeleteForeverIcon/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>

            </Grid>

            <Grid item xs={6} data-aos="fade-left" data-aos-delay="500">
            <Paper style={{marginTop:"5%",marginLeft:"20%",backgroundColor:"rgba(0, 0, 0, 0.7) ", width:"40%"}}>
                    <Grid container>
                        <Grid item xs={6}>
                            <h3 style={{color:"white", marginLeft:"10%"}}>Total</h3>
                        </Grid>
                        <Grid item xs={6} style={{textAlign:"center"}}>
                            <h3 style={{marginLeft:"5%",color:"white"}}>{Total} DT</h3>
                        </Grid>
                        <Grid item xs={12} >
                            <center>
                                <Button variant="contained" style={{backgroundColor:"#F0E68C", width:"80%"}} onClick={()=>{payAllCourses()}}>Pay</Button>
                                </center> 
                        </Grid>
                        <Grid item xs={12} >
                            <center>
                            <Link to="/" className="link"> <Button variant="contained" style={{backgroundColor:"#F3F3F3", width:"80%",marginTop:"2%",marginBottom:"5%"}}>
                                    <ArrowBackIcon style={{marginRight:"10px"}}/>
                                    Continue to buy
                                </Button></Link>
                            </center> 
                        </Grid>
                    </Grid>
            </Paper>

            </Grid>
            <Footer  />
        </Grid>
        </motion.div>
    );

     

}
export default Panier