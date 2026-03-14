import { FunctionPlugin } from "hyperformula";

export class AgentPlugin extends FunctionPlugin {

  agent(ast, state) {
    return "⟳ Agent thinking...";
  }

  agentWatch(ast, state) {
    return "⟳ Watching...";
  }

  agentExplain(ast, state) {
    return "⟳ Explaining...";
  }
}

AgentPlugin.implementedFunctions = {
  "AGENT":         { method: "agent" },
  "AGENT.WATCH":   { method: "agentWatch" },
  "AGENT.EXPLAIN": { method: "agentExplain" },
};