// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./ProjectManager.sol";
// import "./Organization.sol";
import "./DonationReceiptPrinter.sol";
import "./DonorManager.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract DAO_SLR is ProjectManager, DonationReceiptPrinter, DonorManager  {
    // uint public projectCount;
    // uint public tokenMultiplier = 	1000000000000000; // Milliether
    
    //this way 1 ether is 1 voting token
    uint public tokenMultiplier = 1000000000000000000; // Ether

    // Function to donate and receive voting tokens
    receive() external payable {
        addVotingTokens(msg.sender, msg.value / tokenMultiplier);
    }

    // Function to vote for a project using voting tokens
    function voteForProject(uint _projectId, uint _tokens) public {
        require(projects[_projectId].state == ProjectState.Voting, "Project is not in voting state");
        require(_projectId < projectCount, "Invalid project ID");
        require(getDonorTokenBalance(msg.sender) >= _tokens, "Insufficient voting tokens");
        removeVotingTokens(msg.sender, _tokens);
        vote(_projectId, _tokens);
    }

    function voteForOrganization(uint _orgaId) public onlyValidDonor {
        removeAllVotesFromDonorForOrganization(msg.sender, _orgaId, true);
        increaseVotes(_orgaId);
    }

    function voteAgainstOrganization(uint _orgaId) public onlyValidDonor {
        removeAllVotesFromDonorForOrganization(msg.sender, _orgaId, false);
        increaseDownVotes(_orgaId);
    }

    // Function to mint NFTs for donors if a project receives enough votes
    function createReceipt(address _recipient, uint _projectId, uint _donationAmount, uint _timestamp) external {
        require(_projectId < projectCount, "Invalid project ID");
        //ADD: hasDonorDonatedToProject()?
        require(hasReachedFundingGoal(_projectId), "Project not funded yet");
        createDonationReceipt(_recipient, _projectId, _donationAmount, _timestamp);
    }
}