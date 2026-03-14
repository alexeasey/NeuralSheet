import { HyperFormula } from "hyperformula";
import { registerAllPlugins } from "./plugins";
import { parseAddress } from "../utils/cellAddress";

// Register all custom plugins
registerAllPlugins();

// Create one HyperFormula instance for the whole app
export const hf = HyperFormula.buildEmpty({
  licenseKey: "gpl-v3", // free for open source
});

// Register your sheet on startup
hf.addSheet("Sheet1");
export const sheetId = hf.getSheetId("Sheet1") as number;

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