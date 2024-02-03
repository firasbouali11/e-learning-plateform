import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Grid } from '@material-ui/core'



const ListOptions = [
    // { value: 'ocean', label: 'Ocean', color: '#00B8D9'},
    // { value: 'blue', label: 'Blue', color: '#0052CC'},
    // { value: 'purple', label: 'Purple', color: '#5243AA' },
    // { value: 'red', label: 'Red', color: '#FF5630' },
    // { value: 'orange', label: 'Orange', color: '#FF8B00' },
    // { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    // { value: 'green', label: 'Green', color: '#36B37E' },
    // { value: 'forest', label: 'Forest', color: '#00875A' },
    // { value: 'slate', label: 'Slate', color: '#253858' },
    // { value: 'silver', label: 'Silver', color: '#666666' },
  ];


const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme) => ({
    category: {
        width: "50%",
        fontSize: "30px",
        marginLeft:"20%",
        fontFamily:"Gilroy"
    },
    starFix : {
        size: 30,
        value: 2.5,
        edit: false,
      }

}));

function UserProfileP3() {
    const classes = useStyles();
    const [category,setCategory] = useState([])

    useEffect(()=>{
        fetch("http://localhost:5555/categories")
        .then(resp => resp.json())
        .then(data => setCategory(data))
    },[])

    useEffect(()=>{
        for(let e of category){
            ListOptions.push({
                value:e._id,
                label:e.category
            })
        }
    },[category])
    return (
        <div style={{marginTop:"5%"}}>
            <Grid container>
                <Grid item xs={6}>
                <span style={{marginLeft:"20%",fontSize:"50px",fontFamily:"Gilroy"}}>Courses</span>
                </Grid>

                <Grid item xs={6} >
                        <Select
                            className={classes.category}
                            placeholder="Category"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            options={ListOptions}
                        />
                </Grid>
            </Grid>
        </div>
    )
}

export default UserProfileP3