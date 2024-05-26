export enum ProjectState {
    Onboarding = 'Onboarding', // not needed anymore
    OnboardingFailed = 'OnboardingFailed',  // not needed anymore
    Voting = 'Voting',
    VotingRejected = 'VotingRejected', // should trigger after time?
    Started = 'Started', // Project was started
    Ended = 'Ended', // wating for DAO to decide whether project was successful or not
    Completed = 'Completed', // Project was successful
    Failed = 'Failed'// Project was not successful - penalty for organization
  }

export let ProjectStateToString = {
    0: "Onboarding",
    1: "OnboardingFailed",
    2: "Voting",
    3: "VotingRejected",
    4: "Started",
    5: "Ended",
    6: "Completed",
    7: "Failed"
  }

  export let stateNumberToEnum: { [index: number]: ProjectState } = {
    0: ProjectState.Onboarding,
    1: ProjectState.OnboardingFailed,
    2: ProjectState.Voting,
    3: ProjectState.VotingRejected,
    4: ProjectState.Started,
    5: ProjectState.Ended,
    6: ProjectState.Completed,
    7: ProjectState.Failed
  };

export class Project {


    id: string;
    title: string;
    description: string;
    fundsNeeded: string;
    totalDonations: string;
    imageUrl: string;
    state: ProjectState;

    constructor(id: string, title: string, description: string, fundsNeeded: string, totalDonations: string, imageUrl: string, state: ProjectState) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.fundsNeeded = fundsNeeded;
        this.totalDonations = totalDonations;
        this.imageUrl = imageUrl;
        this.state = state;
        console.log(state);
    }

}
