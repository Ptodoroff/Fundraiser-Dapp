pragma solidity 0.8.15;
import "./Fundraiser.sol";

contract FundraiserFactory {
    Fundraiser[] public _fundraisers;
    event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);
    uint constant maxLimit=20;

    function fundraisersCount () public view  returns(uint){
        return _fundraisers.length;

    }

    function createFundraiser (string memory name, string memory url, string memory imageURL, string memory description, address payable beneficiary) public {
        Fundraiser fundraiser= new Fundraiser(name,url,imageURL,description,beneficiary,msg.sender);
        _fundraisers.push(fundraiser);
        emit FundraiserCreated(fundraiser, msg.sender);
    }

    function fundraisers (uint limit, uint offset) public view returns (Fundraiser[] memory coll){
        require(offset<=fundraisersCount(),"offset out of bounds");
        uint size = fundraisersCount() - offset;
        size = fundraisersCount()<limit? fundraisersCount(): limit;
        size = size<maxLimit ? size: maxLimit;
        coll = new Fundraiser[](size);

        for(uint i=0;i<size;i++){
            coll[i]=_fundraisers[offset + i ];
        }

    return coll;
    }

}