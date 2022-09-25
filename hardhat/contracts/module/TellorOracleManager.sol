//SPDX-License-Identifier: MIT
pragma solidity >0.8.14;

import "usingtellor/contracts/UsingTellor.sol";
import "../interfaces/IERC20.sol";
import "../interfaces/IAutoPay.sol";


contract TellorOracleManager {
    //This contract now has access to all functions in UsingTellor
    bytes32 public queryType = "EADeliverableValidation";

    //maps `queryId` to `queryData`
    mapping(bytes32 => uint16) queries;

    UsingTellor usingTellor;

    function init(
        address payable _tellorAddress,
        address payable _autoPay,
        address payable _token,
        address _owner
    ) external {
        usingTellor = UsingTellor(_tellorAddress);
        token = IERC20(_token);
        autoPay = IAutoPay(_autoPay);
        owner = _owner;
    }

    function createQuery(
        uint _deliverableId,
        string memory _title,
        uint tip
    ) external {
        bytes memory _queryData = abi.encode(
            queryType,
            abi.encode(_deliverableId, _title)
        );
        bytes32 _queryId = keccak256(_queryData);

        autoPay.setupDataFeed(
            _queryId,
            tip,
            block.timestamp,
            86400 * 3,
            86400,
            0,
            _queryData
        );

        bytes32 _feedId = keccak256(
            abi.encode(
                _queryId, //queryId (created above)
                tip, //reward per submission (.1 TRB)
                block.timestamp, //when we start tipping (we'll start now)
                86400 * 3, //interval between windows for reporters to claim tips (3 days)
                86400, //window per interval to claim tips (1 day)
                0 //price threshold (set to 0 b/c this is not a price feed!)
            )
        );

        token.approve(address(autoPay), tip);

        autoPay.fundFeed(_feedId, _queryId, tip); //fund feed with .1 TRB

        emit ValidationRequested(_queryId, _feedId);
    }

    function vote() external {
        // TIP: For best practices, use getDataBefore with a time buffer to allow time for a value to be disputed

        (
            bool _ifRetrieve,
            bytes memory _value,
            uint256 _timestampRetrieved
        ) = usingTellor.getDataBefore(_queryId, block.timestamp);

        if (_ifRetrieve && value) {
            owner.call(
                abi.encodeWithSignature(
                    "vote(uint16,uint8)",
                    _deliverableId,
                    value
                )
            );
        }
    }
}
