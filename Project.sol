// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Project {
    address payable public projectOwner;
    string public projectDescription;
    uint public fundingGoal;
    uint public currentFunding;
    mapping(address => uint) public votes;

        // Enum to represent project states
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

    ProjectState public state;

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == projectOwner, "Only project owner can call this function");
        _;
    }

    // Modifier to restrict access to the DAO contract
    //modifier onlyDAO() {
    //    require(msg.sender == address(DAO), "Only DAO contract can call this function");
    //    _;
    //}

    // Event to emit when project state changes
    event StateChanged(ProjectState newState);

    // Event to emit when funding goal is reached
    event FundingGoalReached(uint amount);

    // Constructor to initialize project details
    constructor(address payable _owner, string memory _description, uint _goal) {
        projectOwner = _owner;
        projectDescription = _description;
        fundingGoal = _goal;
        currentFunding = 0;
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


    // Transitions:
/*     // Function for DAO contract to start voting
    function startVoting() external onlyDAO {
        require(state == ProjectState.Onboarding, "Project is not in the Onboarding state");
        _transitionState(ProjectState.Voting);
    }

    // Function for DAO contract to start the project
    function startProject() external onlyDAO {
        require(state == ProjectState.Voting, "Project is not in the Voting state");
        require(currentFunding >= fundingGoal, "Funding goal not reached");
        _transitionState(ProjectState.Started);
    }

    // Function for DAO contract to end the project
    function endProject() external onlyDAO {
        require(state == ProjectState.Started, "Project is not in the Started state");
        _transitionState(ProjectState.Ended);
    }

    // Function for DAO contract to complete the project
    function completeProject() external onlyDAO {
        require(state == ProjectState.Ended, "Project is not in the Ended state");
        _transitionState(ProjectState.Completed); 
   }*/

    // Function for DAO contract to fail the project
    function startVoting() private {
        require(state != ProjectState.Voting, "Project is already in voting state");
        _transitionState(ProjectState.Voting);
    }

    function _transitionState(ProjectState newState) private {
        state = newState;
        emit StateChanged(newState);
    }
    // Other functions for managing donations, checking if funding goal is reached, etc.
}