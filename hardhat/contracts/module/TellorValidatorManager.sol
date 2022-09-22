//SPDX-License-Identifier: MIT
pragma solidity >0.8.14;

import "usingtellor/contracts/UsingTellor.sol";

contract TellorValidatorManager {
    //This contract now has access to all functions in UsingTellor
    bytes32 public queryType = "EADeliverableValidation";

    //maps `queryId` to `queryData`
    mapping(bytes32 => uint16 ) queries;

    UsingTellor usingTellor;

    function init(address _tellorAddress, address _owner) external {
        usingTellor = UsingTellor(_tellorAddress);
        owner = _owner;
    }

    function createQuery(uint _deliverableId, string memory _title) external returns(bytes memory){
        bytes memory _queryData = abi.encode(queryType, abi.encode(_deliverableId, _title));
        bytes32 _queryId = keccak256(_queryData);

    }

    function vote() external {
        // TIP: For best practices, use getDataBefore with a time buffer to allow time for a value to be disputed
        
        (bool _ifRetrieve, bytes memory _value, uint256 _timestampRetrieved) = usingTellor.getDataBefore(_queryId, block.timestamp);

        if(_ifRetrieve && value) {
            owner.call(abi.encodeWithSignature("vote(uint16,uint8)", _deliverableId, value));
        }
    }

}