export type CellType = 
    | "scalar" //Plain number or text
    | "formula" //Cell containing a formula
    | "ml" //Machine learning model output
    | "agent" //Agent-generated content
    | "Uncertain" //Content with uncertain value
    | "empty"; //Empty cell

export interface CellData {
    raw: string; //What the user entered
    type: CellType;
    value: string | number | null; //The computed value of the cell
    error?: string; // Error message
}

export interface CellAddress {
    col : number; // Column index A-Z (0= A)
    row : number; // Row index (0-based)
}

//The full cell map - key is "A1", "B2", etc.
export type CellMap = Record<string, CellData>;