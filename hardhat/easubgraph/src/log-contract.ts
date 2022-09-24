import { BigInt } from "@graphprotocol/graph-ts"
import {
  LogContract,
  AgreementCreated,
  DeliverableCompleted,
  ValidatorCreated,
  ValidatorVoted
} from "../generated/LogContract/LogContract"
import { ExecutableAgreement, Validator } from "../generated/schema"

export function handleAgreementCreated(event: AgreementCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExecutableAgreement.load(event.transaction.hash.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExecutableAgreement(event.transaction.hash.toHex())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }

  // Entity fields can be set based on event parameters
  entity.proxy = event.params.proxy;
  entity.assenter = event.params.agreementData.assenter;
  entity.issuer = event.params.agreementData.issuer;
  entity.position = event.params.agreementData.position
  entity.location = event.params.agreementData.location
  entity.contractSum = event.params.agreementData.contractSum
  entity.duration = event.params.agreementData.duration
  entity.targetToken = event.params.agreementData.targetToken
  entity.contractTokenURI = event.params.agreementData.contractTokenURI
  entity.title = event.params.agreementData.title
  entity.name = event.params.agreementData.name
  entity.symbol = event.params.agreementData.symbol
  entity.description = event.params.agreementData.description
  entity.offerType = event.params.agreementData.offerType;
  entity.status = 0

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleDeliverableCompleted(event: DeliverableCompleted): void { }

export function handleValidatorCreated(event: ValidatorCreated): void {
   // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Validator.load(event.params.validator._address.toHex()+"-"+event.params.validator.deliverable.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Validator(event.params.validator._address.toHex()+"-"+event.params.validator.deliverable.toString())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }

  entity.proxy = event.params.proxy;
  entity.address = event.params.validator._address;
  entity.deliverable = event.params.validator.deliverable;
  entity.hasVoted = false;
}

export function handleValidatorVoted(event: ValidatorVoted): void { 
  let entity = Validator.load(event.params.validator.toHex()+"-"+event.params.deliverableIndex.toString());

  if(!entity) return;

  entity.hasVoted = true;
  entity.save();
}
