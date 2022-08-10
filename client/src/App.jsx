import React, { useState, useEffect} from "react";
import FactoryContract from "./contracs/Factory.sol";
import getWeb3 from "./utils/getWeb3";
import { BrowserRouter as Router, Route, NavLink} from react-router-dom;
import NewFundraiser from "./NewFundraiser";
import Home from "./Home";
import"./App.css";

const App = ()=> {
  const [state, setState] = useState ({web3: null, accounts: null, contract: null});
  const [starageValue, setStorageValue] = useState(0);

  useEffect (()=>{
    const init = async () => {
    try{
      const web3 = await getWeb3();
      const account = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FactoryContract.networks[networkId];
      const instance = new web3.eth.Contract(FactoryContract.abi,
        deployedNetwork && deployedNetwork.address,);

      setState ({web3,accounts, contract: instance});
    }
    catch (err){
      alert ( "Failed to load web3, accounts or contract. Check console",)   
    console.error(error);
  }
}
init();
},[]);

const runExample = async () => {
  const {accounts, conracts } = state;

};

return (
  <>
  <div>
    <h1>Fundraiser</h1>
  </div>
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
          <NavLink to="/new/">New</NavLink>
          </li>
        </ul>
      </nav>
      <Route path ="/" exact component={Home} />
      <Route pat="/new/" cpmponent={NewFundraiser} />
    </div>
    </Router>










  </Router>
  </>
  );

}

export default App;
