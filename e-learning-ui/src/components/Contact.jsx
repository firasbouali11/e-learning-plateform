import React,{useState} from 'react'
import { TextField, Grid, Paper, Container, Button } from '@material-ui/core'
import Swal from "sweetalert2"


function Contact() {
    const [fname,setName] = useState("")  // une state pour le full_name
    const [email,setEmail] = useState("") // une state pour l'email
    const [msg,setMsg] = useState("") // une state pour le message

    const sendContact=() =>{  // la fonction qui envoie le message par mail et le stock dans la db a travers l'api
        // une expression reguliere pour verifier le format de l'email
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(email).toLowerCase())){
        fetch("http://localhost:5555/contacts/" , {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                full_name: fname,
                email:email,
                message:msg
            })
        })
          .then(resp => resp.json())
          .then(data =>  {
              console.log(data)
              if(data.error){
                  return Swal.fire({ //pop up si les champs sont vides
                      icon:"error",
                      title:"Missing Fields"
                  })
              }
                Swal.fire({   // popup si l'operation est effectué avec succé
                    icon: 'success',
                    title: 'Message send with success',
                })
            })
          .catch(e => console.log(e))
    }else{
        Swal.fire({ //  pop up si l'operation est echoué
            icon:"error",
            title:"Bad email format"
        })
    }
    }

    return (
        <div>
            <Container>
                <Paper elevation={3}>
                    <Grid container>
                        <Grid item md={6}  style={{ padding: 30 }}>
                            {/* le champs de full_name */}
                            <TextField className="contact" variant="filled" required label="Full Name" onChange={e=>setName(e.target.value)} />
                        </Grid>
                        <Grid item md={6}  style={{ padding: 30 }}>
                            {/* le champs d'email */}
                            <TextField className="contact" variant="filled" required label="Email" onChange={e=>setEmail(e.target.value)}/>
                        </Grid>
                        <Grid item md={12} style={{ padding: 30 }}>
                            {/* le champs de message */}
                            <TextField className="contact" variant="filled" required label="Enter your Message" multiline rows={7} onChange={e=>setMsg(e.target.value)}></TextField>
                        </Grid>
                        {/* le bouton pour envoyer le message */}
                        <Grid item style={{margin:"12px auto"}}>
                            <Button variant="contained" color="primary" onClick={sendContact}>Send</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

        </div>
    )
}

export default Contact
