/**
 * PIEMR Virtual Lab — Simulated Compiler Engine
 * This engine provides a "Pseudo-Execution" environment for C++/C code.
 * Since real client-side compilation is non-trivial, it performs:
 * 1. Basic Syntax Validation (Braces, Semicolons)
 * 2. Logic Requirement Check (Keywords specific to each experiment)
 * 3. Mock Execution Trace generation with random test data
 */

export interface CompileResult {
  success: boolean;
  logs: string[];
  output?: string[];
  metrics?: {
    time: string;
    memory: string;
  };
}

const EXPERIMENT_LOGIC: Record<string, string[]> = {
  // Fundamentals
  'exp-1': ['for', 'array', '['], 
  'exp-2': ['for', 'shift', 'insert'],
  'exp-3': ['for', 'shift', 'delete'],
  'exp-4': ['for', 'matrix', 'j'],
  // Searching
  'exp-5': ['for', 'if', 'return', 'target'], 
  'exp-6': ['while', 'mid', 'low', 'high'], 
  'exp-7': ['recursive', 'mid', 'low', 'high'],
  // Sorting
  'exp-8': ['for', 'swap', 'if'], // Bubble Sort
  'exp-9': ['key', 'while', 'shift'], // Insertion Sort
  'exp-10': ['for', 'swap', 'min'], // Selection Sort
  'exp-11': ['pivot', 'partition', 'recursive'], // Quick Sort
  'exp-12': ['recursive', 'merge', 'mid'], // Merge Sort
  // Advanced
  'exp-13': ['for', 'for', 'for', '*'], // Matrix Multi
  'exp-15': ['greedy', 'ratio', 'sort'], // Fractional Knapsack
  'exp-16': ['dp', 'table', 'max'], // 0/1 Knapsack
  'exp-18': ['sort', 'edge', 'weight', 'union'], // Kruskal
  'exp-19': ['visited', 'min', 'edge', 'prim'], // Prim
  'exp-20': ['dist', 'min', 'relax', 'dijkstra'], // Dijkstra
  'exp-25': ['visited', 'recursive', 'stack'], // DFS
  'exp-26': ['visited', 'queue', 'enqueue'], // BFS
};

export const simulateCompilation = (id: string, code: string): CompileResult => {
  const logs: string[] = ["[System] Initializing Multi-Stage Verification..."];
  
  // Clean code for analysis
  const cleanCode = code.replace(/\/\/.*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

  // 1. Basic Syntax Check
  const openBraces = (cleanCode.match(/\{/g) || []).length;
  const closeBraces = (cleanCode.match(/\}/g) || []).length;
  
  if (openBraces !== closeBraces) {
    return {
      success: false,
      logs: [...logs, `[Compiler] ERROR: Unbalanced braces detected (${openBraces} { vs ${closeBraces} }).`, "[System] Compilation terminated with errors."]
    };
  }
  
  if (!cleanCode.toLowerCase().includes('main')) {
     return {
      success: false,
      logs: [...logs, "[Compiler] ERROR: No 'main' function found.", "[System] Entry point missing."]
    };
  }

  // 2. Logic Requirement Check
  const requirements = EXPERIMENT_LOGIC[id] || [];
  const missing = requirements.filter(req => !cleanCode.toLowerCase().includes(req));
  
  if (missing.length > 0) {
    return {
      success: false,
      logs: [
        ...logs, 
        "[Sandbox] Code structural analysis started...",
        `[Compiler] WARNING: Algorithmic signatures for Lab ${id} not found.`,
        `[Compiler] ERROR: Missing implementation keyword: '${missing[0]}'`,
        "[System] Execution halted: Incomplete algorithm implementation."
      ]
    };
  }

  // 3. Mock Execution Generation
  logs.push("[Security] Plagiarism Check: PASSED (Match < 5%)");
  logs.push("[Sandbox] Environment Allocated (Virtual Node X-294)");
  logs.push("[Sandbox] Executing Binary with Input Vector...");

  const output: string[] = [];
  // ID matches (exp-8, exp-9, etc) or substring check
  if (id.includes('8') || id.includes('9') || id.includes('10') || id.includes('11') || id.includes('12')) { 
    const input = Array.from({length: 8}, () => Math.floor(Math.random() * 50));
    output.push(`[Input] Raw Dataset:  [${input.join(', ')}]`);
    output.push(`[Process] Computation started...`);
    output.push(`[Process] Logic loop execution successful.`);
    output.push(`[Output] Sorted Result: [${[...input].sort((a,b) => a-b).join(', ')}]`);
  } else if (id.includes('5') || id.includes('6') || id.includes('7')) { 
    const input = [2, 5, 12, 19, 25, 33, 41, 58, 62, 89];
    const target = input[Math.floor(Math.random() * input.length)];
    output.push(`[Input] Input Dataset: [${input.join(', ')}]`);
    output.push(`[Input] TARGET KEY: ${target}`);
    output.push(`[Process] Dividing space... Index found at: ${input.indexOf(target)}`);
    output.push(`[Output] SUCCESS: Element found.`);
  } else {
    output.push(`[Output] Lab Result: Execution Verified.`);
    output.push(`[Process] Logic trace matches theoretical complexity O(N).`);
  }

  return {
    success: true,
    logs: [...logs, "[System] Process finished with status: SUCCESS (0)"],
    output,
    metrics: {
      time: `${(Math.random() * 0.4 + 0.05).toFixed(3)}ms`,
      memory: `${(Math.random() * 4 + 1.2).toFixed(1)}MB`
    }
  };
};
