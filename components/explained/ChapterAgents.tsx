import { Icon } from "@/components/ui/Icon";
import { explained } from "@/content/site";
import { Chapter, MarkerArrow, win } from "./Chapter";

const { agents } = explained;

// Timing (chapter progress 0 → 1).
const T = {
  lead: [0.12, 0.2],
  arrow1: [0.24, 0.32],
  agent: [0.3, 0.38],
  arrow2: [0.44, 0.52],
  tasks: [0.5, 0.58],
  live: 0.58, // live items type in one after another from here
  next: [0.63, 0.69],
  stamp: [0.71, 0.76],
  tools: [0.8, 0.86],
} as const;

export function ChapterAgents() {
  return (
    <Chapter
      id="ai-agents"
      len={6}
      card={{ number: agents.number, title: agents.title, tone: agents.tone }}
      sticker={agents.sticker}
      cam={[
        [0, 0, 0, 1, 0],
        [0.12, "lead", 1.3, -1],
        [0.24, "lead", 1.35, -1],
        [0.34, "agent", 1.3, 1],
        [0.46, "agent", 1.35, 1],
        [0.56, "tasks", 1.15, 0],
        [0.68, "tasks", 1.2, 0],
        [0.76, "stamp", 1.4, -1],
        [0.82, "tasks", 1.2, 0],
        [0.86, "tasks", 1.2, 0],
        [0.92, 0, 0, 1, 0],
      ]}
    >
      <div className="vx-flow">
        <article className="vx-node vx-slap vx-t" style={win(T.lead[0], T.lead[1], { "--rot": "-6deg" })} data-cam-focus="lead">
          <Icon name="about" className="vx-node-icon" />
          <h3 className="vx-node-title">{agents.lead.title}</h3>
          <p className="vx-node-note">{agents.lead.note}</p>
        </article>

        <MarkerArrow a={T.arrow1[0]} b={T.arrow1[1]} className="vx-flow-arrow" />

        <article
          className="vx-node vx-node--agent vx-slap vx-t"
          style={win(T.agent[0], T.agent[1], { "--rot": "5deg" })}
          data-cam-focus="agent"
        >
          <Icon name="spark" className="vx-node-icon" />
          <h3 className="vx-node-title">{agents.agent.title}</h3>
          <p className="vx-node-note">{agents.agent.note}</p>
        </article>

        <MarkerArrow a={T.arrow2[0]} b={T.arrow2[1]} className="vx-flow-arrow" />

        <article className="vx-tasks index-card vx-slap vx-t" style={win(T.tasks[0], T.tasks[1], { "--rot": "-4deg" })} data-cam-focus="tasks">
          <h3 className="vx-tasks-title">{agents.tasksLabel}</h3>

          <h4 className="vx-tasks-group">{agents.liveLabel}</h4>
          <ul className="vx-tasks-list">
            {agents.live.map((item, i) => (
              <li key={item} className="vx-type vx-t" style={win(T.live + i * 0.03, T.live + i * 0.03 + 0.04)}>
                <span className="vx-check" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="vx-tasks-next">
            <h4 className="vx-tasks-group">{agents.inProgressLabel}</h4>
            <ul className="vx-tasks-list vx-rise vx-t" style={win(T.next[0], T.next[1])}>
              {agents.inProgress.map((item) => (
                <li key={item}>
                  <span className="vx-check vx-check--todo" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            {/* Text over stamp.webp, so it stays real, selectable HTML. */}
            <p className="vx-stamp vx-slap vx-t" style={win(T.stamp[0], T.stamp[1], { "--rot": "-12deg", "--rest": "-8deg" })} data-cam-focus="stamp">
              {agents.stamp}
            </p>
          </div>

          <div className="vx-tasks-tools vx-rise vx-t" style={win(T.tools[0], T.tools[1])}>
            <h4 className="vx-tasks-group">{agents.toolsLabel}</h4>
            <ul className="vx-tasks-list">
              {agents.tools.map((item) => (
                <li key={item}>
                  <span className="vx-check vx-check--tool" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </Chapter>
  );
}
