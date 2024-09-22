// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// TODO: add password/salt to hash so that the donor can remain anonymous?
// Contract to mint NFTs for donors who donate to a project
contract DonationReceiptPrinter is ERC721URIStorage {
    uint internal nextTokenId;
    mapping(bytes32 => bool) public nftsCreated;

    constructor() ERC721("SLR-DonationReceipt", "SLR-DR") {
        nextTokenId = 0;
    }

    // Function to mint NFTs for donors if a project receives enough votes
    // How will we handle multiple donations from the same donor? like irl, one receipt per donation?
    function createDonationReceipt(address _recipient, uint _projectId, uint _donationAmount, uint _timestamp) internal {
        bytes32 nftHash = hash(Strings.toHexString(uint256(uint160(_recipient)), 20), Strings.toString(_projectId), _donationAmount, _timestamp);
        require(!nftsCreated[nftHash], "NFT already created");
        nftsCreated[nftHash] = true;

        // Mint the NFT
        _safeMint(_recipient, nextTokenId);

        // Create the token URI with the donation details !(Info not correct, needs to be updated!)
        string memory tokenURI = 
        string(abi.encodePacked("data:application/json,{\"Project Title\":\"Donation NFT\",\"description\":\" + projects[_projectId].projectDescription() + ", _donationAmount, " ETH to the contract.\"}"));

        _setTokenURI(nextTokenId, tokenURI);
        
        nextTokenId += 1;
    }

    // Function to hash the donation details
    function hash(string memory _recipient, string memory _projectId, uint _donationAmount, uint _timestamp) private pure returns(bytes32){
        string memory nftMetaHash = string(abi.encodePacked(_recipient, _projectId, _donationAmount, _timestamp));
        return sha256(bytes(nftMetaHash)); //instead of sha256 use keccak256?
    }
}