// 0 -> "A", 25 -> "Z"
export const colLetter = (col) => 
    String.fromCharCode(65 + col);

// (0, 0) -> "A1", (2,4) -> "C5"
export const cellAddress = (col, row) => 
    `${colLetter(col)}${row + 1}`;

// "A1" -> {col: 0, row: 0}, "C5" -> {col: 2, row: 4}
export const parseAddress = (addr) => {
    const match = addr.match(/^([A-Z]+)(\d+)$/i);
    return {
        col: match[1].toUpperCase().charCodeAt(0) - 65,
        row: parseInt(match[2]) - 1,
    };
};

// "A1:C3" -> ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
export const expandRange = (range) => {
    const [start, end] = range.split(":").map(parseAddress);
    const addrs: string[] = [];
    for (let r = start.row; r <= end.row; r++)
        for (let c = start.col; c <= end.col; c++) 
            addrs.push(cellAddress(c, r));
    return addrs;
};