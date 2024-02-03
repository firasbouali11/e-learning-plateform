import React from "react";
import Slider from "react-slick";
import CourseCard from "./CourseCard"

export default function Responsive({teacher,items,setCartCount}) {


    // le settings du slider
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const tab = [12, 5, 487, 8759, 64, 2]
    return (
        <div>
            {/* le component du slider: */}
            <Slider {...settings}>
                {items.map(data => (
                    // le component de la carte du cours
                    <CourseCard teacher={teacher} title={data.title} rate={data.rate} cover={data.cover} id={data._id} course={data} setCartCount={setCartCount} />
                ))}
            </Slider>
        </div>
    );

}
