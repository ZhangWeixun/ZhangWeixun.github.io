### personal-homepage ###
基于简历内容，为 zhangweixun.github.io 创建一个简约学术风的英文个人主页，包含个人介绍、项目展示（含独立详情页和效果对比区域）以及个人生活页面。

# 创建学术风格个人主页

基于 Weixun Zhang 的简历，创建一个简约学术风（黑白为主）的英文静态个人主页，部署在 GitHub Pages 上。网站包含个人信息介绍、工作项目详细展示（每个项目有独立页面和效果对比区域）、以及个人生活页面。

## Proposed Changes

### 网站架构设计

网站采用纯静态 HTML/CSS/JS 实现，无需任何构建工具，GitHub Pages 直接部署。

页面结构：
- `index.html` — 首页（个人简介 + 项目概览）
- `projects/super-resolution.html` — 4K Super-Resolution & VLM-Based Video Restoration
- `projects/narrowband-hd.html` — Narrowband HD Enhancement
- `projects/color-grading-hdr.html` — Color Grading & HDR Remastering
- `life.html` — 个人生活页面
- `css/style.css` — 全局样式
- `js/main.js` — 交互逻辑（图片对比滑块等）
- `assets/` — 图片/视频资源目录（预留）

---

### 全局样式与布局

#### [NEW] [style.css](file:///Users/zhangweixun/张维洵/Immigration/zhangweixun.github.io/css/style.css)

- 黑白为主的学术简约风格
- 响应式设计，支持桌面和移动端
- 统一的导航栏、排版、间距
- 使用系统字体栈 + 衬线字体（学术感）
- 图片/视频对比展示的滑块组件样式
- 留白区域的占位样式（placeholder）

---

### 首页

#### [NEW] [index.html](file:///Users/zhangweixun/张维洵/Immigration/zhangweixun.github.io/index.html)

包含以下模块：
- **导航栏**：Home | Projects | Life
- **Hero 区域**：姓名、职位、一句话简介
- **About 区域**：Professional Summary 精简版
- **Skills 区域**：技能标签展示
- **Projects 概览**：三个核心项目的卡片，点击进入详情页
- **Education 区域**：学历信息
- **Contact 区域**：邮箱等联系方式
- **Footer**

---

### 项目详情页

#### [NEW] [super-resolution.html](file:///Users/zhangweixun/张维洵/Immigration/zhangweixun.github.io/projects/super-resolution.html)

4K Super-Resolution & VLM-Based Video Restoration 项目页面：
- 项目概述
- 技术亮点（LoRA fine-tuning、Wan T2V/I2V、degradation dataset 等）
- 效果对比展示区域（滑块对比组件，暂用 placeholder）
- 技术架构简图区域（预留）

#### [NEW] [narrowband-hd.html](file:///Users/zhangweixun/张维洵/Immigration/zhangweixun.github.io/projects/narrowband-hd.html)

Narrowband HD Enhancement 项目页面：
- 项目概述
- 技术亮点（guided-filter、fixed-point quantization、ROI-aware 等）
- 效果对比展示区域（滑块对比组件，暂用 placeholder）

#### [NEW] [color-grading-hdr.html](file:///Users/zhangweixun/张维洵/Immigration/zhangweixun.github.io/projects/color-grading-hdr.html)

Color Grading & HDR Remastering 项目页面：
- 项目概述
- 技术亮点（cloud-device collaborative、two-pass analysis、HDR10/HLG/HDR Vivid/Dolby Vision）
- 效果对比展示区域（SDR vs HDR 对比，暂用 placeholder）
- 规模数据展示（10,000+ videos/month, 8,000+ shows）

---

### 个人生活页面

#### [NEW] [life.html](file:///Users/zhangweixun/张维洵/Immigration/zhangweixun.github.io/life.html)

- 个人照片区域（grid 布局，暂用 placeholder）
- 兴趣爱好介绍：Half-marathon、Volleyball、Sketching、Hiking
- 每个爱好配一个小描述区域和照片位

---

### 交互脚本

#### [NEW] [main.js](file:///Users/zhangweixun/张维洵/Immigration/zhangweixun.github.io/js/main.js)

- 图片/视频 Before-After 滑块对比组件
- 移动端导航菜单交互
- 平滑滚动

---

### 资源目录

#### [NEW] assets/README.md

预留资源目录结构说明：
- `assets/images/projects/` — 项目效果图
- `assets/images/life/` — 生活照片
- `assets/images/profile/` — 头像等

---

### README 更新

#### [MODIFY] [README.md](file:///Users/zhangweixun/张维洵/Immigration/zhangweixun.github.io/README.md)

更新为网站说明文档，包含目录结构和维护指南。

## Verification Plan

### Manual Verification

- 在本地用浏览器打开 index.html 检查页面渲染效果
- 检查响应式布局在不同屏幕宽度下的表现
- 验证各页面之间的导航链接正确
- 确认效果对比区域的 placeholder 正常显示
- push 到 GitHub 后验证 GitHub Pages 部署正常

updateAtTime: 2026/6/7 21:33:58

planId: 46f380e3-d3b4-41c5-9edc-5de69dea1537