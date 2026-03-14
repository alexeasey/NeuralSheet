import { HyperFormula } from "hyperformula";
import { MLPlugin } from "./mlPlugin";
import { AgentPlugin } from "./agentPlugin";

export function registerAllPlugins() {
  HyperFormula.registerFunctionPlugin(MLPlugin, {
    enGB: {
      "ML.PREDICT":  "ML.PREDICT",
      "ML.CLUSTER":  "ML.CLUSTER",
      "ML.FORECAST": "ML.FORECAST",
      "ML.TRAIN":    "ML.TRAIN",
    },
  });

  HyperFormula.registerFunctionPlugin(AgentPlugin, {
    enGB: {
      "AGENT":         "AGENT",
      "AGENT.WATCH":   "AGENT.WATCH",
      "AGENT.EXPLAIN": "AGENT.EXPLAIN",
    },
  });

}