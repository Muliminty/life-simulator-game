<div align="center">

# 🌟 人生模拟器文字游戏 🌟

> 一款基于 React + TypeScript 的沉浸式人生模拟文字游戏

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

_体验从出生到老去的完整人生历程，做出每一个重要选择_

</div>

---

## 📖 项目简介

这是一款以人生模拟为主题的**文字冒险游戏**，玩家将扮演一个普通人，从出生开始，经历童年、青少年、成年、中年、老年等各个阶段，通过不同的选择影响人生轨迹。游戏采用**AI生成事件**机制，每次选择都会遇到不同的随机事件，让每一次游戏体验都充满未知与惊喜。

### ✨ 核心特色

- 🎲 **AI驱动事件系统** - 使用 AI 生成丰富的人生事件，每次选择都是全新体验
- 👶 **完整人生阶段** - 从出生到老去，涵盖童年、学生、工作、婚姻、退休等各个阶段
- 🎓 **教育系统** - 选择不同的教育路径，影响职业发展
- 💼 **职业系统** - 多种职业选择，从蓝领到白领，从创业到打工
- 💑 **人际关系** - 恋爱、结婚、生子、家庭关系
- 🏠 **生活系统** - 买房、买车、理财、投资
- 🎯 **目标系统** - 设定人生目标，完成各种成就
- 📊 **属性系统** - 健康、智力、魅力、财富、幸福度等多维度属性
- 🎁 **随机事件** - 人生中的各种机遇和挑战

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (推荐) 或 **npm** >= 9.0.0

### 安装步骤

#### 1️⃣ 克隆项目

```bash
git clone <repository-url>
cd life-simulator-game
```

#### 2️⃣ 安装依赖

使用 **pnpm** (推荐):

```bash
pnpm install
```

或使用 **npm**:

```bash
npm install
```

#### 3️⃣ 配置 AI 服务

**方式一：通过配置文件（推荐，运维人员使用）**

编辑 `config/ai.json` 文件，修改 `defaultModel` 字段选择要使用的模型：

```json
{
  "defaultModel": "qwen-72b",  // 修改这里切换模型
  "models": [...]
}
```

支持的模型 ID：`qwen-72b`, `deepseek-v3`, `gpt-4`, `gpt-3.5-turbo` 等

**方式二：通过环境变量（开发者使用）**

在项目根目录创建 `.env.local` 文件（可参考 `env.example` 文件）：

```bash
# 复制示例文件
cp env.example .env.local

# 然后编辑 .env.local，填入你的实际 API Key
```

`.env.local` 文件内容：

```bash
# AI API Key（必需）
VITE_AI_KEY=your-api-key-here

# 可选：临时覆盖配置文件中的模型（通过环境变量）
# VITE_AI_MODEL_ID=qwen-72b
```

