// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./Project.sol";

contract DAO {
    mapping(address => uint) public votingTokens;
    mapping(address => bool) public hasReceivedNFT;
    mapping(uint => Project) public projects;
    uint public projectCount;
    uint public tokenMultiplier = 1;

    // Function to create a new project
    function createProject(string memory _description, uint _goal) public {
        Project newProject = new Project(payable(msg.sender), _description, _goal);
        projects[projectCount] = newProject;
        projectCount++;
    }

    // Function to donate and receive voting tokens
    function donate() public payable {
        votingTokens[msg.sender] += msg.value * tokenMultiplier;
    }

    // Function to vote for a project using voting tokens
    function voteForProject(uint _projectId, uint _tokens) public {
        require(_projectId < projectCount, "Invalid project ID");
        require(votingTokens[msg.sender] >= _tokens, "Insufficient voting tokens");
        
        votingTokens[msg.sender] -= _tokens;
        projects[_projectId].vote(_tokens);
    }

    // Function to mint NFTs for donors if a project receives enough votes
    function mintNFT(uint _projectId) public {
        require(_projectId < projectCount, "Invalid project ID");
        require(projects[_projectId].currentFunding() >= projects[_projectId].fundingGoal(), "Project not funded yet");
        require(!hasReceivedNFT[msg.sender], "NFT already received");
        
        // Mint NFT with donation information
        // Code for minting NFT goes here
        
        hasReceivedNFT[msg.sender] = true;
    }

    // Other functions for managing DAO governance, withdrawing funds, etc.
}