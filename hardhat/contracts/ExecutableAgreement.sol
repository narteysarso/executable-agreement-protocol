// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.14;

import "./base/AgreementDeliverableManager.sol";
import "./module/AgreementSigningManager.sol";
import "./module/AgreementOfferManager.sol";

import "./shared/AgreementData.sol";


// @title Executable Agreement is an smart contract implementation of legal agreement.
// @author Nartey Kodjo-Sarso - <narteysarso@gmail.com>
contract ExecutableAgreement is
    AgreementDeliverableManager
    {

    string public contractTokenURI;

    address public owner;

    AgreementSigningManager public agreementSigningManager;

    AgreementOfferManager public agreementOfferManager;

    function createAgreement(
        AgreementData memory data
    ) public {
        require(owner == address(0), "EC400");

        require(msg.sender != address(0), "EC500");

        contractTokenURI = data.contractTokenURI;

        owner = msg.sender;


        _setupDeliverables(data.deliverables);
        _setupExecutors(data.executors);
        _setupValidators(data.validators);

        agreementSigningManager.setupAgreementSigning(data.name, data.symbol, data.issuer, data.assenter);
        agreementOfferManager.setupOffer(data.offerType, data.position, data.duration, data.title, data.location);
        agreementFundsManager.setupContractFund(data.contractSum, data.targetToken);

        logger.LogAgreementCreated(address(this), data);
    }

    function signAgreement() external{
        agreementSigningManager.signAgreement();
        //TODO: emit event
    }

    function hasSigned(address _signer) public view returns(bool){
        return agreementSigningManager.hasSigned(_signer);
    }

    function isSigner(address _signer) public view returns(bool){
        return agreementSigningManager.isSigner(_signer);
    }

    function initialize(address _signingManager, address _offerManager, address _fundsManager, address _logger) external {
        require(owner == address(0), "EC400");
        require(_signingManager != address(0) && _offerManager != address(0) && _fundsManager != address(0), "EC406");

        agreementSigningManager = AgreementSigningManager(_signingManager);
        agreementOfferManager = AgreementOfferManager(_offerManager);
        agreementFundsManager = AgreementFundsManager(_fundsManager);
        logger = LogContract(_logger);

        //TODO: emit event
    }

    function duration() public view returns (uint) {
        return agreementOfferManager.duration();
    }
    function position() public view returns (string memory) {
        return agreementOfferManager.position();
    }
    function title() public view returns (string memory)
    {
        return agreementOfferManager.title();
    }
    function location() public view returns (string memory) {
        return agreementOfferManager.location();
    }

    function symbol() public view returns (string memory){
        return agreementSigningManager.symbol();
    }
    
    function name() public view returns (string memory){
        return agreementSigningManager.symbol();
    }

    function contratSum() public view returns (uint){
        return agreementFundsManager.contractSum();
    }
    
    function balance() public view returns (uint){
        return agreementFundsManager.balance();
    }
    
    function targetToken() public view returns (address){
        return agreementFundsManager.targetToken();
    }

    /**
    * TODO:
    * withdraw funds
    */
}