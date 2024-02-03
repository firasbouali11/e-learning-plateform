import React from 'react';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


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
    },
    large: {
        marginTop: theme.spacing(5),
        width: theme.spacing(30),
        height: theme.spacing(30),
        fontSize:"90px",
      },
      fullName: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "36px",
        lineHeight: "42px",
        color: "#000000",
        marginTop: theme.spacing(5),
        },
      position: {
        marginTop: theme.spacing(1),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "24px",
        lineHeight: "28px",
        color: "#000000",
      }
  }));
function UserProfileP1({username,courses}) {
    const classes = useStyles();

    return (
        <Container maxWidth="xs" >
            <div className={classes.paper}>
                <Avatar alt="xx xx" className={classes.large} data-aos="fade-up" >{(username+"")[0]}
                </Avatar>
                <Typography className={classes.fullName} data-aos="fade-up" data-aos-delay="100">
                    <h2 style={{fontFamily:"Proxima",fontSize:50}}>{username}</h2>
                </Typography>
                <Typography className={classes.position} data-aos="fade-up" data-aos-delay="300" data-aos-offset="0">
                <h4 style={{fontFamily:"Proxima"}}> {courses.length}  Courses</h4>
                </Typography>
            </div>
        </Container>
    )
}

export default UserProfileP1