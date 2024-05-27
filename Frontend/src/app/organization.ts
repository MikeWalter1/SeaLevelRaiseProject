export class Organization {
    organizationId: string;
    organizationName: string;
    organizationDescription: string;
    OrganizationState: string;
    votes: string;
    downVotes: string;

    constructor (organizationId: string, organizationName: string, organizationDescription: string, OrganizationState: string, votes: string, downVotes: string) {
        this.organizationId = organizationId;
        this.organizationName = organizationName;
        this.organizationDescription = organizationDescription;
        this.OrganizationState = OrganizationState;
        this.votes = votes;
        this.downVotes = downVotes;
    }
}
