import { useStore } from "../store";
import { cellAddress } from "../utils/cellAddress";

export function useKeyboard() {
  const store = useStore();

  const handleKeyDown = (e) => {
    const { editingCell, selectedCell } = store;

    // Let the Cell component handle keys while editing
    if (editingCell && e.key !== "Escape") return;

    const { col, row } = selectedCell;
    const address = cellAddress(col, row);

    if (e.key === "ArrowUp")    { e.preventDefault(); store.moveSelection("up"); }
    if (e.key === "ArrowDown")  { e.preventDefault(); store.moveSelection("down"); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); store.moveSelection("left"); }
    if (e.key === "ArrowRight") { e.preventDefault(); store.moveSelection("right"); }

    // Tab moves right, Shift+Tab moves left
    if (e.key === "Tab") {
      e.preventDefault();
      store.moveSelection(e.shiftKey ? "left" : "right");
    }

    // Enter starts edit on current cell
    if (e.key === "Enter" || e.key === "F2") {
      store.startEditing(col, row);
    }

    if (e.key === "Escape") store.stopEditing();

    if (e.key === "Delete" || e.key === "Backspace") {
      store.deleteCell(address);
    }

    // Any printable char starts edit mode
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      store.startEditing(col, row);
    }
  };

  return { handleKeyDown };
}