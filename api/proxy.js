/**
 * Vercel Serverless Function - AI API 代理
 * 用于处理跨域问题和转发 API 请求
 * 
 * ⚠️ 安全提示：
 * - API Key 从客户端请求体传递，不在服务器端硬编码
 * - 生产环境建议使用 Vercel 环境变量存储 API Key，而不是从客户端传递
 * - 此代理仅用于开发环境，生产环境应使用更安全的方案
 */

export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 从请求体获取配置（API Key 从客户端传递）
  // ⚠️ 注意：生产环境建议使用 Vercel 环境变量，而不是从客户端传递 API Key
  const { provider, apiKey, model, messages } = req.body;

  if (!provider || !apiKey || !model || !messages) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // 获取 API URL
  let apiUrl;
  switch (provider) {
    case 'siliconflow':
      apiUrl = 'https://api.siliconflow.cn/v1/chat/completions';
      break;
    case 'openai':
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      break;
    default:
      return res.status(400).json({ error: 'Unsupported provider' });
  }

  try {
    // 转发请求到 AI API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

