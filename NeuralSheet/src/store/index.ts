import { create } from "zustand";
import type { CellMap, CellAddress } from "../types/cell";
import { syncCell } from "../engine/evaluator";

interface StoreState {
    cells: CellMap;
    selectedCell: CellAddress;
    editingCell: CellAddress | null;
    setCellRaw: (address: string, raw: string) => void;
    deleteCell: (address: string) => void;
    selectCell: (col: number, row: number) => void;
    startEditing: (col: number, row: number) => void;
    stopEditing: () => void;
    moveSelection: (dir: "up" | "down" | "left" | "right") => void;
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

        syncCell(address, raw);
    },

    deleteCell: (address) =>
        set(state => {
            const next = { ...state.cells };
            delete next[address];
            return { cells: next };
    }),

    selectCell: (col, row) => 
        set({ selectedCell: { col, row }, editingCell: null }),

    startEditing: (col, row) =>
        set({ editingCell: { col, row }, selectedCell: { col, row } }),

    stopEditing: () =>
        set({ editingCell: null }),

    moveSelection: (dir) => {
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

export const useIsEditing = (col: number, row: number) =>
    useStore(state => 
        state.editingCell?.col === col && state.editingCell?.row === row
    );

export const useSelectedCell = () =>
    useStore(state => state.selectedCell);

export const useCell = (address: string) =>
    useStore(state => state.cells[address]);