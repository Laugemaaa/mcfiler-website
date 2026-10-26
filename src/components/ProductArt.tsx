import { Icon } from "./Icon";
import { VoxelScene } from "./VoxelScene";

export function ProductArt({ type }: { type: "script" | "plugin" | "setup" }) {
  return (
    <div className={`product-art art-${type}`} aria-hidden="true">
      <div className="art-grid" />
      {type === "script" ? (
        <div className="code-window">
          <div className="window-title">
            <span />
            <span />
            <span />
            <small>essentials.sk</small>
            <Icon name="code" size={13} />
          </div>
          <div className="code-lines">
            <div>
              <i>01</i>
              <span className="syntax-purple">command</span> /spawn:
            </div>
            <div>
              <i>02</i> <span className="syntax-green">trigger</span>:
            </div>
            <div>
              <i>03</i> teleport player{" "}
              <span className="syntax-purple">to</span> spawn
            </div>
            <div>
              <i>04</i> send{" "}
              <span className="syntax-green">"Velkommen hjem."</span>
            </div>
            <div>
              <i>05</i> <span className="code-cursor">▌</span>
            </div>
          </div>
          <div className="code-status">
            <span>●</span> En lille fil. Nye muligheder.
          </div>
        </div>
      ) : type === "plugin" ? (
        <div className="plugin-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="plugin-node node-one">
            <Icon name="code" size={20} />
          </div>
          <div className="plugin-node node-two">
            <Icon name="layers" size={20} />
          </div>
          <div className="plugin-node node-three">
            <Icon name="check" size={20} />
          </div>
          <div className="plugin-core">
            <Icon name="cube" size={59} />
          </div>
          <span className="plugin-caption">
            FLERE MULIGHEDER. SAMME VERDEN.
          </span>
        </div>
      ) : (
        <VoxelScene compact />
      )}
      <span className="art-label">
        {type === "script" ? ".SK" : type === "plugin" ? ".JAR" : "SERVERPAKKE"}
      </span>
    </div>
  );
}
