// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./ProjectManager.sol";
// import "./Organization.sol";
import "./DonationReceiptPrinter.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract DAO_SLR is ProjectManager, OrganizationManager, DonationReceiptPrinter  {
    mapping(address => uint) public votingTokens;
    uint public projectCount;
    uint public tokenMultiplier = 1;

    modifier onlyValidPoDaoMember() {
        require(isProjectOwnerDaoMember(payable(msg.sender)), "Only a project owner that has been onboarded can call this function.");
        require(getProjectOwnerState(msg.sender) == OrganizationState.OnboardingFailed, "This organisation has been banned.");
        require(getProjectOwnerState(msg.sender) == OrganizationState.OngoingProject, "There is an active project ongoing. Please complete it before creating a new one.");
        _;
    }


    // Function to donate and receive voting tokens
    receive() external payable {
        votingTokens[msg.sender] += msg.value * tokenMultiplier;
    }


    function isProjectOwnerDaoMember(address payable _projectOwner) public view returns(bool) {
        OrganizationData memory data = getOrganizationData(_projectOwner); // put into ifstatement directly
        
        if(data.walletAddress == address(0)){
            return false;
        }
        
        return true;
    }

    function getProjectOwnerState(address _projectOwner) public view returns(OrganizationState) {
        return getOrganizationData(_projectOwner).state;
    }

    function showProjectDetails(uint _projectId) public view returns (string memory, uint, uint, uint, uint) {
        require(_projectId < projectCount, "Invalid project ID");
        // !! exchange msg.sender for the actual thing
        return (projects[payable(msg.sender)].projectDescription, projects[payable(msg.sender)].fundingGoal, projects[payable(msg.sender)].currentFunding, uint(projects[payable(msg.sender)].state), projects[payable(msg.sender)].votes[msg.sender]);
    }

    // Function to vote for a project using voting tokens
    function voteForProject(uint _projectId, uint _tokens) public {
        require(_projectId < projectCount, "Invalid project ID");
        require(votingTokens[msg.sender] >= _tokens, "Insufficient voting tokens");
        
        votingTokens[msg.sender] -= _tokens;
        // !! exchange msg.sender for the actual thing
        // reavaluate wether correct
        //projects[msg.sender].vote(_tokens);
        
    }

    function getDonorTokenBalance() public view returns(uint) {
        return votingTokens[msg.sender];
    } 

    // Function to mint NFTs for donors if a project receives enough votes
    function createReceipt(address _recipient, uint _projectId, uint _donationAmount, uint _timestamp) external {
        createDonationReceipt(_recipient, _projectId, _donationAmount, _timestamp);
    }

    // Other functions for managing DAO governance, withdrawing funds, etc.
}