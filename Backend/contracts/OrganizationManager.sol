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

    // Event to emit when voting for an organization is updated
    event VotingUpdated(uint _orgId, uint _votes, uint _downVotes);

    // modifier to check if the caller is the owner of the organization
    modifier onlyOrganizationOwner() {
        require(organizations[msg.sender].walletAddress == msg.sender, "Only an organization can call this function.");
        _;
    }

    // modifier to check if the organization is valid
    modifier onlyValidOrganization(){
        // for now every organization can create a project despite not being onboarded
        // require(organizations[msg.sender].state != OrganizationState.Onboarding, "Only an organization that has been onboarded can call this function.");
        require(organizations[msg.sender].state != OrganizationState.OnboardingFailed, "This organisation has been banned."); // not called
        _;
    }

    // Function to create a new organization
    function createOrganization(string memory _organizationName, string memory _organizationDescription) public  {
        require(organizations[msg.sender].walletAddress != msg.sender, "You can only create one organization.");
        organizations[payable(msg.sender)] = Organization(organizationsCount, payable(msg.sender), _organizationName, _organizationDescription, OrganizationState.Onboarded, 0, 0);
        organizationIdToAddress[organizationsCount] = payable(msg.sender);
        organizationsCount++;
    }

    // Function to check if a vote was already casted
    function voteAlreadyCasted(address _donor , uint _orgId, bool _upVotes) internal view returns(bool){
        if (_upVotes)
            return votesForOrga[hashVote(_donor, _orgId)];
        else
            return votesAgainstOrga[hashVote(_donor, _orgId)];
    }

    // Removes all votes for a specific organization, negative and positive
    function removeAllVotesFromDonorForOrganization(address _donor , uint _orgId) internal {
        //maybe use require() and shut down if vote was already casted?
        if(voteAlreadyCasted(_donor, _orgId, true)){
            decreaseUpVotes(_orgId);
            votesForOrga[hashVote(_donor, _orgId)] = false;
        }
        if(voteAlreadyCasted(_donor, _orgId, false)){
            decreaseDownVotes(_orgId);
            votesAgainstOrga[hashVote(_donor, _orgId)] = false;
        }
    }

    // Internal function to increase upvotes for an organization
    function increaseUpVotes(uint _orgId) internal {
        votesForOrga[hashVote(msg.sender, _orgId)] = true;
        organizations[organizationIdToAddress[_orgId]].votes++;
        updateOrganizationState(_orgId);
    }

    // Internal function to decrease upvotes for an organization
    function decreaseUpVotes(uint _orgaId) internal {
        organizations[organizationIdToAddress[_orgaId]].votes--;
        updateOrganizationState(_orgaId);
    }

    // Internal function to increase downvotes for an organization
    function increaseDownVotes(uint _orgId) internal {
        votesAgainstOrga[hashVote(msg.sender, _orgId)] = true;
        organizations[organizationIdToAddress[_orgId]].downVotes++;
        updateOrganizationState(_orgId);
    }

    // Internal function to decrease downvotes for an organization
    function decreaseDownVotes(uint _orgaId) internal {
        organizations[organizationIdToAddress[_orgaId]].downVotes--;
        updateOrganizationState(_orgaId);
    }

    // Internal function to update the state of an organization
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

    // Function to check if an organization is controversial
    function isControversial(uint _orgaId) public view returns(bool) {
        // add correct ratio here
        return organizations[organizationIdToAddress[_orgaId]].votes < organizations[organizationIdToAddress[_orgaId]].downVotes;
    }
    
    // Function to check if an organization has enough votes for onboarding
    // Todo: Set magic number to something more reasonable
    function hasEnoughVotesForOnboarding(uint _orgaId) public view returns(bool) {
        return organizations[organizationIdToAddress[_orgaId]].votes > 0;
    }

    // Function to get an organization by its wallet address
    // not needed? can be directly pulled from the mapping
    function getOrganization(address _walletAddress) public view returns(Organization memory) {
        return organizations[_walletAddress];
    }

    // Function to get an organization by its ID
    function getOrganizationById(uint _orgId) public view returns(Organization memory) {
        return organizations[organizationIdToAddress[_orgId]];
    }

    // Function to set the state of an organization
    function setOrganizationState(address _walletAddress, OrganizationState _state) internal  {
        organizations[_walletAddress].state = _state;
    }

    // Function to get the state of an organization
    function getOrganizationState(address _walletAddress) public view returns(OrganizationState) {
        return organizations[_walletAddress].state;
    }
    
    // Function to get the state of an organization by its ID
    function getAllOrganizations() public view returns(uint[] memory ids, string[] memory names, string[] memory descriptions, OrganizationState[] memory states, uint[] memory upvotes, uint[] memory downvotes) {
        uint[] memory orgIds = new uint[](organizationsCount);
        string[] memory orgaNames = new string[](organizationsCount);
        string[] memory orgaDescriptions = new string[](organizationsCount);
        OrganizationState[] memory orgaStates = new OrganizationState[](organizationsCount);
        uint[] memory votes = new uint[](organizationsCount);
        uint[] memory downVotes = new uint[](organizationsCount);
        
        orgaNames[0] = Strings.toString(organizationsCount);

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

    // Function to hash a vote
    function hashVote(address _donor , uint _orgId) private pure returns(bytes32){
        string memory nftMetaHash = string(abi.encodePacked(_donor, _orgId));
        return sha256(bytes(nftMetaHash)); //instead of sha256 use keccak256?
    }

}
