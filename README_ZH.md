<h1 align="left">MetForge — 大气科学 Skills</h1>

<p align="center">
  <img src="docs/assets/metforge_title_clean_vector.svg" alt="MetForge — 大气科学 Skills" width="860">
</p>

<p align="center">
  <a href="https://github.com/yuanruichen/MetForge/releases/latest"><img alt="release" src="https://img.shields.io/badge/release-v2026.7.10-orange"></a>
  <a href="https://opensource.org/license/mit"><img alt="license" src="https://img.shields.io/badge/license-MIT-black"></a>
  <a href="https://skills.sh/yuanruichen/metforge"><img alt="skills.sh" src="https://skills.sh/b/yuanruichen/metforge"></a>
  <img alt="Codex" src="https://img.shields.io/badge/agent-Codex-111111">
  <img alt="Claude Code" src="https://img.shields.io/badge/agent-Claude_Code-D97757">
  <img alt="Hermes" src="https://img.shields.io/badge/agent-Hermes-4B5CC4">
</p>

<p align="center">
  <a href="README.md">English</a> · 简体中文
</p>

MetForge 是一组轻量、可复用的大气科学技能，为智能体补充科学问题与证据设计、数据获取、科学计算、科研绘图和数值模式诊断所需的领域判断，同时把通用任务规划、代码编写、工具调用和上下文管理交给宿主智能体。同一份 `skills/` 源码可用于 Codex、Claude Code 和 Hermes。

## 快速开始

安装后，可以直接描述科研任务，也可以明确指定技能。Codex 使用 `$metforge-data`，Claude Code 使用 `/metforge:metforge-data`，Hermes 使用 `/metforge-data`；三者也都可以自然语言触发。下面的提示词可以直接复制使用：

| 使用场景 | 提示词 |
|---|---|
| 逐步确定科研项目 | `使用 $metforge-project，结合我的笔记，通过问答明确 spcz-moist-margin 项目，并维护 doc/core/research/spcz-moist-margin/ 下的 proj.md 和 log.md。每次先问一个关键问题。` |
| 下载再分析资料 | `使用 $metforge-data 下载 DJFM 2000–2020、10°S–10°N、80°E–180°E 的 ERA5 850 hPa 逐小时 u、v 风场。先验证一个月，再扩展到完整时段。` |
| 检查和预处理本地数据 | `使用 $metforge-data 检查这些 NetCDF 文件的坐标、单位、日历和缺测值，并设计一个内存安全的 xarray 预处理脚本。` |
| 计算大气科学指数 | `使用 $metforge-analysis 计算 SPCZ 强度和倾角指数；运行前明确区域、权重、基准期、单位和验证方法。` |
| 趋势、滤波和统计分析 | `使用 $metforge-analysis 对连续逐日场去趋势并进行 20–100 天滤波，然后计算 EOF、回归图和滞后合成，并考虑时间自相关。` |
| 设计大气科学图件 | `使用 $metforge-figure 将这些 MJO 合成场设计为清晰的经度–时间图，统一色标和单位，并标出传播速度参考线。` |
| 审查已有图件 | `使用 $metforge-figure 审查这张多面板地图的科学可比性、色标、标签、投影伪影和导出质量，并优先修改最关键的问题。` |
| 诊断动力框架试验 | `使用 $metforge-model-diagnose 判断平衡流试验中 RMS 误差为何增长，并设计一个最小试验，区分空间离散失衡与增长的计算模态。` |
| 组合分析与可视化 | `使用 $metforge-analysis 计算诊断变量和统计量，再使用 $metforge-figure 生成支撑结论所必需的图件。` |

## 技能

| 技能 | 适用任务 | 示例 |
|---|---|---|
| [`metforge-project`](skills/metforge-project/SKILL.md) | 通过问答澄清科学问题与假设，创建、继续和更新 `proj.md` / `log.md` | “使用 `$metforge-project`，把这个研究想法逐步整理成简洁的项目核心。” |
| [`metforge-data`](skills/metforge-data/SKILL.md) | 查找、下载、裁剪、验证并记录大气科学数据 | “使用 `$metforge-data` 下载该区域的 ERA5 逐小时风场。” |
| [`metforge-analysis`](skills/metforge-analysis/SKILL.md) | 计算指数、气象诊断变量、趋势、滤波、EOF、回归和合成 | “使用 `$metforge-analysis` 计算该环流指数及其趋势。” |
| [`metforge-figure`](skills/metforge-figure/SKILL.md) | 设计、生成、修改和审查大气科学图件 | “使用 `$metforge-figure` 将平衡流试验结果整理为可发表的对比图。” |
| [`metforge-ppt`](skills/metforge-ppt/SKILL.md) | 用模板将已验收阶段结果整理为可编辑学术汇报 | “使用 `$metforge-ppt` 汇总本阶段结果，保留方法、反例与未解问题。” |
| [`metforge-model-diagnose`](skills/metforge-model-diagnose/SKILL.md) | 诊断动力框架、理想试验、平衡、守恒、收敛和误差增长 | “使用 `$metforge-model-diagnose` 判断平衡流试验为何随积分时间漂移。” |

`skills/` 下的每个目录都是可独立安装的技能。技能可以按需协作，但不依赖中央调度器。

## 文献方法约束

metforge-analysis 在科学计算前必须找到与当前问题和解释目标对应的已发表方法，核对原文中的方法章节、公式或操作定义；只允许保留方法定义、假设与解释范围的小幅改动，并明确记录差异。通用公式、已有软件包、数值闭合或图形效果，都不能替代具体诊断的方法依据。

