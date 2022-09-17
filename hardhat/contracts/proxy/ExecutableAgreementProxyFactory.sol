// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

import "./Proxy.sol";

contract ExecutableAgreementProxyFactory{
    event ExecutableProxyCreated(address proxy, address creator);

    function createExecutableAgreement(address _mastercopy, address _signerManagerCopy, address _offerManagerCopy, address _fundsManagerCopy, address _superFluidFlowManager, address _superfluidChainHost, address _logger) public returns(address) {
        require(_mastercopy != address(0), "Invalid mastercopy address");

        Proxy proxy = new Proxy(_mastercopy);

        Proxy signerProxy = new Proxy(_signerManagerCopy);

        Proxy offerProxy = new Proxy(_offerManagerCopy);
        
        Proxy fundsProxy = new Proxy(_fundsManagerCopy);

        Proxy superFluidFlowManagerProxy = new Proxy(_superFluidFlowManager);

        (bool fundssuccess, ) = address(fundsProxy).call( abi.encodeWithSignature("initialize(address,address)", address(superFluidFlowManagerProxy), _superfluidChainHost) );

        require(fundssuccess, "Failed to initialize funds proxy");

        (bool success, ) = address(proxy).call( abi.encodeWithSignature("initialize(address,address,address,address)", address(signerProxy), address(offerProxy), address(fundsProxy), _logger) );
        require(success, "Failed to create agreement proxy");
        
        emit ExecutableProxyCreated(address(proxy), msg.sender);

        return (address(proxy));
    }
}