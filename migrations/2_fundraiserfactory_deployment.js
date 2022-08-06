const FundraiserFactory = artifacts.require("FundraiserFactory");

module.exports = function (deployer) {
  deployer.deploy(FundraiserFactory);
};
