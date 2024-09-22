// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./ProjectManager.sol";
// import "./Organization.sol";
import "./DonationReceiptPrinter.sol";
import "./DonorManager.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title DAO_SLR
 * @dev DAO_SLR is a decentralized autonomous organization (DAO) contract that manages projects, donations, and voting.
 * It inherits functionalities from ProjectManager, DonationReceiptPrinter, and DonorManager contracts.
 */
contract DAO_SLR is ProjectManager, DonationReceiptPrinter, DonorManager  {
    // uint public projectCount;
    // uint public tokenMultiplier = 	1000000000000000; // Milliether
    
    //this way 1 ether is 1 voting token
    uint public tokenMultiplier = 1000000000000000000; // Ether

    // Function to donate and receive voting tokens
    receive() external payable {
        addVotingTokens(msg.sender, msg.value / 1);//tokenMultiplier);
    }

    /**
     * @dev Function to vote for a project using voting tokens.
     * @param _projectId The ID of the project to vote for.
     * @param _tokens The number of voting tokens to use for voting.
     * Requirements:
     * - The project must be in the voting state.
     * - The project ID must be valid.
     * - The sender must have sufficient voting tokens.
     */
    function voteForProject(uint _projectId, uint _tokens) public {
        require(projects[_projectId].state == ProjectState.Voting, "Project is not in voting state");
        require(_projectId < projectCount, "Invalid project ID");
        require(getDonorTokenBalance(msg.sender) >= _tokens, "Insufficient voting tokens");
        removeVotingTokens(msg.sender, _tokens);
        vote(_projectId, _tokens);
    }

    // Function to vote for a project
    function voteForOrganization(uint _orgaId) public onlyValidDonor returns(uint orgaId, uint upvotes, uint downvotes) {
        removeAllVotesFromDonorForOrganization(msg.sender, _orgaId);
        increaseUpVotes(_orgaId);
        uint votes = organizations[organizationIdToAddress[_orgaId]].votes;
        uint downVotes = organizations[organizationIdToAddress[_orgaId]].downVotes;
        
        emit VotingUpdated(_orgaId, votes, downVotes);
        return (_orgaId, votes, downVotes);
    }

    /**
     * @dev Function to vote for an organization.
     * @return orgaId The ID of the organization.
     * @return upvotes The number of upvotes the organization has received.
     * @return downvotes The number of downvotes the organization has received.
     * Requirements:
     * - The sender must be a valid donor.
     */
    function voteAgainstOrganization(uint _orgaId) public onlyValidDonor returns(uint orgaId, uint upvotes, uint downvotes) {
        removeAllVotesFromDonorForOrganization(msg.sender, _orgaId);
        increaseDownVotes(_orgaId);
        uint votes = organizations[organizationIdToAddress[_orgaId]].votes;
        uint downVotes = organizations[organizationIdToAddress[_orgaId]].downVotes;
        
        emit VotingUpdated(_orgaId, votes, downVotes);
        return (_orgaId, votes, downVotes);
    }

    // Function to mint NFTs for donors if a project receives enough votes
    function createReceipt(address _recipient, uint _projectId, uint _donationAmount, uint _timestamp) external {
        require(_projectId < projectCount, "Invalid project ID");
        //ADD: hasDonorDonatedToProject()?
        require(hasReachedFundingGoal(_projectId), "Project not funded yet");
        createDonationReceipt(_recipient, _projectId, _donationAmount, _timestamp);
    }
}