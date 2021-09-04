pragma solidity 0.6.6;

import './IERC20.sol';

contract ERC20 is IERC20 {
    address public admin;

    uint256 private tokenSupply;
    mapping (address => uint256) private balances;
    mapping (address => mapping (address => uint256)) private allowances;

    uint8 public override decimals;
    string public override name;
    string public override symbol;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals) public {
        admin = msg.sender;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    function totalSupply() public override view returns (uint256) {
        return tokenSupply;
    }

    function balanceOf(address _owner) public override view returns (uint256) {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public override returns (bool) {
        transferFrom(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool) {
        require(_from != address(0), 'Invalid sender');
        require(_to != address(0), 'Invalid recipient');

        // the msg.sender must either be approved with enough allowance or _from
        require(msg.sender == _from || allowance(_from, msg.sender) >= _value, 'Sender not approved');

        // _from balance must be sufficient
        require(balanceOf(_from) >= _value, 'Insufficient balance.');

        // TODO: Correct underflow/overflow errors using SafeMath.sol from OpenZeppelin
        balances[_from] -= _value;
        balances[_to] += _value;
        _approve(_from, msg.sender, allowances[_from][msg.sender] - _value);  

        emit Transfer(_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public override returns (bool) {
        _approve(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public override view returns (uint256) {
        return allowances[_owner][_spender];
    }
    
    // Protect this
    function _approve(address _owner, address _spender, uint256 _value) internal {
        require(_owner != address(0), 'Invalid owner');
        require(_spender != address(0), 'Invalid spender');
        
        allowances[_owner][_spender] = _value;
        emit Approval(_owner, _spender, _value);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, 'Only admin.');
        _;
    }

    function mint(address _to, uint256 _amount) public onlyAdmin {
        tokenSupply += _amount;
        balances[_to] += _amount;
        emit Transfer(address(0), _to, _amount);
    }
}
