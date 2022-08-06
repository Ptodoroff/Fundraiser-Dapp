pragma solidity 0.8.15;
import "../node_modules/openzeppelin-contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-contracts/math/SafeMath.sol";

contract Fundraiser  is Ownable{
using SafeMath for uint256;

uint256 public donationsCount;
uint256 public totalDonations;

string public name;
string public url;
string public imageURL;
string public description;
address payable public beneficiary;

struct Donation {
    uint value;
    uint date;
}

event donationsReceived(address indexed donor, uint value);
mapping(address=>Donation[]) private _donations;



constructor (string memory _name,
            string memory _url,
            string memory _imageURL,
            string memory _description,
            address payable _beneficiary,
            address _custodian) {
    name=_name;
    url=_url;
    imageURL=_imageURL;
    description=_description;
    transferOwnership(_custodian);
    beneficiary=_beneficiary;

}

function setBeneficiary(address payable _beneficiary) external onlyOwner {
    beneficiary=_beneficiary;
}

function myDonationsCount() public   view returns (uint256){
    return _donations[msg.sender].length;
}

function donate() public payable {
    Donation memory donation = Donation (
        msg.value,
        block.timestamp
    );
    _donations[msg.sender].push(donation);
    totalDonations=totalDonations.add(msg.value);
    donationsCount++;
    emit donationsReceived(msg.sender, msg.value);

}

function myDonations () public view returns (
    uint [] memory values,
    uint [] memory dates
) {
    uint count = myDonationsCount();
    values = new uint[](count);
    dates = new uint[](count);

    for (uint i; i< count; i++){
        Donation storage donation = _donations[msg.sender][i];
        values[i]=donation.value;
        dates[i]=donation.date;

    }
    return (values,dates);

}





}