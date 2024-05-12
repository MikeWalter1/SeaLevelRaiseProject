// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./OrganizationManager.sol";

enum ProjectState {
    Onboarding, // not needed anymore
    OnboardingFailed, // not needed anymore
    Voting,
    VotingRejected, // should trigger after time?
    Started, // Project was started
    Ended, // wating for DAO to decide whether project was successful or not
    Completed, // Project was successful
    Failed // Project was not successful - penalty for organization
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
    uint creationTimestamp;
    // mapping(address => uint) votes; // do we need votes to be connected to donor here? or bether the other way around?
    // or better add array of voters + another array of voting amounts, so that we can give back the donations if project fails
}


// TODO: add proof handling for project end. maybe add url field to project struct?
// TODO: add vote for ending project successfully or not?
// TODO: returning donations for failed projects
contract ProjectManager is OrganizationManager {
    mapping(uint => Project) public projects;
    mapping(uint => uint) public projectToOrganization; // needed?
    uint projectCount;
    mapping(address => uint) public votes;

    // Event to emit when project state changes
    event StateChanged(uint _projectId, ProjectState _newState);

    // Event to emit when funding goal is reached
    event FundingGoalReached(uint _projectId, uint _amount);

    function createProject(address payable _owner, uint _organizationId, string memory _title, string memory _description, uint _goal) public onlyOrganizationOwner onlyValidOrganization {
        
        Project storage newProject = projects[projectCount];
        newProject.organizationId = _organizationId;
        newProject.projectOwner = _owner;
        newProject.projectTitle = _title;
        newProject.projectDescription = _description;
        newProject.fundingGoal = _goal;
        newProject.state = ProjectState.Voting;
        newProject.creationTimestamp = block.timestamp;
        projectCount++;
    }

    function getProjectsInRange(uint _from, uint _to) public view returns(Project[] memory){
        require(_from <= _to, "Invalid range");
        require(_to < projectCount, "Range exceeds project list length");
        require(_from < projectCount, "Range exceeds project list length");

        Project[] memory projectsInRange = new Project[](_to - _from + 1);

        for (uint i = _from; i <= _to; i++) {
            projectsInRange[i] = projects[i];
        }
        return projectsInRange;
    }

    function getLastTenProjects() public view returns(Project[] memory){
        return getProjectsInRange(projectCount - 10, projectCount - 1);
    }

    // Function for donors to vote for the project
    function vote(uint _projectId, uint _amount) public {
        projects[_projectId].totalVotes += _amount;
        projects[_projectId].currentFunding += _amount;
        
        if (hasReachedFundingGoal(_projectId)) {
            emit FundingGoalReached(_projectId, projects[_projectId].currentFunding);
            // // transferFunds(_projectId);
            Project memory project = projects[_projectId];
            getOrganization(project.projectOwner).walletAddress.transfer(project.currentFunding);
        }
    }

    function updateProjectState(uint _projectId) internal {
        Project memory project = projects[_projectId];
        
        if (project.state == ProjectState.Voting) 
            transitionFromVoting(_projectId);
        
        if (project.state == ProjectState.Started) 
            transitionFromStarted(_projectId);

        if (project.state == ProjectState.Ended)
            transitionFromEnded(_projectId);
    }
    
    function transitionFromVoting(uint _projectId) public {
        address payable orgaWallet = getOrganizationById(projects[_projectId].organizationId).walletAddress;
        uint funding = projects[_projectId].currentFunding;

        if(exceededTimeLimit(_projectId)){
            // give donations back to donors, or keep them for DAO to incentivize something else?
            _transitionState(_projectId, ProjectState.VotingRejected);
        }

        // organizationi is banned, hence project is not further processed
        if(getOrganizationState(orgaWallet) != OrganizationState.Onboarded)
            return;

        // build in time limit for voting !
        if(hasReachedFundingGoal(_projectId)){
            _transitionState(_projectId, ProjectState.Started);
            orgaWallet.transfer(funding);
        }
    }

    function transitionFromStarted(uint _projectId) public {
            _transitionState(_projectId, ProjectState.Ended);
    }

    // organization can end the project and provide the proof
    function endProject(uint _projectId, string memory _proofUrl) public {
        require(projects[_projectId].state == ProjectState.Started, "Project not started yet");
        require(projects[_projectId].projectOwner == msg.sender, "Only project owner can end project");
        transitionFromStarted(_projectId);
    }

    // DAO decides whether project was successful or not
    // for now, let's end the process here
    function transitionFromEnded(uint _projectId) public {
        if (true==true)
            _transitionState(_projectId, ProjectState.Completed);
        else
            _transitionState(_projectId, ProjectState.Failed);
    }

    function hasReachedFundingGoal(uint _projectId) public view returns (bool) {
        return projects[_projectId].currentFunding >= projects[_projectId].fundingGoal;
    }

    function exceededTimeLimit(uint _projectId) public view returns (bool) {
        return block.timestamp > projects[_projectId].creationTimestamp + 8 weeks;
    }

    function doesProjectExist(uint _projectId) public view returns (bool) {
        return _projectId < projectCount;
    }

    function _transitionState(uint _projectId, ProjectState newState) internal {
        projects[_projectId].state = newState;
        emit StateChanged(_projectId, newState);
    }
}