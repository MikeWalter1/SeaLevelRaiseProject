/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace AddProject {
  export type ProjectStruct = {
    owner: AddressLike;
    name: string;
    state: string;
    description: string;
    amount: BigNumberish;
    votingTokens: BigNumberish;
    startDate: BigNumberish;
    endDate: BigNumberish;
    mail: string;
    projectState: BigNumberish;
  };

  export type ProjectStructOutput = [
    owner: string,
    name: string,
    state: string,
    description: string,
    amount: bigint,
    votingTokens: bigint,
    startDate: bigint,
    endDate: bigint,
    mail: string,
    projectState: bigint
  ] & {
    owner: string;
    name: string;
    state: string;
    description: string;
    amount: bigint;
    votingTokens: bigint;
    startDate: bigint;
    endDate: bigint;
    mail: string;
    projectState: bigint;
  };
}

export interface AddProjectInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addProject"
      | "getNumberOfProjects"
      | "getProjectDetails"
      | "getProjectOwner"
      | "ownerToProject"
      | "projectToOwner"
      | "projects"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "ProjectAdded"): EventFragment;

  encodeFunctionData(
    functionFragment: "addProject",
    values: [string, string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getNumberOfProjects",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProjectDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProjectOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ownerToProject",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "projectToOwner",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "projects",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addProject", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getNumberOfProjects",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProjectDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProjectOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownerToProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "projectToOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "projects", data: BytesLike): Result;
}

export namespace ProjectAddedEvent {
  export type InputTuple = [
    id: BigNumberish,
    name: string,
    state: string,
    description: string,
    amount: BigNumberish,
    startDate: BigNumberish,
    endDate: BigNumberish
  ];
  export type OutputTuple = [
    id: bigint,
    name: string,
    state: string,
    description: string,
    amount: bigint,
    startDate: bigint,
    endDate: bigint
  ];
  export interface OutputObject {
    id: bigint;
    name: string;
    state: string;
    description: string;
    amount: bigint;
    startDate: bigint;
    endDate: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface AddProject extends BaseContract {
  connect(runner?: ContractRunner | null): AddProject;
  waitForDeployment(): Promise<this>;

  interface: AddProjectInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addProject: TypedContractMethod<
    [
      _name: string,
      _state: string,
      _description: string,
      _amount: BigNumberish,
      _mail: string
    ],
    [void],
    "nonpayable"
  >;

  getNumberOfProjects: TypedContractMethod<[], [bigint], "view">;

  getProjectDetails: TypedContractMethod<
    [_id: BigNumberish],
    [AddProject.ProjectStructOutput],
    "view"
  >;

  getProjectOwner: TypedContractMethod<[], [bigint], "view">;

  ownerToProject: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  projectToOwner: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  projects: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        string,
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        string,
        bigint
      ] & {
        owner: string;
        name: string;
        state: string;
        description: string;
        amount: bigint;
        votingTokens: bigint;
        startDate: bigint;
        endDate: bigint;
        mail: string;
        projectState: bigint;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addProject"
  ): TypedContractMethod<
    [
      _name: string,
      _state: string,
      _description: string,
      _amount: BigNumberish,
      _mail: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getNumberOfProjects"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getProjectDetails"
  ): TypedContractMethod<
    [_id: BigNumberish],
    [AddProject.ProjectStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getProjectOwner"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "ownerToProject"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "projectToOwner"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "projects"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        string,
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        string,
        bigint
      ] & {
        owner: string;
        name: string;
        state: string;
        description: string;
        amount: bigint;
        votingTokens: bigint;
        startDate: bigint;
        endDate: bigint;
        mail: string;
        projectState: bigint;
      }
    ],
    "view"
  >;

  getEvent(
    key: "ProjectAdded"
  ): TypedContractEvent<
    ProjectAddedEvent.InputTuple,
    ProjectAddedEvent.OutputTuple,
    ProjectAddedEvent.OutputObject
  >;

  filters: {
    "ProjectAdded(uint256,string,string,string,uint256,uint256,uint256)": TypedContractEvent<
      ProjectAddedEvent.InputTuple,
      ProjectAddedEvent.OutputTuple,
      ProjectAddedEvent.OutputObject
    >;
    ProjectAdded: TypedContractEvent<
      ProjectAddedEvent.InputTuple,
      ProjectAddedEvent.OutputTuple,
      ProjectAddedEvent.OutputObject
    >;
  };
}