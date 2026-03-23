import type { HyperFormula } from "hyperformula";

let _hf: HyperFormula | null = null;
let _sheetId: number = 0;
let _onResolve: ((address: string, value: string) => void) | null = null;

export function initAsyncResolver(hf: HyperFormula, sheetId: number) {
  _hf = hf;
  _sheetId = sheetId;
}

// Store calls this once to wire up re-render on async result
export function setOnResolve(cb: (address: string, value: string) => void) {
  _onResolve = cb;
}

export function resolveAsyncCell(col: number, row: number, value: string) {
  _hf?.setCellContents({ sheet: _sheetId, col, row }, [[value]]);
  // Notify store so the grid re-renders
  const address = String.fromCharCode(65 + col) + (row + 1);
  _onResolve?.(address, value);
}
