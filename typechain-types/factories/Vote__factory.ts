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
import type { NonPayableOverrides } from "../common";
import type { Vote, VoteInterface } from "../Vote";

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
        name: "mail",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "donatedAmount",
        type: "uint256",
      },
    ],
    name: "DonaterAdded",
    type: "event",
  },
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
        name: "mail",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DonationAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_mail",
        type: "string",
      },
    ],
    name: "changeDonatorMailAdress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_projectId",
        type: "uint256",
      },
    ],
    name: "getAmountOfVotes",
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
    inputs: [],
    name: "getContractBalance",
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
    inputs: [],
    name: "getDonaterDetails",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "mail",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "donatedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "votingTokens",
            type: "uint256",
          },
        ],
        internalType: "struct Donate.Donater",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfDonaters",
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
    name: "idToOwner",
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
        name: "_idDonator",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "removeDonatorToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_projectId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountVotingTokens",
        type: "uint256",
      },
    ],
    name: "spendVotingTokensOnProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_mail",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "updateDonatedAmount",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "userHasDonated",
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
    name: "userHasVoted",
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
        name: "_projectId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountVotingTokens",
        type: "uint256",
      },
    ],
    name: "voteForProject",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "votes",
    outputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votingTokens",
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
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawMoney",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061179c806100206000396000f3fe6080604052600436106100e15760003560e01c80636f9fb98a1161007f578063c08ea43411610059578063c08ea434146102df578063eb3c6d981461031c578063f5bdeac714610345578063facb5c6a1461036e576100fc565b80636f9fb98a1461026057806382edf7621461028b5780639fb868e6146102b4576100fc565b806348053848116100bb57806348053848146101a457806354876921146101cf5780635d619341146101f85780635df8133014610221576100fc565b8063032131dc1461010157806330ce6b0b1461013e578063364cbfff14610167576100fc565b366100fc5766038d7ea4c680003410156100fa57600080fd5b005b600080fd5b34801561010d57600080fd5b5061012860048036038101906101239190610e5b565b6103ab565b6040516101359190610ea1565b60405180910390f35b34801561014a57600080fd5b5061016560048036038101906101609190610ee8565b6103c3565b005b34801561017357600080fd5b5061018e60048036038101906101899190610e5b565b610579565b60405161019b9190610ea1565b60405180910390f35b3480156101b057600080fd5b506101b9610591565b6040516101c69190611017565b60405180910390f35b3480156101db57600080fd5b506101f660048036038101906101f19190611039565b61073d565b005b34801561020457600080fd5b5061021f600480360381019061021a919061119b565b610740565b005b34801561022d57600080fd5b5061024860048036038101906102439190611039565b610803565b604051610257939291906111f3565b60405180910390f35b34801561026c57600080fd5b5061027561085d565b6040516102829190610ea1565b60405180910390f35b34801561029757600080fd5b506102b260048036038101906102ad9190610ee8565b610865565b005b3480156102c057600080fd5b506102c96108a5565b6040516102d69190610ea1565b60405180910390f35b3480156102eb57600080fd5b5061030660048036038101906103019190611039565b6108db565b6040516103139190610ea1565b60405180910390f35b34801561032857600080fd5b50610343600480360381019061033e919061122a565b610944565b005b34801561035157600080fd5b5061036c60048036038101906103679190610ee8565b610b37565b005b34801561037a57600080fd5b5061039560048036038101906103909190610e5b565b610b9f565b6040516103a29190610ea1565b60405180910390f35b60036020528060005260406000206000915090505481565b6103cc81610bb7565b6103d557600080fd5b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541461042157600080fd5b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020540361046d57600080fd5b6104778282610b37565b600460405180606001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815250908060018154018082558091505060019003906000526020600020906003020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015550506001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050565b60026020528060005260406000206000915090505481565b610599610dc8565b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036106ff576000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000818154811061063857610637611286565b5b9060005260206000209060030201604051806060016040529081600082018054610661906112e4565b80601f016020809104026020016040519081016040528092919081815260200182805461068d906112e4565b80156106da5780601f106106af576101008083540402835291602001916106da565b820191906000526020600020905b8154815290600101906020018083116106bd57829003601f168201915b505050505081526020016001820154815260200160028201548152505091505061073a565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073190611372565b60405180910390fd5b90565b50565b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403610800576000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081600082815481106107e0576107df611286565b5b906000526020600020906003020160000190816107fd919061153e565b50505b50565b6004818154811061081357600080fd5b90600052602060002090600302016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154905083565b600047905090565b806000838154811061087a57610879611286565b5b9060005260206000209060030201600201600082825461089a919061163f565b925050819055505050565b60008060005b6000805490508110156108d35781806108c390611673565b92505080806001019150506108ab565b508091505090565b6000806000905060005b60048054905081101561093a57836004828154811061090757610906611286565b5b9060005260206000209060030201600101540361092d57818061092990611673565b9250505b80806001019150506108e5565b5080915050919050565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036109f75761099481610c2d565b600082905060008151146109ac576109ab83610d4d565b5b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050610b33565b60008290506000815114610a0f57610a0e83610d4d565b5b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508260008281548110610a6857610a67611286565b5b90600052602060002090600302016001016000828254610a8891906116bb565b925050819055508260008281548110610aa457610aa3611286565b5b90600052602060002090600302016002016000828254610ac491906116bb565b925050819055506000808281548110610ae057610adf611286565b5b90600052602060002090600302016001015490507f552ecc61abef242a754033ffa95f474fb47ac4970c88fa73f29ff32bb9daeb87828683604051610b2793929190611728565b60405180910390a15050505b5050565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060011515610b8883610bb7565b151503610b9a57610b998383610865565b5b505050565b60016020528060005260406000206000915090505481565b600080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008181548110610c1057610c0f611286565b5b906000526020600020906003020160020154831015915050919050565b6000604051806020016040528060008152509050600060405180606001604052808381526020018481526020018481525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000019081610c9c919061153e565b506020820151816001015560408201518160020155505060006001600080549050610cc7919061163f565b905080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507fe818f0f07b2c301ad2eae117f3288ac7dc37c4aa0a28c46a7fd23b81356442bf818385604051610d4093929190611728565b60405180910390a1505050565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508160008281548110610da657610da5611286565b5b90600052602060002090600302016000019081610dc3919061153e565b505050565b60405180606001604052806060815260200160008152602001600081525090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e2882610dfd565b9050919050565b610e3881610e1d565b8114610e4357600080fd5b50565b600081359050610e5581610e2f565b92915050565b600060208284031215610e7157610e70610df3565b5b6000610e7f84828501610e46565b91505092915050565b6000819050919050565b610e9b81610e88565b82525050565b6000602082019050610eb66000830184610e92565b92915050565b610ec581610e88565b8114610ed057600080fd5b50565b600081359050610ee281610ebc565b92915050565b60008060408385031215610eff57610efe610df3565b5b6000610f0d85828601610ed3565b9250506020610f1e85828601610ed3565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610f62578082015181840152602081019050610f47565b60008484015250505050565b6000601f19601f8301169050919050565b6000610f8a82610f28565b610f948185610f33565b9350610fa4818560208601610f44565b610fad81610f6e565b840191505092915050565b610fc181610e88565b82525050565b60006060830160008301518482036000860152610fe48282610f7f565b9150506020830151610ff96020860182610fb8565b50604083015161100c6040860182610fb8565b508091505092915050565b600060208201905081810360008301526110318184610fc7565b905092915050565b60006020828403121561104f5761104e610df3565b5b600061105d84828501610ed3565b91505092915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6110a882610f6e565b810181811067ffffffffffffffff821117156110c7576110c6611070565b5b80604052505050565b60006110da610de9565b90506110e6828261109f565b919050565b600067ffffffffffffffff82111561110657611105611070565b5b61110f82610f6e565b9050602081019050919050565b82818337600083830152505050565b600061113e611139846110eb565b6110d0565b90508281526020810184848401111561115a5761115961106b565b5b61116584828561111c565b509392505050565b600082601f83011261118257611181611066565b5b813561119284826020860161112b565b91505092915050565b6000602082840312156111b1576111b0610df3565b5b600082013567ffffffffffffffff8111156111cf576111ce610df8565b5b6111db8482850161116d565b91505092915050565b6111ed81610e1d565b82525050565b600060608201905061120860008301866111e4565b6112156020830185610e92565b6112226040830184610e92565b949350505050565b6000806040838503121561124157611240610df3565b5b600083013567ffffffffffffffff81111561125f5761125e610df8565b5b61126b8582860161116d565b925050602061127c85828601610ed3565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806112fc57607f821691505b60208210810361130f5761130e6112b5565b5b50919050565b600082825260208201905092915050565b7f5573657220686173206e6f7420646f6e61746564000000000000000000000000600082015250565b600061135c601483611315565b915061136782611326565b602082019050919050565b6000602082019050818103600083015261138b8161134f565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026113f47fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826113b7565b6113fe86836113b7565b95508019841693508086168417925050509392505050565b6000819050919050565b600061143b61143661143184610e88565b611416565b610e88565b9050919050565b6000819050919050565b61145583611420565b61146961146182611442565b8484546113c4565b825550505050565b600090565b61147e611471565b61148981848461144c565b505050565b5b818110156114ad576114a2600082611476565b60018101905061148f565b5050565b601f8211156114f2576114c381611392565b6114cc846113a7565b810160208510156114db578190505b6114ef6114e7856113a7565b83018261148e565b50505b505050565b600082821c905092915050565b6000611515600019846008026114f7565b1980831691505092915050565b600061152e8383611504565b9150826002028217905092915050565b61154782610f28565b67ffffffffffffffff8111156115605761155f611070565b5b61156a82546112e4565b6115758282856114b1565b600060209050601f8311600181146115a85760008415611596578287015190505b6115a08582611522565b865550611608565b601f1984166115b686611392565b60005b828110156115de578489015182556001820191506020850194506020810190506115b9565b868310156115fb57848901516115f7601f891682611504565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061164a82610e88565b915061165583610e88565b925082820390508181111561166d5761166c611610565b5b92915050565b600061167e82610e88565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036116b0576116af611610565b5b600182019050919050565b60006116c682610e88565b91506116d183610e88565b92508282019050808211156116e9576116e8611610565b5b92915050565b60006116fa82610f28565b6117048185611315565b9350611714818560208601610f44565b61171d81610f6e565b840191505092915050565b600060608201905061173d6000830186610e92565b818103602083015261174f81856116ef565b905061175e6040830184610e92565b94935050505056fea26469706673582212203e1b999b0ab3763b819500e298ac3e9ba142bb3860c2ce9c9abc379565b9ec1a64736f6c63430008180033";

type VoteConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VoteConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Vote__factory extends ContractFactory {
  constructor(...args: VoteConstructorParams) {
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
      Vote & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Vote__factory {
    return super.connect(runner) as Vote__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VoteInterface {
    return new Interface(_abi) as VoteInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Vote {
    return new Contract(address, _abi, runner) as unknown as Vote;
  }
}
