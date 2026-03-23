import { cellAddress } from '../utils/cellAddress';
import { useStore, useSelectedCell } from '../store/index';

function FormulaBar() {
  const selectedCell = useSelectedCell();
  const addr = cellAddress(selectedCell.col, selectedCell.row);
  const cellRaw = useStore(state => state.cells[addr]?.raw ?? "");
  const setCellRaw = useStore(state => state.setCellRaw);

  return (
    <div className="formula-bar">
      <input
        type="text"
        placeholder="Enter formula here..."
        style={{ width: "100%" }}
        value={cellRaw}
        onChange={e => setCellRaw(addr, e.target.value)}
      />
    </div>
  );
}

export default FormulaBar;