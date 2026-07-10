<h1 align="left">MetForge — 大气科学 Skills</h1>

<p align="center">
  <img src="docs/assets/metforge_title_clean_vector.svg" alt="MetForge — 大气科学 Skills" width="860">
</p>

<p align="center">
  <a href="https://github.com/yuanruichen/MetForge/releases/latest"><img alt="release" src="https://img.shields.io/badge/release-v2026.7.10-orange"></a>
  <a href="https://opensource.org/license/mit"><img alt="license" src="https://img.shields.io/badge/license-MIT-black"></a>
  <img alt="Codex" src="https://img.shields.io/badge/agent-Codex-111111">
</p>

<p align="center">
  <a href="README.md">English</a> · 简体中文
</p>

MetForge 是一组轻量、可复用的大气科学技能，为智能体补充数据获取、科研绘图和数值模式诊断所需的领域判断，同时把任务规划、代码编写、工具调用和上下文管理交给宿主智能体。

## 快速开始

安装后，可以直接描述科研任务，也可以明确指定技能。下面的提示词可以直接复制使用：

| 使用场景 | 提示词 |
|---|---|
| 下载再分析资料 | `使用 $metforge-data 下载 DJFM 2000–2020、10°S–10°N、80°E–180°E 的 ERA5 850 hPa 逐小时 u、v 风场。先验证一个月，再扩展到完整时段。` |
| 检查和预处理本地数据 | `使用 $metforge-data 检查这些 NetCDF 文件的坐标、单位、日历和缺测值，并设计一个内存安全的 xarray 预处理脚本。` |
| 设计大气科学图件 | `使用 $metforge-figure 将这些 MJO 合成场设计为清晰的经度–时间图，统一色标和单位，并标出传播速度参考线。` |
| 审查已有图件 | `使用 $metforge-figure 审查这张多面板地图的科学可比性、色标、标签、投影伪影和导出质量，并优先修改最关键的问题。` |
| 诊断动力框架试验 | `使用 $metforge-analysis 判断平衡流试验中 RMS 误差为何增长，并设计一个最小试验，区分空间离散失衡与增长的计算模态。` |
| 组合分析与可视化 | `使用 $metforge-analysis 评估分辨率、时间步长、区域大小和 MPI 分区试验；只在结论需要图件证据时调用 $metforge-figure。` |

## 技能

| 技能 | 适用任务 | 示例 |
|---|---|---|
| [`metforge-data`](skills/metforge-data/SKILL.md) | 查找、下载、裁剪、验证并记录大气科学数据 | “使用 `$metforge-data` 下载该区域的 ERA5 逐小时风场。” |
| [`metforge-figure`](skills/metforge-figure/SKILL.md) | 设计、生成、修改和审查大气科学图件 | “使用 `$metforge-figure` 将平衡流试验结果整理为可发表的对比图。” |
| [`metforge-analysis`](skills/metforge-analysis/SKILL.md) | 诊断动力框架、理想试验、收支、平衡、守恒和误差增长 | “使用 `$metforge-analysis` 判断平衡流试验为何随积分时间漂移。” |

`skills/` 下的每个目录都是可独立安装的技能。技能可以按需协作，但不依赖中央调度器。

## 安装到 Codex

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

## 设计原则

- 提供领域判断，不重复宿主智能体已经具备的任务编排能力。
- 在高成本计算前先验证最小可用结果。
- 明确记录变量、单位、坐标、假设、指标和证据。
- 保持原始数据不可变，保证派生结果可复现。
- 把科研图件视为可审查的科学论证，而不只是美化输出。
- 区分直接证据、科学解释和尚未解决的不确定性。

后续可以在不修改核心技能目录的情况下增加 Claude Code 和 Hermes 适配层。
