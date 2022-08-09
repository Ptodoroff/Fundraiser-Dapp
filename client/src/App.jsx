import React, { useState, useEffect} from "react";
import FactoryContract from "./contracs/Factory.sol";
import web3 from "./utils/getWeb3";
import"./App.css";

const App = ()=> {
  const [state, setState] = useState ({web3: null, accounts: null, contract: null});
  const [starageValue, setStorageValue] = useState(0);

  useEffect (()=>{
    try{
      const web3 = await getWeb3();





    }





  })







})
