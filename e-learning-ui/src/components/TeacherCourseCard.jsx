import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Swal from "sweetalert2"


//css
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

export default function TeacherCourseCard({course,handleOpenTitle}) {
    const classes = useStyles();

    const updateCourse = () => {
        Swal.fire({
            title: "Update Chapter",  // pop up du mise a jour d'un cours
            html: 
            
            '<span>title</span><input id="swal-input1" value="'+course.title+'" class="swal2-input" placeholder="title">'+
            '<span>level</span><input id="swal-input2" value="'+course.level+'" class="swal2-input" placeholder="level">'+
            '<span>description</span><textarea id="swal-input3" class="swal2-input" placeholder="">'+course.description+'</textarea>',
                // '<span>Upload a new cover</span><input type="file" id="swal-input2" class="swal2-input" placeholder="title">',
            confirmButtonText: 'Send',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value,

                ]
            }
        })
            .then(result => {
                if (result.value) {
                    // console.log(result.value[1])
                    // let data = new FormData()
                    // data.append("cloud_name", "firas1230")
                    // data.append("upload_preset", "e-learning")
                    // data.append("file", result.value[1])
                    // Axios.post("https://api.cloudinary.com/v1_1/firas1230/image/upload", data)
                    //     .then(async (data) => {
                    fetch("http://localhost:5555/courses/"+course._id, {
                        headers: {
                            "content-type": "application/json"
                        },
                        method: "PATCH",
                        body: JSON.stringify({
                            title: result.value[0],
                            level:result.value[1],
                            description:result.value[2],
                            price:course.price,
                            cover:course.cover
                        })
                    })
                        .then(resp => resp.json())
                        .then(data => console.log(data), "efjzfhzkjef")
                        // })

                }
            })
    }


    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={course.cover}
                    title="Contemplative Reptile"
                    style={{height:250}}
                />
                <CardContent>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item >
                            <h3>{course.title} <Button size="small" onClick={updateCourse} >
                           <EditIcon />
                        </Button></h3>
                        </Grid>
                    </Grid>
                    <Rating name="read-only" value={parseInt(course.rate)} readOnly />
                </CardContent>
            </CardActionArea>

        </Card>
    );
}