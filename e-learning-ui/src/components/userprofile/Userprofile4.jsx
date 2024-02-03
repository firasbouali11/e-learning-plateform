import React from 'react'
import { Grid } from '@material-ui/core'
import gardening from "../../assets/gardening.jpg";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
    courses: {
        borderCollapse: "collapse",
    },
    coursesTd: {
        borderBottom: "1px solid black",
        borderTop: "1px solid black",
        paddingTop: "0.5%",
        paddingBottom: "0.5%",
        paddingLeft: "1%"
    }

}));

function UserProfileP4(props) {
    const classes = useStyles();

    const percentage = 69;
    return (
        <div>
            <Grid container justify="center" alignItems="flex-start" style={{ marginTop: 100 }}>
                <Grid item md={10}>
                    <Grid container direction="column">
                        <table className={classes.courses}>
                            {props.courses.map((course, i) => (
                                <tr data-aos="fade-right" data-aos-delay={i * 100}>
                                    <td style={{ width: "20%" }} className={classes.coursesTd}>
                                        <img src={course.cover} alt="" width={200} height={150} /></td>
                                    <td className={classes.coursesTd}>
                                        <p>{course.description}</p>
                                        {/* <small>{course.category} </small> */}
                                        <Rating name="read-only" value={parseInt(course.rate)} readOnly />
                                    </td>
                                    <td style={{ width: "20%", textAlign: "center" }} className={classes.coursesTd}>
                                        <div style={{ width: "20%", marginLeft: "50%" }}>
                                            <CircularProgressbar
                                                value={percentage}
                                                styles={buildStyles({
                                                    strokeLinecap: 'round',
                                                    textSize: '5px',
                                                    pathColor: `#00FF00`,
                                                    trailColor: '#C4C4C4',
                                                    backgroundColor: '#C4C4C4',
                                                })}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}


                        </table>
                    </Grid>
                </Grid>
            </Grid>
            {props.courses.length == 0 ? null :
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                    <Pagination size="large" count={10} color="primary" />
                </div>
            }
        </div>
    )
}

export default UserProfileP4