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
    mapping (bytes32 => bool) public votesForOrga; // hash of vote (voter, orgId, increaseVote) => bool
    mapping (bytes32 => bool) public votesAgainstOrga; // hash of vote (voter, orgId, increaseVote) => bool

    uint public organizationsCount;

    modifier onlyOrganizationOwner() {
        require(organizations[msg.sender].walletAddress == msg.sender, "Only the organization owner can call this function.");
        _;
    }

    modifier onlyValidOrganization(){
        require(organizations[msg.sender].state != OrganizationState.Onboarding, "Only an organization that has been onboarded can call this function.");
        require(organizations[msg.sender].state != OrganizationState.OnboardingFailed, "This organisation has been banned."); // not called
        _;
    }

    function createOrganization(address payable _walletAddress, string memory _organizationName, string memory _organizationDescription) public  {
        organizations[_walletAddress] = Organization(organizationsCount, _walletAddress, _organizationName, _organizationDescription, OrganizationState.Onboarding, 0, 0);
        organizationIdToAddress[organizationsCount] = _walletAddress;
        organizationsCount++;
    }

    function voteAlreadyCasted(address _donor , uint _orgId, bool _increaseVote) internal view returns(bool){
        if (_increaseVote)
            return votesForOrga[hashVote(_donor, _orgId, _increaseVote)];
        else
            return votesAgainstOrga[hashVote(_donor, _orgId, _increaseVote)];
    }

    // removes all votes for a specific organization, negative and positive
    function removeAllVotesFromDonorForOrganization(address _donor , uint _orgId, bool _increaseVote) internal {
        if(voteAlreadyCasted(_donor, _orgId, _increaseVote)){
            decreaseVotes(_orgId);
            votesForOrga[hashVote(_donor, _orgId, _increaseVote)] = false;
        }
        if(voteAlreadyCasted(_donor, _orgId, !_increaseVote)){
            increaseVotes(_orgId);
            votesAgainstOrga[hashVote(_donor, _orgId, _increaseVote)] = false;
        }
    }

    function increaseVotes(uint _orgId) internal {
        votesForOrga[hashVote(msg.sender, _orgId, true)] = true;
        organizations[organizationIdToAddress[_orgId]].votes++;
        // swap out below with updateOrganizationState();
        if (isControversial(_orgId))
            return;
        if (hasEnoughVotesForOnboarding(_orgId)) {
            setOrganizationState(organizationIdToAddress[_orgId], OrganizationState.Onboarded);
        }
        else {
            setOrganizationState(organizationIdToAddress[_orgId], OrganizationState.Onboarding);
        }
    }

    function decreaseVotes(uint _orgaId) internal {
        organizations[organizationIdToAddress[_orgaId]].votes--;
        if (isControversial(_orgaId)) {
            setOrganizationState(organizationIdToAddress[_orgaId], OrganizationState.OnboardingFailed);
        }
    }

    function increaseDownVotes(uint _orgId) internal {
        votesForOrga[hashVote(msg.sender, _orgId, true)] = true;
        organizations[organizationIdToAddress[_orgId]].downVotes++;
        updateOrganizationState(_orgId);
    }

    function decreaseDownVotes(uint _orgaId) internal {
        organizations[organizationIdToAddress[_orgaId]].downVotes--;
        if (isControversial(_orgaId)) {
            setOrganizationState(organizationIdToAddress[_orgaId], OrganizationState.OnboardingFailed);
        }
    }

    function updateOrganizationState(uint _orgId) internal {
        if (isControversial(_orgId))
        {
            setOrganizationState(organizationIdToAddress[_orgId], OrganizationState.OnboardingFailed);
            return;
        }
        if (hasEnoughVotesForOnboarding(_orgId)) {
            setOrganizationState(organizationIdToAddress[_orgId], OrganizationState.Onboarded);
        }
        else {
            setOrganizationState(organizationIdToAddress[_orgId], OrganizationState.Onboarding);
        }
    }

    function isControversial(uint _orgaId) public view returns(bool) {
        // add correct ratio here
        return organizations[organizationIdToAddress[_orgaId]].votes < organizations[organizationIdToAddress[_orgaId]].downVotes;
    }
    
    function hasEnoughVotesForOnboarding(uint _orgaId) public view returns(bool) {
        return organizations[organizationIdToAddress[_orgaId]].votes > 0;
    }

    // not needed? can be directly pulled from the mapping
    function getOrganization(address _walletAddress) public view returns(Organization memory) {
        return organizations[_walletAddress];
    }

    function getOrganizationById(uint _orgId) public view returns(Organization memory) {
        return organizations[organizationIdToAddress[_orgId]];
    }

    function setOrganizationState(address _walletAddress, OrganizationState _state) internal  {
        organizations[_walletAddress].state = _state;
    }

    function getOrganizationState(address _walletAddress) public view returns(OrganizationState) {
        return organizations[_walletAddress].state;
    }

    function hashVote(address _donor , uint _orgId, bool _increaseVote) private pure returns(bytes32){
        string memory nftMetaHash = string(abi.encodePacked(_donor, _orgId, _increaseVote));
        return sha256(bytes(nftMetaHash)); //instead of sha256 use keccak256?
    }

}