项目现有参考不足时，先检索文献；检索后仍无法建立适用方法或核实必要细节，就停止该项分析，报告检索记录、缺失依据和未执行的工作，而不是自创替代诊断继续计算或生成机制结论。详见[方法来源与停止条件](skills/metforge-analysis/references/method-provenance.md)。

## 阶段成果汇报

`metforge-analysis` 在一个完整分析阶段通过验收、产物和记录保存并核查后，调用 `metforge-ppt` 汇总该阶段结果。用户可跳过或指定其他输出；不会在每次小计算后生成 PPT，也不会用汇报绕过文献方法约束。制作汇报不增加科学证据。

`metforge-ppt` 使用本地登记的学术模板、从汇报示例提取的版式规则，以及可复用的 OOXML 模板应用/完整性核查脚本。用户模板保留在本地，不随公开仓库分发；用 `python skills/metforge-ppt/scripts/template_path.py --register /path/to/template.potx` 登记默认模板。它存放在托管 skill 目录之外，常规更新会保留。默认一页一个结论，图占主体，少量解释，页脚注明方法和来源，结尾分开说明已知与待解问题。用户新模板优先；保留反例、空结果、采样限制和不确定性。交付可编辑 PPTX、可用的预览、讲稿与复现源文件，并说明渲染与字体限制。

## 科研项目文档

`metforge-project` 通过少量、有针对性的问题逐步收敛研究设计，区分文献发现、直接观测、当前假设和科学解释。已有项目笔记会直接复用；尚未决定的选择明确保留，不代替研究者作答。

```text
使用 $metforge-project，根据这些笔记开始 spcz-moist-margin 项目。每轮先问一个关键问题。
使用 $metforge-project，读取 spcz-moist-margin 的项目文档，从上次的未决问题继续问答。
使用 $metforge-project 更新 spcz-moist-margin：根据这份新证据追加 log.md，重新评估 H1，并修订 proj.md 中受影响的判断和计划。
```

文档放在实际科研仓库的 `doc/core/research/<projname>/`：`proj.md` 保留简洁的当前核心，`log.md` 追加有日期的证据与决策。实质性讨论节点会保存草案和下一问题，方便跨会话继续。确认研究计划不等于验证假设；没有真实证据的初始化不会生成实验结果。具体运行过程仍记录在项目原有的日志或溯源位置。

## 安装

### Codex

克隆仓库并同步全部技能：

```bash
git clone https://github.com/yuanruichen/MetForge.git
cd MetForge
scripts/install-codex-skills.sh
```

在不修改现有安装的情况下检查版本是否一致：

```bash
scripts/install-codex-skills.sh --check
```

安装脚本默认写入 `${CODEX_HOME:-$HOME/.codex}/skills`。可以使用 `--dest PATH` 指定其他目录。

#### 更新已有 Codex 安装

在现有 MetForge checkout 的 `main` 分支中执行：

```bash
git pull --ff-only origin main
scripts/install-codex-skills.sh
scripts/install-codex-skills.sh --check
```

这些命令会拉取最新源码、同步全部技能（包括新增技能），并检查已安装副本是否一致。若最初使用了 `--dest PATH`，两条安装器命令也应带上相同选项。自定义修改应保留在源码 checkout 中，同步会替换受管理的已安装副本。如果本地改动导致 Git 无法快进，请先合并这些改动再重试；更新不会重置你的工作。若新技能尚未显示，重新打开智能体会话。

### Claude Code

将该仓库注册为 Marketplace，然后安装 MetForge 插件：

```text
/plugin marketplace add yuanruichen/MetForge
/plugin install metforge@metforge
```

Claude Code 会从共享的 `skills/` 目录发现六个技能，对应命令为 `/metforge:metforge-project`、`/metforge:metforge-data`、`/metforge:metforge-analysis`、`/metforge:metforge-figure`、`/metforge:metforge-ppt` 和 `/metforge:metforge-model-diagnose`。

### Hermes

将 MetForge 添加为公开的 Skills Hub tap：

```bash
hermes skills tap add yuanruichen/MetForge
```

也可以直接从 GitHub 安装各个技能：

```bash
hermes skills install yuanruichen/MetForge/skills/metforge-project
hermes skills install yuanruichen/MetForge/skills/metforge-data
hermes skills install yuanruichen/MetForge/skills/metforge-analysis
hermes skills install yuanruichen/MetForge/skills/metforge-figure
hermes skills install yuanruichen/MetForge/skills/metforge-ppt
hermes skills install yuanruichen/MetForge/skills/metforge-model-diagnose
```

Hermes 会将第三方 tap 视为社区来源，并在安装时进行安全扫描。

## 设计原则

- 提供领域判断，不重复宿主智能体已经具备的任务编排能力。
- 在高成本计算前先验证最小可用结果。
- 明确记录变量、单位、坐标、假设、指标和证据。
- 根据实际运行环境、数据规模和计算成本选择直接运行或提交 Slurm。
- 每次下载、计算、模式试验或绘图阶段完成后追加处理记录。
- 保持原始数据不可变，保证派生结果可复现。
- 把科研图件视为可审查的科学论证，而不只是美化输出。
- 区分直接证据、科学解释和尚未解决的不确定性。

Codex、Claude Code 和 Hermes 共用同一组技能目录；平台专属文件只保存分发元信息。
