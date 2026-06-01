## 🌐 Languages  
[![English](https://img.shields.io/badge/Language-English-blue.svg)](README.md)
[![中文](https://img.shields.io/badge/语言-中文-red.svg)](README_zh.md)


# 🧭 AI 职业教练 (YourWayCareer)

一款极具现代商业感、权威实用的 AI 职业规划与面试模拟教练平台，基于 **React, TypeScript, Vite, Tailwind CSS 和 Supabase Edge Functions (Deno)** 打造。

项目在视觉上采用优雅的**麦肯锡商业设计风格**，并创新集成了**客户端自备密钥模型 (BYOK - Bring Your Own Key)**。这使得开发者可以托管一套功能强大的 AI SaaS 平台，并实现 **$0 运营 Token 成本消耗**。

---

## 🌟 核心功能

### 🔍 1. 智能简历评估与诊断
* **多维评估矩阵**：从“岗位匹配度、工作经历质量、呈现专业度、个人特质与软技能、竞争优势”五个核心维度进行评估。
* **圆环渐变分数计 (WOW Factor)**：基于原生的 SVG 绘制的高级渐变评分圆环，页面加载时自带顺滑生长动画。
* **专家级引用评价框**：以奢华的衬线体与半透明磨砂玻璃背板展示 AI 专家总结。
* **一键复制行动优化**：对优化后的开篇简介、量化成就项目经历提供一键复制，伴随对勾与微动效 Toast 弹窗反馈。

### 🤖 2. 沉浸式流式模拟面试
* **统一 SSE 流式响应**：在边缘端将 OpenAI、Gemini、Claude 接口的流式 Payload 统一转化并流式返回，无延迟打字机输入体验。
* **精致对话气泡**：GPU 加速的滑行入场动效 (`animate-card-enter`)，AI 面试官使用磨砂灰气泡，用户回答使用经典主色。
* **柔光呼吸警示灯**：未填目标 JD 时展示精美的金黄色呼吸感警示，以完美动效自然引导用户操作。

### 🧭 3. 互动式职业路线图 (Roadmap)
* **立体垂直节点数轴**：以渐变轴轨道和精致里程碑圆形节点展现多阶段升职跃迁路线。
* **游戏化技能树树干**：硬实力与软实力采用双色徽章设计，用户点击可将其标记为“已掌握”，实现个人提升可视化管理。
* **简历信息快捷提取**：一键“提取简历”功能，用正则自动解析简历内容并提取当前职位，避免用户重复填报。

### 🔑 4. 多平台 BYOK 客户端密钥控制
* 客户端本地存储与管理 **OpenAI, Anthropic Claude, Google Gemini, Azure AI 以及 OpenRouter** 的 API Key。
* 彻底免除开发者托管的高昂大模型 Token 成本，对开源模板推广极具战略价值。

---

## 🛠️ 技术栈构成

* **前端核心**: React 18, TypeScript, Vite, Tailwind CSS
* **UI 交互**: Radix UI, shadcn/ui 风格原子组件, Lucide 图标
* **数据流与路由**: React Router v6, TanStack React Query v5
* **后端支撑**: Supabase (Auth 用户认证, RLS 行级安全控制, PostgreSQL 数据库)
* **边缘计算 (FaaS)**: Supabase Edge Functions (Deno 运行时)
* **通知推送**: Resend API 邮件通知桥接

---

## 📁 目录结构

```bash
ai-career-coach/
├── src/
│   ├── components/       # 业务组件 (立体路线图、渐变分数圆环、API 设置、对话交互)
│   ├── hooks/            # 自定义状态 (BYOK 密钥配置, 中英多语言翻译, Supabase Auth)
│   ├── pages/            # 路由页面 (关于我们、管理后台、帮助中心、认证登录等)
│   ├── integrations/     # Supabase 客户端实例化
│   └── index.css         # 全局样式与暗黑模式 CSS 变量配置
├── supabase/
│   ├── config.toml       # Supabase 边缘函数配置文件 (关闭 JWT 验证)
│   ├── functions/        # Deno Serverless 边缘函数
│   │   ├── analyze-resume/      # 多模型简历诊断微服务
│   │   ├── mock-interview/      # SSE 统一流式面试微服务
│   │   └── generate-roadmap/    # 麦肯锡路线图 AI 生成微服务
│   └── migrations/       # PostgreSQL 数据表结构迁移 SQL (Profiles, RLS, 角色及规划表)
```

---

## 🚀 快速上手

### 环境准备
* [Node.js](https://nodejs.org/) (推荐 v18+)
* [npm](https://www.npmjs.com/)

### 本地运行步骤

1. 克隆代码库：
   ```sh
   git clone https://github.com/BruceMi321/ai-career-coach.git
   cd ai-career-coach
   ```

2. 安装所需依赖：
   ```sh
   npm install
   ```

3. 开启本地开发预览服务器：
   ```sh
   npm run dev
   ```

4. 代码规范与编译健全性检测：
   ```sh
   # 静态类型检查
   npx tsc --noEmit
   
   # Eslint 规范校验
   npm run lint
   ```

---

## 📄 许可证

本项目采用 MIT 许可证开源。
