const TestERC20 = artifacts.require("./Test/TestERC20.sol")
const RewardsPool = artifacts.require("./ERC20/ERC20.sol")
const BN = require('bn.js');
const Web3 = require('web3');

contract("ERC20", async accounts => {
    
    let testTokenInstance = undefined;
    let web3 = undefined;

    let admin = undefined;
    let user1 = undefined;
    let user2 = undefined;
    let user3 = undefined;

    before( async () => {
        testTokenInstance = await TestERC20.deployed();
        admin = await testTokenInstance.admin.call();
        user1 = accounts[1];
        user2 = accounts[2];
        user3 = accounts[3];

        web3 = new Web3(Web3.givenProvider);

        //await testTokenInstance.mint(user1, new BN(Web3.utils.toWei('1000', 'ether'), 10), { from: admin });
        //await testTokenInstance.mint(user2, new BN(Web3.utils.toWei('1000', 'ether'), 10), { from: admin });
        //await testTokenInstance.mint(user3, new BN(Web3.utils.toWei('1000', 'ether'), 10), { from: admin });
    });                 

    it("should have a name (Test)", async () => {        
        assert.equal(await testTokenInstance.name.call(), "Test", "name should be 'Test'");
    });
    
    it("should have a symbol (TST)", async () => {        
        assert.equal(await testTokenInstance.symbol.call(), "TST", "symbol should be 'TST'");
    });

    it("should have 18 decimals", async () => {        
        assert.equal(await testTokenInstance.decimals.call(), 18, "decimals should be 18");
    });

    it("should start with 0 totalSupply", async () => {        
        assert.equal(await testTokenInstance.totalSupply.call(), 0, "totalSupply should start at 0");
    });

    it("should not permit non-admins to mint", async () => {        

        let thrownError = undefined;
        await testTokenInstance.mint(user1, new BN(web3.utils.toWei('1000', 'ether'), 10), { from: user1 }).catch(err => { thrownError = err; });
        assert.isDefined(thrownError, 'Only admin account may mint tokens');
        assert.equal(await testTokenInstance.totalSupply.call(), 0, "totalSupply should remain at 0");
    });

    it("should permit admin to mint", async () => {        

        let thrownError = undefined;
        await testTokenInstance.mint(user1, new BN(web3.utils.toWei('1000', 'ether'), 10), { from: admin }).catch(err => { thrownError = err; });
        assert.isUndefined(thrownError, 'Admin account should be allowed to mint tokens');
        assert.equal(await testTokenInstance.totalSupply.call(), web3.utils.toWei('1000', 'ether'), "totalSupply should increase to 1000");
    });

    it("minting should increase totalSupply by the correct amount", async () => {        

        const supplyToAdd = new BN(web3.utils.toWei('1000', 'ether'), 10)
        const totalSupplyBefore = await testTokenInstance.totalSupply.call();
        await testTokenInstance.mint(user1, supplyToAdd, { from: admin }).catch(err => { console.error(err) });
        const totalSupplyAfter = await testTokenInstance.totalSupply.call();
        const supplyAdded = totalSupplyAfter.sub(totalSupplyBefore);
        assert.equal(await supplyToAdd.toString(10), supplyAdded.toString(10));
    });

    it("minting should increase recipient balance by the correct amount", async () => {        

        const supplyToAdd = new BN(web3.utils.toWei('1000', 'ether'), 10)
        const userBalanceBefore = await testTokenInstance.balanceOf(user1);
        await testTokenInstance.mint(user1, supplyToAdd, { from: admin }).catch(err => { console.error(err) });
        const userBalanceAfter = await testTokenInstance.balanceOf(user1);
        const balanceAdded = userBalanceAfter.sub(userBalanceBefore);
        assert.equal(await supplyToAdd.toString(10), balanceAdded.toString(10));
    });

});