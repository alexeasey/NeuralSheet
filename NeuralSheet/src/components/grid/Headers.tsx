const COL_H = 24;
const ROW_W = 48;

export function ColumnHeaders({ virtualCols, selectedCol }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 30,
      height: COL_H,
      background: "#f8f9fa",
      borderBottom: "2px solid #dee2e6",
    }}>
      {/* Corner — sticky in both axes */}
      <div style={{
        position: "sticky", left: 0,
        display: "inline-block",
        width: ROW_W, height: COL_H,
        background: "#f8f9fa",
        borderRight: "1px solid #dee2e6",
        zIndex: 31,
        verticalAlign: "top",
      }} />

      {virtualCols.map(vCol => (
        <div key={vCol.index} style={{
          position: "absolute", top: 0,
          left: vCol.start + ROW_W,
          width: 120, height: COL_H,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: selectedCol === vCol.index ? 600 : 400,
          color: selectedCol === vCol.index ? "#1a73e8" : "#666",
          borderRight: "1px solid #dee2e6",
        }}>
          {String.fromCharCode(65 + vCol.index)}
        </div>
      ))}
    </div>
  );
}

export function RowHeader({ vRow, isSelected, canvasWidth }) {
  return (
    <div style={{
      position: "absolute",
      top: vRow.start + COL_H,
      left: 0,
      width: canvasWidth,
      height: 24,
      pointerEvents: "none",
    }}>
      <div style={{
        position: "sticky", left: 0,
        width: ROW_W, height: 24,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11,
        color: isSelected ? "#1a73e8" : "#888",
        background: "#f8f9fa",
        borderBottom: "1px solid #f0f0f0",
        borderRight: "1px solid #dee2e6",
        pointerEvents: "auto",
      }}>
        {vRow.index + 1}
      </div>
    </div>
  );
}
