// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

struct Donor{
    address donorAddress;
    uint votingTokens;
}

contract DonorManager {
    mapping(address => Donor) public donors;

    function getDonorTokenBalance() public view returns(uint) {
    return donors[msg.sender].votingTokens;
    } 

    function addVotingTokens(uint _tokens) public {
        donors[msg.sender].votingTokens += _tokens;
    }

    function removeVotingTokens(uint _tokens) public {
        require(donors[msg.sender].votingTokens >= _tokens, "Insufficient voting tokens");
        donors[msg.sender].votingTokens -= _tokens;
    }
}
