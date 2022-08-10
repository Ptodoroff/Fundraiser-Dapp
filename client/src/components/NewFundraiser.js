import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import  TextField  from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Web3 from "web3"; 
import FactoryContract from "../contracts/FundraiserFactory.json";





const NewFundraiser = () => {
    const useStyles = makeStyles( theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap'
        },
    
        textField: {
    
            marginLeft: theme.spacing (1),
            marginRight:theme.spacing(1),
        },
        dense: {
            marginTop: theme.spacing(2)
        },
        menu:{
            width:200,
        },
        button: {
            margin:theme.spacing(1),
        },
        input:{
            display: 'none',
        },
        }))
const classes = useStyles();
const [name, setFundraiserName]= useState(null);
const [website, setFundraiserWebsite]= useState(null);
const [description, setFundraiserDescription]= useState(null);
const [image, setImage]= useState(null);
const [address, setAddress]= useState(null);
const [custodian, setCustodian]= useState(null);
const [contract, setContract]= useState(null);
const [accounts, setAccounts]= useState(null);
const [submit, handleSubmit] = useState(null);
const [state, setState] = useState ({web3: null, accounts: null, contract: null});
    useEffect (()  => {
    
            const init = async () => {
                try{
                  const web3 =  new Web3(Web3.givenProvider || "ws://localhost:8545");
                  const accounts = await web3.eth.getAccounts();
                  const networkId = await web3.eth.net.getId();
                  const deployedNetwork = FactoryContract.networks[networkId];
                  const instance = new web3.eth.Contract(FactoryContract.abi,
                    deployedNetwork && deployedNetwork.address,);
            
                  setState ({web3,accounts, contract: instance});
                }
                catch (err){
                  alert ( "Failed to load web3, accounts or contract. Check console",)   
                console.error(err);
              }
            }
            init();

    }, [] );

    return (
        <>
        <div> <h2> Create a new Fundraiser</h2></div>
        <label>Name</label>
        <TextField
         id="outlined-bare"
         className={classes.textField}
         placeholder="Fundraiser Name"
         margin = "normal"
         onChange={(e)=> setFundraiserName(e.target.value)}
         variant = "outlined"
         inputProps = {{'aria-label':'bare'}}
         />

         <label>Website</label>
        <TextField
         id="outlined-bare"
         className={classes.textField}
         placeholder="Fundraiser Website"
         margin = "normal"
         onChange={(e)=> setFundraiserWebsite(e.target.value)}
         variant = "outlined"
         inputProps = {{'aria-label':'bare'}}
         />

        <label>Description</label>
        <TextField
         id="outlined-bare"
         className={classes.textField}
         placeholder="Fundraiser Description"
         margin = "normal"
         onChange={(e)=> setFundraiserDescription(e.target.value)}
         variant = "outlined"
         inputProps = {{'aria-label':'bare'}}
         />

        <label>Image</label>
        <TextField
         id="outlined-bare"
         className={classes.textField}
         placeholder="Fundraiser Image"
         margin = "normal"
         onChange={(e)=> setImage(e.target.value)}
         variant = "outlined"
         inputProps = {{'aria-label':'bare'}}
         />

        <label>Address</label>
        <TextField
         id="outlined-bare"
         className={classes.textField}
         placeholder="Fundraiser Address"
         margin = "normal"
         onChange={(e)=> setAddress(e.target.value)}
         variant = "outlined"
         inputProps = {{'aria-label':'bare'}}
         />

        <label>Custodian</label>
        <TextField
         id="outlined-bare"
         className={classes.textField}
         placeholder="Fundraiser Custodian"
         margin = "normal"
         onChange={(e)=> setCustodian(e.target.value)}
         variant = "outlined"
         inputProps = {{'aria-label':'bare'}}
         />

        <label>Contract</label>
        <TextField
         id="outlined-bare"
         className={classes.textField}
         placeholder="Fundraiser Contract"
         margin = "normal"
         onChange={(e)=> setContract(e.target.value)}
         variant = "outlined"
         inputProps = {{'aria-label':'bare'}}
         />
        
        <Button onClick={handleSubmit} variant = "contained" className = {classes.button}>Submit</Button>


       
        </>
    )
}

export default NewFundraiser;