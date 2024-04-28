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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export type OrganizationDataStruct = {
  walletAddress: AddressLike;
  organizationName: string;
  organisationDescription: string;
  state: BigNumberish;
};

export type OrganizationDataStructOutput = [
  walletAddress: string,
  organizationName: string,
  organisationDescription: string,
  state: bigint
] & {
  walletAddress: string;
  organizationName: string;
  organisationDescription: string;
  state: bigint;
};

export interface OrganizationInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "createOrganizationData"
      | "dao"
      | "getOrganizationData"
      | "organizations"
      | "setOrganizationState"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createOrganizationData",
    values: [AddressLike, string, string]
  ): string;
  encodeFunctionData(functionFragment: "dao", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getOrganizationData",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "organizations",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setOrganizationState",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "createOrganizationData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dao", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getOrganizationData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "organizations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOrganizationState",
    data: BytesLike
  ): Result;
}

export interface Organization extends BaseContract {
  connect(runner?: ContractRunner | null): Organization;
  waitForDeployment(): Promise<this>;

  interface: OrganizationInterface;

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

  createOrganizationData: TypedContractMethod<
    [
      _walletAddress: AddressLike,
      _organizationName: string,
      _organisationDescription: string
    ],
    [void],
    "nonpayable"
  >;

  dao: TypedContractMethod<[], [string], "view">;

  getOrganizationData: TypedContractMethod<
    [_walletAddress: AddressLike],
    [OrganizationDataStructOutput],
    "view"
  >;

  organizations: TypedContractMethod<
    [arg0: AddressLike],
    [
      [string, string, string, bigint] & {
        walletAddress: string;
        organizationName: string;
        organisationDescription: string;
        state: bigint;
      }
    ],
    "view"
  >;

  setOrganizationState: TypedContractMethod<
    [_walletAddress: AddressLike, _state: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createOrganizationData"
  ): TypedContractMethod<
    [
      _walletAddress: AddressLike,
      _organizationName: string,
      _organisationDescription: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "dao"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getOrganizationData"
  ): TypedContractMethod<
    [_walletAddress: AddressLike],
    [OrganizationDataStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "organizations"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [string, string, string, bigint] & {
        walletAddress: string;
        organizationName: string;
        organisationDescription: string;
        state: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "setOrganizationState"
  ): TypedContractMethod<
    [_walletAddress: AddressLike, _state: BigNumberish],
    [void],
    "nonpayable"
  >;

  filters: {};
}
