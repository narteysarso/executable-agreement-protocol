// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "../token/ERC721.sol";

contract AgreementSigningManager is ERC721 {

    uint tokenCount;

    address internal constant SENTINEL_SIGNER = address(0x2);
    address internal constant SENTINEL_SIGNATURE = address(0x3);

    string tokenUri;

    mapping(address => address) signers;

    mapping(address => address) signatures;

    event AgreementSigned(address indexed proxy, address signer, uint tokenId);

    function setupAgreementSigning (string memory _name, string memory _symbol, address[] memory _signers ) internal {
       
        setupToken(_name,_symbol);

        for(uint i = 0; i < _signers.length; i++){
            _addSigner(_signers[i]);
        }
    }

    function signAgreement() external {
        require(msg.sender != address(0) && msg.sender != SENTINEL_SIGNATURE && msg.sender != address(this), "AS400");
        require(signatures[msg.sender] == address(0));
        require(isSigner(msg.sender), "AS400");
        require(!hasSigned(msg.sender), "AS406");

        tokenCount++;
        _safeMint(msg.sender, tokenCount);

        if(signatures[SENTINEL_SIGNATURE] == address(0)){
            signatures[msg.sender] = SENTINEL_SIGNATURE;
        }else{
            signatures[msg.sender] = signatures[SENTINEL_SIGNATURE];
        }

        signatures[SENTINEL_SIGNATURE] = msg.sender;

        emit AgreementSigned(address(this), msg.sender, tokenCount);
    }

    function _addSigner(address _signer) internal {
        require(_signer != address(0) && _signer != SENTINEL_SIGNER && _signer != address(this), "AS400");
        require(signers[_signer] == address(0));

         if(signers[SENTINEL_SIGNER] == address(0)){
            signers[_signer] = SENTINEL_SIGNER;
        }else{
            signers[_signer] = signatures[SENTINEL_SIGNER];
        }

        signers[SENTINEL_SIGNER] = _signer;
    }

    function hasSigned(address _signer) public view returns(bool){
        return _signer != SENTINEL_SIGNATURE && signatures[_signer] != address(0);
    }

    function isSigner(address _signer) public view returns(bool){
        return _signer != SENTINEL_SIGNER && signers[_signer] != address(0);
    }

    function _baseURI() internal view override returns (string memory) {
        return tokenUri;
    }

    function setTokenURI(string memory _tokenUri) external {
        tokenUri = _tokenUri;
    }
}