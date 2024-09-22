// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

struct Donor{
    address donorAddress;
    uint votingTokens;
}

// TODO: save all votes, so that we can return the donations if project fails?
// Contract managing donors
contract DonorManager {
    mapping(address => Donor) public donors;

    // modifier to check if the caller is a donor
    modifier onlyValidDonor() {
        require(doesDonorExist(msg.sender), "Only donors can call this function.");
        _;
    }

    // Internal function to add a donor
    function addDonor(address _donor) internal {
        donors[_donor].donorAddress = _donor;
    }

    // Function to check if a donor exists
    function doesDonorExist(address _donor) public view returns(bool) {
        return donors[_donor].donorAddress == _donor;
    }

    // Function to get the voting token balance of a donor
    function getDonorTokenBalance(address _donor) public view returns(uint) {
    return donors[_donor].votingTokens;
    } 

    // Function to add voting tokens to a donor
    function addVotingTokens(address _donor, uint _tokens) internal {
        if (!doesDonorExist(_donor)) {
            addDonor(_donor);
        }
        donors[_donor].votingTokens += _tokens;
    }

    // Function to remove voting tokens from a donor
    function removeVotingTokens(address _donor, uint _tokens) internal {
        require(donors[_donor].votingTokens >= _tokens, "Insufficient voting tokens");
        donors[_donor].votingTokens -= _tokens;
    }

    // Function to withdraw funds
    function withdrawFunds(uint _amount) public {
        require(donors[msg.sender].votingTokens >= _amount, "Insufficient funds");
        donors[msg.sender].votingTokens -= _amount;
        payable(msg.sender).transfer(_amount);
    }

}
