// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./ProjectManager.sol";
// import "./Organization.sol";
import "./DonationReceiptPrinter.sol";
import "./DonorManager.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract DAO_SLR is ProjectManager, DonationReceiptPrinter, DonorManager  {
    // uint public projectCount;
    uint public tokenMultiplier = 1;

    modifier onlyValidPoDaoMember() {
        require(getOrganization(msg.sender).walletAddress == msg.sender, "Only a project owner that has been onboarded can call this function.");
        require(getOrganizationState(msg.sender) == OrganizationState.OnboardingFailed, "This organisation has been banned.");
        require(getOrganizationState(msg.sender) == OrganizationState.OngoingProject, "There is an active project ongoing. Please complete it before creating a new one.");
        _;
    }

    // Function to donate and receive voting tokens
    receive() external payable {
        addVotingTokens(msg.sender, msg.value * tokenMultiplier);
    }

    // Function to vote for a project using voting tokens
    function voteForProject(uint _projectId, uint _tokens) public {
        require(_projectId < projectCount, "Invalid project ID");
        require(getDonorTokenBalance(msg.sender) >= _tokens, "Insufficient voting tokens");
        removeVotingTokens(msg.sender, _tokens);
        vote(_projectId, _tokens);
    }

    function voteForOrganization() public {
        // TODO
    }

    function voteAgainstOrganization() public {
        // TODO
    }

    // Transfer funds to project owner when funding goal is reached
    function transferFundsToProject(uint _projectId) public {
        require(hasReachedFundingGoal(_projectId), "Funding goal not reached");
        Project memory project = projects[_projectId];
        getOrganization(project.projectOwner).walletAddress.transfer(project.currentFunding);
        //address payable orgWallet = organizations[project.projectOwner].walletAddress;
       //org.transfer(project.currentFunding);
        // getOrganization(_projectId).walletAddress.transfer(project.currentFunding);
        // organizations[].walletAddress.transfer(project.currentFunding);

        // no need to set funding to 0. prevent more than one transfer by adding a state variable. 
        //currentFunding = 0; // Reset current funding after transfer
    }

    

    // Function to mint NFTs for donors if a project receives enough votes
    function createReceipt(address _recipient, uint _projectId, uint _donationAmount, uint _timestamp) external {
        require(_projectId < projectCount, "Invalid project ID");
        //ADD: hasDonorDonatedToProject()?
        require(hasReachedFundingGoal(_projectId), "Project not funded yet");
        createDonationReceipt(_recipient, _projectId, _donationAmount, _timestamp);
    }
}