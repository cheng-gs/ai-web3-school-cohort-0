# Week 1 配置记录与运行记录

## 1. 我选择的 Agent / AI 工具

- 工具：Codex
- 使用场景：作为我的 AI × Web3 School learning agent，协助我初始化学习仓库、整理学习计划、生成打卡草稿、沉淀课程笔记和 Handbook feedback 流程。

## 2. 我让 Agent 帮我完成的学习任务

这次我让 Codex 帮我完成了几类实际任务：

- 阅读 AI × Web3 School Learning Agent 启动 Prompt 和 Handbook
- 根据我的背景初始化个人学习计划
- 在本地创建并初始化 GitHub 学习仓库
- 生成 `README.md`、`profile.md`、`learning-plan.md`、`daily/2026-05-18.md`
- 根据 WCB Learning 页面内容补齐 Week 1 学习目标和交付清单
- 生成 AI 基础概念整理文档
- 整理 Handbook feedback 工作流

## 3. 一段关键 Prompt / 配置说明

我给 Codex 的关键任务说明大意如下：

> 请作为我的 AI × Web3 School Learning Agent，先阅读启动 Prompt 和 Handbook，帮我初始化个人学习计划、GitHub 学习仓库、每日打卡草稿和 Handbook feedback 流程。

本次使用中的关键配置和边界：

- 主工具选择：Codex
- 输出语言：中文
- 学习背景：AI 熟悉，Web3 新手，会基础脚本
- 每日投入时间：2 小时
- 仓库策略：公开 GitHub repo，作为 proof-of-work workspace
- 安全边界：不把 API key、私钥、助记词、密码、隐私信息写入公开仓库
- 执行边界：涉及 GitHub 仓库创建、提交、推送等写入动作时，先确认再执行
- 平台边界：WCB 打卡和正式提交以人工手动提交为准，不假设 Agent 能自动代提

## 4. 一次成功输出记录

一次明确成功的输出是：Codex 帮我完成了本地仓库初始化、首个 commit、远端 GitHub repo 创建和首次 push。

相关结果：

- GitHub repo：https://github.com/cheng-gs/ai-web3-school-cohort-0
- 本地目录：`F:\ai-web3\ai-web3-school-cohort-0`
- 首次提交信息：`Initialize AI Web3 School learning repo`

同时，Codex 还生成了以下学习材料：

- [README.md](</F:/ai-web3/ai-web3-school-cohort-0/README.md>)
- [learning-plan.md](</F:/ai-web3/ai-web3-school-cohort-0/learning-plan.md>)
- [daily/2026-05-18.md](</F:/ai-web3/ai-web3-school-cohort-0/daily/2026-05-18.md>)
- [tasks/ai-basic-concepts.md](</F:/ai-web3/ai-web3-school-cohort-0/tasks/ai-basic-concepts.md>)
- [tasks/week-1-deliverables.md](</F:/ai-web3/ai-web3-school-cohort-0/tasks/week-1-deliverables.md>)

## 5. 一次人工复核、修正或拒绝 Agent 建议的记录

这次过程里，我至少做了两次明确的人工复核：

### 记录 A：WCB Learning 内容人工确认

一开始 Agent 只能拿到 WCB Learning 页面入口，但没有读到完整的学习内容。这里没有让 Agent 猜测“今天任务是什么”，而是由我手动打开 WCB Learning 页面，把 Week 1 的真实目标和任务内容贴回对话，再由 Agent 写入 repo。

这次人工复核的意义是：

- 避免 Agent 在页面内容不完整时编造课程安排
- 保证学习计划和交付清单与课程平台实际内容一致

### 记录 B：GitHub 登录与远端创建问题修正

在创建远端仓库时，Agent 第一次遇到了认证和权限问题，后来又遇到 PAT 权限不足的问题。这里没有让 Agent 继续盲目重试，而是由我手动重新执行 `gh auth login`，改用正确的登录方式后，再让 Agent 继续创建远端仓库并推送。

这次人工修正的意义是：

- 防止错误认证状态下继续执行写入动作
- 把“创建公开仓库”这个外部写入动作保留在人可确认的范围内

## 6. 这次使用 Codex 的体会

我目前最直接的感受是：

- Codex 很适合做 repo 初始化、文档整理、任务拆解和学习材料沉淀
- 对于结构化工作，例如创建目录、写 Markdown、维护学习计划，它的效率很高
- 但涉及外部平台状态、认证、权限、打卡提交、敏感信息时，仍然必须人工确认和复核

## 7. 后续准备

接下来我会继续用 Codex 处理这些学习任务：

- 整理 Web3 基础概念笔记
- 设计并记录测试网交互流程
- 生成最小 AI × Web3 交叉实验说明
- 维护 daily notes、提交记录和 handbook feedback
