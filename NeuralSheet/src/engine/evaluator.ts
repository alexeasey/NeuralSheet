import { HyperFormula } from "hyperformula";
import { registerAllPlugins } from "./plugins";
import { parseAddress } from "../utils/cellAddress";
import { initAsyncResolver } from "./asyncCellResolver";

// Register all custom plugins
try {
  registerAllPlugins();
} catch (e) {
  console.error("[NeuralSheet] Plugin registration failed:", e);
}

// Create one HyperFormula instance for the whole app
export const hf = HyperFormula.buildEmpty({
  licenseKey: "gpl-v3", // free for open source
});

// Debug: log registered functions
console.log("[NeuralSheet] Registered functions:", hf.getRegisteredFunctionNames().filter((f: string) => f.startsWith("ML") || f.startsWith("AGENT")));

// Register your sheet on startup
hf.addSheet("Sheet1");
export const sheetId = hf.getSheetId("Sheet1") as number;
initAsyncResolver(hf, sheetId);

// Call this every time a cell changes
export function syncCell(address: string, raw: string) {
  const { col, row } = parseAddress(address);
  hf.setCellContents(
    { sheet: sheetId, col, row },
    [[raw]]
  );
}

// Call this to get the display value for any cell
export function getCellValue(address: string): string {
  const { col, row } = parseAddress(address);
  const result = hf.getCellValue({ sheet: sheetId, col, row });

  if (result === null || result === undefined) return "";
  if (result instanceof Error) return result.message; // #REF!, #DIV/0! etc
  return String(result);
}

