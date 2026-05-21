const http = require("http");
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..", "..");
const envPath = path.join(projectRoot, ".env.local");
const publicDir = __dirname;
const port = Number(process.env.PORT || 3000);

loadEnvFile(envPath);

const apiKey = process.env.DEEPSEEK_API_KEY || "";
const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
const baseUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
    return serveFile(path.join(publicDir, "index.html"), "text/html; charset=utf-8", res);
  }

  if (req.method === "GET" && url.pathname === "/README.md") {
    return serveFile(path.join(publicDir, "README.md"), "text/markdown; charset=utf-8", res);
  }

  if (req.method === "POST" && url.pathname === "/api/explain") {
    return handleExplain(req, res);
  }

  if (req.method === "POST" && url.pathname === "/api/modify-contract") {
    return handleModifyContract(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, () => {
  console.log(`Remix AI Web3 Assistant running at http://localhost:${port}`);
});

function serveFile(filePath, contentType, res) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "Failed to read file." }));
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");
    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[key]) {
      process.env[key] = stripWrappingQuotes(value);
    }
  }
}

function stripWrappingQuotes(value) {
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

async function handleExplain(req, res) {
  try {
    const body = await readJson(req);
    validateRequest(body);

    if (!apiKey) {
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "Missing DEEPSEEK_API_KEY in .env.local" }));
      return;
    }

    const prompt = buildPrompt(body);
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        stream: false,
        messages: [
          {
            role: "system",
            content:
              "你是一个受限的 AI × Web3 助手。你只负责解释链上操作、提醒风险、生成 Remix 操作步骤和执行记录模板。你绝不建议绕过人工确认，绝不索要私钥、助记词、API Key、token 或 .env 内容。请只输出 JSON。"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "DeepSeek API request failed.", details: errorText }));
      return;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(content);

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(parsed));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: error.message || "Unexpected server error." }));
  }
}

async function handleModifyContract(req, res) {
  try {
    const body = await readJson(req);
    validateRequest(body);

    if (!apiKey) {
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "Missing DEEPSEEK_API_KEY in .env.local" }));
      return;
    }

    const prompt = buildModifyPrompt(body);
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        stream: false,
        messages: [
          {
            role: "system",
            content:
              "你是一个受限的 Solidity 修改助手。你的任务是根据自然语言需求生成修改后的 Solidity 合约草稿，并解释修改点。你不能假装已经部署或执行。你必须提醒用户人工复核访问控制、事件、可见性、状态变量、编译版本、函数副作用和安全边界。只输出 JSON。"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "DeepSeek API request failed.", details: errorText }));
      return;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(content);

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(parsed));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: error.message || "Unexpected server error." }));
  }
}

function validateRequest(body) {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body.");
  }
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(new Error("Request body must be valid JSON."));
      }
    });
    req.on("error", () => reject(new Error("Failed to read request body.")));
  });
}

function buildPrompt(body) {
  return `请根据以下任务生成结构化 JSON，用于一个 Remix + AI Web3 助手页面。

返回 JSON，必须包含以下字段：
- summary: string
- walletApproval: string
- gas: string
- verification: string
- steps: string[]
- risks: string[]
- checklist: string[]
- markdown: string

要求：
- 输出语言必须是中文
- 面向 Web3 新手，但不要过度简化
- 清楚区分只读调用、写入交易、部署合约
- 明确哪些步骤必须人工确认
- 明确不要暴露私钥、助记词、API Key
- markdown 字段应是一份可直接复制的执行记录模板

任务信息：
- 目标网络：${body.network || ""}
- 合约名称：${body.contractName || ""}
- 合约地址：${body.contractAddress || ""}
- 函数名：${body.functionName || ""}
- 参数：${body.params || ""}
- 操作类型：${body.actionType || ""}
- 钱包：${body.wallet || ""}
- 用户目标：${body.goal || ""}`;
}

function buildModifyPrompt(body) {
  return `请根据以下信息生成结构化 JSON，用于一个 Solidity 合约修改助手。

返回 JSON，必须包含以下字段：
- summary: string
- changeList: string[]
- modifiedContract: string
- reviewChecklist: string[]
- risks: string[]
- remixSteps: string[]

要求：
- 输出语言必须是中文
- modifiedContract 字段必须只包含完整 Solidity 代码，不要加 markdown 围栏
- 尽量保留原合约中未被需求影响的部分
- 如果需求不清楚，做最保守修改
- 不要声称已经部署、测试或验证
- 明确提醒用户人工编译、人工复核、人工部署

输入信息：
- 合约名称：${body.contractName || ""}
- 用户修改需求：${body.requirement || ""}
- 原始 Solidity 合约：
${body.contractCode || ""}`;
}
