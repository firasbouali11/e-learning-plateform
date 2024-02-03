import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Swal from "sweetalert2"
import Axios from 'axios';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        boxShadow: "0 0 5px grey",
        margin: "12px 30px"
    },
    media: {
        height: 140,
    },
});

export default function TeacherChapterCard({ chapter, cover }) {
    const classes = useStyles();

    const updateChapter = () => { // fonction qui fait le mise a jour d'un chapitre  (titre et video)
        Swal.fire({
            title: "Update Chapter",
            html: '<input id="swal-input1" value="' + chapter.title + '" class="swal2-input" placeholder="title">'
                + '<span>Upload the chapter video</span><input type="file" id="swal-input2" class="swal2-input" placeholder="title">',
            confirmButtonText: 'Send',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').files[0],

                ]
            }
        })
            .then(result => {   
                if (result.value) {
                    console.log(result.value[1])
                    let data = new FormData()
                    if (result.value[1]) {
                        data.append("cloud_name", "firas1230")
                        data.append("upload_preset", "e-learning")
                        data.append("file", result.value[1])
                        Axios.post("https://api.cloudinary.com/v1_1/firas1230/video/upload", data)
                            .then((data) => {
                                // await setVideo(data.data.url)
                                fetch("http://localhost:5555/chapters", {
                                    headers: {
                                        "content-type": "application/json"
                                    },
                                    method: "PATCH",
                                    body: JSON.stringify({
                                        chapter_id: chapter._id,
                                        title: result.value[0],
                                        video: data.data.url
                                    })
                                })
                                    .then(resp => resp.json())
                                    .then(data => console.log(data), "efjzfhzkjef")
                            })

                    }
                    else {
                        fetch("http://localhost:5555/chapters", {
                            headers: {
                                "content-type": "application/json"
                            },
                            method: "PATCH",
                            body: JSON.stringify({
                                chapter_id: chapter._id,
                                title: result.value[0],
                                video: chapter.video
                            })
                        })
                            .then(resp => resp.json())
                            .then(data => console.log(data), "efjzfhzkjef")
                    }
                }
            })
    }


    const deleteChapter = () => {   // fonction qui efface un chapitre
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("http://localhost:5555/chapters/" + chapter._id, {
                    headers: {
                        "content-type": "application/json"
                    },
                    method: "delete",
                })
                    .then(resp => resp.json())
                    .then(data => console.log(data), "efjzfhzkjef")
            }
        })

    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={cover}
                    title="Contemplative Reptile"
                    style={{ height: 250 }}
                />
                <CardContent>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item md={6}  >
                            <h3>Chapter {chapter.n_chapter}: {chapter.title} </h3>
                        </Grid>
                        <Grid item md={6}>
                            <CardActions>
                                <Button size="small" onClick={updateChapter} >
                                    <EditIcon />
                                </Button>
                                <Button size="small" >
                                    <DeleteForeverIcon onClick={deleteChapter} />
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}