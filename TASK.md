# news-image-20261120 — 一张图总结 11-20 世界新闻 — 任务计划书（交给 WorkBuddy）
# 用法：把【整篇】复制进一个全新会话，工作区直接选 E:/work ai/赏金/news20-work
# 这个任务 program/v1，用 bundle 转录门，**不需要 record 录制**。零成本。

你是被 make.fun 收录的 agent。目标：在全新会话里查 2026-11-20 的真实世界新闻，
生成一张信息图，写好仓库，通过 check，然后 bundle → submit，拿到名次
（$250，前 50 名有钱，第 50 名 $3；截止 **2026-11-22 08:00 北京**，别拖到最后）。
你前几天做过同系列 11-17 / 11-18 / 11-19，流程几乎一样，区别只是新闻日期和这次要换更好的图。

## 场地（我在会话外已备好，别重复做）
- kit：`E:/work ai/赏金/kitdl/news-image-20261120-kit`（cli sha256 前缀 506ac21c，注意和 11-19 的 0b281810 不同，别用错）。
  starter 在 `kit/starter/`：main.ts、entry.png、LICENSE —— 是占位图，必须换掉。
- 工作区：`E:/work ai/赏金/news20-work`（你在这里建 git 仓库并写文件）。
- 钱包密钥：`E:/work ai/赏金/makefun/makefun-keypair.json`（已登录，账号 @brisk-sparrow-22，
  payout 钱包 BVVugKm…r8Qw）。
- 系统提示词文件：`E:/work ai/赏金/submit/sysprompt.md`（bundle 要 --system-prompt）。
- GitHub：owner `yiyi218218-crypto`，新仓库名自己定，例如 `world-news-20261120`。
  **仓库必须在本场比赛 open 之后创建**——比赛 11-20 已 open，现在满足。用 gh 建 public 仓库。

## 评分规则（决定图怎么画，务必先读）
评审是视觉模型，**不知道今天是几号**，只看图，按以下顺序比较，前一条分出胜负就不再看后面：
1. **点明日期**：是否明确标出所总结的那一天（2026-11-20），并画的是那天的具体新闻。
   画成 11-13 之前的事会直接输。**图上必须清楚写 "20 November 2026" / "2026-11-20"**。
2. **新闻具体 + 图示**：是那天的真实事件、能在图里认出来；不是泛泛的"世界和平"口号。
3. **可读性**：约 300 像素宽仍能看懂；每条新闻有清晰的图 + 短标签，不自相矛盾、不胡编。
4. **忠于事实**：按报道写，不把猜测当事实。
5. **做工**：一个清晰构图，干净，无糊图/乱码文字。
- 程序无网络、标准库、≤1 MiB、≤1024×1024 PNG/JPEG；评审只看 `/output/entry.png` 的字节。
- starter 是"地球+报纸"占位图，只有它会被判无新闻，必输——必须换成真内容。

## 步骤

### 1. 查真实新闻（关键，别凭记忆编）
用 WebSearch / WebFetch 查 **2026-11-20（周五）当天**发生或首次报道的世界新闻，
凑 6–10 条当天真实事件。交叉核对至少两个来源，记下每条的简短事实。
如果某条拿不准是不是 20 号的，宁可不用。把选中的条目和一句话事实列在会话里（有文字回合）。
注意别和 11-19、11-18 的新闻搞混——评审看的日期是 20 号。

### 2. 生成信息图（决定名次）
用图像生成工具（ImageGen）出一张 **1024×1024 以内、≤1 MiB** 的信息图，要求：
- 顶部大标题明确写 `WORLD NEWS · 20 November 2026`（日期一定要醒目、正确拼写）。
- 主体用 2×3 或 3×3 网格，每格一条新闻：一个能认出的图示 + 一行英文短标签
  （如 "Ceasefire signed" / "Central bank cuts rate"）。文字要少而清楚，避免乱码。
- 一个统一、干净的编辑插画风格（flat editorial illustration），配色协调，不要太花。
- 底部一行小字 `Sources: Reuters · AP · BBC · 20 Nov 2026`（可换成你实际用的来源）。
- **图上文字是评审重点**：英文单词务必拼对，生成后自己检查一遍；若生成的文字糊/错，
  用图像编辑工具修掉，或重生成。宁可文字少而清晰，不要多而糊。
- 生成后确认尺寸和字节数（≤1024×1024、≤1 MiB），存进仓库 `E:/work ai/赏金/news20-work/entry.png`。

### 3. 写程序（作者性门槛，必须会话亲手 Write）
在 `E:/work ai/赏金/news20-work/` 里用 Write 写 `main.ts`（Node 22，仅标准库）：
```ts
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';
copyFileSync(new URL('./entry.png', import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
```
- 要求：用你自己的写法/注释重写，不要原样照抄 starter；**先 Write 一版，再 Edit 改一次**
  （thinking_revised 要求同一文件 ≥2 次写）。
- 从 starter 拷 `LICENSE` 进仓库（这是唯一允许直接复制的文件）。
- 图本身只算一行不计作者性，所以 main.ts 是代码作者性的主要来源——确保它确实由本会话写入。
- 写 README（用第 6 节模板），设 GitHub About。

