import React from 'react'
import { Paper, Button } from '@material-ui/core'

function Video(props) {
    return (
        <div>
            <Paper elevation={4} style={{ height: 500, padding: 20 }}>
                <div style={{ textAlign: "center", height: "100%", width: "100%" }}>
                    <video src={props.url} controls style={{height: "100%", width: "100%" }}></video>  {/* le video du chapitre du cours choisi */ }
                </div>

            </Paper>
        </div>
    )
}

export default Video