> 💡 **获取 API Key**:
>
> - 访问 [SiliconFlow](https://siliconflow.cn) 注册账号并创建 API Key
> - 如需使用其他 AI 服务，设置 `VITE_AI_PROVIDER` 环境变量
>
> ⚠️ **重要安全提示**:
>
> - **绝对不要**将 API Key 硬编码在代码中
> - **绝对不要**提交 `.env.local` 文件到 Git（已添加到 `.gitignore`）
> - **绝对不要**在代码仓库、Issue、PR 中暴露真实的 API Key
> - 如果意外提交了 API Key，请立即在服务商处重新生成新的 Key

#### 4️⃣ 启动开发服务器

```bash
# 使用 pnpm
pnpm dev

# 或使用 npm
npm run dev
```

#### 5️⃣ 访问游戏

打开浏览器访问: `http://localhost:5173`

---

## 🎮 游戏玩法

### 基础操作

#### 🎯 开始游戏

1. 输入你的角色名称
2. 系统会随机分配初始属性（可重新随机）
3. 选择出生家庭背景
4. 开始你的人生之旅！

#### 📊 属性系统

游戏包含以下核心属性：

- **健康 (Health)** - 生命值，影响寿命和活动能力
- **智力 (Intelligence)** - 影响学习能力和职业发展
- **魅力 (Charm)** - 影响人际关系和社交
- **财富 (Wealth)** - 金钱，用于购买物品和服务
- **幸福度 (Happiness)** - 生活满意度
- **压力 (Stress)** - 工作生活压力
- **年龄 (Age)** - 当前年龄

#### 🗺️ 主要玩法

##### 1. 人生阶段

游戏分为多个阶段：

- **0-6岁** - 童年期：家庭环境决定初始属性
- **7-18岁** - 学生期：选择学校，影响教育水平
- **19-25岁** - 青年期：大学/工作选择，恋爱
- **26-40岁** - 成年期：职业发展，结婚生子
- **41-60岁** - 中年期：事业巅峰，家庭责任
- **61+岁** - 老年期：退休生活，享受晚年

##### 2. 教育系统

- **小学/中学** - 基础教育，影响智力
- **高中** - 选择文理科，影响大学专业
- **大学** - 选择专业，影响职业方向
- **研究生** - 深造选择，提升职业上限

##### 3. 职业系统

- **蓝领职业** - 工人、服务员等，收入稳定但上限低
- **白领职业** - 程序员、医生、律师等，收入较高
- **创业** - 高风险高回报，可能成功也可能失败
- **自由职业** - 灵活但收入不稳定

##### 4. 人际关系

- **恋爱** - 遇到不同的人，发展关系
- **结婚** - 选择伴侣，组建家庭
- **生子** - 养育子女，影响幸福度
- **朋友** - 维护友谊，获得支持

##### 5. 生活系统

- **买房** - 购买房产，提升生活质量
- **买车** - 购买交通工具，提升便利性
- **理财** - 投资股票、基金等
- **消费** - 购买物品，提升属性

##### 6. 随机事件

人生中会遇到各种事件：

- ✅ **机遇事件** - 获得财富、提升属性
- ⚠️ **挑战事件** - 疾病、失业、意外
- 🎁 **特殊事件** - 中奖、继承、贵人相助
- 💔 **情感事件** - 恋爱、分手、结婚

---

## 🎯 游戏目标

### 短期目标

- 完成当前人生阶段的目标
- 提升核心属性
- 积累财富
- 建立良好的人际关系

### 长期目标

- 🏆 **完美人生** - 所有属性达到最高
- 💰 **财富自由** - 积累巨额财富
- 👨‍👩‍👧‍👦 **幸福家庭** - 拥有美满的家庭
- 🎓 **学术成就** - 获得最高学历
- 💼 **事业巅峰** - 达到职业最高等级
- 🏅 **人生赢家** - 完成所有成就

---

## 🛠️ 技术栈

- **前端框架**: React 19.2.0
- **开发语言**: TypeScript 5.8.2
- **构建工具**: Vite 6.2.0
- **UI图标**: Lucide React
- **AI服务**: SiliconFlow API / OpenAI API
- **状态管理**: React Hooks
- **数据持久化**: localStorage

---

## 📁 项目结构

```
life-simulator-game/
├── components/          # React UI 组件
│   ├── CharacterModal.tsx      # 角色信息弹窗
│   ├── EventModal.tsx           # 事件弹窗
│   ├── CareerModal.tsx          # 职业选择弹窗
│   ├── RelationshipModal.tsx    # 人际关系弹窗
│   ├── PropertyModal.tsx        # 房产弹窗
│   └── ...
├── views/              # 视图层（业务逻辑 + UI）
│   ├── GameView.tsx             # 主游戏视图
│   ├── StageView.tsx            # 人生阶段视图
│   └── ...
├── features/           # 功能模块（可复用的 Hooks）
│   ├── career/                  # 职业相关
│   ├── education/               # 教育相关
│   ├── relationship/            # 人际关系相关
│   └── ...
├── hooks/              # 通用 Hooks
│   ├── useGameState.ts          # 游戏状态管理
│   └── useGameEffects.ts        # 游戏副作用处理
├── services/           # 业务逻辑服务层
│   ├── aiService.ts             # AI 事件生成服务
│   ├── eventService.ts          # 事件处理服务
│   └── ...
├── utils/              # 工具函数
│   ├── gameUtils.ts             # 游戏工具函数
│   ├── attributeUtils.ts        # 属性计算工具
│   └── ...
├── config/             # 配置文件
│   └── aiConfig.ts              # AI 配置
├── types.ts            # TypeScript 类型定义
├── constants.ts        # 游戏常量配置
└── ...
```

---

## 🔧 开发命令

```bash
# 开发模式
pnpm dev          # 或 npm run dev

# 构建生产版本
pnpm build        # 或 npm run build

# 预览生产构建
pnpm preview      # 或 npm run preview
```

---

## 📚 文档

详细文档请查看 [doc/](./doc/) 目录：

- [快速开始指南](./doc/QUICK_START.md)
- [游戏玩法说明](./doc/GAMEPLAY.md)
- [架构设计文档](./doc/ARCHITECTURE.md)
- [实现方案](./doc/IMPLEMENTATION.md)
- [开发指南](./doc/DEVELOPMENT.md)
- [贡献指南](./doc/CONTRIBUTING.md)
- [部署指南](./DEPLOYMENT.md)
- [AI 配置说明](./config/README.md)

---

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

详细贡献指南请查看 [CONTRIBUTING.md](./doc/CONTRIBUTING.md)

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 🙏 致谢

- 感谢所有人生模拟类游戏提供的灵感
- 感谢 AI 服务提供商提供的 AI 能力

---

<div align="center">

**🌟 愿你的人生充满精彩与幸福！🌟**

Made with ❤️

</div>

