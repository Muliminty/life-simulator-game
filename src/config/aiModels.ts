/**
 * AI 模型预设配置
 * 支持快速切换多个大模型
 */

export interface AIModel {
  id: string;
  name: string;
  provider: 'siliconflow' | 'openai' | 'custom';
  model: string;
  apiUrl: string;
  description: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * 预设的 AI 模型列表
 */
export const AI_MODELS: AIModel[] = [
  // SiliconFlow 模型
  {
    id: 'qwen-72b',
    name: 'Qwen 2.5 72B',
    provider: 'siliconflow',
    model: 'Qwen/Qwen2.5-72B-Instruct',
    apiUrl: 'https://api.siliconflow.cn/v1/chat/completions',
    description: '通义千问 72B 模型，性能强大，适合复杂场景',
    temperature: 0.8,
    maxTokens: 2000,
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'siliconflow',
    model: 'deepseek-ai/DeepSeek-V3',
    apiUrl: 'https://api.siliconflow.cn/v1/chat/completions',
    description: 'DeepSeek V3 模型，推理能力强',
    temperature: 0.7,
    maxTokens: 2000,
  },
  {
    id: 'qwen-32b',
    name: 'Qwen 2.5 32B',
    provider: 'siliconflow',
    model: 'Qwen/Qwen2.5-32B-Instruct',
    apiUrl: 'https://api.siliconflow.cn/v1/chat/completions',
    description: '通义千问 32B 模型，平衡性能和速度',
    temperature: 0.8,
    maxTokens: 2000,
  },
  {
    id: 'qwen-14b',
    name: 'Qwen 2.5 14B',
    provider: 'siliconflow',
    model: 'Qwen/Qwen2.5-14B-Instruct',
    apiUrl: 'https://api.siliconflow.cn/v1/chat/completions',
    description: '通义千问 14B 模型，速度快，成本低',
    temperature: 0.8,
    maxTokens: 2000,
  },
  {
    id: 'llama-70b',
    name: 'Llama 3 70B',
    provider: 'siliconflow',
    model: 'meta-llama/Llama-3-70B-Instruct',
    apiUrl: 'https://api.siliconflow.cn/v1/chat/completions',
    description: 'Llama 3 70B 模型，Meta 开源大模型',
    temperature: 0.7,
    maxTokens: 2000,
  },
  {
    id: 'glm-4',
    name: 'GLM-4',
    provider: 'siliconflow',
    model: 'THUDM/glm-4-9b-chat',
    apiUrl: 'https://api.siliconflow.cn/v1/chat/completions',
    description: 'GLM-4 模型，智谱 AI 开发',
    temperature: 0.8,
    maxTokens: 2000,
  },
  // OpenAI 模型
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    model: 'gpt-4',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    description: 'OpenAI GPT-4，性能最强',
    temperature: 0.8,
    maxTokens: 2000,
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    model: 'gpt-4-turbo-preview',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    description: 'OpenAI GPT-4 Turbo，更快更强',
    temperature: 0.8,
    maxTokens: 2000,
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    description: 'OpenAI GPT-3.5 Turbo，性价比高',
    temperature: 0.8,
    maxTokens: 2000,
  },
  {
    id: 'o1-preview',
    name: 'O1 Preview',
    provider: 'openai',
    model: 'o1-preview',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    description: 'OpenAI O1，推理能力极强',
    temperature: 0.8,
    maxTokens: 2000,
  },
];

/**
 * 根据 ID 获取模型配置
 */
export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find((model) => model.id === id);
}

/**
 * 根据提供商获取模型列表
 */
export function getModelsByProvider(provider: AIModel['provider']): AIModel[] {
  return AI_MODELS.filter((model) => model.provider === provider);
}

/**
 * 获取默认模型
 */
export function getDefaultModel(): AIModel {
  return AI_MODELS[0]; // 默认使用 Qwen 2.5 72B
}

/**
 * 获取模型显示名称
 */
export function getModelDisplayName(model: AIModel): string {
  return `${model.name} (${model.provider})`;
}

