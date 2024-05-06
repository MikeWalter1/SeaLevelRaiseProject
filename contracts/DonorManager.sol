// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

struct Donor{
    address donorAddress;
    uint votingTokens;
}

contract DonorManager {
    mapping(address => Donor) public donors;

    modifier onlyValidDonor() {
        require(doesDonorExist(msg.sender), "Only donors can call this function.");
        _;
    }

    function addDonor(address _donor) internal {
        donors[_donor].donorAddress = _donor;
    }

    function doesDonorExist(address _donor) public view returns(bool) {
        return donors[_donor].donorAddress == _donor;
    }

    function getDonorTokenBalance(address _donor) public view returns(uint) {
    return donors[_donor].votingTokens;
    } 

    function addVotingTokens(address _donor, uint _tokens) internal {
        if (!doesDonorExist(_donor)) {
            addDonor(_donor);
        }
        donors[_donor].votingTokens += _tokens;
    }

    function removeVotingTokens(address _donor, uint _tokens) internal {
        require(donors[_donor].votingTokens >= _tokens, "Insufficient voting tokens");
        donors[_donor].votingTokens -= _tokens;
    }

    function withdrawFunds(uint _amount) public {
        require(donors[msg.sender].votingTokens >= _amount, "Insufficient funds");
        donors[msg.sender].votingTokens -= _amount;
        payable(msg.sender).transfer(_amount);
    }

}
