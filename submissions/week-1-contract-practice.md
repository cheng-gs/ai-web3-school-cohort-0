# Week 1 合约部署与调用记录

## 1. 合约地址或调用目标地址

- 合约地址：`0xA4B6b39A7D0dC7EFb55608A886a71e09b4080272`

## 2. 区块浏览器链接

- Sepolia Etherscan：
  `https://sepolia.etherscan.io/address/0xA4B6b39A7D0dC7EFb55608A886a71e09b4080272`

## 3. 至少一次读取或写入结果

我在 Remix 上部署了一个最小合约 `SimpleStorage`，并完成了至少一次读取或写入操作。

- 读取函数：`getNumber()`
- 写入函数：`setNumber(uint256 _number)`
- 初始读取结果：123
-写入 setNumber(456) 后再次读取结果：456

说明：

- 如果我先在部署时传入了初始值，那么 `getNumber()` 会返回这个初始值。
- 如果我调用了 `setNumber(例如 42)`，那么后续再次调用 `getNumber()` 时，理论上应返回更新后的值 `42`。

## 4. 代码链接

- GitHub repo：
  `https://github.com/cheng-gs/ai-web3-school-cohort-0`
- Solidity 合约文件：
  `https://github.com/cheng-gs/ai-web3-school-cohort-0/blob/master/experiments/contracts/SimpleStorage.sol`

## 5. 简短说明：我部署或调用了什么函数，以及哪些步骤需要人工确认

我在 Remix 上部署了 `SimpleStorage` 合约。这个合约在构造函数里接收一个初始数字，并提供两个核心函数：`getNumber()` 用于读取当前存储的数字，`setNumber(uint256 _number)` 用于修改这个数字，并触发 `NumberChanged` 事件。

在实际操作里，以下步骤需要人工确认：

- 在 Remix 中连接钱包并选择正确的测试网
- 在钱包中确认合约部署交易
- 在钱包中确认 `setNumber()` 这类写入型交易
- 在区块浏览器中核对合约地址、交易状态和链上结果

相对来说，`getNumber()` 这类只读调用通常不需要链上写入确认，但部署和写入操作都会触发真实的测试网交易，因此必须由人检查钱包弹窗内容后再确认。

