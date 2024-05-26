import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { HttpClient } from '@angular/common/http';
import ContractDeployed from 'src/assets/DAO_SLR.json';
import { from } from 'rxjs';

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

    constructor(private http: HttpClient) {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            window.ethereum.enable(); // Prompt user to connect their wallet
        } else {
            console.warn('No Ethereum browser detected. Install MetaMask!');
            this.web3 = new Web3(window.ethereum);
        }
        console.log(ContractDeployed.abi);


        this.getTextFromFile('assets/deployed-contracts.json').then((abi: string | undefined) => {
            this.daoAddress = abi;
            console.log("Smart Contract Address: " + this.daoAddress);
            this.contract = new this.web3.eth.Contract(ContractDeployed.abi, this.daoAddress);

            //test
            // this.contract.methods.getOrganizationById(0).call().then((result: any) => {console.log(result);});
        });
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
        console.log('hier:' + this.account);
        this.account = await this.getAccount();
        const org = await this.contract.methods.createOrganization(orgName, orgDesc).send({ from: this.account });
        console.log(org);
        return org;
    }

    async createProject(projectTitle: string, projectDescription: string, donationGoal: string): Promise<any> {
        //address payable _owner, uint _organizationId, string memory _title, string memory _description, uint _goal
        this.account = await this.getAccount();
        const project = await this.contract.methods.createProject(projectTitle, projectDescription, donationGoal).send({ from: this.account });
        return project;
    }

    async voteForProject(projectId: number, amount: number): Promise<any> {
        this.account = await this.getAccount();
        const donation = await this.contract.methods.voteForProject(projectId, amount).send({ from: this.account});
        return donation;
    }

    // async voteForProject(projectId: number): Promise<any> {
    //     this.account = await this.getAccount();
    //     const vote = await this.contract.methods.voteForProject(projectId).send({ from: this.account });
    //     return vote;
    // }
    async getAllOrganizations(){
        this.account = await this.getAccount();
        const result = await this.contract.methods.getAllOrganizations().call({from: this.account});
        console.log(result);
        return result;
    }

    async getAllProjects(){
        this.account = await this.getAccount();
        // const projects: any[] = await this.contract.methods.getLastTenProjects().call();
        console.log("§ads");
        // this.contract.methods.getOrganizationById(0).call().then((result: any) => {console.log(result);});
        const result = await this.contract.methods.getAllProjectsTest().call({from: this.account});
        // await this.contract.methods.getLastTenProjects().call().then((result: any) => {
        //     console.log("§huhu");
        //     resulto = result;

        //     // console.log(result);
        // });
        return result;
    }

    async getLastTenProjects(){
        this.account = await this.getAccount();
        // const projects: any[] = await this.contract.methods.getLastTenProjects().call();
        console.log("§ads");
        this.contract.methods.getOrganizationById(0).call().then((result: any) => {console.log(result);});
        const resulto = await this.contract.methods.getLastTenProjects().call({from: this.account});
        // await this.contract.methods.getLastTenProjects().call().then((result: any) => {
        //     console.log("§huhu");
        //     resulto = result;

        //     // console.log(result);
        // });
        console.log("333");
        console.log(resulto);
        return "test";
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

    async getProjects(): Promise<any> {
        const account = await this.getAccount();
        const contract = new this.web3.eth.Contract([], this.daoAddress);
        // return contract.methods.["getOrganizationById(0)"].call();
        // this.uDonate = new this.web3js.eth.Contract(uDonate_abi, uDonate_address);

        // const create = await this.uDonate
        //   .methods.createOrganization(orgID, payableWallet, orgName, tokenAddress)
        //   .send({ from: this.accounts[0] });
        // return create;
    }

    async connectWallet(): Promise<void> {
        if (window.ethereum) {
            try {
                this.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                this.loadAccount();
                console.log("Connected to wallet...");
            } catch (error) {
                console.error("User denied account access...");
            }
          } else {
                console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
          }
    }

    disconnectWallet(): void {
        this.account = null;
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
}


