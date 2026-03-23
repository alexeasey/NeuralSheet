import { FunctionPlugin, FunctionArgumentType } from "hyperformula";
import { invoke } from "@tauri-apps/api/core";
import { resolveAsyncCell } from "../asyncCellResolver";

export class MLPlugin extends FunctionPlugin {

  mlPredict(ast: any, state: any) {
    const args = ast.args.map((arg) => this.evaluateAst(arg, state));
    const { col, row } = state.formulaAddress;
    const result = "⟳ Predicting...";

    // Fire async, write result back when done
    invoke<string>("ml_predict", { result }).then(result => {
      resolveAsyncCell(col, row, result);
    });

    return result;
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
  "ML.PREDICT":  { method: "mlPredict",  repeatLastArgs: 1, parameters: [{ argumentType: FunctionArgumentType.ANY, optionalArg: true }] },
  "ML.CLUSTER":  { method: "mlCluster",  repeatLastArgs: 1, parameters: [{ argumentType: FunctionArgumentType.ANY, optionalArg: true }] },
  "ML.FORECAST": { method: "mlForecast", repeatLastArgs: 1, parameters: [{ argumentType: FunctionArgumentType.ANY, optionalArg: true }] },
  "ML.TRAIN":    { method: "mlTrain",    repeatLastArgs: 1, parameters: [{ argumentType: FunctionArgumentType.ANY, optionalArg: true }] },
};