### 4. 本地验证
```
cd "E:/work ai/赏金/news20-work"
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
ls -l out/entry.png        # 确认拷出来了，且是有效 PNG/JPEG
KIT="E:/work ai/赏金/kitdl/news-image-20261120-kit"
node "$KIT/cli/makefun.mjs" check --kit "$KIT" --repo . --transcripts <稍后 bundle 的文件>
```
check 的 LICENSE/入口/尺寸必须全绿；transcripts 要等 bundle 出来再查。

### 5. git commit + push
```
cd "E:/work ai/赏金/news20-work"
git init -b main && git add -A && git commit -m "World news 20 Nov 2026 summarized in one image"
gh repo create yiyi218218-crypto/world-news-20261120 --public --source=. --remote=origin --push
```
（若仓库已建好则只 add/commit/push。）`.makefun/owner.json` 需含
`{"wallet":"BVVugKmUYTSSAHhRGmJb5EXMuyAw4Rw8Vuz7dEV8r8Qw"}`（GitHub owner 就是本账号时可省，
但写上更稳）。

### 6. README 模板（写进仓库根目录）
```
# World News — 20 November 2026

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/yiyi218218-crypto/world-news-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard)
[![reward](https://make.fun/badge/news-image-20261120/yiyi218218-crypto/world-news-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120)

One image summarizing the world's news of 20 November 2026, built by an AI agent.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

<sub>Entered on [make.fun](https://make.fun/) · AI agents build software for cash rewards</sub>
```
GitHub About：
```
gh repo edit yiyi218218-crypto/world-news-20261120 \
  --description "One image summing up 20 November 2026 world news, built by an AI agent for make.fun" \
  --homepage "https://make.fun/bounty/news-image-20261120" --add-topic "makefun,ai-agents,bounties,growth"
```

### 7. bundle / check / submit（program/v1，不录制）
所有命令从仓库根目录跑；KIT/WORK 用绝对路径。
```bash
KIT="E:/work ai/赏金/kitdl/news-image-20261120-kit"
WORK="E:/work ai/赏金/news20-work"
cd "E:/work ai/赏金/news20-work"

# 找本会话自己的 jsonl（mtime 最新、首条消息是本 prompt 的那一个）
SESSION=$(ls -t "C:/Users/ygg/.workbuddy/projects/e-work ai-赏金-news20-work"/*.jsonl 2>/dev/null | head -1)
# 若上面目录不存在，用工作区父目录里 mtime 最新的，并 Read 确认首条消息是本 prompt：
# SESSION=$(ls -t "C:/Users/ygg/.workbuddy/projects/e-work ai-赏金"/*.jsonl | head -1)

# 从会话 jsonl 读真实 model/provider（不要猜）：
python3 - "$SESSION" <<'PY'
import json,sys
for line in open(sys.argv[1],encoding="utf-8"):
    try: d=json.loads(line)
    except: continue
    if d.get("model"): print("model =",d["model"]); break
PY

TAR_OPTIONS=--force-local node "$KIT/cli/makefun.mjs" bundle --repo . \
  --out "$WORK/transcripts.tar.gz" --session "$SESSION" --no-discover \
  --system-prompt "E:/work ai/赏金/submit/sysprompt.md" \
  --prompt-file "$WORK/prompt.txt" --prompt-origin typed \
  --harness codebuddy --harness-version 5.11.3 --model <上一步打印的值> \
  --provider <按 model 推断> --effort default --mcp none --instructions none

TAR_OPTIONS=--force-local node "$KIT/cli/makefun.mjs" check --kit "$KIT" --repo . --transcripts "$WORK/transcripts.tar.gz"

TAR_OPTIONS=--force-local node "$KIT/cli/makefun.mjs" submit \
  --competition news-image-20261120 \
  --repo-url https://github.com/yiyi218218-crypto/world-news-20261120 \
  --commit "$(git rev-parse HEAD)" --title "World News — 20 November 2026" \
  --bundle "$WORK/transcripts.tar.gz" \
  --keypair "E:/work ai/赏金/makefun/makefun-keypair.json"
```
- provider 推断：`deepseek-*`→deepseek，`claude-*`→anthropic，`gpt-*`→openai；以会话日志实际 model 为准。
- **thinking_own_work 已生效**（required_from 11-20 00:00Z）：不准从 CDN/npm/其它 entry 下载或复制内容；
  图是你用图像工具生成的、代码是本会话写的，天然满足。只从 starter 拷 LICENSE 是允许的。
  peer 对比要到 11-21 才生效，这次提交不用管。
- check 若 FAIL，看它给的一行 fix 修；全绿再 submit。每天 10 次、共 20 次额度。
- submit 后 `node "$KIT/cli/makefun.mjs" status --competition news-image-20261120` 确认
  entries made ≥ 1，把 provisional rate（对 house 图的胜率）和提交 id 回报给我。
  练习分数实时可见，可用它迭代图（比如日期不够醒目就重出一张再 bundle/submit）。

## 铁律
- 会话必须在比赛 open 之后开（现在满足）；**不要读本目录外的旧会话 jsonl**。
- 不要触发上下文压缩；每轮都有文字说明（thinking_turns ≥5）。
- bundle 的 `--session` 必须是本会话自己的 jsonl；`--prompt-file` 用 `news20-work/prompt.txt`。
- 不要读其它参赛 entry 的仓库/站点并照抄；新闻事实可以读公开报道。
- deadline 11-22 08:00 北京，最后一次提交是最终 entry，别拖到最后一分钟。
