// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

enum OrganizationState {
    Onboarding,
    OnboardingFailed,
    Onboarded,
    OngoingProject
}

struct Organization {
    uint organizationId;
    address payable walletAddress;
    string organizationName;
    string organizationDescription;
    OrganizationState state;
    uint votes;
    uint downVotes;
}



contract OrganizationManager {
    mapping (address => Organization) public organizations;
    mapping (uint => address) public organizationIdToAddress; 
    uint public numberOfOrganizations;

    modifier onlyOrganizationOwner() {
        require(organizations[msg.sender].walletAddress == msg.sender, "Only the organization owner can call this function.");
        _;
    }

    modifier onlyValidOrganization(){
        require(organizations[msg.sender].state != OrganizationState.Onboarding, "Only an organization that has been onboarded can call this function.");
        require(organizations[msg.sender].state != OrganizationState.OnboardingFailed, "This organisation has been banned.");
        _;
    }
    
    function createOrganization(address payable _walletAddress, string memory _organizationName, string memory _organizationDescription) public  {
        organizations[_walletAddress] = Organization(numberOfOrganizations, _walletAddress, _organizationName, _organizationDescription, OrganizationState.Onboarding, 0, 0);
        organizationIdToAddress[numberOfOrganizations] = _walletAddress;
        numberOfOrganizations++;
    }

    function increaseVotes() public{
        // TODO
    }

    function decreaseVotes() public{
        // TODO
    }




    // not needed? can be directly pulled from the mapping
    function getOrganization(address _walletAddress) public view returns(Organization memory) {
        return organizations[_walletAddress];
    }

    function setOrganizationState(address _walletAddress, OrganizationState _state) internal  {
        organizations[_walletAddress].state = _state;
    }

    function getOrganizationState(address _walletAddress) public view returns(OrganizationState) {
        return organizations[_walletAddress].state;
    }

}
