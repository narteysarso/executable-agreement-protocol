// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.14;

// @title Agreement Offer Manager handles general agreement info about the contract offer
//        Its events are published to the subgraph for index.
// @author Nartey Kodjo-Sarso - <narteysarso@gmail.com>
contract AgreementOfferManager {
    enum OfferType {
        CONTRACT,
        FULL_TIME,
        PART_TIME
    }

    enum Status {
        AVAILABLE,
        UNAVAILABLE
    }

    bytes32 public position;

    uint64 public duration;

    Status public status;

    string public title;

    string public location;

    OfferType public offerType;

    event OfferCreated(
        bytes32 position,
        uint64 duration,
        Status status,
        string title,
        string location,
        OfferType offerType
    );

    function setupOffer(
        OfferType _offerType,
        bytes32 _position,
        uint64 _duration,
        Status _status,
        string memory _title,
        string memory _location
    ) internal {
        position = _position;
        duration = _duration;
        status = _status;
        title = _title;
        location = _location;
        offerType = _offerType;

        emit OfferCreated(
            _position,
            _duration,
            _status,
            _title,
            _location,
            _offerType
        );
    }
}