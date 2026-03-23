import { FunctionPlugin, FunctionArgumentType } from "hyperformula";

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
  "AGENT":         { method: "agent",        repeatLastArgs: 1, parameters: [{ argumentType: FunctionArgumentType.ANY, optionalArg: true }] },
  "AGENT.WATCH":   { method: "agentWatch",   repeatLastArgs: 1, parameters: [{ argumentType: FunctionArgumentType.ANY, optionalArg: true }] },
  "AGENT.EXPLAIN": { method: "agentExplain", repeatLastArgs: 1, parameters: [{ argumentType: FunctionArgumentType.ANY, optionalArg: true }] },
};