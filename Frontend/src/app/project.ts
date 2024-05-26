export class Project {

    id: string;
    title: string;
    description: string;
    fundsNeeded: string;
    totalDonations: string;
    imageUrl: string;

    constructor(id: string, title: string, description: string, fundsNeeded: string, totalDonations: string, imageUrl: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.fundsNeeded = fundsNeeded;
        this.totalDonations = totalDonations;
        this.imageUrl = imageUrl;
    }
}
