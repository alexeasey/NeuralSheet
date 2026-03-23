import { cellAddress } from "../../utils/cellAddress";
import { useStore } from "../../store";
import { useVirtualGrid } from "../../hooks/useVirtualGrid";
import { useKeyboard } from "../../hooks/useKeyboard";
import { ColumnHeaders, RowHeader } from "./Headers";
import { Cell } from "./Cell";
import { getCellValue } from "../../engine/evaluator";

const COL_H = 24;
const ROW_W = 48;

export default function Grid() {
  const { cells, selectedCell } = useStore();
  const { scrollRef, virtualRows, virtualCols, totalHeight, totalWidth } = useVirtualGrid();
  const { handleKeyDown } = useKeyboard();

  const canvasWidth = totalWidth + ROW_W;
  const canvasHeight = totalHeight + COL_H;

  return (
    <div ref={scrollRef} onKeyDown={handleKeyDown} tabIndex={0}
      style={{ flex: 1, overflow: "auto", outline: "none" }}>

      <div style={{ position: "relative", height: canvasHeight, width: canvasWidth }}>

        <ColumnHeaders virtualCols={virtualCols} selectedCol={selectedCell.col} />

        {virtualRows.map(vRow => (
          <RowHeader key={vRow.index} vRow={vRow}
            isSelected={selectedCell.row === vRow.index}
            canvasWidth={canvasWidth} />
        ))}

        {virtualRows.map(vRow =>
          virtualCols.map(vCol => {
            const col = vCol.index; const row = vRow.index;
            const addr = cellAddress(col, row);
            const raw = cells[addr]?.raw || "";
            return (
              <Cell key={addr} col={col} row={row}
                isSelected={selectedCell.col === col && selectedCell.row === row}
                rawValue={raw}
                displayValue={cells[addr]?.value != null ? String(cells[addr].value) : getCellValue(addr)}
                style={{ top: vRow.start + COL_H, left: vCol.start + ROW_W }}
              />
            );
          })
        )}

      </div>
    </div>
  );
}
