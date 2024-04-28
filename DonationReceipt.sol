// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DonationNFT is ERC721URIStorage {
    struct Donation {
        address donor;
        uint amount;
        uint timestamp;
    }
    uint private nextTokenId;
    address payable public dao;
    mapping(address => Donation[]) public donations;
    mapping(bytes32 => bool) public nftsCreated;

    constructor(address _dao) ERC721("SLR-DonationReceipt", "SLR-DR") {
        dao = payable(_dao);
        nextTokenId = 0;
    }

    // Function to mint NFTs for donors if a project receives enough votes
    function createDonationReceipt(address _recipient, uint _projectId, uint _donationAmount, uint _timestamp) public {
        require(msg.sender == dao, "Only DAO_SLR contract can access this function");

        
        bytes32 nftHash = hash(Strings.toHexString(uint256(uint160(_recipient)), 20), Strings.toString(_projectId), _donationAmount, _timestamp);
        require(!nftsCreated[nftHash], "NFT already created");
        nftsCreated[nftHash] = true;
        //this has to happen somewhere else
        //require(_projectId < projectCount, "Invalid project ID");
        //require(projects[_projectId].currentFunding() >= projects[_projectId].fundingGoal(), "Project not funded yet");
        //require(!hasReceivedNFT[msg.sender], "NFT already received");

        // Mint the NFT
        _safeMint(_recipient, nextTokenId);

        // Create the token URI with the donation details
        string memory tokenURI = 
        string(abi.encodePacked("data:application/json,{\"Project Title\":\"Donation NFT\",\"description\":\" + projects[_projectId].projectDescription() + ", _donationAmount, " ETH to the contract.\"}"));

        _setTokenURI(nextTokenId, tokenURI);

        // Increment the next token ID
        nextTokenId += 1;
        donations[_recipient].push(Donation(_recipient, _donationAmount, _timestamp));
    }

    function hash(string memory _recipient, string memory _projectId, uint _donationAmount, uint _timestamp) private pure returns(bytes32){
        string memory nftMetaHash = string(abi.encodePacked(_recipient, _projectId, _donationAmount, _timestamp));
        return sha256(bytes(nftMetaHash));
    }
}