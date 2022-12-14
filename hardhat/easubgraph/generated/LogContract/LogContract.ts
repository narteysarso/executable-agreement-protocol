// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AgreementCreated extends ethereum.Event {
  get params(): AgreementCreated__Params {
    return new AgreementCreated__Params(this);
  }
}

export class AgreementCreated__Params {
  _event: AgreementCreated;

  constructor(event: AgreementCreated) {
    this._event = event;
  }

  get proxy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get agreementData(): AgreementCreatedAgreementDataStruct {
    return changetype<AgreementCreatedAgreementDataStruct>(
      this._event.parameters[1].value.toTuple()
    );
  }
}

export class AgreementCreatedAgreementDataStruct extends ethereum.Tuple {
  get offerType(): i32 {
    return this[0].toI32();
  }

  get duration(): BigInt {
    return this[1].toBigInt();
  }

  get contractSum(): BigInt {
    return this[2].toBigInt();
  }

  get targetToken(): Address {
    return this[3].toAddress();
  }

  get issuer(): Address {
    return this[4].toAddress();
  }

  get assenter(): Address {
    return this[5].toAddress();
  }

  get position(): string {
    return this[6].toString();
  }

  get contractTokenURI(): string {
    return this[7].toString();
  }

  get name(): string {
    return this[8].toString();
  }

  get title(): string {
    return this[9].toString();
  }

  get symbol(): string {
    return this[10].toString();
  }

  get description(): string {
    return this[11].toString();
  }

  get location(): string {
    return this[12].toString();
  }
}

export class DeliverableCompleted extends ethereum.Event {
  get params(): DeliverableCompleted__Params {
    return new DeliverableCompleted__Params(this);
  }
}

export class DeliverableCompleted__Params {
  _event: DeliverableCompleted;

  constructor(event: DeliverableCompleted) {
    this._event = event;
  }

