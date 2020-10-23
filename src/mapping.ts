import { BigInt, log } from "@graphprotocol/graph-ts";
import { Contract, NewTellorAddress } from "../generated/Contract/Contract";
import {
  DisputeContract,
  NewDispute,
  Voted,
  DisputeVoteTallied,
} from "../generated/Dispute/DisputeContract";
import {
  LibraryContract,
  DataRequested,
} from "../generated/Library/LibraryContract";
import {
  NewValue,
  NonceSubmitted,
} from "../generated/LibraryEvents/LibraryContract";
import {
  Dispute,
  Vote,
  Request,
  MiningEvent,
  MinerValue,
  Supply
} from "../generated/schema";

export function handleDataRequested(event: DataRequested): void {
  let request = new Request(event.params._requestId.toString());
  request.requestId = event.params._requestId;
  request.query = event.params._query;
  request.querySymbol = event.params._querySymbol;
  request.granularity = event.params._granularity;
  request.totalTips = event.params._totalTips;
  request.sender = event.params._sender;
  request.timestamp = event.block.timestamp;

  request.save();
}

// event NewValue(uint256 indexed _requestId, uint256 _time, uint256 _value, uint256 _totalTips, bytes32 _currentChallenge);
export function handleNewValue(event: NewValue): void {
  // TODO try to HexString?
  let miningEventId = event.params._currentChallenge
    // .toString()
    .toHex()
    .concat("-event-")
    .concat(event.params._requestId.toString());

  let miningEvent = new MiningEvent(miningEventId);
  miningEvent.timestamp = event.block.timestamp;
  miningEvent.requestId = event.params._requestId;
  miningEvent.request = event.params._requestId.toString();
  miningEvent.time = event.params._time;
  miningEvent.minedValue = event.params._value;
  miningEvent.totalTips = event.params._totalTips;
  miningEvent.currentChallenge = event.params._currentChallenge;
  miningEvent.blockNumber = event.block.number;

  miningEvent.save();
}

// event NonceSubmitted(address indexed _miner, string _nonce, uint256 indexed _requestId, uint256 _value, bytes32 _currentChallenge);
export function handleNonceSubmitted(event: NonceSubmitted): void {
  // TODO try to Hex?
  let valueId = event.params._currentChallenge
    // .toString()
    .toHex()
    .concat("-value-")
    .concat(event.params._requestId.toString())
    .concat("-")
    .concat(event.params._miner.toHexString());

  let miningEventId = event.params._currentChallenge
    .toHex()
    .concat("-event-")
    .concat(event.params._requestId.toString());

  let value = new MinerValue(valueId);
  value.timestamp = event.block.timestamp;
  value.requestId = event.params._requestId;
  value.currentChallenge = event.params._currentChallenge;
  value.miningEvent = miningEventId;
  value.miningEventId = miningEventId;
  value.miner = event.params._miner;
  value.value = event.params._value;
  value.blockNumber = event.block.number;

  value.save();
}

export function handleNewDispute(event: NewDispute): void {
  let contract = Contract.bind(event.address);
  let disputeVars = contract.getAllDisputeVars(event.params._disputeId);

  let dispute = new Dispute(event.params._disputeId.toString());
  dispute.disputeId = event.params._disputeId;
  dispute.miner = event.params._miner;
  dispute.requestId = event.params._requestId;
  dispute.timestamp = event.params._timestamp;

  dispute.request = event.params._requestId.toString();

  dispute.disputeVotePassed = disputeVars.value2;
  dispute.relatedMiningEventData = disputeVars.value7;
  dispute.tally = disputeVars.value8;

  dispute.save();
}

// event Voted(uint256 indexed _disputeID, bool _position, address indexed _voter);
export function handleVoted(event: Voted): void {
  let contract = Contract.bind(event.address);
  let disputeVars = contract.getAllDisputeVars(event.params._disputeID);
  let dispute = Dispute.load(event.params._disputeID.toString());

  let voteId = event.params._disputeID
    .toString()
    .concat("-vote-")
    .concat(event.params._voter.toHex());
  let vote = new Vote(voteId);

  vote.dispute = event.params._disputeID.toString();
  vote.disputeId = event.params._disputeID;
  vote.position = event.params._position;
  vote.voter = event.params._voter;
  vote.timestamp = event.block.timestamp;

  vote.save();

  dispute.disputeVotePassed = disputeVars.value2;
  dispute.relatedMiningEventData = disputeVars.value7;
  dispute.tally = disputeVars.value8;

  dispute.save();
}

// event DisputeVoteTallied(uint256 indexed _disputeID, int256 _result, address indexed _reportedMiner, address _reportingParty, bool _active);
export function handleDisputeVoteTallied(event: DisputeVoteTallied): void {
  let contract = Contract.bind(event.address);
  let disputeVars = contract.getAllDisputeVars(event.params._disputeID);
  let dispute = Dispute.load(event.params._disputeID.toString());

  dispute.result = event.params._result;
  dispute.reportedMiner = event.params._reportedMiner;
  dispute.reportingParty = event.params._reportingParty;
  dispute.active = event.params._active;

  dispute.save();
}

export function handleNewTellorAddress(event: NewTellorAddress): void {
  let entity = Supply.load(event.transaction.from.toHex());
  let contract = Tellor.bind(event.address);
  if (entity == null) {
    entity = new Supply(event.transaction.from.toHex());
    entity.totalSupply = contract.totalSupply();
    entity.timestamp = event.block.timestamp.toString();
    entity.blockNumber = event.block.number;
  }

// contract methods
// - contract.getRequestIdByTimestamp(...)
// - contract.getSubmissionsByTimestamp(...)
// - contract.getAddressVars(...)
// - contract.getSymbol(...)
// - contract.getName(...)
// - contract.totalSupply(...)
// - contract.getVariablesOnDeck(...)
// - contract.getRequestIdByQueryHash(...)
// - contract.getLastNewValueById(...)
// - contract.isInDispute(...)
// - contract.getNewValueCountbyRequestId(...)
// - contract.balanceOfAt(...)
// - contract.getUintVar(...)
// - contract.getRequestIdByRequestQIndex(...)
// - contract.didMine(...)
// - contract.getMinersByRequestIdAndTimestamp(...)
// - contract.balanceOf(...)
// - contract.getStakerInfo(...)
// - contract.getTimestampbyRequestIDandIndex(...)
// - contract.getDisputeUintVars(...)
// - contract.retrieveData(...)
// - contract.allowedToTrade(...)
// - contract.getCurrentVariables(...)
// - contract.didVote(...)
// - contract.getAllDisputeVars(...)
// - contract.getRequestQ(...)
// - contract.getMinedBlockNum(...)
// - contract.getDisputeIdByDisputeHash(...)
// - contract.allowance(...)
// - contract.getRequestUintVars(...)
// - contract.getRequestVars(...)
// - contract.getLastNewValue(...)
