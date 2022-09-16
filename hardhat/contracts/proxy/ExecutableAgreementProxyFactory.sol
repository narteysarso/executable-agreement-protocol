// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

import "./Proxy.sol";

// mastercopy 0xd9145CCE52D386f254917e481eB44e9943F39138
// signercopy 0xf8e81D47203A594245E36C48e151709F0C19fBe8
// host 0xEB796bdb90fFA0f28255275e16936D25d3418603
contract ExecutableAgreementProxyFactory {
    event ExecutableProxyCreated(address proxy, address mastercopy, address creator);

    function createExecutableAgreement(address _mastercopy, address _signerManagerCopy, address _offerManagerCopy, address _fundsManagerCopy, address _superFluidFlowManager, address _superfluidChainHost, address _logger) public returns(address) {
        require(_mastercopy != address(0), "Invalid mastercopy address");

        Proxy proxy = new Proxy(_mastercopy);

        Proxy signerProxy = new Proxy(_signerManagerCopy);

        Proxy offerProxy = new Proxy(_offerManagerCopy);
        
        Proxy fundsProxy = new Proxy(_fundsManagerCopy);

        (bool fundssuccess, ) = address(fundsProxy).call( abi.encodeWithSignature("initialize(address,address)", _superFluidFlowManager, _superfluidChainHost) );

        require(fundssuccess, "Failed to initialize funds proxy");

        (bool success, ) = address(proxy).call( abi.encodeWithSignature("initialize(address,address,address,address)", address(signerProxy), address(offerProxy), address(_fundsManagerCopy), _logger) );
        require(success, "Failed to create agreement proxy");
        
        emit ExecutableProxyCreated(address(proxy), _mastercopy, msg.sender);

        return (address(proxy));
    }
}