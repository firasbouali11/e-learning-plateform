import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { Grid, Container, Avatar, TextField, Button, Box, withStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Swal from 'sweetalert2';


function Comments({ comment }) {
    // le components du commentaire
    return (
        <div style={{ marginTop: 10 }}>
            <Container>
                <Paper style={{ borderRadius: 14 }}>
                    <Grid container justify="center" alignItem="center">
                        {/* la lettre de du nom de l'utilisateur */}
                        <Grid item md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                            <Avatar style={{ width: 80, height: 80 }} >{comment.user.username[0].toUpperCase()} </Avatar>
                        </Grid>
                        <Grid item md={11} style={{ padding: 10 }}>
                            <Grid container direction="column" >
                                {/* le nom de l'utilisateur */}
                                <Grid item >
                                    <span style={{ fontSize: 20, fontWeight: "bold" }}>{comment.user.username}</span>
                                </Grid>
                                <Grid item >
                                    {/* le rating de l'utilisateur pour ce cours */}
                                    <Rating value={parseInt(comment.rate)} readOnly />
                                </Grid>
                                <Grid item >
                                    {/* la commentaire  de l'utilisateur pour ce cours */}
                                    <span>{comment.comment} </span>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    )
}

export function CommentForm() {
    const user = JSON.parse(localStorage.getItem("user"))  // l'objet de l'utilisateur
    const [rate,setRate] = useState(0)   // la variable du rating
    const [comment,setComment] = useState("")   // le message du commentaire

    const StyledRating = withStyles({ // le css des etoiles du rating
        iconFilled: {
          color: '#DAA520',
        },
        iconHover: {
          color: '#DAA520',
        },
      })(Rating);

      const sendComment= ()=>{   // la fonction qui sert a enregistrez la commentaire dans la base de données a travers un api
        const tab = window.location.href.split("/")
        const course_id = tab[tab.length - 1] 
          fetch("http://localhost:5555/comments",{
              headers:{
                  "content-type":"application/json"
              },
              method:"post",
              body:JSON.stringify({
                  user:user._id,
                  course:course_id,
                  comment:comment,
                  rate:rate,
              })
          })
          .then(data => {
              console.log(data)
              Swal.fire({    // pop up qui indique le succé de l'operation
                  title:"Success",
                  icon:"success",
                  text:"Your comment has been sent successfuly"
              })
          } )
      }
      
    return (
        <Container style={{ marginTop: 60 }}>
            <Paper style={{ padding: 50, borderRadius: 14 }}>
                <h2 style={{ fontFamily: "Proxima" }}>Give us your feedback</h2>
                {/* le choix du rating */}
                <StyledRating
                    name="simple-controlled"
                    value={rate}
                    onChange={(event, newValue) => {
                        setRate(newValue);
                    }}
                    style={{fontSize:40}}
                />

                <br />
                {/* la commentaire pour ce cours */}
                <TextField id="standard-basic" label="Your Comment" multiline rows={5} style={{ width: "100%", marginTop: 14 }} variant="filled" value={comment} onChange={e => setComment(e.currentTarget.value)} />
                {/* le bouton pour evoyer la commentaire */}
                <Button variant="contained" color="primary" onClick={sendComment}>
                    Send
                </Button>
            </Paper>
        </Container>
    )
}

export default Comments
