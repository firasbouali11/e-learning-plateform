import React from 'react'
import { Grid, Avatar } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import AlternateEmailSharpIcon from '@material-ui/icons/AlternateEmailSharp';
import logo from "../assets/logoslog.png"

function Footer() {
    return (
        <div style={{ height: 290}} className="footer">
            <Grid container direction="column" justify="center" alignItems="center" >
                <Grid item >
                    <h1 style={{fontFamily:"Proxima"}}>Follow us on</h1>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Avatar className="fb icons" style={{ margin: "0 20px" }}>
                            <FacebookIcon />
                        </Avatar>
                        <Avatar className="tw icons" style={{ margin: "0 20px" }}>
                            <TwitterIcon />
                        </Avatar>
                        <Avatar className=" insta icons" style={{ margin: "0 20px" }}>
                            <InstagramIcon />
                        </Avatar>
                        <Avatar className="gmail icons" style={{ margin: "0 20px" }}>
                            <AlternateEmailSharpIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item md={4}>
                            <Grid container justify="center" alignItems="center" >
                                <Grid item md={3} style={{position:"relative",top:-120,right:-60}} > 
                                    <img src={logo} alt="logo" width={"200%"} height={"200%"}/>
                                </Grid>
                                <Grid item md={8} style={{position:"relative",top:-40,marginLeft:-30}}>
                                    <p style={{fontFamily:"Proxima",fontsize:70}}>Notre plateforme met à disposition de la communauté d'apprenants des ressources pour se former dans différents domaines.</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4}>
                            <p style={{ textAlign: "center",fontFamily:"Proxima" }}>Copyrights &copy;</p>

                        </Grid>
                        <Grid item md={4}>
                            <div className="footerElement" style={{position:"relative",top:-55}}>
                                <h4 style={{fontFamily:"Gilroy",fontSize:20}}>Contact Us</h4>
                                <p style={{fontFamily:"Proxima"}}>Email : email@email.com</p>
                                <p style={{fontFamily:"Proxima"}}>Tel : +216 54789621</p>
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
