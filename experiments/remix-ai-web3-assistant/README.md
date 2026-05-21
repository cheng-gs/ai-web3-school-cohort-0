# Remix + AI Web3 助手 MVP

这是第一阶段的最快 MVP。

## 定位

这个页面不直接连接钱包，也不直接发起链上交易。它只负责：

- 解释用户准备执行的链上动作
- 提示这一步是只读、写入还是部署
- 生成 Remix 操作步骤
- 提示哪些地方必须人工确认
- 生成执行后记录模板
- 根据自然语言需求生成 Solidity 合约修改草稿
- 给出改动摘要、人工复核清单和风险提醒

真实的链上读写仍然由用户在 Remix 和 MetaMask 中手动完成。

## 适用场景

- 用 `SimpleStorage` 这类最小合约做测试网练习
- 在执行前确认函数、参数和网络
- 在执行后整理交易哈希、浏览器链接和学习记录
- 在执行前先让 AI 根据自然语言需求修改已有合约，再复制到 Remix 编译和人工复核

## 运行方式

如果只看静态页面，直接用浏览器打开 [index.html](./index.html) 即可。

如果要接入真实 DeepSeek API，请在项目根目录准备 `.env.local`，然后运行：

```bash
node experiments/remix-ai-web3-assistant/server.js
```

再打开：

`http://localhost:3000`

后端会从 `.env.local` 读取：

- `DEEPSEEK_API_KEY`
- `DEEPSEEK_MODEL`
- `DEEPSEEK_BASE_URL`

## 当前限制

- 如果本地未启动后端，则不会调用真实 LLM API
- 不连接 MetaMask
- 不读取真实链上状态
- 不自动获取交易哈希
- 不自动部署或自动修改链上合约

## 下一步

第二阶段再升级成网页前端 + `wagmi` / `viem`，把读写操作收进同一个页面里，但仍保留人工钱包确认。
