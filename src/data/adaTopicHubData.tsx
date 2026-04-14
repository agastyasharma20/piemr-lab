import { Activity, GitBranch, Layers, Hash, Search, CheckCircle, Network } from 'lucide-react';

export const TOPIC_CONTENT: Record<string, any> = {
  // ==========================================
  // FUNDAMENTALS
  // ==========================================
  'intro': {
    title: 'Analysis Intro',
    desc: 'The mathematical foundation of efficiency analysis.',
    icon: Search,
    color: '#3b82f6',
    visualType: 'time_complexity_graph',
    properties: [
      { name: 'Space Complexity', desc: 'S(P) = C + S_p(I). Fixed + Variable memory.' },
      { name: 'Time Complexity', desc: 'T(P) = C + T_p(I). Compilation + Execution time.' }
    ],
    detailedTheory: 'Before writing any code, we mathematically analyze an algorithm to predict the resources it will require. A Priori Analysis measures theoretical bounds (independent of hardware), while A Posteriori measures actual execution time. We focus on Growth Rates.',
    algorithms: [
      { name: 'Linear Analysis', id: 'exp-1', desc: 'Basic 1D Iteration.' },
      { name: 'Matrix Analysis', id: 'exp-2', desc: '2D / 3D nested looping.' }
    ]
  },
  'asymptotic': {
    title: 'Asymptotic Notations',
    desc: 'Big O, Omega, and Theta bounds for formal analysis.',
    icon: Search,
    color: '#8b5cf6',
    visualType: 'asymptotic_bounds',
    properties: [
      { name: 'Big O [ O(g(n)) ]', desc: 'Strict upper bound. Describes worst-case limits.' },
      { name: 'Big Omega [ Ω(g(n)) ]', desc: 'Strict lower bound. Describes best-case minimums.' },
      { name: 'Big Theta [ Θ(g(n)) ]', desc: 'Tight bound. Average true growth rate.' }
    ],
    detailedTheory: 'Asymptotic notations provide a mathematical shorthand for identifying the growth trajectory of an algorithm. An algorithm bounded by O(N log N) will eventually always out-perform an O(N²) algorithm given a sufficiently large input N.',
    algorithms: [
      { name: 'Polynomial vs Log', id: 'exp-3', desc: 'Graphing different notations.' }
    ]
  },
  'recurrence': {
    title: 'Recurrence Relations',
    desc: 'Solving recursive patterns using Master Method or Substitution.',
    icon: GitBranch,
    color: '#ec4899',
    visualType: 'recurrence_tree',
    properties: [
      { name: 'Master Theorem', desc: 'T(n) = aT(n/b) + Θ(n^k) log^p(n).' },
      { name: 'Recursion Tree', desc: 'Summing costs at each depth level.' }
    ],
    detailedTheory: 'When algorithms break problems into sub-problems recursively, calculating complexity requires solving recurrence relations. The Master Theorem provides a rapid short-cut for checking if the branching factor overpowers the division factor.',
    algorithms: [
      { name: 'Recursion Logic', id: 'exp-7', desc: 'Stack-based execution tracing.' }
    ]
  },

  // ==========================================
  // DIVIDE & CONQUER
  // ==========================================
  'divide-conquer/intro': {
    title: 'Divide & Conquer',
    desc: 'Breaking problems into sub-problems, solving recursively, and merging.',
    icon: Network,
    color: '#0ea5e9',
    visualType: 'divide_conquer_flow',
    properties: [
      { name: 'Divide Phase', desc: 'Breaking problem size N into N/2 chunks.' },
      { name: 'Conquer Phase', desc: 'Recursively solving the chunks when small enough.' }
    ],
    detailedTheory: 'Divide and Conquer algorithms recursively break down a problem into sub-problems of the same or related type, until these become simple enough to be solved directly. It powers many high-efficiency algorithms guaranteeing O(N log N).',
    algorithms: [
      { name: 'Strassen\'s Matrix', id: 'exp-14', desc: 'Sub-cubic matrix math O(N^2.81).' }
    ]
  },
  'divide-conquer/binary-search': {
    title: 'Binary Search',
    desc: 'Logarithmic search space elimination.',
    icon: Network,
    color: '#0ea5e9',
    visualType: 'binary_search_visual',
    properties: [
      { name: 'T(n) = T(n/2) + O(1)', desc: 'Recurrence relation equation.' },
      { name: 'O(log N)', desc: 'Worst case time complexity.' }
    ],
    detailedTheory: 'Requires a sorted array. At each step, it compares the target with the middle element, effectively discarding half of the remaining search space. This achieves unparalleled efficiency for search operations.',
    algorithms: [
      { name: 'Binary Search', id: 'exp-6', desc: 'Iterative / Recursive execution.' }
    ]
  },
  'divide-conquer/merge-sort': {
    title: 'Merge Sort',
    desc: 'Strictly stable recursive sorting strategy.',
    icon: Network,
    color: '#0284c7',
    visualType: 'merge_sort_visual',
    properties: [
      { name: 'T(n) = 2T(n/2) + O(n)', desc: 'Recurrence relation with linear merge time.' },
      { name: 'Always O(N log N)', desc: 'Consistent regardless of initial distribution.' }
    ],
    detailedTheory: 'Merge Sort divides the array into halves until isolated elements remain. The real magic happens in the Merge Step, where sorted subarrays are woven together linearly. It requires O(N) secondary space but guarantees stable sorting.',
    algorithms: [
      { name: 'Merge Sort', id: 'exp-12', desc: 'Divide and Merge tracing.' }
    ]
  },
  'divide-conquer/quick-sort': {
    title: 'Quick Sort',
    desc: 'High-performance Pivot-based partitioning.',
    icon: Network,
    color: '#0369a1',
    visualType: 'quick_sort_visual',
    properties: [
      { name: 'T(n) = T(k) + T(n-k-1) + O(n)', desc: 'Pivot-dependent recurrence.' },
      { name: 'Worst Case O(N²)', desc: 'Occurs if pivot is always the smallest/largest.' }
    ],
    detailedTheory: 'Unlike Merge Sort, Quick Sort does the heavy lifting strictly during the Divide phase (Partitioning). By choosing a Pivot and placing smaller items to the left and larger to the right, it sorts in-place. If randomized pivots are used, average complexity is O(N log N).',
    algorithms: [
      { name: 'Quick Sort', id: 'exp-11', desc: 'Hoare & Lomuto Partition schemes.' }
    ]
  },

  // ==========================================
  // SEARCHING & SORTING
  // ==========================================
  'searching': {
    title: 'Searching Logic',
    desc: 'Iterative vs Tree-based traversal for data discovery.',
    icon: Hash,
    color: '#8b5cf6',
    visualType: 'search_array_visual',
    properties: [
      { name: 'Linear Scans', desc: 'Checking items one-by-one linearly O(N).' },
      { name: 'Hashing', desc: 'Mapping keys to buckets for O(1) lookups.' }
    ],
    detailedTheory: 'Finding components inside large datasets dictates database performance. Naive searches use sequential iteration, while advanced implementations rely on Hash Maps or B-Trees to guarantee logarithmic or constant time access.',
    algorithms: [
      { name: 'Linear Search', id: 'exp-5', desc: 'Standard sequential search.' }
    ]
  },
  'sorting': {
    title: 'Sorting Logic',
    desc: 'Rearranging elements based on distinct heuristic comparators.',
    icon: Hash,
    color: '#7c3aed',
    visualType: 'bubble_sort_visual',
    properties: [
      { name: 'In-Place Sorting', desc: 'Only requires O(1) auxiliary variables.' },
      { name: 'Stability', desc: 'Preserves original relative order of duplicate keys.' }
    ],
    detailedTheory: 'Simple primitive sorts (Bubble, Insertion, Selection) are commonly O(N²) but offer low setup overhead and can be very fast on small or nearly sorted datasets. Heap sort provides O(N log N) without requiring extra memory.',
    algorithms: [
      { name: 'Bubble Sort', id: 'exp-8', desc: 'Swapping adjacent pairs.' },
      { name: 'Insertion Sort', id: 'exp-9', desc: 'Sub-array sorted growth.' },
      { name: 'Selection Sort', id: 'exp-10', desc: 'Finding minimum and swapping.' }
    ]
  },
  'comparison': {
    title: 'Complexity Table',
    desc: 'Side-by-side matrices comparing Time vs Space tradeoffs.',
    icon: CheckCircle,
    color: '#6d28d9',
    visualType: 'complexity_matrix',
    properties: [
      { name: 'Time vs Space', desc: 'Tradeoff evaluation.' },
      { name: 'Best vs Worst', desc: 'Understanding situational dominance.' }
    ],
    detailedTheory: 'No single sorting algorithm dominates every scenario. Timsort (used in Python/Java) combines Merge and Insertion logic. Knowing when an O(N²) algorithm is preferred over an O(N log N) algorithm is true engineering.',
    algorithms: [
      { name: 'Heap Sort', id: 'exp-11', desc: 'Binary heap based selection logic.' }
    ]
  },

  // ==========================================
  // GREEDY STRATEGY
  // ==========================================
  'greedy/intro': {
    title: 'Optimization Basics',
    desc: 'Local optimum choices aiming for global optimums.',
    icon: GitBranch,
    color: '#10b981',
    visualType: 'greedy_intro_visual',
    properties: [
      { name: 'Greedy Choice Property', desc: 'Global optimum is reached via local optimums.' },
      { name: 'Optimal Substructure', desc: 'An optimal solution contains optimal sub-solutions.' }
    ],
    detailedTheory: 'Greedy algorithms do not reconsider their choices. They simply look at the current state, grab the best immediate Option, and move forward. This makes them extremely fast but they do not always find the absolute best answer for all problems.',
    algorithms: [
      { name: 'Coin Change (Greedy)', id: 'exp-99', desc: 'Minimum coins logic.' }
    ]
  },
  'greedy/huffman': {
    title: 'Huffman Coding',
    desc: 'Lossless prefix-based variable-length compression.',
    icon: GitBranch,
    color: '#059669',
    visualType: 'huffman_tree',
    properties: [
      { name: 'Prefix Rule', desc: 'No code is a prefix of another code.' },
      { name: 'Min-Heap Parsing', desc: 'Generating tree weights using priority queues.' }
    ],
    detailedTheory: 'Huffman encoding dramatically reduces string size by identifying character frequencies. It assigns highly frequent characters a small 1-bit or 2-bit code, and rare characters a longer bit sequence. Decompression runs flawlessly via the Prefix rule tree.',
    algorithms: [
      { name: 'Huffman Coding', id: 'exp-17', desc: 'Optimal prefix codes generation.' }
    ]
  },
  'greedy/mst': {
    title: 'Minimum Spanning Trees',
    desc: 'Connecting all vertices with minimal total edge weight.',
    icon: GitBranch,
    color: '#047857',
    visualType: 'mst_visual',
    properties: [
      { name: 'Kruskal\'s Algorithm', desc: 'Sort edge weights globally, union disjoint sets.' },
      { name: 'Prim\'s Algorithm', desc: 'Grow a tree vertex by vertex picking lowest edges.' }
    ],
    detailedTheory: 'Used heavily in network layout and circuit board printing. A spanning tree connects every node in a graph without any cycles. A Minimum Spanning Tree (MST) ensures the combined edge weight is the lowest possible out of all spanning structures.',
    algorithms: [
      { name: 'Kruskal\'s MST', id: 'exp-18', desc: 'Edge-based tree builder.' },
      { name: 'Prim\'s MST', id: 'exp-19', desc: 'Vertex-centric tree builder.' }
    ]
  },
  'greedy/shortest-path': {
    title: 'Dijkstra Logic',
    desc: 'Single Source Shortest Path calculations.',
    icon: GitBranch,
    color: '#065f46',
    visualType: 'dijkstra_visual',
    properties: [
      { name: 'Relaxation', desc: 'if(d[u] + w < d[v]) then update d[v]' },
      { name: 'Limitation', desc: 'Fails with negative weight edges.' }
    ],
    detailedTheory: 'Dijkstra uses a Greedy strategy to continuously pick the closest unvisited node, expanding its territory outwards like a ripple. It is foundational for GPS routing systems and IP routing protocols.',
    algorithms: [
      { name: 'Dijkstra SSSP', id: 'exp-20', desc: 'Shortest path node tracking.' }
    ]
  },
  'greedy/knapsack': {
    title: 'Fractional Knapsack',
    desc: 'Maximize value continuously with divisible items.',
    icon: GitBranch,
    color: '#34d399',
    visualType: 'fractional_knapsack_visual',
    properties: [
      { name: 'Profit / Weight Ratio', desc: 'The defining Greedy heuristic.' },
      { name: 'O(N log N) Complexity', desc: 'Restricted purely by the sorting step.' }
    ],
    detailedTheory: 'Unlike the 0/1 variant where you either take an item or leave it, the Fractional Knapsack allows taking portions of an item (like gold dust). By sorting items based strictly on their density (value-to-weight ratio), the greedy strategy guarantees an optimal profit.',
    algorithms: [
      { name: 'Fractional Knapsack', id: 'exp-15', desc: 'Maximize value density.' }
    ]
  },

  // ==========================================
  // DYNAMIC PROGRAMMING
  // ==========================================
  'dp/knapsack': {
    title: '0/1 Knapsack',
    desc: 'Binary selection optimization using tabular state memory.',
    icon: Layers,
    color: '#f59e0b',
    visualType: 'dp_knapsack_visual',
    properties: [
      { name: 'State Equation', desc: 'V[i,w] = max( V[i-1,w], v_i + V[i-1, w-w_i] )' },
      { name: 'Top-Down vs Bottom-Up', desc: 'Memoized Depth-First vs Tabular filling.' }
    ],
    detailedTheory: 'Unlike fractional, the 0/1 problem forbids breaking items. A purely Greedy choice (Value/Weight) fails here. We must use Dynamic Programming to track all possible optimal sub-combinations of Weights up to the Knapsack capacity, caching them to avoid redundant overlap tracking.',
    algorithms: [
      { name: '0/1 Knapsack', id: 'exp-16', desc: 'Table and Sets logic.' }
    ]
  },
  'dp/multistage': {
    title: 'Multistage Graphs',
    desc: 'Finding shortest path in explicitly layered directed acyclic graphs.',
    icon: Layers,
    color: '#d97706',
    visualType: 'dp_multistage_visual',
    properties: [
      { name: 'Forward Method', desc: 'Cost calculated from Vertex i to Sink.' },
      { name: 'Backward Method', desc: 'Cost calculated from Source to Vertex j.' }
    ],
    detailedTheory: 'A multistage graph splits nodes into distinct hierarchical stages. DP solves this by working backwards from the sink to the source (or forward from source), establishing the minimum cost at each stage boundary without evaluating every combination.',
    algorithms: [
      { name: 'Multistage Graph', id: 'exp-22', desc: 'Forward vs Backward models.' }
    ]
  },
  'dp/floyd': {
    title: 'Floyd-Warshall',
    desc: 'All-Pairs Shortest Path (APSP) using intermediate node checks.',
    icon: Layers,
    color: '#b45309',
    visualType: 'dp_floyd_visual',
    properties: [
      { name: 'Negative Cycles', desc: 'Capable of detecting (but not solving) negative cycles.' },
      { name: 'O(V³) Complexity', desc: 'Three nested loops checking intermediate nodes.' }
    ],
    detailedTheory: 'Will using node `k` as an intermediate bridge between node `i` and `j` provide a shorter route? Floyd-Warshall checks this iteratively for all V vertices, steadily updating a 2D matrix until it contains the shortest path from every node to every other node.',
    algorithms: [
      { name: 'Floyd-Warshall', id: 'exp-14', desc: 'All-pairs shortest path matrix.' }
    ]
  },
  'dp/reliability': {
    title: 'Reliability Design',
    desc: 'Maximizing system reliability across multiple operational stages.',
    icon: Layers,
    color: '#fbbf24',
    visualType: 'dp_reliability_visual',
    properties: [
      { name: 'System Survival', desc: 'R = 1 - (1 - r_i)^m_i' },
      { name: 'Cost Boundary', desc: 'Budget restrictions limit duplicate backups.' }
    ],
    detailedTheory: 'In aerospace / mission-critical systems, placing duplicate components (like multiple identical sensors) increases system reliability but increases cost. DP is used to maximize total reliability strictly within a fixed financial budget boundary.',
    algorithms: [
      { name: 'Reliability Design', id: 'exp-98', desc: 'Budget-constrained maximization.' }
    ]
  },

  // ==========================================
  // BACKTRACKING & B&B
  // ==========================================
  'backtracking': {
    title: 'Backtracking Logic',
    desc: 'Depth-first search traversing state spaces with validation pruning.',
    icon: Activity,
    color: '#ef4444',
    visualType: 'backtracking_intro_visual',
    properties: [
      { name: 'Constraint Functions', desc: 'Checking validity before stepping forward.' },
      { name: 'State-Space Tree', desc: 'The implicit tree of all possible choices.' }
    ],
    detailedTheory: 'Backtracking incrementally builds candidates for a solution. As soon as it determines a candidate cannot yield a valid output, it aborts ("backtracks" up the tree), saving massive computational time compared to Brute Force.',
    algorithms: [
      { name: 'Graph Coloring', id: 'exp-97', desc: 'M-coloring validation.' }
    ]
  },
  '8-queens': {
    title: '8-Queens Problem',
    desc: 'Positioning N queens safely on an NxN board.',
    icon: Activity,
    color: '#dc2626',
    visualType: 'nqueens_visual',
    properties: [
      { name: 'Diagonal Check', desc: 'abs(col[i] - col[k]) == abs(i - k).' },
      { name: 'O(N!) Worst Case', desc: 'Exhaustive permutation without pruning.' }
    ],
    detailedTheory: 'Placing 8 Queens such that none attack each other. By placing one queen per row and checking column/diagonal safety, Backtracking cuts the 64! possibilities down to just examining a small subset of legitimate trees.',
    algorithms: [
      { name: '8-Queens Solution', id: 'exp-24', desc: 'Safety constraints array.' }
    ]
  },
  'hamiltonian': {
    title: 'Hamiltonian Cycle',
    desc: 'Finding a continuous path visiting every vertex exactly once.',
    icon: Activity,
    color: '#b91c1c',
    visualType: 'hamiltonian_visual',
    properties: [
      { name: 'NP-Complete Edge', desc: 'No known polynomial time exact solution.' },
      { name: 'Cycle Validation', desc: 'Last node must connect back to the start.' }
    ],
    detailedTheory: 'A standard Backtracking task. We grow a path array, ensuring the next node is adjacent to the current and not already visited. If we hit a dead end before V nodes, we backtrack.',
    algorithms: [
      { name: 'Hamiltonian Cycle', id: 'exp-25', desc: 'Recursive state tracking.' }
    ]
  },
  'branch-bound': {
    title: 'Branch & Bound',
    desc: 'Aggressive tree pruning using calculated upper/lower heuristics.',
    icon: Activity,
    color: '#991b1b',
    visualType: 'branch_bound_visual',
    properties: [
      { name: 'Lower Bound (Cost)', desc: 'Optimistic minimum cost threshold.' },
      { name: 'Upper Bound (Record)', desc: 'Current best full-solution cost.' }
    ],
    detailedTheory: 'Used for Optimization problems (unlike Backtracking which is used for Decision/Search problems). B&B explores the state space using BFS or Least-Cost search, discarding branches whose optimistic Lower Bound is already worse than our Upper Bound benchmark.',
    algorithms: [
      { name: 'TSP (B&B)', id: 'exp-20', desc: 'Traveling Salesperson optimal traversal.' }
    ]
  },

  // ==========================================
  // ADVANCED STRUCTURES
  // ==========================================
  'trees': {
    title: 'AVL Trees',
    desc: 'Self-balancing binary search tree dynamics.',
    icon: GitBranch,
    color: '#ec4899',
    visualType: 'avl_tree_visual',
    properties: [
      { name: 'Balance Factor', desc: 'Height(Left) - Height(Right) must be {-1, 0, 1}.' },
      { name: 'Rotations', desc: 'LL, RR, LR, RL structural shifts to fix imbalances.' }
    ],
    detailedTheory: 'A standard Binary Search Tree can degrade to O(N) if elements are inserted sorted. AVL injects strict structural rules to guarantee the height never exceeds Log2(N). It actively "rotates" subsets during insertion to preserve absolute symmetry.',
    algorithms: [
      { name: 'AVL Operations', id: 'exp-24', desc: 'Rotation algorithms.' }
    ]
  },
  'traversals': {
    title: 'Graph Traversals',
    desc: 'Exploration patterns using Stack vs Queue logic.',
    icon: GitBranch,
    color: '#db2777',
    visualType: 'graph_traversal_visual',
    properties: [
      { name: 'BFS (Queue)', desc: 'Level-by-level, shortest path in unweighted graphs.' },
      { name: 'DFS (Stack)', desc: 'Depth-first, good for maze solving and cycle mapping.' }
    ],
    detailedTheory: 'Graphs can be cyclic and disconnected. Traversals must maintain a "Visited" array to prevent infinite loops. These exploration tools are the foundation for topological sorting, connectivity checks, and web crawling.',
    algorithms: [
      { name: 'DFS & BFS', id: 'exp-25', desc: 'Searching topological states.' }
    ]
  },
  'graph-rep': {
    title: 'Graph Representational Matrix',
    desc: 'Adjacency Matrix vs Adjacency List tradeoffs.',
    icon: GitBranch,
    color: '#be185d',
    visualType: 'graph_rep_visual',
    properties: [
      { name: 'Adjacency Matrix', desc: 'O(V²) space. O(1) edge lookup.' },
      { name: 'Adjacency List', desc: 'O(V+E) space. Slower edge lookup but highly compact.' }
    ],
    detailedTheory: 'Dense graphs (many edges) perform beautifully in Matrices. Sparse graphs (millions of users, few connections like a social network map) demand Adjacency Lists to prevent massive memory exhaustion.',
    algorithms: [
      { name: 'Structure Modeling', id: 'exp-23', desc: 'Graph memory allocation.' }
    ]
  },
  'npc': {
    title: 'P vs NP Theory',
    desc: 'The limits of modern algorithmic computation.',
    icon: GitBranch,
    color: '#9d174d',
    visualType: 'np_theory_visual',
    properties: [
      { name: 'P (Polynomial Time)', desc: 'Solvable in rapid timeline (Sorting, MST).' },
      { name: 'NP-Complete', desc: 'Verified rapidly, but no known rapid solution.' }
    ],
    detailedTheory: 'Are all NP problems P problems? That is the million-dollar math question. NP-Complete problems like TSP, Graph Coloring, and Knapsack can currently only be solved optimally by brute-forcing exponential boundaries.',
    algorithms: [
      { name: 'Reduction Proofs', id: 'exp-96', desc: 'Mapping one NP problem to another.' }
    ]
  }
};
