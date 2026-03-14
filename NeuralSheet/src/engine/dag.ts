import { extractRefs, expandRange } from "../utils/cellAddress";

export class DependencyGraph {
  // dependsOn["B1"] = Set(["A1","C1"]) — B1's formula refs these
  private dependsOn = new Map();
  // dependents["A1"] = Set(["B1","D5"]) — changing A1 affects these
  private dependents = new Map();

  update(cellAddr, formula) {
    this.remove(cellAddr); // clear old edges first
    if (!formula.startsWith("=")) return;

    const refs = extractRefs(formula);
    const deps = new Set(
      refs.flatMap(ref =>
        ref.includes(":") ? expandRange(ref) : [ref.toUpperCase()]
      )
    );

    this.dependsOn.set(cellAddr, deps);
    deps.forEach(dep => {
      if (!this.dependents.has(dep))
        this.dependents.set(dep, new Set());
      this.dependents.get(dep).add(cellAddr);
    });
  }

  remove(cellAddr) {
    this.dependsOn.get(cellAddr)?.forEach(dep =>
      this.dependents.get(dep)?.delete(cellAddr)
    );
    this.dependsOn.delete(cellAddr);
  }

  // Which cells need re-evaluating when addr changes?
  getDirtySet(addr) {
    const dirty = new Set();
    const visit = (cell) => {
      this.dependents.get(cell)?.forEach(dep => {
        if (!dirty.has(dep)) { dirty.add(dep); visit(dep); }
      });
    };
    visit(addr);
    return this.topoSort([...dirty]);
  }

  topoSort(cells) {
    const visited = new Set<string>(); const result: string[] = [];
    const visit = (cell) => {
      if (visited.has(cell)) return; visited.add(cell);
      this.dependsOn.get(cell)?.forEach(dep => {
        if (cells.includes(dep)) visit(dep);
      });
      result.push(cell);
    };
    cells.forEach(visit); return result;
  }
}

export const dag = new DependencyGraph();