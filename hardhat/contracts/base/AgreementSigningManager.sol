// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./token/ERC721.sol";

contract AgreementSigningManager is ERC721 {

    uint tokenCount;

    string tokenURI;

    address issuer;

    address signer;

    address internal constant SENTINEL_SIGNER = address(0x2);
    address internal constant SENTINEL_SIGNATURE = address(0x3);

    mapping(address => address) signers;

    mapping(address => address) signatures;

    event AgreementSigned(address indexed proxy, address signer, uint tokenId)

    function setupAgreementSigning (string memory _name, string memory _symbol, address[] memory _signers ) internal {
        setupToken(_name,_symbol);

        for(let i = 0; i < _signers.length; i++){
            _addSigner(signers[i]);
        }
    }

    function signAgreement(uint tokenid) external {
        require(msg.sender != address(0) && msg.sender != SENTINEL_SIGNATURE && msg.sender != address(this), "AS400");
        require(signatures[msg.sender] == address(0));
        require(, "AS400");
        require(!_hasSigned(msg.sender), "AS406");

        tokenCount++;
        _mint(msg.sender, tokenCount);

        if(signatures[SENTINEL_SIGNATURE] == address(0)){
            signatures[msg.sender] = SENTINEL_SIGNATURE;
        }else{
            signatures[msg.sender] = signatures[SENTINEL_SIGNATURE];
        }

        signatures[SENTINEL_SIGNATURE] = msg.sender;

        emit AgreementSigned(address(this), msg.signer, tokenCount);
    }

    function _addSigner(address _signer){
        require(_signer != address(0) && _signer != SENTINEL_SIGNER && _signer != address(this), "AS400");
        require(signers[_signer] == address(0));

         if(signers[SENTINEL_SIGNER] == address(0)){
            signers[_signer] = SENTINEL_SIGNER;
        }else{
            signers[_signer] = signatures[SENTINEL_SIGNER];
        }

        signers[SENTINEL_SIGNER] = _signer;
    }

    function _hasSigned(address _signer) internal view returns(bool){
        return _signer != SENTINEL_SIGNATURE && signatures[_signer] != address(0);
    }

    function _isAssigner(address _signer) internal view returns(bool){
        return _signer != SENTINEL_SIGNER && signers[_signer] != address(0);
    }

    function _baseURI() internal view override returns (string memory) {
        return tokenURI;
    }

    function setTokenURI(string memory _tokenURI) external {
        tokenURI = _tokenURI;
    }
}