// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./Project.sol";
import "./DonationReceipt.sol";
// Import the ERC721 contract from OpenZeppelin
//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DAO_SLR is ERC721URIStorage {
    mapping(address => uint) public votingTokens;
    mapping(address => bool) public hasReceivedNFT;
    mapping(uint => Project) public projects;
    uint public projectCount;
    uint public tokenMultiplier = 1;

    // The ID of the next token to be minted
    uint private nextTokenId;

    // Constructor to initialize the ERC721 token
    constructor() ERC721("DonationNFT", "DNFT") {
        nextTokenId = 0;
    }

    // Function to create a new project
    function createProject(string memory _title, string memory _description, uint _goal) public returns(uint) {
        Project newProject = new Project(payable(msg.sender), _title, _description, _goal);
        uint projectID = projectCount;
        projects[projectCount] = newProject;
        projectCount++;
        return projectID;
    }

    function showProjectDetails(uint _projectId) public view returns (string memory, uint, uint, uint, uint) {
        require(_projectId < projectCount, "Invalid project ID");
        return (projects[_projectId].projectDescription(), projects[_projectId].fundingGoal(), projects[_projectId].currentFunding(), uint(projects[_projectId].state()), projects[_projectId].votes(msg.sender));
    }

    // Function to donate and receive voting tokens
    receive() external payable {
        votingTokens[msg.sender] += msg.value * tokenMultiplier;
    }

    // Function to vote for a project using voting tokens
    function voteForProject(uint _projectId, uint _tokens) public {
        require(_projectId < projectCount, "Invalid project ID");
        require(votingTokens[msg.sender] >= _tokens, "Insufficient voting tokens");
        
        votingTokens[msg.sender] -= _tokens;
        projects[_projectId].vote(_tokens);
    }

    function getVotingTokens() public view returns(uint) {
        return votingTokens[msg.sender];
    } 

    // Function to mint NFTs for donors if a project receives enough votes
    function createDonationReceipt(uint _projectId) public {
        require(_projectId < projectCount, "Invalid project ID");
        require(projects[_projectId].currentFunding() >= projects[_projectId].fundingGoal(), "Project not funded yet");
        require(!hasReceivedNFT[msg.sender], "NFT already received");
        
/*         string projectTitle = projects[_projectId].projectTitle();
        string projectDescription = projects[_projectId].projectDescription();
        string projectOwner = projects[_projectId].projectOwner(); */

        uint donation = projects[_projectId].getDonationAmount(msg.sender);
        
        // Mint the NFT
        _safeMint(msg.sender, nextTokenId);

        // Create the token URI with the donation details
        string memory tokenURI = 
        string(abi.encodePacked("data:application/json,","{\"Project Title\":\"Donation NFT\",\"description\":\" + projects[_projectId].projectDescription() + ", donation, " ETH to the contract.\"}"));
/*         '{',
            '"ID": "', _projectId, '",',
            '"Project Title": "' + projects[_projectId].projectTitle() + '",',
            '"Description": "' + projects[_projectId].projectDescription() + '",',
            '"Project Owner Wallet": "' + projects[_projectId].projectOwner() + '",',
            '"Donation Amount": "' + donation + '"'
        '{')); */
        _setTokenURI(nextTokenId, tokenURI);
        
        //string test = `{ "name": "Meebit #12347", "description": "Meebit #12347", "image": "http://meebits.larvalabs.com/meebitimages/characterimage?index\u003d12347\u0026type\u003dfull\u0026imageType\u003djpg", "attributes": [ { "trait_type": "Type", "value": "Human" }, { "trait_type": "Hair Style", "value": "Ponytail" }, { "trait_type": "Hair Color", "value": "Dark" }, { "trait_type": "Glasses", "value": "Aviators" }, { "trait_type": "Shirt", "value": "Tube Top" }, { "trait_type": "Shirt Color", "value": "Green" }, { "trait_type": "Pants", "value": "Leggings" }, { "trait_type": "Pants Color", "value": "Blue Camo" }, { "trait_type": "Shoes", "value": "Canvas" }, { "trait_type": "Shoes Color", "value": "Gray" } ] }
        //

        // Set the token URI
        //ERC721().setTokenURI(nextTokenId, tokenURI);

        // Increment the next token ID
        nextTokenId += 1;

        hasReceivedNFT[msg.sender] = true;
    }
    // Other functions for managing DAO governance, withdrawing funds, etc.
}