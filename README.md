# AI × Web3 School Cohort 0

这是我的 AI × Web3 School Week 1 Proof-of-Work Pack 总入口，用来集中展示我这周学了什么、做了什么、验证了什么，以及哪些地方做了人工复核和修正。

## Week 1 总览

本周我的重点是先把 AI 基础概念、Web3 基础概念、测试网实践、Learning Agent 工作流和最小 AI × Web3 交叉流程串起来，形成一个可公开查看、可复盘、可继续扩展的学习仓库。

我的当前背景是：

- AI：熟悉
- Web3：新手
- 编程：会基础脚本
- 目标方向：AI × Web3

## Week 1 Proof-of-Work Pack

### 1. AI 学习记录 / 概念卡片

- [AI 基础概念整理](./tasks/ai-basic-concepts.md)
- [Week 1 交付清单](./tasks/week-1-deliverables.md)

这部分主要整理了 LLM、prompt、context window、workflow、agent、tool use、AI coding、guardrails、tracing、human-in-the-loop 等概念，并说明了误区和使用边界。

### 2. Learning Agent / AI 工具实践记录

- [Codex 配置与运行记录](./submissions/week-1-codex-run-log.md)
- [个人学习计划](./learning-plan.md)
- [学员画像](./profile.md)

这部分记录了我如何用 Codex 初始化学习仓库、生成学习计划、整理文档、创建 demo，并说明了关键 prompt、成功输出和人工复核记录。

### 3. Web3 概念卡片 / 测试网实践记录

- [Web3 基础概念整理](./tasks/web3-basic-concepts.md)
- [合约部署与调用记录](./submissions/week-1-contract-practice.md)
- [EOA、智能账户和多签账户对比](./tasks/eoa-vs-smart-account-vs-multisig.md)

这部分主要整理了 account、address、wallet、seed phrase、private key、signature、transaction、gas、smart contract、testnet、block explorer 等概念，并补充了三类账户在权限和风险上的差异。

### 4. 测试网交易 / 合约地址 / 区块浏览器链接

- 测试网：`Sepolia`
- 测试钱包地址：`0x7A26dFA802c664DB65e03454bFAFe042e3f14266`
- 测试交易哈希：`0xcb2586107f160f4431d5107085a3d16aa152f384179b11ce12b14c68c57f55ac`
- 交易浏览器链接：
  `https://sepolia.etherscan.io/tx/0xcb2586107f160f4431d5107085a3d16aa152f384179b11ce12b14c68c57f55ac`
- 合约地址：`0xA4B6b39A7D0dC7EFb55608A886a71e09b4080272`
- 合约浏览器链接：
  `https://sepolia.etherscan.io/address/0xA4B6b39A7D0dC7EFb55608A886a71e09b4080272`
- 合约代码：
  [SimpleStorage.sol](./experiments/contracts/SimpleStorage.sol)

测试交易摘要：

这笔 Sepolia 测试网交易由地址 `0x7A26dFA802c664DB65e03454bFAFe042e3f14266` 发起，向地址 `0x0d612B211f51f36B9B2DFC8E5F22dfB10a9661ae` 转账了 `0.001 ETH`。交易状态为 `Success`，区块高度为 `10878470`，Gas 使用量为 `21,000`，交易手续费约为 `0.000031500006552 ETH`。

### 5. AI × Web3 最小交叉实验 / 流程图

- [最小可交互 demo 提交说明](./submissions/week-1-minimal-demo.md)
- [AI × Web3 概念解释器 demo](./experiments/ai-web3-concept-explainer/README.md)
- [最小 AI × Web3 工作流](./tasks/minimal-ai-web3-workflow.md)

这部分展示了一个最小 AI × Web3 交叉路径：

`AI 生成说明 -> 人工复核 -> 钱包确认 -> 测试网执行 -> 区块浏览器验证`

重点不是做复杂产品，而是明确 AI 辅助边界、人工确认节点、链上执行边界和最终验证方式。

### 6. 本周遇到的一个问题和一次人工修正记录

本周遇到的一个典型问题是：在创建 GitHub 仓库和推送远端时，GitHub CLI 登录状态和权限配置出现过问题，导致仓库创建失败。

我的人工修正是：

- 不让 Agent 继续盲目重试
- 重新执行 `gh auth login`
- 改用正确的浏览器授权方式
- 再由 Agent 继续完成远端仓库创建和首次推送

另一类人工修正出现在课程资料确认上：

- WCB Learning 页面内容没有被 Agent 自动完整读取
- 我手动打开页面并提供真实课程内容
- Agent 再据此更新学习计划和任务清单

这两次都体现了一个原则：遇到平台状态、认证权限或课程原文这类高依赖真实上下文的问题时，必须由人补充确认，不能让 Agent 猜。

## Daily Notes

- [2026-05-18](./daily/2026-05-18.md)
- [2026-05-19](./daily/2026-05-19.md)

## Repo Structure

- `daily/`: 每日学习记录和打卡草稿
- `tasks/`: 概念卡片、流程说明、任务拆解
- `experiments/`: 合约、demo 和最小实验
- `submissions/`: 可直接提交的平台材料
- `handbook-feedback/`: Handbook 问题和改进建议

## 公开仓库安全边界

这个仓库默认公开，因此不放以下内容：

- 私钥
- 助记词
- API Key
- token
- `.env` 文件
- 密码
- 私密会议链接
- 任何未公开个人信息

## 参考入口

- Handbook: https://aiweb3.school/zh/handbook/
- WCB Course: https://web3career.build/zh/programs/AI-Web3-School
- WCB Learning: https://web3career.build/zh/programs/AI-Web3-School#tab=learning
- WCB Agent API Docs: https://web3career.build/llms.txt
- Learning Agent Prompt: https://aiweb3.school/learning-agent.zh.txt
