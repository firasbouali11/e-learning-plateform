import React from "react";
import Slider from "react-slick";
import { Avatar } from "@material-ui/core";
import black from "../assets/blackbackground.jpg"

export default function SimpleSlider(props) {

    //settings du slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div>
            <Slider {...settings} style={{background:`url(${black})`}}>
                {props.contacts.map(data => (
                    <div className="testi"> 
                        <div>
                            <Avatar style={{width:180,height:180,margin:"30px 0"}} alt="Remy Sharp" src="https://dm.henkel-dam.com/is/image/henkel/men_perfect_de_thumbnails_home_pack_400x400-wcms-fr?scl=1&fmt=jpg" />
                        </div>
                        <div >
                        <h1 style={{marginBottom:50,fontFamily:"Gilroy"}}>{data.full_name} </h1>
                        </div>
                        <div >
                            <blockquote>
                               <p style={{fontFamily:"Proxima"}}>{data.message}</p>
                            </blockquote>
                        </div>
                    </div>

                ))}

            </Slider>
        </div>
    );
}