import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import gardening from "../assets/gardening.jpg"


const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    width: 350,
  },
  media: {
    height: 200,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    //la carte du category
    <Card className={classes.root}>
      {/* l'image est le titre de la carte   */}
      <CardActionArea>
        {/* l'image */}
        <CardMedia
          className={classes.media}
          image={gardening}
          title="Contemplative Reptile"
        />
        {/* le titre */}
        <CardContent>
            <h1 style={{textAlign:"center"}}>{props.title} </h1>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
