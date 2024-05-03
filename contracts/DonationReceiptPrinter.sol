// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DonationReceiptPrinter is ERC721URIStorage {
    uint internal nextTokenId;
    mapping(bytes32 => bool) public nftsCreated;

    constructor() ERC721("SLR-DonationReceipt", "SLR-DR") {
        nextTokenId = 0;
    }

    // Function to mint NFTs for donors if a project receives enough votes
    function createDonationReceipt(address _recipient, uint _projectId, uint _donationAmount, uint _timestamp) internal {
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
    }

    function hash(string memory _recipient, string memory _projectId, uint _donationAmount, uint _timestamp) private pure returns(bytes32){
        string memory nftMetaHash = string(abi.encodePacked(_recipient, _projectId, _donationAmount, _timestamp));
        return sha256(bytes(nftMetaHash)); //instead of sha256 use keccak256?
    }
}