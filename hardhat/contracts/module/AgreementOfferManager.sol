// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.14;

import "../shared/OfferType.sol";

// @title Agreement Offer Manager handles general agreement info about the contract offer
//        Its events are published to the subgraph for index.
// @author Nartey Kodjo-Sarso - <narteysarso@gmail.com>
contract AgreementOfferManager {

    enum Status {
        AVAILABLE,
        UNAVAILABLE,
        COMPLETED
    }
    OfferType public offerType;

    Status public status;

    address owner;

    uint64 public duration;

    string public position;

    string public title;

    string public location;


    event OfferCreated(
        address indexed proxy,
        string position,
        uint64 duration,
        Status status,
        string title,
        string location,
        OfferType offerType
    );

    function setupOffer(
        OfferType _offerType,
        string memory _position,
        uint64 _duration,
        string memory _title,
        string memory _location
    ) external {
        position = _position;
        duration = _duration;
        status = Status.AVAILABLE;
        title = _title;
        location = _location;
        offerType = _offerType;

        // emit OfferCreated(
        //     address(this),
        //     _position,
        //     _duration,
        //     status,
        //     _title,
        //     _location,
        //     _offerType
        // );
    }
}