/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  AddProject,
  AddProjectInterface,
} from "../../../contracts/Deprecated/AddProject";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "state",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
    ],
    name: "ProjectAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_state",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint32",
        name: "_amount",
        type: "uint32",
      },
      {
        internalType: "string",
        name: "_mail",
        type: "string",
      },
    ],
    name: "addProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfProjects",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getProjectDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "state",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint32",
            name: "amount",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "votingTokens",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "startDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "mail",
            type: "string",
          },
          {
            internalType: "enum AddProject.ProjectState",
            name: "projectState",
            type: "uint8",
          },
        ],
        internalType: "struct AddProject.Project",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProjectOwner",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ownerToProject",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "projectToOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "projects",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "state",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint32",
        name: "amount",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "votingTokens",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "startDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "mail",
        type: "string",
      },
      {
        internalType: "enum AddProject.ProjectState",
        name: "projectState",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611ef9806100206000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80634f7cf7901161005b5780634f7cf790146100f55780635f8439e314610125578063e6d6859514610155578063fab82371146101735761007d565b8063107046bd1461008257806319ba0b63146100bb5780634cebf94e146100d9575b600080fd5b61009c600480360381019061009791906111eb565b6101a3565b6040516100b29a9998979695949392919061138e565b60405180910390f35b6100c3610474565b6040516100d09190611446565b60405180910390f35b6100f360048036038101906100ee91906115c2565b610480565b005b61010f600480360381019061010a91906111eb565b610a1d565b60405161011c91906116ad565b60405180910390f35b61013f600480360381019061013a91906111eb565b610a50565b60405161014c919061183d565b60405180910390f35b61015d610e13565b60405161016a9190611446565b60405180910390f35b61018d6004803603810190610188919061188b565b610ee1565b60405161019a9190611446565b60405180910390f35b600081815481106101b357600080fd5b90600052602060002090600902016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010180546101fc906118e7565b80601f0160208091040260200160405190810160405280929190818152602001828054610228906118e7565b80156102755780601f1061024a57610100808354040283529160200191610275565b820191906000526020600020905b81548152906001019060200180831161025857829003601f168201915b50505050509080600201805461028a906118e7565b80601f01602080910402602001604051908101604052809291908181526020018280546102b6906118e7565b80156103035780601f106102d857610100808354040283529160200191610303565b820191906000526020600020905b8154815290600101906020018083116102e657829003601f168201915b505050505090806003018054610318906118e7565b80601f0160208091040260200160405190810160405280929190818152602001828054610344906118e7565b80156103915780601f1061036657610100808354040283529160200191610391565b820191906000526020600020905b81548152906001019060200180831161037457829003601f168201915b5050505050908060040160009054906101000a900463ffffffff16908060040160049054906101000a900463ffffffff16908060050154908060060154908060070180546103de906118e7565b80601f016020809104026020016040519081016040528092919081815260200182805461040a906118e7565b80156104575780601f1061042c57610100808354040283529160200191610457565b820191906000526020600020905b81548152906001019060200180831161043a57829003601f168201915b5050505050908060080160009054906101000a900460ff1690508a565b60008080549050905090565b6001151561048d33610ef9565b1515146104cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c69061198a565b60405180910390fd5b60004290506000626ebe00826104e591906119d9565b90506104f033611007565b156106d65760006040518061014001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018981526020018881526020018781526020018663ffffffff168152602001600063ffffffff168152602001848152602001838152602001858152602001600160068111156105705761056f611317565b5b815250908060018154018082558091505060019003906000526020600020906009020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010190816105f89190611bb9565b50604082015181600201908161060e9190611bb9565b5060608201518160030190816106249190611bb9565b5060808201518160040160006101000a81548163ffffffff021916908363ffffffff16021790555060a08201518160040160046101000a81548163ffffffff021916908363ffffffff16021790555060c0820151816005015560e0820151816006015561010082015181600701908161069d9190611bb9565b506101208201518160080160006101000a81548160ff021916908360068111156106ca576106c9611317565b5b021790555050506108b3565b60006040518061014001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018981526020018881526020018781526020018663ffffffff168152602001600063ffffffff1681526020018481526020018381526020018581526020016000600681111561075157610750611317565b5b815250908060018154018082558091505060019003906000526020600020906009020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010190816107d99190611bb9565b5060408201518160020190816107ef9190611bb9565b5060608201518160030190816108059190611bb9565b5060808201518160040160006101000a81548163ffffffff021916908363ffffffff16021790555060a08201518160040160046101000a81548163ffffffff021916908363ffffffff16021790555060c0820151816005015560e0820151816006015561010082015181600701908161087e9190611bb9565b506101208201518160080160006101000a81548160ff021916908360068111156108ab576108aa611317565b5b021790555050505b336001600060016000805490506108ca9190611c8b565b815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060016000805490506109289190611c8b565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008154809291906109bb90611cbf565b91905055507fca4ee60aaf9b62a725a472964e115bb33084d3be95f152dfd7d70f6ea264834860016000805490506109f39190611c8b565b888888888787604051610a0c9796959493929190611d38565b60405180910390a150505050505050565b60016020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610a5861111a565b600080549050821015610dd35760008281548110610a7957610a78611dbc565b5b9060005260206000209060090201604051806101400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182018054610af9906118e7565b80601f0160208091040260200160405190810160405280929190818152602001828054610b25906118e7565b8015610b725780601f10610b4757610100808354040283529160200191610b72565b820191906000526020600020905b815481529060010190602001808311610b5557829003601f168201915b50505050508152602001600282018054610b8b906118e7565b80601f0160208091040260200160405190810160405280929190818152602001828054610bb7906118e7565b8015610c045780601f10610bd957610100808354040283529160200191610c04565b820191906000526020600020905b815481529060010190602001808311610be757829003601f168201915b50505050508152602001600382018054610c1d906118e7565b80601f0160208091040260200160405190810160405280929190818152602001828054610c49906118e7565b8015610c965780601f10610c6b57610100808354040283529160200191610c96565b820191906000526020600020905b815481529060010190602001808311610c7957829003601f168201915b505050505081526020016004820160009054906101000a900463ffffffff1663ffffffff1663ffffffff1681526020016004820160049054906101000a900463ffffffff1663ffffffff1663ffffffff1681526020016005820154815260200160068201548152602001600782018054610d0f906118e7565b80601f0160208091040260200160405190810160405280929190818152602001828054610d3b906118e7565b8015610d885780601f10610d5d57610100808354040283529160200191610d88565b820191906000526020600020905b815481529060010190602001808311610d6b57829003601f168201915b505050505081526020016008820160009054906101000a900460ff166006811115610db657610db5611317565b5b6006811115610dc857610dc7611317565b5b815250509050610e0e565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e0590611e37565b60405180910390fd5b919050565b60006001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403610ea357600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050610ede565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ed590611ea3565b60405180910390fd5b90565b60026020528060005260406000206000915090505481565b600080600090505b600080549050811015610ffc578273ffffffffffffffffffffffffffffffffffffffff1660008281548110610f3957610f38611dbc565b5b906000526020600020906009020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610fef5760056006811115610f9a57610f99611317565b5b60008281548110610fae57610fad611dbc565b5b906000526020600020906009020160080160009054906101000a900460ff166006811115610fdf57610fde611317565b5b14610fee576000915050611002565b5b8080600101915050610f01565b50600190505b919050565b600080600090505b60008054905081101561110f578273ffffffffffffffffffffffffffffffffffffffff166000828154811061104757611046611dbc565b5b906000526020600020906009020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480156110f35750600060068111156110ab576110aa611317565b5b600082815481106110bf576110be611dbc565b5b906000526020600020906009020160080160009054906101000a900460ff1660068111156110f0576110ef611317565b5b14155b15611102576001915050611115565b808060010191505061100f565b50600090505b919050565b604051806101400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001606081526020016060815260200160608152602001600063ffffffff168152602001600063ffffffff1681526020016000815260200160008152602001606081526020016000600681111561119b5761119a611317565b5b81525090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6111c8816111b5565b81146111d357600080fd5b50565b6000813590506111e5816111bf565b92915050565b600060208284031215611201576112006111ab565b5b600061120f848285016111d6565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061124382611218565b9050919050565b61125381611238565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611293578082015181840152602081019050611278565b60008484015250505050565b6000601f19601f8301169050919050565b60006112bb82611259565b6112c58185611264565b93506112d5818560208601611275565b6112de8161129f565b840191505092915050565b600063ffffffff82169050919050565b611302816112e9565b82525050565b611311816111b5565b82525050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6007811061135757611356611317565b5b50565b600081905061136882611346565b919050565b60006113788261135a565b9050919050565b6113888161136d565b82525050565b6000610140820190506113a4600083018d61124a565b81810360208301526113b6818c6112b0565b905081810360408301526113ca818b6112b0565b905081810360608301526113de818a6112b0565b90506113ed60808301896112f9565b6113fa60a08301886112f9565b61140760c0830187611308565b61141460e0830186611308565b81810361010083015261142781856112b0565b905061143761012083018461137f565b9b9a5050505050505050505050565b600060208201905061145b6000830184611308565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6114a38261129f565b810181811067ffffffffffffffff821117156114c2576114c161146b565b5b80604052505050565b60006114d56111a1565b90506114e1828261149a565b919050565b600067ffffffffffffffff8211156115015761150061146b565b5b61150a8261129f565b9050602081019050919050565b82818337600083830152505050565b6000611539611534846114e6565b6114cb565b90508281526020810184848401111561155557611554611466565b5b611560848285611517565b509392505050565b600082601f83011261157d5761157c611461565b5b813561158d848260208601611526565b91505092915050565b61159f816112e9565b81146115aa57600080fd5b50565b6000813590506115bc81611596565b92915050565b600080600080600060a086880312156115de576115dd6111ab565b5b600086013567ffffffffffffffff8111156115fc576115fb6111b0565b5b61160888828901611568565b955050602086013567ffffffffffffffff811115611629576116286111b0565b5b61163588828901611568565b945050604086013567ffffffffffffffff811115611656576116556111b0565b5b61166288828901611568565b9350506060611673888289016115ad565b925050608086013567ffffffffffffffff811115611694576116936111b0565b5b6116a088828901611568565b9150509295509295909350565b60006020820190506116c2600083018461124a565b92915050565b6116d181611238565b82525050565b600082825260208201905092915050565b60006116f382611259565b6116fd81856116d7565b935061170d818560208601611275565b6117168161129f565b840191505092915050565b61172a816112e9565b82525050565b611739816111b5565b82525050565b6117488161136d565b82525050565b60006101408301600083015161176760008601826116c8565b506020830151848203602086015261177f82826116e8565b9150506040830151848203604086015261179982826116e8565b915050606083015184820360608601526117b382826116e8565b91505060808301516117c86080860182611721565b5060a08301516117db60a0860182611721565b5060c08301516117ee60c0860182611730565b5060e083015161180160e0860182611730565b5061010083015184820361010086015261181b82826116e8565b91505061012083015161183261012086018261173f565b508091505092915050565b60006020820190508181036000830152611857818461174e565b905092915050565b61186881611238565b811461187357600080fd5b50565b6000813590506118858161185f565b92915050565b6000602082840312156118a1576118a06111ab565b5b60006118af84828501611876565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806118ff57607f821691505b602082108103611912576119116118b8565b5b50919050565b7f596f7520616c72656164792068617665206f6e652070726f6a65637420696e2060008201527f70726f67726573732e0000000000000000000000000000000000000000000000602082015250565b6000611974602983611264565b915061197f82611918565b604082019050919050565b600060208201905081810360008301526119a381611967565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006119e4826111b5565b91506119ef836111b5565b9250828201905080821115611a0757611a066119aa565b5b92915050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302611a6f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611a32565b611a798683611a32565b95508019841693508086168417925050509392505050565b6000819050919050565b6000611ab6611ab1611aac846111b5565b611a91565b6111b5565b9050919050565b6000819050919050565b611ad083611a9b565b611ae4611adc82611abd565b848454611a3f565b825550505050565b600090565b611af9611aec565b611b04818484611ac7565b505050565b5b81811015611b2857611b1d600082611af1565b600181019050611b0a565b5050565b601f821115611b6d57611b3e81611a0d565b611b4784611a22565b81016020851015611b56578190505b611b6a611b6285611a22565b830182611b09565b50505b505050565b600082821c905092915050565b6000611b9060001984600802611b72565b1980831691505092915050565b6000611ba98383611b7f565b9150826002028217905092915050565b611bc282611259565b67ffffffffffffffff811115611bdb57611bda61146b565b5b611be582546118e7565b611bf0828285611b2c565b600060209050601f831160018114611c235760008415611c11578287015190505b611c1b8582611b9d565b865550611c83565b601f198416611c3186611a0d565b60005b82811015611c5957848901518255600182019150602085019450602081019050611c34565b86831015611c765784890151611c72601f891682611b7f565b8355505b6001600288020188555050505b505050505050565b6000611c96826111b5565b9150611ca1836111b5565b9250828203905081811115611cb957611cb86119aa565b5b92915050565b6000611cca826111b5565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611cfc57611cfb6119aa565b5b600182019050919050565b6000611d22611d1d611d18846112e9565b611a91565b6111b5565b9050919050565b611d3281611d07565b82525050565b600060e082019050611d4d600083018a611308565b8181036020830152611d5f81896112b0565b90508181036040830152611d7381886112b0565b90508181036060830152611d8781876112b0565b9050611d966080830186611d29565b611da360a0830185611308565b611db060c0830184611308565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f70726f6a65637420696420646f6573206e6f7420657869737432000000000000600082015250565b6000611e21601a83611264565b9150611e2c82611deb565b602082019050919050565b60006020820190508181036000830152611e5081611e14565b9050919050565b7f6e6f2070726f6a65637420616464656400000000000000000000000000000000600082015250565b6000611e8d601083611264565b9150611e9882611e57565b602082019050919050565b60006020820190508181036000830152611ebc81611e80565b905091905056fea2646970667358221220bd1d5c7e712027f3cff7dbcf7c1ca416819305a9a7ba93c4fc98b97e44cfe7fe64736f6c63430008180033";

type AddProjectConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AddProjectConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AddProject__factory extends ContractFactory {
  constructor(...args: AddProjectConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      AddProject & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): AddProject__factory {
    return super.connect(runner) as AddProject__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AddProjectInterface {
    return new Interface(_abi) as AddProjectInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): AddProject {
    return new Contract(address, _abi, runner) as unknown as AddProject;
  }
}
