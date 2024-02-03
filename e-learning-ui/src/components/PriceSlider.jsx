import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: "70%",
        margin: "0 15%",
    },
});

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState([0, 500]);  // valeur minimale et maximale du prix

    const handleChange = (event, newValue) => {  // change les valeur du prix le plus bas et le plus elevé choisi
        setValue(newValue);
        props.setPriceBottom(newValue[0])
        props.setPriceTop(newValue[1])
    };

    return (
           
            <div className={classes.root}>
                <Slider   // le compoenent slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    max={500}
                />
            </div>
    );
}
