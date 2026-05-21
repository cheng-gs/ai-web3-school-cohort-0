# Remix + AI Web3 助手示例输入

下面这几组输入可以直接拿来测试当前第一阶段 MVP。

## 示例 1：只读调用

适合先验证页面是否能正确区分“只读”和“写入”。

- 目标网络：`Sepolia`
- 合约名称：`SimpleStorage`
- 合约地址：`0xA4B6b39A7D0dC7EFb55608A886a71e09b4080272`
- 函数名：`getNumber`
- 参数：留空
- 操作类型：`只读调用`
- 钱包：`MetaMask`
- 用户目标描述：
  `我想读取 Sepolia 上 SimpleStorage 当前存储的 number 值，并整理成一份学习记录。`

## 示例 2：写入交易

这是第一阶段 MVP 最推荐测试的完整链路。

- 目标网络：`Sepolia`
- 合约名称：`SimpleStorage`
- 合约地址：`0xA4B6b39A7D0dC7EFb55608A886a71e09b4080272`
- 函数名：`setNumber`
- 参数：`42`
- 操作类型：`写入交易`
- 钱包：`MetaMask`
- 用户目标描述：
  `我想在 Sepolia 上调用 SimpleStorage 的 setNumber(42)，然后记录交易哈希、区块浏览器链接，并确认链上状态是否更新。`

## 示例 3：部署合约

适合验证页面能不能区分“部署”和“普通函数调用”。

- 目标网络：`Sepolia`
- 合约名称：`SimpleStorage`
- 合约地址：留空或写“部署后生成”
- 函数名：`constructor`
- 参数：`10`
- 操作类型：`部署合约`
- 钱包：`MetaMask`
- 用户目标描述：
  `我想在 Sepolia 上重新部署一个 SimpleStorage 合约，初始值设为 10，并记录部署交易哈希、新合约地址和区块浏览器链接。`

## 示例 4：自然语言修改合约

这个示例用于测试“合约修改草稿”模式。

- 合约名称：`SimpleStorage`
- 用户修改需求：
  `请给合约增加 owner 权限控制，只有 owner 可以调用 setNumber，并增加 transferOwnership(address newOwner) 函数。`
- 原始 Solidity 合约代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private number;

    event NumberChanged(uint256 newNumber);

    constructor(uint256 _initialNumber) {
        number = _initialNumber;
    }

    function setNumber(uint256 _number) public {
        number = _number;
        emit NumberChanged(_number);
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
```

## 建议测试顺序

建议按这个顺序测：

1. `getNumber()`
2. `setNumber(42)`
3. `部署合约`
4. `自然语言修改合约`

这样可以从低风险读取开始，逐步走到写入、部署和代码修改。
