import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import   CardActionArea  from "@material-ui/core/CardActionArea";
import  CardActions  from "@material-ui/core/CardActions";
import  CardContent  from "@material-ui/core/CardContent";
import  CardMedia  from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core/Typography";
import FundraiserContract from "../contracts/Fundraiser.json";
import Web3 from "web3";


const useStyles = makeStyles( {
    card:{
        maxWidth: 450 ,
        height: 400
    },
    media:{
        height: 140,
    },
});

const FundraiserCard = (props) => {
    const classes = useStyles ();
    const web3 =  new Web3(Web3.givenProvider || "ws://localhost:8545");

    const [contract, setContract] = useState (null);
    const [ accounts, setAccounts] = useState (null);
    const [fundName, setFundName] = useState(null);
    const [description, setDescription] = useState(null);
    const [totalDonations, setTotalDonations] = useState(null);
    const [donationsCount, setDonationsCount] = useState(null);
    const [imageURL, setImageURL]= useState(null);
    const [url, setURL] = useState(null);

    useEffect ( ()=>{

    },[]);

    return (
        <div cllassName = "fundraiser-card-content">
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia className={classes.media} image={props.fundraiser.image} title="Fundraiser Image"/>
                    <CardContent>
                        <Typography gutterBottom variants="h5" component="h2">
                            {fundName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <p>{description}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                   <Button size="small" color="primary">
                    View More
                   </Button>
                </CardActions>
            </Card>
        </div>    
    )
}

export default FundraiserCard;