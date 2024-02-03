import React, { useEffect, useState,useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button } from '@material-ui/core';
import {ThemeContext} from "../pages/CourseDetails"


// css 
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function SelectedListItem(props) {
  
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);  // l'indice du chapitre

  const handleListItemClick = (event, index) => {  // change l'indice du chapitre pour l'afficher
    setSelectedIndex(index);
    
  };

  return (
    <div>
      <div style={{ background: "#1C2E4A", textAlign: "center", padding: 50 }}>
        <span style={{ fontSize: 30, padding:'0 20px' , color:"white",fontFamily:"Gilroy"}}>Chapters</span>
      </div>
      <div className={classes.root}>
        {/* la liste des chapitre */}
      <List component="nav" aria-label="main mailbox folders">
          {/* parcourir la liste des chapitre */}
          {props.chapters.map((chapter,i)=>(
            // le chapitre
        <ListItem
          button
          selected={selectedIndex === i}
          onClick={(event) => {props.handleListItemClick(event, i);props.setUrl(chapter.video)}}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          {/* titre du chapitre */}
          <ListItemText primary={chapter.title} />
        </ListItem>
          ))}
      </List>
      </div>
    </div>
  );
}
