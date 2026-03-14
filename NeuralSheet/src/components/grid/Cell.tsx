import { useEffect, useRef, useState } from "react";
import { useStore, useIsEditing} from "../../store";
import { cellAddress } from "../../utils/cellAddress";

export function Cell({ col, row, isSelected, rawValue, displayValue, style }) {
  const address = cellAddress(col, row);
  const isEditing = useIsEditing(col, row);
  const { selectCell, startEditing, setCellRaw, stopEditing, moveSelection } = useStore();
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditValue(rawValue);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isEditing, rawValue]);

  const commit = (value) => {
    setCellRaw(address, value);
    stopEditing();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter")  { commit(editValue); moveSelection("down"); }
    if (e.key === "Tab")    { e.preventDefault(); commit(editValue); moveSelection("right"); }
    if (e.key === "Escape") { commit(rawValue); }
  };

  return (
    <div onClick={() => selectCell(col, row)}
      onDoubleClick={() => startEditing(col, row)}
      style={{ position:"absolute", ...style, height:24, width:120,
        border:"1px solid #eee", background: isSelected ? "#e8f0fe" : "#fff" }}>
      {isEditing
        ? <input ref={inputRef} value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown} onBlur={() => commit(editValue)}
            style={{ width:"100%", height:"100%", border:"none", outline:"none" }} />
        : <span style={{ padding:"0 4px", lineHeight:"24px", fontSize:12 }}>
            {displayValue}
          </span>
      }
    </div>
  );
}