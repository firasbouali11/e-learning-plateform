import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper, withStyles } from '@material-ui/core';
import logoslog from "../assets/logoslog.png"
import {useHistory,Link} from "react-router-dom"
import Swal from "sweetalert2"
import { motion } from "framer-motion";



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: 200,
        height: 200
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: 30,
        backgroundColor: "#F3F3F3",
        color: "black"
    },
}));

export default function SignUp() {
    const history = useHistory()
    const classes = useStyles();
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")


    const loginUser = ()=> {

        fetch("http://localhost:5555/users/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                password2:password2,
                email:email
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.error=="missing fields"){
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Missing fields!',
                  })
            }else if(data.error=="password not match"){
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Passwords not matching!',
                  })
            }else if(data.error=="username exist"){
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Username exist!',
                  })
            }else {
                Swal.fire({
                    icon: 'success',
                    title: 'Signup with success',
                    text: 'You need to login now',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  history.push("/login")
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
       className="background-login">
            <Container component="main" maxWidth="xs" style={{ padding: "5% 0" }} data-aos="flip-right">
                <Paper elevation={7} style={{ padding: " 0 10%", backgroundColor: "#1C2E4A", color: "white", borderRadius: 10 }} className="paper">
                    <CssBaseline />
                    <div className={classes.paper}>
                    <Link to="/">
                            <img src={logoslog} alt="" width={330} height={220} />
                            </Link>
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={e => setusername(e.currentTarget.value)}
                            className="input"
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="email"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={email}
                            onChange={e => setemail(e.currentTarget.value)}
                            className="input"
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.currentTarget.value)}
                            className="input"
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Retry Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password2}
                            onChange={e => setPassword2(e.currentTarget.value)}
                            className="input"
                        />
                        {/* <Grid container justify="space-between" alignItems="center" >
                            <Grid item xs >
                                <FormControlLabel
                                    control={<GreenCheckbox value="remember" />}
                                    label="Remember me"
                                />
                            </Grid>
                            <Grid item xs>
                                <p style={{ textAlign: "end" }}>Forget password ?</p>
                            </Grid>
                        </Grid> */}
                        <div style={{ padding: "0 10px" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={loginUser}
                            >
                                SignUp
                    </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={()=>{history.push("/login")}}
                            >
                                Sign In
                    </Button>
                        </div>

                    </div>
                    <br /><br />
                </Paper>
            </Container>
        </motion.div>
    );
}