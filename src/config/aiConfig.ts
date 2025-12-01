/**
 * AI 配置
 * 从配置文件和环境变量加载配置
 * ⚠️ 安全提示：API Key 必须通过环境变量配置，不要硬编码在代码中
 */

import {
  getDefaultModelConfig,
  getModelConfigById,
  getPromptConfig,
  AIModelConfig,
} from './aiConfigLoader';

export type AIProvider = 'siliconflow' | 'openai' | 'custom';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
  apiUrl: string;
  temperature?: number;
  maxTokens?: number;
  modelId?: string;
}

/**
 * 获取 AI 配置
 * 
 * 配置优先级：
 * 1. 环境变量指定的模型 ID (VITE_AI_MODEL_ID)
 * 2. 配置文件中的默认模型 (config/ai.json)
 * 3. 环境变量配置 (VITE_AI_MODEL, VITE_AI_PROVIDER)
 * 
 * API Key 始终从环境变量读取，确保安全
 */
export function getAIConfig(): AIConfig {
  // 从环境变量读取 API Key（必需，安全）
  const apiKey = import.meta.env.VITE_AI_KEY || '';

  // 尝试从环境变量获取指定的模型 ID
  const envModelId = import.meta.env.VITE_AI_MODEL_ID;
  
  // 从配置文件加载模型配置
  let modelConfig: AIModelConfig | null = null;
  
  if (envModelId) {
    // 优先使用环境变量指定的模型 ID
    modelConfig = getModelConfigById(envModelId);
    if (!modelConfig) {
      console.warn(`⚠️ 环境变量指定的模型 ${envModelId} 不存在或未启用，使用默认模型`);
    }
  }
  
  // 如果没有指定或找不到，使用配置文件中的默认模型
  if (!modelConfig) {
    modelConfig = getDefaultModelConfig();
  }
  
  // 如果配置文件也没有，尝试从环境变量构建配置
  if (!modelConfig) {
    const envProvider = (import.meta.env.VITE_AI_PROVIDER || 'siliconflow') as AIProvider;
    const envModel = import.meta.env.VITE_AI_MODEL || 'Qwen/Qwen2.5-72B-Instruct';
    
    return {
      provider: envProvider,
      apiKey,
      model: envModel,
      apiUrl: getProviderUrl(envProvider),
      temperature: 0.8,
      maxTokens: 2000,
    };
  }

  // 使用配置文件中的模型配置
  const promptConfig = getPromptConfig();
  
  if (!apiKey) {
    console.warn(
      '⚠️ AI API Key 未配置，请设置 VITE_AI_KEY 环境变量\n' +
      '   在项目根目录创建 .env.local 文件并添加：VITE_AI_KEY=your-api-key-here\n' +
      '   ⚠️ 重要：.env.local 文件已添加到 .gitignore，不会被提交到 Git'
    );
  }

  return {
    provider: modelConfig.provider,
    apiKey,
    model: modelConfig.model,
    apiUrl: modelConfig.apiUrl,
    temperature: modelConfig.temperature ?? promptConfig.temperature,
    maxTokens: modelConfig.maxTokens ?? promptConfig.maxTokens,
    modelId: modelConfig.id,
  };
}

/**
 * 获取 AI 提供商的基础 URL
 */
function getProviderUrl(provider: AIProvider): string {
  switch (provider) {
    case 'siliconflow':
      return 'https://api.siliconflow.cn/v1/chat/completions';
    case 'openai':
      return 'https://api.openai.com/v1/chat/completions';
    case 'custom':
      return import.meta.env.VITE_AI_URL || '';
    default:
      return 'https://api.siliconflow.cn/v1/chat/completions';
  }
}

/**
 * 验证 AI 配置
 */
export function validateAIConfig(): boolean {
  const config = getAIConfig();
  return !!config.apiKey && !!config.apiUrl;
}

