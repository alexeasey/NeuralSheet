import { create } from "zustand";
import type { CellMap, CellAddress } from "../types/cell";

interface StoreState {
    cells: CellMap;
    selectedCell: CellAddress;
    editingCell: CellAddress | null;
    setCellRaw: (address: string, raw: string) => void;
    selectCell: (col: number, row: number) => void;
    moveSlection: (dir: "up" | "down" | "left" | "right") => void;
}

export const useStore = create<StoreState>((set, get) => ({
    cells: {},
    selectedCell: {col : 0, row : 0},
    editingCell: null,

    setCellRaw: (address, raw) => {
        const type = raw.startsWith("=")
            ? raw.startsWith("=ML.") ? "ml"
            : raw.startsWith("=AGENT.") ? "agent"
            : "formula"
            : raw === "" ? "empty" : "scalar";

        set(state => ({
            cells: {
                ...state.cells,
                [address]: { raw, type, value: null }
            }
        }));
    },

    selectCell: (col, row) => 
        set({ selectedCell: { col, row }, editingCell: null }),


    moveSlection: (dir) => {
        const {col, row} = get().selectedCell;
        const moves = {
            up: { col, row: Math.max(0, row - 1) },
            down: { col, row: Math.min(999, row + 1) }, // Replace 100 with actual max row count
            left: { col: Math.max(0, col - 1), row },
            right: { col: Math.min(25, col + 1), row }
        };
        set({ selectedCell: moves[dir], editingCell: null });
    }
}))