  get proxy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get deliverableIndex(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _executorIndex(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class DeliverableCreated extends ethereum.Event {
  get params(): DeliverableCreated__Params {
    return new DeliverableCreated__Params(this);
  }
}

export class DeliverableCreated__Params {
  _event: DeliverableCreated;

  constructor(event: DeliverableCreated) {
    this._event = event;
  }

  get proxy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get deliverableIndex(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get deliverable(): DeliverableCreatedDeliverableStruct {
    return changetype<DeliverableCreatedDeliverableStruct>(
      this._event.parameters[2].value.toTuple()
    );
  }
}

export class DeliverableCreatedDeliverableStruct extends ethereum.Tuple {
  get validatorThreshold(): i32 {
    return this[0].toI32();
  }

  get totalSeconds(): i32 {
    return this[1].toI32();
  }

  get payoutAmount(): BigInt {
    return this[2].toBigInt();
  }

  get title(): string {
    return this[3].toString();
  }

  get description(): string {
    return this[4].toString();
  }

  get receiver(): Address {
    return this[5].toAddress();
  }
}

export class ValidatorCreated extends ethereum.Event {
  get params(): ValidatorCreated__Params {
    return new ValidatorCreated__Params(this);
  }
}

export class ValidatorCreated__Params {
  _event: ValidatorCreated;

  constructor(event: ValidatorCreated) {
    this._event = event;
  }

  get proxy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get validator(): ValidatorCreatedValidatorStruct {
    return changetype<ValidatorCreatedValidatorStruct>(
      this._event.parameters[1].value.toTuple()
    );
  }
}

export class ValidatorCreatedValidatorStruct extends ethereum.Tuple {
  get deliverable(): i32 {
    return this[0].toI32();
  }

  get _address(): Address {
    return this[1].toAddress();
  }
}

export class ValidatorVoted extends ethereum.Event {
  get params(): ValidatorVoted__Params {
    return new ValidatorVoted__Params(this);
  }
}

export class ValidatorVoted__Params {
  _event: ValidatorVoted;

  constructor(event: ValidatorVoted) {
    this._event = event;
  }

  get proxy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get deliverableIndex(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get validator(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get validatorVote(): i32 {
    return this._event.parameters[3].value.toI32();
  }
}

export class LogContract extends ethereum.SmartContract {
  static bind(address: Address): LogContract {
    return new LogContract("LogContract", address);
  }
}

export class LogAgreementCreatedCall extends ethereum.Call {
  get inputs(): LogAgreementCreatedCall__Inputs {
    return new LogAgreementCreatedCall__Inputs(this);
  }

  get outputs(): LogAgreementCreatedCall__Outputs {
    return new LogAgreementCreatedCall__Outputs(this);
  }
}

export class LogAgreementCreatedCall__Inputs {
  _call: LogAgreementCreatedCall;

  constructor(call: LogAgreementCreatedCall) {
    this._call = call;
  }

  get _proxy(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _agreementData(): LogAgreementCreatedCall_agreementDataStruct {
    return changetype<LogAgreementCreatedCall_agreementDataStruct>(
      this._call.inputValues[1].value.toTuple()
    );
  }
}

export class LogAgreementCreatedCall__Outputs {
  _call: LogAgreementCreatedCall;

  constructor(call: LogAgreementCreatedCall) {
    this._call = call;
  }
}

export class LogAgreementCreatedCall_agreementDataStruct extends ethereum.Tuple {
  get offerType(): i32 {
    return this[0].toI32();
  }

  get duration(): BigInt {
    return this[1].toBigInt();
  }

  get contractSum(): BigInt {
    return this[2].toBigInt();
  }

  get targetToken(): Address {
    return this[3].toAddress();
  }

  get issuer(): Address {
    return this[4].toAddress();
  }

  get assenter(): Address {
    return this[5].toAddress();
  }

  get position(): string {
    return this[6].toString();
  }

  get contractTokenURI(): string {
    return this[7].toString();
  }

  get name(): string {
    return this[8].toString();
  }

  get title(): string {
    return this[9].toString();
  }

  get symbol(): string {
    return this[10].toString();
  }

  get description(): string {
    return this[11].toString();
  }

  get location(): string {
    return this[12].toString();
  }

  get deliverables(): Array<
    LogAgreementCreatedCall_agreementDataDeliverablesStruct
  > {
    return this[13].toTupleArray<
      LogAgreementCreatedCall_agreementDataDeliverablesStruct
    >();
  }

  get executors(): Array<LogAgreementCreatedCall_agreementDataExecutorsStruct> {
    return this[14].toTupleArray<
      LogAgreementCreatedCall_agreementDataExecutorsStruct
    >();
  }

  get validators(): Array<
    LogAgreementCreatedCall_agreementDataValidatorsStruct
  > {
    return this[15].toTupleArray<
      LogAgreementCreatedCall_agreementDataValidatorsStruct
    >();
  }
}

export class LogAgreementCreatedCall_agreementDataDeliverablesStruct extends ethereum.Tuple {
  get validatorThreshold(): i32 {
    return this[0].toI32();
  }

  get totalSeconds(): i32 {
    return this[1].toI32();
  }

  get payoutAmount(): BigInt {
    return this[2].toBigInt();
  }

  get title(): string {
    return this[3].toString();
  }

  get description(): string {
    return this[4].toString();
  }

  get receiver(): Address {
    return this[5].toAddress();
  }
}

export class LogAgreementCreatedCall_agreementDataExecutorsStruct extends ethereum.Tuple {
  get deliverable(): i32 {
    return this[0].toI32();
  }

  get timeLock(): BigInt {
    return this[1].toBigInt();
  }

  get _address(): Address {
    return this[2].toAddress();
  }
}

export class LogAgreementCreatedCall_agreementDataValidatorsStruct extends ethereum.Tuple {
  get deliverable(): i32 {
    return this[0].toI32();
  }

  get _address(): Address {
    return this[1].toAddress();
  }
}

export class LogDeliverableAddedCall extends ethereum.Call {
  get inputs(): LogDeliverableAddedCall__Inputs {
    return new LogDeliverableAddedCall__Inputs(this);
  }

  get outputs(): LogDeliverableAddedCall__Outputs {
    return new LogDeliverableAddedCall__Outputs(this);
  }
}

export class LogDeliverableAddedCall__Inputs {
  _call: LogDeliverableAddedCall;

  constructor(call: LogDeliverableAddedCall) {
    this._call = call;
  }

  get proxy(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get deliverableIndex(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get _deliverable(): LogDeliverableAddedCall_deliverableStruct {
    return changetype<LogDeliverableAddedCall_deliverableStruct>(
      this._call.inputValues[2].value.toTuple()
    );
  }
}

export class LogDeliverableAddedCall__Outputs {
  _call: LogDeliverableAddedCall;

  constructor(call: LogDeliverableAddedCall) {
    this._call = call;
  }
}

export class LogDeliverableAddedCall_deliverableStruct extends ethereum.Tuple {
  get validatorThreshold(): i32 {
    return this[0].toI32();
  }

  get totalSeconds(): i32 {
    return this[1].toI32();
  }

  get payoutAmount(): BigInt {
    return this[2].toBigInt();
  }

  get title(): string {
    return this[3].toString();
  }

  get description(): string {
    return this[4].toString();
  }

  get receiver(): Address {
    return this[5].toAddress();
  }
}

export class LogDeliverableCompletedCall extends ethereum.Call {
  get inputs(): LogDeliverableCompletedCall__Inputs {
    return new LogDeliverableCompletedCall__Inputs(this);
  }

  get outputs(): LogDeliverableCompletedCall__Outputs {
    return new LogDeliverableCompletedCall__Outputs(this);
  }
}

export class LogDeliverableCompletedCall__Inputs {
  _call: LogDeliverableCompletedCall;

  constructor(call: LogDeliverableCompletedCall) {
    this._call = call;
  }

  get proxy(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _deliverableIndex(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _executableIndex(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class LogDeliverableCompletedCall__Outputs {
  _call: LogDeliverableCompletedCall;

  constructor(call: LogDeliverableCompletedCall) {
    this._call = call;
  }
}

export class LogValidatorAddedCall extends ethereum.Call {
  get inputs(): LogValidatorAddedCall__Inputs {
    return new LogValidatorAddedCall__Inputs(this);
  }

  get outputs(): LogValidatorAddedCall__Outputs {
    return new LogValidatorAddedCall__Outputs(this);
  }
}

export class LogValidatorAddedCall__Inputs {
  _call: LogValidatorAddedCall;

  constructor(call: LogValidatorAddedCall) {
    this._call = call;
  }

  get proxy(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _validator(): LogValidatorAddedCall_validatorStruct {
    return changetype<LogValidatorAddedCall_validatorStruct>(
      this._call.inputValues[1].value.toTuple()
    );
  }
}

export class LogValidatorAddedCall__Outputs {
  _call: LogValidatorAddedCall;

  constructor(call: LogValidatorAddedCall) {
    this._call = call;
  }
}

export class LogValidatorAddedCall_validatorStruct extends ethereum.Tuple {
  get deliverable(): i32 {
    return this[0].toI32();
  }

  get _address(): Address {
    return this[1].toAddress();
  }
}

export class LogValidatorVotedCall extends ethereum.Call {
  get inputs(): LogValidatorVotedCall__Inputs {
    return new LogValidatorVotedCall__Inputs(this);
  }

  get outputs(): LogValidatorVotedCall__Outputs {
    return new LogValidatorVotedCall__Outputs(this);
  }
}

export class LogValidatorVotedCall__Inputs {
  _call: LogValidatorVotedCall;

  constructor(call: LogValidatorVotedCall) {
    this._call = call;
  }

  get _proxy(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _deliverableIndex(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get _validator(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _validatorVote(): i32 {
    return this._call.inputValues[3].value.toI32();
  }
}

export class LogValidatorVotedCall__Outputs {
  _call: LogValidatorVotedCall;

  constructor(call: LogValidatorVotedCall) {
    this._call = call;
  }
}
