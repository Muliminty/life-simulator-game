# AI 配置文件说明

## 📝 配置文件位置

`config/ai.json` - AI 模型和提示词配置文件

## 🎯 使用方式

### 修改配置

1. 编辑 `config/ai.json` 文件
2. 修改 `defaultModel` 字段指定要使用的模型 ID
3. 重新构建和部署项目
4. 配置会自动生效，玩家无感知

### 配置示例

```json
{
  "defaultModel": "qwen-72b",  // 修改这里切换模型
  "models": [
    {
      "id": "qwen-72b",
      "name": "Qwen 2.5 72B",
      "provider": "siliconflow",
      "model": "Qwen/Qwen2.5-72B-Instruct",
      "enabled": true  // 设置为 false 可禁用该模型
    }
  ]
}
```

## 🔧 配置项说明

### 顶层配置

- `defaultModel`: 默认使用的模型 ID（必填）
- `defaultProvider`: 默认提供商（可选）
- `version`: 配置版本号

### 模型配置 (models)

每个模型包含以下字段：

- `id`: 模型唯一标识符
- `name`: 模型显示名称
- `provider`: 提供商 (siliconflow/openai/custom)
- `model`: 模型名称（API 使用的模型名）
- `apiUrl`: API 端点 URL
- `description`: 模型描述
- `temperature`: 温度参数（0-1，可选）
- `maxTokens`: 最大 token 数（可选）
- `enabled`: 是否启用（true/false）

### 提示词配置 (prompt)

- `systemMessage`: 系统提示词
- `temperature`: 默认温度参数
- `maxTokens`: 默认最大 token 数
- `eventDescriptionMinLength`: 事件描述最小长度

### 降级配置 (fallback)

- `enabled`: 是否启用降级机制
- `usePresetEvents`: 是否使用预设事件

## 🚀 快速切换模型

### 方法一：修改配置文件（推荐）

1. 编辑 `config/ai.json`
2. 修改 `defaultModel` 为想要的模型 ID，例如：
   ```json
   {
     "defaultModel": "gpt-4"  // 切换到 GPT-4
   }
   ```
3. 重新构建：`pnpm build`
4. 重新部署

### 方法二：通过环境变量（临时）

在 `.env.local` 中设置：

```bash
VITE_AI_MODEL_ID=gpt-4
```

这会覆盖配置文件中的 `defaultModel`。

## 📋 支持的模型 ID

### SiliconFlow 模型

- `qwen-72b` - Qwen 2.5 72B（默认）
- `deepseek-v3` - DeepSeek V3
- `qwen-32b` - Qwen 2.5 32B
- `qwen-14b` - Qwen 2.5 14B
- `llama-70b` - Llama 3 70B
- `glm-4` - GLM-4

### OpenAI 模型

- `gpt-4` - GPT-4
- `gpt-4-turbo` - GPT-4 Turbo
- `gpt-3.5-turbo` - GPT-3.5 Turbo
- `o1-preview` - O1 Preview

## ⚙️ 添加新模型

在 `config/ai.json` 的 `models` 数组中添加新模型配置：

```json
{
  "id": "custom-model",
  "name": "自定义模型",
  "provider": "siliconflow",
  "model": "your/model-name",
  "apiUrl": "https://api.siliconflow.cn/v1/chat/completions",
  "description": "模型描述",
  "temperature": 0.8,
  "maxTokens": 2000,
  "enabled": true
}
```

然后修改 `defaultModel` 为 `"custom-model"` 即可使用。

## 🔒 安全提示

- API Key 仍然通过环境变量 `VITE_AI_KEY` 配置
- 配置文件可以提交到 Git（不包含敏感信息）
- 不同模型可以使用不同的 API Key（通过环境变量配置）

## 📚 相关文档

- [环境变量配置](../env.example)
- [安全指南](../SECURITY.md)

