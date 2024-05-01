// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// import "./DonationReceipt.sol";
import "./OrganizationManager.sol";

// enum ProjectState {
//     Onboarding,
//     OnboardingFailed,
//     Started,
//     Completed
// }
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
    address payable projectOwner;
    string projectTitle;
    string projectDescription;
    uint fundingGoal;
    uint currentFunding;
    ProjectState state;
    mapping(address => uint) votes;
}

contract ProjectManager {
    address payable public projectOwner;
    string public projectTitle;
    string public projectDescription;
    uint public fundingGoal;
    uint public currentFunding;
    mapping(address => Project) public projects;

    mapping(address => uint) public votes;

    ProjectState public state;

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == projectOwner, "Only project owner can call this function");
        _;
    }


    // Event to emit when project state changes
    event StateChanged(ProjectState newState);

    // Event to emit when funding goal is reached
    event FundingGoalReached(uint amount);

    function createProject(address payable _owner, OrganizationState _orgaState, string memory _title, string memory _description, uint _goal) external {
        Project storage newProject = projects[_owner];
        newProject.projectOwner = _owner;
        newProject.projectTitle = _title;
        newProject.projectDescription = _description;
        newProject.fundingGoal = _goal;
        newProject.currentFunding = 0;
        newProject.votes[msg.sender] = 0;
        
        //projects[_owner] = newProject;

        if (_orgaState == OrganizationState.Onboarding)
            newProject.state = ProjectState.Onboarding;
        if (_orgaState == OrganizationState.Onboarded)
            newProject.state = ProjectState.Voting;
    }

    // Function for donors to vote for the project
    function vote(uint _amount) public {
        votes[msg.sender] += _amount;
        currentFunding += _amount;
        if (currentFunding >= fundingGoal) {
            emit FundingGoalReached(currentFunding);
        }
    }

    // Function to transfer funds to project owner when funding goal is reached
    function transferFunds() public {
        require(currentFunding >= fundingGoal, "Funding goal not reached");
        projectOwner.transfer(currentFunding);
        
        // no need to set funding to 0. prevent more than one transfer by adding a state variable. 
        //currentFunding = 0; // Reset current funding after transfer
    }

    // Function for the owner to alter the project description
    function changeDescription(string memory _newDescription) public onlyOwner {
        projectDescription = _newDescription;
    }

    function getDonationAmount(address _donor) public view returns (uint) {
        return votes[_donor];
    }


    // Transitions:
/*     // Function for DAO contract to start voting
    function startVoting() external onlyDAO {
        require(state == ProjectState.Onboarding, "Project is not in the Onboarding state");
        _transitionState(ProjectState.Voting);
    }
*/
    // Function for DAO contract to fail the project
    function startVoting() public {
        require(state != ProjectState.Voting, "Project is already in voting state");

        _transitionState(ProjectState.Voting);
    }

    // Function for DAO contract to start the project
    function startProject() public {
        require(state == ProjectState.Voting, "Project is not in the Voting state");
        require(currentFunding >= fundingGoal, "Funding goal not reached");
        _transitionState(ProjectState.Started);
    }

    // Function for DAO contract to end the project
    function endProject() public {
        require(state == ProjectState.Started, "Project is not in the Started state");
        _transitionState(ProjectState.Ended);
    }
/* 
    // Function for DAO contract to complete the project
    function completeProject() external onlyDAO {
        require(state == ProjectState.Ended, "Project is not in the Ended state");
        _transitionState(ProjectState.Completed); 
   } */

    function _transitionState(ProjectState newState) internal {
        state = newState;
        emit StateChanged(newState);
    }
    // Other functions for managing donations, checking if funding goal is reached, etc.
}