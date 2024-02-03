import React from 'react'
import { Grid, Divider, Checkbox, Button } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import StarIcon from '@material-ui/icons/Star';
import PriceSlider from "./PriceSlider"
import Footer from "./Footer"
import gardening from "../assets/gardening.jpg"
import Rating from '@material-ui/lab/Rating';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';





function Courses(props) {

    return (
        <>
            <div style={{ margin: "100px 10% 0 10% " }}>
                <Grid container alignItems="flex-start" justify="flex-start">
                    {/* le block du filtre */}
                    <Grid item md={2} xs={12} style={{ background: "rgba(0,0,0,0.7)", color: "white", textAlign: "center", paddingBottom: 185 }}>
                        <div >
                            <h1>Filter</h1>
                            <Divider style={{ backgroundColor: "white" }} />
                            <div>
                                <h2 style={{fontFamily:"Proxima"}}>Rating</h2>
                                {/* les etoiles du rating */}
                                <div style={{ margin: "0" }}>
                                    <Rating name="read-only" onChange={(e, value) => props.setRate(value)} />
                                </div>
                            </div>
                            <h2 style={{fontFamily:"Proxima"}}>Price</h2>
                            {/* le silder du prix */}
                            <PriceSlider setPriceBottom={props.setPriceBottom} setPriceTop={props.setPriceTop} />
                            <h2 style={{fontFamily:"Proxima"}}>Level</h2>
                            <div style={{ margin: "0 1%" }}>
                                {/* les checkbox de niveau du cours */}
                                <span className="checkbox">
                                    <Checkbox value="easy" /> <span style={{ fontSize: 13,fontFamily:"Gilroy" }}> Easy</span>
                                </span>
                                <span className="checkbox">
                                    <Checkbox value="intermediaire" /> <span style={{ fontSize: 13,fontFamily:"Gilroy" }}> Intermediaire</span>
                                </span>
                                <span className="checkbox">
                                    <Checkbox value="hard" /> <span style={{ fontSize: 13,fontFamily:"Gilroy" }}> Hard</span>
                                </span>
                                <span className="checkbox">
                                    <Checkbox value="all" /> <span style={{ fontSize: 13,fontFamily:"Gilroy" }}> All</span>
                                </span>
                            </div>
                            {/* le bouton pour appliquer le filtre */}
                            <div style={{ paddingTop: "20%" }}>
                                <Button color="primary" variant="contained" onClick={props.search}>Search</Button>

                            </div>

                        </div>
                    </Grid>
                    <Grid item md={10} xs={12} style={{ paddingLeft: 15 }}>
                        <Grid container direction="column" justify="flex-start" alignItem="center">
                            <Divider style={{ backgroundColor: "grey", marginBottom: 3 }} />
                            {/* un boucle pour afficher les cours */}
                            {props.courses.map(data => (
                                // un cours
                                <Grid item>
                                    <Grid container>
                                        <Grid item md={2}><img src={data.cover} alt="" width={"150%"} height={"100%"} /></Grid>
                                        <Grid item md={8} style={{paddingLeft: 100}}>
                                            <h1 style={{fontFamily:"Gilroy"}}>{data.title} </h1> {/*le titre du cours*/}
                                            <p style={{fontFamily:"Proxima"}}>{data.description} </p>  {/* la description du cours */}
                                            <span style={{ display: "flex", alignItems: "center" }} > 
                                                <Rating name="read-only" value={parseInt(data.rate)} readOnly /> {/* le rating du cours */}
                                                <Button>
                                                    <AddShoppingCartIcon />  {/* le bouton pour ajouter au panier  */}
                                                </Button>
                                            </span>

                                        </Grid >
                                        <Grid item md={2} style={{ fontFamily:"Gilroy", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            {data.price} DT  {/* le prix du cours  */}
                                        </Grid>
                                    </Grid>
                                    <Divider style={{ backgroundColor: "grey", margin: "12px 0" }} />
                                </Grid >
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                {/* la pagination des cours 3 cours par page */}
                <Pagination size="large" count={Math.ceil(props.courses.length /4)} page={props.page} color="primary" onChange={(e, value) => props.setPage(value)} />
            </div>
            <Footer />
        </>
    )
}

export default Courses
