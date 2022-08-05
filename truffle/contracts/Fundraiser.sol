pragma solidity 0.8.15;

contract Fundraiser {

string public name;
string public url;
string public imageURL;
string public description;
address public custodian;
address payable public beneficiary;



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
    custodian=_custodian;
    beneficiary=_beneficiary;

}
}