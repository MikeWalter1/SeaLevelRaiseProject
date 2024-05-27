import { Injectable } from '@angular/core';
import Web3, { Uint } from 'web3';
import { HttpClient } from '@angular/common/http';
import ContractDeployed from 'src/assets/DAO_SLR.json';
import { from } from 'rxjs';
import { Project, ProjectState, stateNumberToEnum } from './project';

declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class Web3Service {
    private web3: Web3;
    public daoAddress: string | undefined = '';
    public daoAbi: any;
    public contractABI: any;
    public testAbi: any;
    private contract: any;
    public account: string | null = null;
    public donorBalance: number | null = null;
    public connected: boolean = false;

    public projects: Project[] = [];
    public selectedProject: Project;

    constructor(private http: HttpClient) {
        // if (window.ethereum) {
        //     this.web3 = new Web3(window.ethereum);
        //     window.ethereum.enable(); // Prompt user to connect their wallet
        //     this.connected=true;
        // } else {
        //     console.warn('No Ethereum browser detected. Install MetaMask!');
        //     this.web3 = new Web3(window.ethereum);
        // }
        // console.log(ContractDeployed.abi);


        // this.getTextFromFile('assets/deployed-contracts.json').then((abi: string | undefined) => {
        //     this.daoAddress = abi;
        //     console.log("Smart Contract Address: " + this.daoAddress);
        //     this.contract = new this.web3.eth.Contract(ContractDeployed.abi, this.daoAddress);
        // });
    }


    async getAccount(): Promise<string> {
        const accounts = await this.web3.eth.getAccounts();
        return accounts[0];
    }

    async sendTransaction(methodName: string, args: any[], value: number): Promise<any> {
        const account = await this.getAccount();
        const contract = new this.web3.eth.Contract(ContractDeployed.abi, this.daoAddress);
        const method = contract.methods[methodName];
        return method(...args).send({ from: account, value: value.toString() });
    }

    async transferEtherToContract(amountInEther: number): Promise<any> {
        const account = await this.getAccount();
        const amountInWei = this.web3.utils.toWei(amountInEther.toString(), 'ether');
        return this.web3.eth.sendTransaction({
            from: account,
            to: this.daoAddress,
            value: amountInWei
        });
    }

    async createOrganzation(orgName: string, orgDesc: string): Promise<any> {
        this.account = await this.getAccount();
        const org = await this.contract.methods.createOrganization(orgName, orgDesc).send({ from: this.account });
        return org;
    }

    async createProject(projectTitle: string, projectDescription: string, donationGoal: string): Promise<any> {
        this.account = await this.getAccount();
        const project = await this.contract.methods.createProject(projectTitle, projectDescription, donationGoal).send({ from: this.account });
        return project;
    }

    async voteForProject(projectId: number, amount: number): Promise<any> {
        this.account = await this.getAccount();
        const donation = await this.contract.methods.voteForProject(projectId, amount).send({ from: this.account});
        return donation;
    }

    async getAllOrganizations(){
        this.account = await this.getAccount();
        const result = await this.contract.methods.getAllOrganizations().call({from: this.account});
        console.log(result);
        return result;
    }

    async getAllProjects(){
        this.account = await this.getAccount();
        const result = await this.contract.methods.getAllProjectsTest().call({from: this.account});
        this.projects.length = 0;
        for (let index = 0; index < result.names.length; index++) {
            let tempStateNumb = 1;
            let stateNumber = result.states[index]; // This could be any number
            let stateEnum: ProjectState = stateNumberToEnum[stateNumber];
            const tempProject = new Project(
                result.projectIds[index],
                result.names[index],
                result.descriptions[index],
                result.goals[index],
                result.currentFundings[index],
                "assets/images/projects/project-"+this.getRandomInt(1, 9).toString()+".jpg",
                stateEnum
            );

            this.projects.push(tempProject);
        }
        return this.projects;
    }

    async getLastTenProjects(){
        this.account = await this.getAccount();
        this.contract.methods.getOrganizationById(0).call().then((result: any) => {console.log(result);});
        const resulto = await this.contract.methods.getLastTenProjects().call({from: this.account});
        return "test";
    }

    async updateDonorTokenBalance(){
        this.account = await this.getAccount();
        const result = await this.contract.methods.getDonorTokenBalance(this.account).call({from: this.account});
        console.log(result);
    }

    public selectProject(project: Project): void {
        this.selectedProject = project;
    }

    async testSendTransaction(contractAddress: string, abi: any[], methodName: string, args: any[], value: number): Promise<any> {
        const account = await this.getAccount();
        this.contract = new this.web3.eth.Contract(abi, contractAddress, { from: account });
        const method = this.contract.methods[methodName];
        const result = await method(...args).call();
        return result;
    }

    async callContractFunction(functionName: string, params: any[]): Promise<any> {
        const accounts = await this.web3.eth.getAccounts();
        const result = await this.contract.methods[functionName](...params).call({ from: accounts[0] });
        return result;
      }

    async connectWallet(): Promise<void> {
        this.setContract();
        if (window.ethereum) {
            try {
                this.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                this.loadAccount();
                console.log("Connected to wallet...");
                this.connected=true;
            } catch (error) {
                console.error("User denied account access...");
                this.connected=false;
            }
          } else {
                console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
                this.connected=false;
          }
    }

    disconnectWallet(): void {
        this.account = null;
    }

    setContract(): void {
        this.getTextFromFile('assets/deployed-contracts.json').then((abi: string | undefined) => {
            this.daoAddress = abi;
            console.log("Smart Contract Address: " + this.daoAddress);
            this.contract = new this.web3.eth.Contract(ContractDeployed.abi, this.daoAddress);
        });
    }
    async loadAccount() {
        const accounts = await this.web3.eth.getAccounts();
        this.account = accounts[0] || null;
    }

    getTextFromFile(filePath: string | undefined): Promise<string | undefined> {
        if (!filePath) {
            return Promise.resolve(undefined);
        }
        return this.http.get(filePath, { responseType: 'text' }).toPromise();
    }

    getContractABI(): Promise<any> {
        return this.http.get<any>('assets/DAO_SLR.json').toPromise();
      }

      getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    async downVoteOrganization(orgaId: string){
        this.account = await this.getAccount();
        await this.contract.methods.voteAgainstOrganization(orgaId).send({from: this.account});
    }

    async upvoteOrganization(orgaId: string){
        this.account = await this.getAccount();
        await this.contract.methods.voteForOrganization(orgaId).send({from: this.account});
    }
}


