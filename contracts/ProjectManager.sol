// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./OrganizationManager.sol";

enum ProjectState {
    Onboarding,
    OnboardingFailed,
    Voting,
    VotingRejected,
    Started,
    Ended,
    Completed,
    Failed
}

struct Project {
    uint projectId;
    uint organizationId;
    address payable projectOwner;
    string projectTitle;
    string projectDescription;
    uint fundingGoal;
    uint currentFunding;
    uint totalVotes;
    ProjectState state;
    // mapping(address => uint) votes; // do we need votes to be connected to donor here? or bether the other way around?
}

contract ProjectManager is OrganizationManager {
    mapping(uint => Project) public projects;
    mapping(uint => uint) public projectToOrganization; // needed?

    modifier onlyOrganizationOwner() {
        require(organizations[msg.sender].walletAddress == msg.sender, "Only the organization owner can call this function.");
        _;
    }

    modifier onlyValidOrganization(){
        require(organizations[msg.sender].state != OrganizationState.Onboarding, "Only an organization that has been onboarded can call this function.");
        require(organizations[msg.sender].state != OrganizationState.OnboardingFailed, "This organisation has been banned.");
        _;
    }
    
    uint numberOfProjects;
    
    mapping(address => uint) public votes;

    // Event to emit when project state changes
    event StateChanged(uint _projectId, ProjectState _newState);

    // Event to emit when funding goal is reached
    event FundingGoalReached(uint _projectId, uint _amount);

    function createProject(address payable _owner, uint _organizationId, OrganizationState _orgaState, string memory _title, string memory _description, uint _goal) external onlyOrganizationOwner {
        Project storage newProject = projects[numberOfProjects];
        newProject.organizationId = _organizationId;
        newProject.projectOwner = _owner;
        newProject.projectTitle = _title;
        newProject.projectDescription = _description;
        newProject.fundingGoal = _goal;
        newProject.currentFunding = 0; // do i need to set this to 0?
        newProject.totalVotes = 0; // do i need to set this to 0?

        numberOfProjects++;

        if (_orgaState == OrganizationState.Onboarding)
            newProject.state = ProjectState.Onboarding;
        if (_orgaState == OrganizationState.Onboarded)
            newProject.state = ProjectState.Voting;
    }

    function getProjectsInRange(uint _from, uint _to) public view returns(Project[] memory){
        require(_from <= _to, "Invalid range");
        require(_to < numberOfProjects, "Range exceeds project list length");
        require(_from < numberOfProjects, "Range exceeds project list length");

        Project[] memory projectsInRange = new Project[](_to - _from + 1);

        for (uint i = _from; i <= _to; i++) {
            projectsInRange[i] = projects[i];
        }
        return projectsInRange;
    }

    function getLastTenProjects() public view returns(Project[] memory){
        return getProjectsInRange(numberOfProjects - 10, numberOfProjects - 1);
    }

    // Function for donors to vote for the project
    function vote(uint _projectId, uint _amount) public {
        projects[_projectId].totalVotes += _amount;
        projects[_projectId].currentFunding += _amount;
        
        if (projects[_projectId].currentFunding >= projects[_projectId].fundingGoal) {
            emit FundingGoalReached(_projectId, projects[_projectId].currentFunding);
            transferFunds(_projectId);
        }
    }
    
    // Function to transfer funds to project owner when funding goal is reached
    function transferFunds(uint _projectId) public {
        require(hasReachedFundingGoal(_projectId), "Funding goal not reached");
        Project memory project = projects[_projectId];
        //address payable orgWallet = organizations[project.projectOwner].walletAddress;
       //org.transfer(project.currentFunding);
    }

    function hasReachedFundingGoal(uint _projectId) public view returns (bool) {
        return projects[_projectId].currentFunding >= projects[_projectId].fundingGoal;
    }



    // Transitions:
// Function for DAO contract to start voting
    function startVoting(uint _projectId) external {
        // require(projects[_projectId].state == OrganizationState.Onboarded, "Project is not in the Onboarding state");
        // _transitionState(ProjectState.Voting);
    }

    // // Function for DAO contract to fail the project
    // function startVoting() public {
    //     require(state != ProjectState.Voting, "Project is already in voting state");

    //     _transitionState(ProjectState.Voting);
    // }

    // // Function for DAO contract to start the project
    // function startProject() public {
    //     require(state == ProjectState.Voting, "Project is not in the Voting state");
    //     require(currentFunding >= fundingGoal, "Funding goal not reached");
    //     _transitionState(ProjectState.Started);
    // }

    // // Function for DAO contract to end the project
    // function endProject() public {
    //     require(state == ProjectState.Started, "Project is not in the Started state");
    //     _transitionState(ProjectState.Ended);
    // }
/* 
    // Function for DAO contract to complete the project
    function completeProject() external onlyDAO {
        require(state == ProjectState.Ended, "Project is not in the Ended state");
        _transitionState(ProjectState.Completed); 
   } */

    function _transitionState(uint _projectId, ProjectState newState) internal {
        projects[_projectId].state = newState;
        emit StateChanged(_projectId, newState);
    }
    // Other functions for managing donations, checking if funding goal is reached, etc.
}