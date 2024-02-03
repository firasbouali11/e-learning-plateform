import React from 'react'
import { Paper, Avatar } from "@material-ui/core"
import Rating from '@material-ui/lab/Rating';


function TeacherCard(props) {
    return (
        <div>
            <Paper elevation={3} className="testi" style={{margin:"0 11%"}}>
                <Avatar style={{ width: 200, height: 200}} alt="Remy Sharp" src={props.teacher.profileImage} />  {/* la photo de profile du tutor */}
                <h3 style={{fontFamily:"Gilroy"}}>{props.teacher.fullName}</h3>   {/* le nom */}
                <p style={{fontFamily:"Proxima"}}>{props.teacher.occupation} </p> {/* l'occupation */ }
                {/* <Rating name="read-only" value={5} readOnly /> */}

            </Paper>
        </div>
    )
}

export default TeacherCard
