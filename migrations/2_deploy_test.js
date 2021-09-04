const TestERC20 = artifacts.require("./Test/TestERC20.sol")

module.exports = async function(deployer, network, accounts) {    

    let successfulDeployment = true;
  
    successfulDeployment = successfulDeployment && await deployContract(deployer, TestERC20, 'TestERC20');
  
    if(successfulDeployment) {
      console.log('Deployed all contracts successfully');
    } else {
      console.log('Some contracts failed to deploy');
    }
  }
  
  function deployContract(deployer, contract, contractName) {  
   var additionalArgs = [].slice.call(arguments, 3);
  
    return new Promise(function(resolve, reject) {
      if(additionalArgs.length > 0) {
        console.log(`Deploying ${contractName} with args ${additionalArgs}.`);
  
        deployer.deploy(contract, additionalArgs).then(function() {
          console.log(`Deployed ${contractName} at address ${contract.address}`);    
          resolve(() => {
            return true;
          });
        }).catch(err => {
          console.log(err);
          resolve(() => {
            return false;
          });
        });
      } else {
        console.log(`Deploying ${contractName} with no additional args.`);
        deployer.deploy(contract).then(function() {
          console.log(`Deployed ${contractName} at address ${contract.address}`);    
          resolve(() => {
            return true;
          });
        }).catch(err => {
          console.log(err);
          resolve(() => {
            return false;
          })
        });
      }    
    });  
  }