import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export function useVirtualGrid() {
  const scrollRef = useRef(null);

  // Vertical virtualiser — one entry per row
  const rowVirtualizer = useVirtualizer({
    count: 1000,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 24,  // row height in px
    overscan: 10,            // extra rows beyond visible area
  });

  // Horizontal virtualiser — one entry per column
  const colVirtualizer = useVirtualizer({
    count: 26,
    horizontal: true,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 120, // col width in px
    overscan: 3,
  });

  return {
    scrollRef,
    virtualRows: rowVirtualizer.getVirtualItems(),
    virtualCols: colVirtualizer.getVirtualItems(),
    totalHeight: rowVirtualizer.getTotalSize(),
    totalWidth:  colVirtualizer.getTotalSize(),
  };
}