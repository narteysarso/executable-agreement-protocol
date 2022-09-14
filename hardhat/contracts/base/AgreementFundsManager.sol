// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.14;

import "../module/SuperFluidFlowManager.sol";
import "../interface/IExecuteManager.sol";


contract AgreementFundsManager is IExecuteManager{

    address public targetToken;

    uint256 public contractSum;

    uint public balance;

    SuperFluidFlowManager superFluidFlowManager;

    event FundMangerSet(uint256 contractSum, address targetToken);

    event Payments(uint indexed index, uint amount, address indexed targetToken, uint duration);

    function setupContractFund(uint _contractSum, address _targetToken, address _superfluidChainHost)
        internal
    {
        require(address(superFluidFlowManager) == address(0), "CFM400");

        contractSum = _contractSum;
        targetToken = _targetToken;

        superFluidFlowManager = new SuperFluidFlowManager();
        // TODO:  fix `_superfluidChainHost` bug -  superFluidFlowManager.initialize(_superfluidChainHost, address(this));

        emit FundMangerSet(_contractSum, _targetToken);
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

        superFluidFlowManager.sendLumpSumToContract(targetToken, _amount);

        (bool success, ) = superFluidFlowManager.createDeliverableFlow(targetToken, _receiver, _amount, _duration);

        require(success, "CFM500");
    }
}
