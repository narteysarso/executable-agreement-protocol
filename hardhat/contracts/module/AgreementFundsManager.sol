// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import "./SuperFluidFlowManager.sol";
import "../interface/IExecuteManager.sol";

contract AgreementFundsManager is IExecuteManager{

    address public targetToken;

    uint256 public contractSum;

    uint public balance;

    address owner;

    SuperFluidFlowManager public superFluidFlowManager;

    event FundMangerSet(uint256 contractSum, address targetToken);

    event PaymentsMade(address manager, address flow,  uint amount, address indexed targetToken, uint duration);

    function setupContractFund(uint _contractSum, address _targetToken)
        external 
    {
        require(owner == address(0), "CFM400");

        contractSum = _contractSum;
        targetToken = _targetToken;
        balance = _contractSum;

        owner = msg.sender;

        emit FundMangerSet(_contractSum, _targetToken);
    }

    function initialize(address _superFluidFlowManager, address _superfluidChainHost) external {
        require(owner == address(0), "CFM400");

        require(_superFluidFlowManager != address(0));

        superFluidFlowManager = SuperFluidFlowManager(_superFluidFlowManager);

        superFluidFlowManager.initialize(_superfluidChainHost, address(this));

    }

    function execute(
        uint _index,
        uint _totalSecond,
        uint _payoutAmount,
        address _receiver
    ) external returns (bool, bytes memory) {

        require(_receiver != address(0), "CFM400");
        
        makePayment(_index, _receiver, _payoutAmount, _totalSecond);

        return (true, bytes(""));
    }

    function cancelExecute( uint _index,
        uint _lockTime,
        uint _flowRatePerSecond,
        uint _payoutAmount) external returns (bool, bytes memory) {

    }

    function makePayment(uint _index, address _receiver, uint _amount, uint _duration ) internal {
        require(balance >= _amount, "CFM400");

        balance -= _amount;

        ISuperToken token = ISuperToken(targetToken);

        token.approve(address(superFluidFlowManager), _amount);

        superFluidFlowManager.sendLumpSumToContract(targetToken, _amount);

        (bool success, ) = superFluidFlowManager.createDeliverableFlow(targetToken, _receiver, _amount, _duration);

        require(success, "CFM500");

        emit PaymentsMade(address(this), address(superFluidFlowManager),  _amount,  targetToken, _duration);

    }

    
}
