// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/utils/Strings.sol";
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

// TODO: add a way to see all / last X projects from Organization?
// TODO: add a way to see active projects from Organization?
// TODO: add function to return all organizations
contract OrganizationManager {
    mapping (address => Organization) public organizations;
    mapping (uint => address) public organizationIdToAddress; 
    mapping (bytes32 => bool) public votesForOrga; // hash of vote (voter, orgId, increaseVote) => bool
    mapping (bytes32 => bool) public votesAgainstOrga; // hash of vote (voter, orgId, increaseVote) => bool

    uint public organizationsCount;

    modifier onlyOrganizationOwner() {
        require(organizations[msg.sender].walletAddress == msg.sender, "Only an organization can call this function.");
        _;
    }

    modifier onlyValidOrganization(){
        // for now every organization can create a project despite not being onboarded
        // require(organizations[msg.sender].state != OrganizationState.Onboarding, "Only an organization that has been onboarded can call this function.");
        require(organizations[msg.sender].state != OrganizationState.OnboardingFailed, "This organisation has been banned."); // not called
        _;
    }

    function createOrganization(string memory _organizationName, string memory _organizationDescription) public  {
        // TODO: Check whether msg.sender has already an organization
        organizations[payable(msg.sender)] = Organization(organizationsCount, payable(msg.sender), _organizationName, _organizationDescription, OrganizationState.Onboarded, 0, 0);
        organizationIdToAddress[organizationsCount] = payable(msg.sender);
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
        //maybe use require() and shut down if vote was already casted?
        if(voteAlreadyCasted(_donor, _orgId, _increaseVote)){
            decreaseVotes(_orgId);
            votesForOrga[hashVote(_donor, _orgId, _increaseVote)] = false;
        }
        if(voteAlreadyCasted(_donor, _orgId, !_increaseVote)){
            decreaseDownVotes(_orgId);
            votesAgainstOrga[hashVote(_donor, _orgId, _increaseVote)] = false;
        }
    }

    function increaseVotes(uint _orgId) internal {
        votesForOrga[hashVote(msg.sender, _orgId, true)] = true;
        organizations[organizationIdToAddress[_orgId]].votes++;
        updateOrganizationState(_orgId);
    }

    function decreaseVotes(uint _orgaId) internal {
        unchecked{
        uint votes = organizations[organizationIdToAddress[_orgaId]].votes;
        organizations[organizationIdToAddress[_orgaId]].votes = votes - 1;}
        updateOrganizationState(_orgaId);
    }

    function increaseDownVotes(uint _orgId) internal {
        votesForOrga[hashVote(msg.sender, _orgId, true)] = true;
        organizations[organizationIdToAddress[_orgId]].downVotes++;
        updateOrganizationState(_orgId);
    }

    function decreaseDownVotes(uint _orgaId) internal {
        unchecked{
        organizations[organizationIdToAddress[_orgaId]].downVotes--;
        }
        updateOrganizationState(_orgaId);
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
    
    // set magic number to something more reasonable
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

    function getAllOrganizations() public view returns(uint[] memory ids, string[] memory names, string[] memory descriptions, OrganizationState[] memory states, uint[] memory upvotes, uint[] memory downvotes) {
        uint[] memory orgIds = new uint[](organizationsCount);
        string[] memory orgaNames = new string[](organizationsCount);
        string[] memory orgaDescriptions = new string[](organizationsCount);
        OrganizationState[] memory orgaStates = new OrganizationState[](organizationsCount);
        uint[] memory votes = new uint[](organizationsCount);
        uint[] memory downVotes = new uint[](organizationsCount);
        

        // require(organizationsCount == 2231, Strings.toString(organizationsCount));
        
        orgaNames[0] = Strings.toString(organizationsCount);

        // Organization[] memory orgs = new Organization[](organizationsCount);
        for (uint i = 0; i < organizationsCount; i++) {
            Organization memory org = getOrganizationById(i);
            orgIds[i] = org.organizationId;
            orgaNames[i] = org.organizationName;
            orgaDescriptions[i] =  org.organizationDescription;
            orgaStates[i] =  org.state;
            votes[i] =  org.votes;
            downVotes[i] =  org.downVotes;
        }
        return (orgIds, orgaNames, orgaDescriptions, orgaStates, votes, downVotes);
    }

    function hashVote(address _donor , uint _orgId, bool _increaseVote) private pure returns(bytes32){
        string memory nftMetaHash = string(abi.encodePacked(_donor, _orgId, _increaseVote));
        return sha256(bytes(nftMetaHash)); //instead of sha256 use keccak256?
    }

}
