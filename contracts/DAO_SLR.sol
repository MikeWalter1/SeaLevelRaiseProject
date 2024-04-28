// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./Project.sol";
import "./Organization.sol";
import "./DonationReceipt.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract DAO_SLR  {
    mapping(address => uint) public votingTokens;
    mapping(uint => Project) public projects;
    mapping(address => OrganizationState) public projectOwnerOnboarded;
    mapping(address => bool) public hasReceivedNFT;
    mapping(address => Organization) public organizations;
    uint public projectCount;
    uint public tokenMultiplier = 1;
    DonationReceipt public donationReceiptPrinter;
    Organization public organizationManager;
    // The ID of the next token to be minted
    uint private nextTokenId;

    modifier onlyValidPoDaoMember() {
        require(isProjectOwnerDaoMember(payable(msg.sender)), "Only a project owner that has been onboarded can call this function.");
        require(getProjectOwnerState(msg.sender) == OrganizationState.OnboardingFailed, "This organisation has been banned.");
        require(getProjectOwnerState(msg.sender) == OrganizationState.OngoingProject, "There is an active project ongoing. Please complete it before creating a new one.");
        _;
    }

    // Constructor to initialize the ERC721 token
    constructor() {
        //nextTokenId = 0;
        donationReceiptPrinter = new DonationReceipt(address(this));
        organizationManager = new Organization(address(this));
    }

    // Function to donate and receive voting tokens
    receive() external payable {
        votingTokens[msg.sender] += msg.value * tokenMultiplier;
    }

    // Function to create a new project
    function createProject(string memory _title, string memory _description, uint _goal) public onlyValidPoDaoMember returns(uint) {
        OrganizationState organizationState = getProjectOwnerState(msg.sender);
        Project newProject = new Project(payable(msg.sender), _title, _description, _goal, organizationState);
        uint projectID = projectCount;
        projects[projectCount] = newProject;
        projectCount++;
        return projectID;
    }

    function createNewOrganization(string memory _organizationName, string memory _organisationDescription /* string memory _city, string memory _streetAddress, string memory _postalCode, string memory _country, string memory _urlLegalDocuments, string memory _taxNumber, string memory _website, string memory _phoneNumber, string memory _email, string memory _responsiblePerson*/) public {
        //Organization newOrganization = new Organization(payable(msg.sender), _organizationName, _organisationDescription, /* _city, _streetAddress, _postalCode, _country, _urlLegalDocuments, _taxNumber, _website, _phoneNumber, _email, */ _responsiblePerson);
        //organizations[msg.sender] = newOrganization;
        organizationManager.createOrganizationData(payable(msg.sender), _organizationName, _organisationDescription);
    }

    function isProjectOwnerDaoMember(address payable _projectOwner) public view returns(bool) {
        OrganizationData memory data = organizationManager.getOrganizationData(_projectOwner); // put into ifstatement directly
        
        if(data.walletAddress == address(0)){
            return false;
        }
        
        return true;
    }

    function getProjectOwnerState(address _projectOwner) public view returns(OrganizationState) {
        return organizationManager.getOrganizationData(_projectOwner).state;
    }

    function showProjectDetails(uint _projectId) public view returns (string memory, uint, uint, uint, uint) {
        require(_projectId < projectCount, "Invalid project ID");
        return (projects[_projectId].projectDescription(), projects[_projectId].fundingGoal(), projects[_projectId].currentFunding(), uint(projects[_projectId].state()), projects[_projectId].votes(msg.sender));
    }

    // Function to vote for a project using voting tokens
    function voteForProject(uint _projectId, uint _tokens) public {
        require(_projectId < projectCount, "Invalid project ID");
        require(votingTokens[msg.sender] >= _tokens, "Insufficient voting tokens");
        
        votingTokens[msg.sender] -= _tokens;
        projects[_projectId].vote(_tokens);
    }

    function getDonorTokenBalance() public view returns(uint) {
        return votingTokens[msg.sender];
    } 



/*     function getTokenInformation(uint _tokenId) public view returns (string memory) {
        return tokenURI(_tokenId);
    } */

    // Function to mint NFTs for donors if a project receives enough votes
    function createReceipt(address _recipient, uint _projectId, uint _donationAmount, uint _timestamp) external {
        donationReceiptPrinter.createDonationReceipt(_recipient, _projectId, _donationAmount, _timestamp);
    }

    // Other functions for managing DAO governance, withdrawing funds, etc.
}