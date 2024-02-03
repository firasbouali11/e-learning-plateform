import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CourseSlider from '../Course_slider';

const useStyles = makeStyles((theme) => ({
    title: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "36px",
        lineHeight: "42px",
        color: "#000000",
    },
    
  }));

  function UserProfileP2(porps) {
    const classes = useStyles();
    return (
       <div>
           <div className={classes.title} data-aos="zoom-in" data-aos-offset="0"  >
               <h1 style={{fontFamily:"Gilroy",color: "#135198", fontSize:35}}>Last Visited Courses</h1>
           </div>
           <center data-aos="fade-up" data-aos-offset="0">
           <CourseSlider teacher={false} items={porps.courses} />
           </center>
       </div>
    )
}

export default UserProfileP2