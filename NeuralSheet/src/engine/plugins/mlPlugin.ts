import { FunctionPlugin, FunctionArgumentType } from "hyperformula";

export class MLPlugin extends FunctionPlugin {

  mlPredict(ast, state) {
    // Pull the arguments HyperFormula parsed for us
    const args = ast.args.map((arg) => this.evaluateAst(arg, state));
    // Return placeholder — real result comes back async from Python
    return "⟳ Predicting...";
  }

  mlCluster(ast, state) {
    return "⟳ Clustering...";
  }

  mlForecast(ast, state) {
    return "⟳ Forecasting...";
  }

  mlTrain(ast, state) {
    return "⟳ Training...";
  }
}

// Tell HyperFormula which formula names map to which methods
MLPlugin.implementedFunctions = {
  "ML.PREDICT":  { method: "mlPredict" },
  "ML.CLUSTER":  { method: "mlCluster" },
  "ML.FORECAST": { method: "mlForecast" },
  "ML.TRAIN":    { method: "mlTrain" },
};