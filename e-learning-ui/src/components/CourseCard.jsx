import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button, Grid } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


//css
const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
        boxShadow: "0 0 5px grey",
        margin: "12px 30px"
    },
    media: {
        height: 140,
    },
});

export default function MediaCard(props) {
    const user = JSON.parse(localStorage.getItem("user"))   // prendre l'objet user du localstorage
    const classes = useStyles();
    const addCourse = () => {    // fonction qui ajoute un cours dans le panier a travers l'api
        fetch("http://localhost:5555/cart/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                course: props.course,
                user: user
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    return Swal.fire({   // pop up au cas ou le cours exites dans le panier
                        title: "Warning",
                        icon: "warning",
                        text: data.error
                    })
                }
                props.setCartCount(data.length)  // mettre a jour le compte de cours dans le panier

            })
            .catch(e => console.log(e))   // consoler l'erreur s'il existe
    }
    return (
        <Card className={classes.root}>
            <CardActionArea>
                {/* une carte clickable pour me rendre dans la page du cours elle meme */}
                <Link to={"/details/" + props.id}>
                    <CardMedia
                        className={classes.media}
                        image={props.cover}
                        title="Contemplative Reptile"
                        style={{ height: 250 }}
                    />
                </Link>
                <CardContent>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item md={9}>
                            {/* le titre du cours */}
                            <h3 >{props.title}</h3>
                        </Grid>
                        {/* le bouton qui ajoute le cours dans le panier et apprait si la valeur de 'teacher' est false*/}
                        <Grid item md={3}>
                            {props.teacher ? null : <Button onClick={() => addCourse()}><AddShoppingCartIcon /> </Button>}
                        </Grid>
                    </Grid>
                    {/* le component de rating */}
                    <Rating name="read-only" value={parseInt(props.rate)} readOnly />

                </CardContent>
            </CardActionArea>

        </Card>
    );
}
