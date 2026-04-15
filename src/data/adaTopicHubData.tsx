import { Activity, GitBranch, Layers, Hash, Search, CheckCircle, Network } from 'lucide-react';

export interface TopicData {
  title: string;
  desc: string;
  icon: any;
  color: string;
  visualType: string;
  formula?: string;
  formulaDesc?: string;
  keyFacts: string[];
  properties: { name: string; desc: string }[];
  detailedTheory: string;
  proofPoints?: string[];
  interviewQs: string[];
  references: { label: string; url: string }[];
  algorithms: { name: string; id: string; desc: string; complexity?: string }[];
  videoId?: string;       // Gate Smashers YouTube video ID
  videoTitle?: string;    // Display title for PiP widget
  quiz?: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
}

export const TOPIC_CONTENT: Record<string, TopicData> = {

  // ==========================================
  // FUNDAMENTALS
  // ==========================================
  'intro': {
    title: 'Analysis Intro',
    desc: 'Understanding how and why we mathematically measure algorithm efficiency.',
    icon: Search, color: '#3b82f6', visualType: 'time_complexity_graph',
    videoId: 'AT14lCXuMKI', videoTitle: 'Introduction to Algorithm Analysis | DAA | Gate Smashers',
    formula: 'T(P) = C + T_p(I)',
    formulaDesc: 'Total Time = Compilation Time + Execution Time (Instance Specific)',
    keyFacts: ['A Priori: theoretical bounds before execution', 'A Posteriori: measured actual runtime', 'Growth rate is hardware-independent', 'Focus is on Input Size N, not constants'],
    properties: [
      { name: 'Space Complexity S(P)', desc: 'S(P) = C + Sp(I). Fixed portion C covers instructions; Variable Sp depends on input size.' },
      { name: 'Time Complexity T(P)', desc: 'T(P) = C + Tp(I). Compilation cost C is constant; execution Tp varies with instance.' }
    ],
    detailedTheory: 'Before a single line of code runs, we mathematically analyse its resource requirements. A Priori Analysis yields theoretical upper/lower bounds independent of hardware. We strip away constant factors and focus purely on how execution time or memory grows as input N increases toward infinity. This is the mathematical backbone of software engineering.',
    proofPoints: [
      'For any two algorithms A and B, if T_A(N) = O(N log N) and T_B(N) = O(N²), then ∃ N₀ such that ∀ N > N₀, A outperforms B.',
      'Proof by induction: If loop runs N times with O(1) body → total T(N) = O(N).'
    ],
    interviewQs: ['What is the difference between A Priori and A Posteriori analysis?', 'Why do we ignore constants in Big-O notation?', 'What is the role of input size N in complexity analysis?'],
    references: [
      { label: 'GeeksforGeeks: Analysis of Algorithms', url: 'https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/' },
      { label: 'MIT OpenCourseWare: Intro to Algorithms', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/' },
      { label: 'Khan Academy: Asymptotic Notation', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation' }
    ],
    algorithms: [
      { name: '1D Array Operations', id: 'exp-1', desc: 'Linear iteration and access patterns.', complexity: 'O(N)' },
      { name: 'Matrix Operations', id: 'exp-4', desc: '2D nested loops and matrix math.', complexity: 'O(N²)' }
    ],
    quiz: [
      {
        question: "Which type of analysis is independent of hardware and compiler?",
        options: ["A Posteriori", "A Priori", "Benchmarking", "System Testing"],
        answer: 1,
        explanation: "A Priori analysis is theoretical and focuses on growth rate (O-notation), making it machine-independent."
      },
      {
        question: "In most algorithms, which component dominates the growth rate?",
        options: ["Initialization", "Constant terms", "Input size (N)", "System overhead"],
        answer: 2,
        explanation: "The input size N is the primary factor that determines how an algorithm scales at infinity."
      }
    ]
  },

  'asymptotic': {
    title: 'Asymptotic Notations',
    desc: 'Big O, Omega, and Theta: formal mathematical tools for bounding algorithm growth.',
    icon: Search, color: '#8b5cf6', visualType: 'asymptotic_bounds',
    videoId: 'A03oI0znAoc', videoTitle: 'Asymptotic Notations Big O Omega Theta | Gate Smashers',
    formula: 'f(n) = O(g(n)) ⟺ ∃ c,n₀ > 0: f(n) ≤ c·g(n) ∀ n ≥ n₀',
    formulaDesc: 'Big O Definition: f(n) is bounded above by c·g(n) for all sufficiently large n',
    keyFacts: ['O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)', 'Big O ignores lower order terms and constant multiples', 'Theta requires both upper AND lower bounds', 'Little-o is strictly less than; little-omega strictly greater'],
    properties: [
      { name: 'Big O  [ O(g(n)) ]', desc: 'Upper bound. f(n) = O(g(n)) means f grows no faster than g. Worst-case guarantee.' },
      { name: 'Big Omega [ Ω(g(n)) ]', desc: 'Lower bound. f(n) = Ω(g(n)) means f grows at least as fast as g. Best-case baseline.' },
      { name: 'Big Theta [ Θ(g(n)) ]', desc: 'Tight bound. f(n) = Θ(g(n)) when f = O(g) AND f = Ω(g). Exact growth rate.' },
      { name: 'Little o / Little ω', desc: 'Strict (non-tight) bounds. f = o(g) means f grows strictly slower; f = ω(g) strictly faster.' }
    ],
    detailedTheory: 'Asymptotic notation is the language of algorithm analysis. Rather than saying "this sorts 1000 items in 2ms", we say it runs in O(N log N). This abstraction survives hardware upgrades, compiler changes, and language switches. The hierarchy O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2ᴺ) dictates which algorithms scale to billion-record datasets.',
    proofPoints: [
      'Proof: n² + 3n + 2 = O(n²): Choose c = 6, n₀ = 1. Then n²+ 3n + 2 ≤ 6n² for all n ≥ 1. ✓',
      'Transitivity: If f = O(g) and g = O(h), then f = O(h). (compositional bounding)'
    ],
    interviewQs: ['What is the difference between O(n) and Θ(n)?', 'Prove that log₂(n) = O(n).', 'Why can we ignore constants in asymptotic analysis?', 'When would O(n²) be preferred over O(n log n)?'],
    references: [
      { label: 'GeeksforGeeks: Asymptotic Notations', url: 'https://www.geeksforgeeks.org/asymptotic-notations/' },
      { label: 'CLRS Chapter 3 – Growth of Functions', url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/' },
      { label: 'YouTube: Big O Notation – CS Dojo', url: 'https://www.youtube.com/watch?v=v4cd1O4zkGw' }
    ],
    algorithms: [
      { name: 'Linear Search Analysis', id: 'exp-5', desc: 'Prove O(N) via loop counting.', complexity: 'O(N)' },
      { name: 'Binary Search Analysis', id: 'exp-6', desc: 'Prove O(log N) via halving.', complexity: 'O(log N)' }
    ],
    quiz: [
      {
        question: "Which notation gives a tight bound (both upper and lower)?",
        options: ["Big O", "Big Omega", "Big Theta", "Little o"],
        answer: 2,
        explanation: "Theta (Θ) notation requires the function to be bounded from both top and bottom by the same growth rate."
      },
      {
        question: "If f(n) = 3n + 5, which is its Big O notation?",
        options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
        answer: 1,
        explanation: "We ignore constant multiples (3) and lower order terms (5), leaving O(n)."
      }
    ]
  },

  'recurrence': {
    title: 'Recurrence Relations',
    desc: 'Solving recursive algorithm costs using Master Theorem, Substitution & Recursion Trees.',
    icon: GitBranch, color: '#ec4899', visualType: 'recurrence_tree',
    videoId: 'OynWkEj0S-s', videoTitle: 'Recurrence Relations & Master Theorem | DAA | Gate Smashers',
    formula: 'T(n) = aT(n/b) + f(n)',
    formulaDesc: 'Master Theorem: a ≥ 1 sub-problems, each of size n/b, with additional work f(n)',
    keyFacts: [
      'Case 1: f(n) = O(nˡᵒᵍᵇᵃ⁻ᵉ) → T(n) = Θ(nˡᵒᵍᵇᵃ)',
      'Case 2: f(n) = Θ(nˡᵒᵍᵇᵃ) → T(n) = Θ(nˡᵒᵍᵇᵃ · log n)',
      'Case 3: f(n) = Ω(nˡᵒᵍᵇᵃ⁺ᵉ) → T(n) = Θ(f(n))',
      'Merge Sort: T(n) = 2T(n/2) + O(n) → Θ(n log n)'
    ],
    properties: [
      { name: 'Substitution Method', desc: 'Guess the form of solution (e.g., O(N log N)), then verify by induction.' },
      { name: 'Recursion Tree Method', desc: 'Draw the call tree. Sum costs at each level, then multiply by number of levels.' },
      { name: 'Master Theorem', desc: 'Direct formula for T(n) = aT(n/b) + f(n) — compare f(n) vs n^log_b(a).' },
      { name: 'Akra-Bazzi Method', desc: 'Generalizes Master Theorem for unequal sub-problem sizes (advanced).' }
    ],
    detailedTheory: 'When an algorithm calls itself on smaller inputs, its time complexity is described by a recurrence. The Master Theorem provides a rapid lookup: given T(n) = aT(n/b) + Θ(nᵏ), compare k with log_b(a). If k is smaller, leaves dominate (leaf-heavy). If equal, all levels contribute equally. If k is larger, root dominates (root-heavy). Understanding this drives design of all divide-and-conquer algorithms.',
    proofPoints: [
      'Merge Sort: T(n) = 2T(n/2) + n. Here a=2, b=2, k=1. log₂2=1=k → Case 2 → T(n) = Θ(n log n).',
      'Binary Search: T(n) = T(n/2) + 1. a=1, b=2, k=0. log₂1=0=k → Case 2 → T(n) = Θ(log n).',
      'Strassen: T(n) = 7T(n/2) + n². log₂7 ≈ 2.81 > 2 → Case 1 → T(n) = Θ(n^2.81).'
    ],
    interviewQs: ['Solve T(n) = 4T(n/2) + n using the Master Theorem.', 'Why does Merge Sort always achieve O(n log n) but Quick Sort can degrade?', 'Draw the recursion tree for T(n) = 2T(n/2) + n.'],
    references: [
      { label: 'GeeksforGeeks: Master Theorem', url: 'https://www.geeksforgeeks.org/advanced-master-theorem-for-divide-and-conquer-recurrences/' },
      { label: 'YouTube: Recursion Tree Method', url: 'https://www.youtube.com/watch?v=T68vN1FNY4o' },
      { label: 'Brilliant.org: Recurrence Relations', url: 'https://brilliant.org/wiki/recurrence-relations/' }
    ],
    algorithms: [
      { name: 'Merge Sort (Trace)', id: 'exp-12', desc: 'See T(n)=2T(n/2)+n in action.', complexity: 'Θ(n log n)' },
      { name: 'Quick Sort (Trace)', id: 'exp-11', desc: 'Best/average/worst recurrence.', complexity: 'O(n log n) avg' },
      { name: 'Binary Search (Trace)', id: 'exp-6', desc: 'T(n) = T(n/2) + O(1).', complexity: 'O(log n)' }
    ]
  },

  // ==========================================
  // DIVIDE & CONQUER
  // ==========================================
  'divide-conquer/intro': {
    title: 'Divide & Conquer Strategy',
    desc: 'Break → Solve Recursively → Merge. The paradigm behind the most efficient algorithms.',
    icon: Network, color: '#0ea5e9', visualType: 'divide_conquer_flow',
    videoId: 'YOh6hBtX5l0', videoTitle: 'Divide and Conquer Introduction | DAA | Gate Smashers',
    formula: 'T(n) = aT(n/b) + D(n) + C(n)',
    formulaDesc: 'a sub-problems of size n/b, with Divide cost D(n) and Combine cost C(n)',
    keyFacts: ['Requires overlapping subproblems or independent subproblems', 'Works best when sub-problems are of equal size', 'Combine step often determines final complexity', 'Enables parallelism — each branch is independent'],
    properties: [
      { name: 'Divide Phase', desc: 'Partition the problem into a sub-problems each of size n/b. Usually O(1) or O(n).' },
      { name: 'Conquer Phase', desc: 'Solve sub-problems recursively. Base case: trivially solve size-1 input.' },
      { name: 'Combine Phase', desc: 'Merge sub-solutions into overall answer. Often the expensive step (e.g., Merge Sort\'s O(n) merge).' }
    ],
    detailedTheory: 'Divide & Conquer is the crown jewel of algorithm design. By splitting work and solving pieces independently, we achieve logarithmic depth even on massive inputs. Key insight: doing O(n) work at each of O(log n) levels yields O(n log n) total — far superior to O(n²) naive approaches. It also maps naturally to parallel hardware.',
    proofPoints: [
      'Theorem: Any comparison-based sorting algorithm requires Ω(n log n) comparisons in the worst case.',
      'Proof: The decision tree has n! leaves. Height h ≥ log₂(n!) = Θ(n log n) by Stirling\'s approximation.'
    ],
    interviewQs: ['What distinguishes D&C from Dynamic Programming?', 'When does D&C NOT work well?', 'Why is the combine step critical to the overall complexity?'],
    references: [
      { label: 'GeeksforGeeks: Divide and Conquer', url: 'https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/' },
      { label: 'Visualgo: Sorting Visualizations', url: 'https://visualgo.net/en/sorting' },
      { label: 'YouTube: D&C – Abdul Bari', url: 'https://www.youtube.com/watch?v=2Rr2tW9zvRg' }
    ],
    algorithms: [
      { name: 'Strassen\'s Matrix Mul.', id: 'exp-14', desc: 'Sub-cubic matrix: O(n^2.81).', complexity: 'O(n^2.81)' },
      { name: 'Merge Sort', id: 'exp-12', desc: 'Stable O(n log n) sort.', complexity: 'Θ(n log n)' },
      { name: 'Quick Sort', id: 'exp-11', desc: 'In-place pivot partitioning.', complexity: 'O(n log n) avg' }
    ]
  },

  'divide-conquer/binary-search': {
    title: 'Binary Search',
    desc: 'Eliminate half the search space in each step — the definition of logarithmic power.',
    icon: Network, color: '#0ea5e9', visualType: 'binary_search_visual',
    videoId: 'C2apEw9pgtw', videoTitle: 'Binary Search Algorithm | Divide & Conquer | Gate Smashers',
    formula: 'T(n) = T(n/2) + O(1)  →  O(log₂ n)',
    formulaDesc: 'Each comparison halves the problem. By Master Theorem Case 2: T(n) = O(log n)',
    keyFacts: ['REQUIRES sorted input — fails on unsorted arrays', 'Iterative version uses O(1) space; recursive uses O(log n) stack space', '10 comparisons can search 2¹⁰ = 1024 elements', 'Can find first/last occurrence with modified comparator'],
    properties: [
      { name: 'Time: O(log₂ n)', desc: 'Each step eliminates half of remaining elements. After k steps, only n/2ᵏ remain.' },
      { name: 'Space: O(1) iterative / O(log n) recursive', desc: 'Iterative tracks only low/high pointers. Recursion uses call stack proportional to depth.' },
      { name: 'Precondition: Sorted Array', desc: 'Without sorted order, we cannot decide which half to discard. Binary search is undefined on unsorted data.' }
    ],
    detailedTheory: 'Binary Search is perhaps the most elegant algorithm in computer science. Starting with a sorted array of n elements, at each step we inspect the middle element. If the target is smaller, the right half is discarded. If larger, the left half is discarded. This halving continues until found or the interval is empty. The logarithmic depth means searching 1 billion elements requires at most 30 comparisons.',
    proofPoints: [
      'After k iterations, search space = n/2ᵏ elements.',
      'Algorithm terminates when n/2ᵏ = 1, i.e., k = log₂(n).',
      'Therefore T(n) = O(log₂ n). ∎'
    ],
    interviewQs: ['How does Binary Search work on a rotated sorted array?', 'Find the first occurrence of a target using Binary Search.', 'Can Binary Search be applied to a linked list? Why/Why not?', 'What happens if mid is calculated as (low + high) / 2? What is the bug?'],
    references: [
      { label: 'GeeksforGeeks: Binary Search', url: 'https://www.geeksforgeeks.org/binary-search/' },
      { label: 'Visualgo: Binary Search', url: 'https://visualgo.net/en/bst' },
      { label: 'LeetCode Binary Search Problems', url: 'https://leetcode.com/tag/binary-search/' }
    ],
    algorithms: [
      { name: 'Binary Search (Iterative)', id: 'exp-6', desc: 'Low/High pointer narrowing.', complexity: 'O(log n)' },
      { name: 'Binary Search (Recursive)', id: 'exp-7', desc: 'Call-stack based halving.', complexity: 'O(log n)' }
    ]
  },

  'divide-conquer/merge-sort': {
    title: 'Merge Sort',
    desc: 'The gold standard of stable sorting — guaranteed O(n log n) in all cases.',
    icon: Network, color: '#0284c7', visualType: 'merge_sort_visual',
    videoId: 'ak-pz7tS7_Q', videoTitle: 'Merge Sort Algorithm | DAA | Gate Smashers',
    formula: 'T(n) = 2T(n/2) + O(n)  →  Θ(n log n)',
    formulaDesc: '2 sub-problems of size n/2 plus O(n) merge cost. Master Theorem Case 2.',
    keyFacts: ['Always O(n log n) — no worst case degradation', 'Stable sort: preserves relative order of equal elements', 'Requires O(n) auxiliary space for merging', 'Foundation of external sorting (large files, databases)', 'Parallelizable — each half is independent'],
    properties: [
      { name: 'Recurrence: T(n) = 2T(n/2) + n', desc: 'Divides into 2 halves, merges in O(n). By Master Theorem: Θ(n log n).' },
      { name: 'Stable Sorting', desc: 'Equal elements maintain their original order — critical for multi-key sort scenarios.' },
      { name: 'External Sort', desc: 'Works on data too large for RAM by merging sorted chunks from disk — used in databases.' }
    ],
    detailedTheory: 'Merge Sort is a masterclass in the divide-and-conquer paradigm. The divide step is trivial — just find the midpoint. The conquer step recursively sorts each half. The critical insight is the merge step: two sorted arrays can be merged in O(n) time using two pointers. The recursion tree has O(log n) levels, each costing O(n) in total, yielding the famous Θ(n log n). Unlike Quick Sort, there is no worst case.',
    proofPoints: [
      'Level 0: 1 problem of size n → cost n.',
      'Level 1: 2 problems of size n/2 → 2 × n/2 = n.',
      'Level k: 2ᵏ problems of size n/2ᵏ → 2ᵏ × n/2ᵏ = n.',
      'Total levels = log₂(n). Total cost = n × log₂(n) = Θ(n log n). ∎'
    ],
    interviewQs: ['Why does Merge Sort need O(n) extra space?', 'How would you implement Merge Sort in-place?', 'Compare Merge Sort vs Quick Sort for nearly-sorted input.', 'How is Merge Sort used in external sorting?'],
    references: [
      { label: 'GeeksforGeeks: Merge Sort', url: 'https://www.geeksforgeeks.org/merge-sort/' },
      { label: 'Visualgo: Merge Sort Animation', url: 'https://visualgo.net/en/sorting?slide=11' },
      { label: 'YouTube: Merge Sort – Abdul Bari', url: 'https://www.youtube.com/watch?v=mB5HXBb_HY8' }
    ],
    algorithms: [
      { name: 'Merge Sort', id: 'exp-12', desc: 'Classic recursive implementation.', complexity: 'Θ(n log n)' },
      { name: 'Bottom-Up Merge Sort', id: 'exp-12', desc: 'Iterative variant, no recursion stack.', complexity: 'Θ(n log n)' }
    ]
  },

  'divide-conquer/quick-sort': {
    title: 'Quick Sort',
    desc: 'In-place pivot partitioning — the fastest practical sort with excellent cache performance.',
    icon: Network, color: '#0369a1', visualType: 'quick_sort_visual',
    videoId: 'QN9hnmAgmOc', videoTitle: 'Quick Sort Algorithm | DAA | Gate Smashers',
    formula: 'T(n) = T(k) + T(n−k−1) + O(n)',
    formulaDesc: 'k = number of elements smaller than pivot. Average case (randomized): O(n log n).',
    keyFacts: ['Best case O(n log n): pivot always splits 50/50', 'Worst case O(n²): pivot always smallest or largest (sorted input + last-element pivot)', 'Average case O(n log n) with random pivot selection', 'In-place: O(log n) stack space only (no auxiliary array)', 'Not stable — equal elements may swap relative positions'],
    properties: [
      { name: 'Hoare Partition', desc: 'Two pointers from opposite ends. Fewer swaps than Lomuto. Better cache performance.' },
      { name: 'Lomuto Partition', desc: 'Single pointer from left. Simpler code. Pivot ends in final sorted position after partition.' },
      { name: 'Randomized Pivot', desc: 'Randomly select pivot to avoid worst case on sorted/reverse-sorted input. Expected O(n log n).' },
      { name: '3-Way Partition', desc: 'Handles duplicate keys efficiently. Dutch National Flag algorithm. O(n log n) even with many duplicates.' }
    ],
    detailedTheory: 'Quick Sort outperforms Merge Sort in practice despite the same average O(n log n) complexity, due to superior cache locality — it accesses memory sequentially during partitioning. The pivot selection is everything: a bad pivot creates O(n²) behavior. Randomized Quick Sort, or the Median-of-3 strategy, eliminates this weakness. The 3-way partition variant handles duplicate-heavy arrays in O(n) when all elements are equal.',
    proofPoints: [
      'Best case: pivot splits k = n/2 each time. T(n) = 2T(n/2) + n → Θ(n log n).',
      'Worst case: pivot is always min/max. T(n) = T(n-1) + n → T(n) = n + (n-1) + ... + 1 = Θ(n²).',
      'Randomized analysis: Expected # comparisons = O(n log n) by indicator random variables.'
    ],
    interviewQs: ['Why is Quick Sort generally faster than Merge Sort in practice?', 'What is the worst case of Quick Sort and how do you avoid it?', 'Explain the Dutch National Flag problem and its relation to Quick Sort.', 'Implement the 3-way partition scheme.'],
    references: [
      { label: 'GeeksforGeeks: Quick Sort', url: 'https://www.geeksforgeeks.org/quick-sort/' },
      { label: 'Visualgo: Quick Sort', url: 'https://visualgo.net/en/sorting?slide=12' },
      { label: 'YouTube: Quick Sort – MIT OCW', url: 'https://www.youtube.com/watch?v=ETo1cpLN7kk' }
    ],
    algorithms: [
      { name: 'Quick Sort (Lomuto)', id: 'exp-11', desc: 'Simple single-pointer partition.', complexity: 'O(n log n) avg' },
      { name: 'Quick Sort (Hoare)', id: 'exp-11', desc: 'Two-pointer, fewer swaps.', complexity: 'O(n log n) avg' },
      { name: 'Randomized Quick Sort', id: 'exp-11', desc: 'Random pivot for guaranteed avg case.', complexity: 'E[O(n log n)]' }
    ]
  },

  // ==========================================
  // SEARCHING & SORTING
  // ==========================================
  'searching': {
    title: 'Searching Logic',
    desc: 'Sequential, hashed, and tree-based strategies for data discovery.',
    icon: Hash, color: '#8b5cf6', visualType: 'search_array_visual',
    videoId: 'YzT8zDPihmc', videoTitle: 'Linear Search & Binary Search | DAA | Gate Smashers',
    formula: 'E[comparisons] = (n+1)/2 for Linear Search',
    formulaDesc: 'Average case for successful search: (n+1)/2 comparisons assuming uniform distribution',
    keyFacts: ['Linear search: O(n) worst/average, O(1) best', 'Binary search: O(log n) — requires sorted data', 'Hash tables: O(1) average with good hash function', 'Ternary search: O(log₃ n) — useful in unimodal functions'],
    properties: [
      { name: 'Sequential / Linear Scan', desc: 'O(n). No preconditions. Works on any array or linked list. Best for small or unsorted datasets.' },
      { name: 'Hash Map Lookup', desc: 'O(1) average. Map key → index via hash function. Collisions degrade to O(n) worst case.' },
      { name: 'Tree-Based Search (BST)', desc: 'O(log n) balanced, O(n) degenerate. Supports ordered operations like range queries.' }
    ],
    detailedTheory: 'Searching is the most fundamental operation in computer science. The right search strategy depends on data size, sort state, and access pattern. For tiny datasets, linear search wins due to simplicity. For large sorted data, binary search\'s O(log n) is 10 million times faster at n = 10⁷. Hash tables provide near-constant time at the cost of extra memory and lack of ordering.',
    interviewQs: ['When would you choose Linear over Binary Search?', 'Explain hash collision resolution strategies.', 'How does Java\'s HashSet achieve O(1) lookup?', 'Find the first missing positive integer in O(n) time.'],
    references: [
      { label: 'GeeksforGeeks: Searching Algorithms', url: 'https://www.geeksforgeeks.org/searching-algorithms/' },
      { label: 'Visualgo: Hashtable', url: 'https://visualgo.net/en/hashtable' },
      { label: 'LeetCode: Search Problems', url: 'https://leetcode.com/problemset/?topicSlugs=binary-search' }
    ],
    algorithms: [
      { name: 'Linear Search', id: 'exp-5', desc: 'Sequential element scan.', complexity: 'O(n)' },
      { name: 'Binary Search', id: 'exp-6', desc: 'Sorted array halving.', complexity: 'O(log n)' }
    ]
  },

  'sorting': {
    title: 'Sorting Logic',
    desc: 'Primitive sorts, heap sort, and the hierarchy of comparison-based rearrangement.',
    icon: Hash, color: '#7c3aed', visualType: 'bubble_sort_visual',
    videoId: 'NszrLHVK6WE', videoTitle: 'Bubble Sort, Insertion Sort, Selection Sort | Gate Smashers',
    formula: 'Lower Bound: Ω(n log n) for comparison-based sorting',
    formulaDesc: 'Proven via decision tree argument: n! permutations require log₂(n!) = Ω(n log n) comparisons',
    keyFacts: ['Bubble: O(n²) worst, O(n) best (already sorted)', 'Insertion: O(n²) worst, O(n) best — excellent for small n', 'Selection: Always O(n²), never exits early', 'Heap Sort: O(n log n) worst, in-place, not stable', 'Counting/Radix Sort can beat Ω(n log n) by not comparing elements'],
    properties: [
      { name: 'Bubble Sort', desc: 'O(n²). Swaps adjacent pairs. Stable. Early exit if no swap in a pass → O(n) best case.' },
      { name: 'Insertion Sort', desc: 'O(n²) worst. Builds sorted prefix. O(n) for nearly-sorted. Used in Timsort hybrid.' },
      { name: 'Selection Sort', desc: 'O(n²) always. Minimum swaps (O(n)). Useful when write operations are expensive.' },
      { name: 'Heap Sort', desc: 'O(n log n) always. In-place. Not stable. Builds max-heap then extracts successively.' }
    ],
    detailedTheory: 'Elementary sorting algorithms are foundational. While O(n²) makes them impractical for n > 10,000, Insertion Sort runs in O(n) on nearly-sorted data — which is why Timsort (Python, Java) uses it on small runs. Heap Sort provides guaranteed O(n log n) with O(1) extra space but poor cache performance. The theoretical lower bound of Ω(n log n) for comparison-based sorting was proved by examining the depth of decision trees.',
    interviewQs: ['Why is Insertion Sort preferred over Bubble Sort in practice?', 'When does Selection Sort have an advantage?', 'How does Heap Sort achieve O(n log n) without extra memory?', 'What is a stable sort and why does it matter?'],
    references: [
      { label: 'GeeksforGeeks: Sorting Algorithms', url: 'https://www.geeksforgeeks.org/sorting-algorithms/' },
      { label: 'Visualgo: Sorting', url: 'https://visualgo.net/en/sorting' },
      { label: 'YouTube: Sorting Algorithms – CS50', url: 'https://www.youtube.com/watch?v=3T-3GHpXESs' }
    ],
    algorithms: [
      { name: 'Bubble Sort', id: 'exp-8', desc: 'Adjacent pair swapping.', complexity: 'O(n²)' },
      { name: 'Insertion Sort', id: 'exp-9', desc: 'Sorted prefix building.', complexity: 'O(n²) / O(n)' },
      { name: 'Selection Sort', id: 'exp-10', desc: 'Minimum selection & swap.', complexity: 'O(n²)' }
    ]
  },

  'comparison': {
    title: 'Algorithm Complexity Table',
    desc: 'Side-by-side comparison of all major algorithms across Best, Average, and Worst cases.',
    icon: CheckCircle, color: '#6d28d9', visualType: 'complexity_matrix',
    videoId: 'RfXkge4BbT4', videoTitle: 'Time Complexity Comparison of Sorting Algorithms | Gate Smashers',
    formula: 'Θ(n log n) is optimal for comparison-based sorting',
    formulaDesc: 'Proved via information-theoretic lower bound using decision tree argument on n! permutations',
    keyFacts: ['Merge Sort: Θ(n log n) all cases, stable, O(n) space', 'Quick Sort: O(n log n) avg, O(n²) worst, in-place', 'Heap Sort: O(n log n) always, in-place, not stable', 'Bubble Sort: O(n²) worst, O(n) best if optimized', 'Radix Sort: O(nk) — beats Ω(n log n) by not comparing'],
    properties: [
      { name: 'Time-Space Tradeoff', desc: 'Merge Sort: better time, worse space. Quick Sort: better space, variable time.' },
      { name: 'Stability Matters', desc: 'Stable sorts preserve order of equal keys — critical for sorting by multiple fields.' },
      { name: 'Input Sensitivity', desc: 'Insertion Sort is O(n) on sorted data. Quick Sort is O(n²) on sorted+last-pivot.' }
    ],
    detailedTheory: 'No single sorting algorithm dominates all scenarios. Timsort (CPython, Java) hybridizes Merge Sort and Insertion Sort for real-world near-sorted datasets. Introsort (C++ STL) starts with Quick Sort, switches to Heap Sort if recursion gets too deep, guaranteeing O(n log n) worst case. The right algorithm depends on data size, sortedness, memory constraints, and stability requirements.',
    interviewQs: ['Which sort would you use for a nearly-sorted array of 1 million elements?', 'Why does Python use Timsort instead of Quick Sort?', 'Compare space complexity of all major sorting algorithms.'],
    references: [
      { label: 'Big O Cheat Sheet', url: 'https://www.bigocheatsheet.com/' },
      { label: 'GeeksforGeeks: Analysis of Sorting', url: 'https://www.geeksforgeeks.org/analysis-of-different-sorting-techniques/' },
      { label: 'Visualgo: All Sorting Algorithms', url: 'https://visualgo.net/en/sorting' }
    ],
    algorithms: [
      { name: 'Heap Sort', id: 'exp-11', desc: 'O(n log n) always, in-place.', complexity: 'O(n log n)' },
      { name: 'Shell Sort', id: 'exp-10', desc: 'Gap-based Insertion sort improvement.', complexity: 'O(n log² n)' }
    ]
  },

  // ==========================================
  // GREEDY
  // ==========================================
  'greedy/intro': {
    title: 'Greedy Optimization Basics',
    desc: 'Making the locally optimal choice at each step, hoping it leads to a globally optimal solution.',
    icon: GitBranch, color: '#10b981', visualType: 'greedy_intro_visual',
    videoId: 'HzeK7g8cD0Y', videoTitle: 'Introduction to Greedy Algorithm | DAA | Gate Smashers',
    formula: 'Greedy Choice Property + Optimal Substructure ⟹ Greedy Correct',
    formulaDesc: 'Both conditions must be proven — Greedy does NOT always give optimal results',
    keyFacts: ['Greedy is faster (often O(n log n)) than DP', 'Must formally prove Greedy Choice Property', 'Exchange argument is the standard proof technique', 'Greedy fails: 0/1 Knapsack, Coin Change (arbitrary denominations)', 'Greedy works: Fractional Knapsack, MST, SSSP'],
    properties: [
      { name: 'Greedy Choice Property', desc: 'A globally optimal solution can be built by making locally optimal (greedy) choices.' },
      { name: 'Optimal Substructure', desc: 'An optimal solution contains optimal sub-solutions. Required for both Greedy and DP.' },
      { name: 'No Backtracking', desc: 'Unlike DP or Backtracking, Greedy never revisits a choice — fast but potentially suboptimal.' }
    ],
    detailedTheory: 'Greedy algorithms are seductively simple: always pick the "best looking" option right now. This works when the problem has both Greedy Choice Property and Optimal Substructure — a challenging pair to prove. The classic exchange argument shows that swapping any non-greedy choice with the greedy choice cannot improve the solution. When applicable, Greedy is vastly faster than Dynamic Programming.',
    interviewQs: ['Prove that the Fractional Knapsack greedy is optimal.', 'Why does Greedy fail for 0/1 Knapsack?', 'What is the exchange argument?', 'Is Dijkstra\'s algorithm greedy? Explain why.'],
    references: [
      { label: 'GeeksforGeeks: Greedy Algorithms', url: 'https://www.geeksforgeeks.org/greedy-algorithms/' },
      { label: 'YouTube: Greedy Intro – Abdul Bari', url: 'https://www.youtube.com/watch?v=HzeK7g8cD0Y' },
      { label: 'CLRS Chapter 16: Greedy Algorithms', url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/' }
    ],
    algorithms: [
      { name: 'Fractional Knapsack', id: 'exp-15', desc: 'Value/Weight ratio greedy.', complexity: 'O(n log n)' },
      { name: 'Activity Selection', id: 'exp-17', desc: 'Maximize non-overlapping activities.', complexity: 'O(n log n)' }
    ]
  },

  'greedy/huffman': {
    title: 'Huffman Coding',
    desc: 'Optimal prefix-free variable-length encoding for lossless data compression.',
    icon: GitBranch, color: '#059669', visualType: 'huffman_tree',
    videoId: 'dM6us854Jk0', videoTitle: 'Huffman Coding Greedy Algorithm | DAA | Gate Smashers',
    formula: 'Cost = Σ freq(c) × depth(c)',
    formulaDesc: 'Optimal Huffman tree minimizes the weighted external path length (total encoded bits)',
    keyFacts: ['Prefix-free: no code is a prefix of another', 'High frequency chars get shorter codes', 'Typically 20–90% compression over fixed-length encoding', 'O(n log n) using min-heap', 'Used in: JPEG, MP3, ZIP, DEFLATE/gzip'],
    properties: [
      { name: 'Prefix Property', desc: 'No code word is a prefix of another. Guarantees unambiguous decoding without separators.' },
      { name: 'Min-Heap Construction', desc: 'Build tree bottom-up: repeatedly merge two lowest-frequency nodes. O(n log n) total.' },
      { name: 'Optimality', desc: 'Huffman coding produces the optimal prefix-free code. Proved by greedy exchange argument.' }
    ],
    detailedTheory: 'Huffman Coding assigns variable-length binary codes to characters based on their frequency. The most frequent character gets the shortest code (e.g., 1 bit). The least frequent gets the longest. The algorithm builds a binary tree bottom-up using a priority queue: repeatedly extract the two minimum-frequency nodes, merge them into a new node with their combined frequency, and reinsert. The resulting tree encodes every character at its leaf.',
    proofPoints: [
      'Claim: Two least frequent characters x, y have the longest codes and can be swapped to siblings.',
      'Proof by exchange: swapping any pair of characters with x,y cannot produce a shorter encoding. ✓'
    ],
    interviewQs: ['How do you decode a Huffman-encoded string?', 'What is the time complexity of building a Huffman tree?', 'Why is Huffman coding optimal among prefix-free codes?', 'How is Huffman used in JPEG compression?'],
    references: [
      { label: 'GeeksforGeeks: Huffman Coding', url: 'https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/' },
      { label: 'Visualgo: Huffman Tree', url: 'https://visualgo.net/en/huffman' },
      { label: 'YouTube: Huffman Coding – Abdul Bari', url: 'https://www.youtube.com/watch?v=dM6us854Jk0' }
    ],
    algorithms: [
      { name: 'Huffman Encoding', id: 'exp-17', desc: 'Build optimal prefix-free codes.', complexity: 'O(n log n)' }
    ]
  },

  'greedy/mst': {
    title: 'Minimum Spanning Trees',
    desc: 'Connect all vertices with minimum total edge weight — no cycles allowed.',
    icon: GitBranch, color: '#047857', visualType: 'mst_visual',
    videoId: '4ZlRH0eK-qQ', videoTitle: "Kruskal's & Prim's Algorithm MST | DAA | Gate Smashers",
    formula: 'MST has exactly V−1 edges for a graph with V vertices',
    formulaDesc: 'Any spanning tree of V vertices is a tree (connected, acyclic), which always has exactly V−1 edges',
    keyFacts: ['Kruskal: sort edges globally → O(E log E)', 'Prim: grow from seed vertex → O(E log V) with heap', 'Cut property: lightest edge crossing any cut is in some MST', 'Cycle property: heaviest edge in any cycle is NOT in any MST', 'Used in: network layout, cluster analysis, image segmentation'],
    properties: [
      { name: 'Kruskal\'s Algorithm', desc: 'Sort all edges by weight. Add edge if it doesn\'t form cycle (use Union-Find). O(E log E).' },
      { name: 'Prim\'s Algorithm', desc: 'Start from any vertex. Greedily add the cheapest edge connecting visited to unvisited. O(E log V).' },
      { name: 'Cut Property', desc: 'For any cut (S, V-S), the lightest crossing edge belongs to some MST. Formal correctness proof.' }
    ],
    detailedTheory: 'A Minimum Spanning Tree connects all vertices of a weighted undirected graph using exactly V−1 edges with minimum total weight. Kruskal\'s algorithm works globally — sort all edges and greedily add the cheapest non-cycle edge. Prim\'s algorithm works locally — grow a tree vertex by vertex, always extending with the cheapest available edge. Both are provably correct via the cut property of MSTs.',
    proofPoints: [
      'Cut Theorem: Let (S, V-S) be any cut. If e is the unique lightest edge crossing the cut, then e ∈ every MST.',
      'Both Kruskal and Prim select edges consistent with this theorem at each step. By induction, their output is an MST. ✓'
    ],
    interviewQs: ['What is the difference between Kruskal\'s and Prim\'s algorithm?', 'When is Prim\'s better than Kruskal\'s (dense vs sparse graphs)?', 'Prove that removing the maximum edge from a cycle doesn\'t disconnect the graph.'],
    references: [
      { label: 'GeeksforGeeks: Kruskal\'s Algorithm', url: 'https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/' },
      { label: 'Visualgo: MST', url: 'https://visualgo.net/en/mst' },
      { label: 'YouTube: MST – William Fiset', url: 'https://www.youtube.com/watch?v=jsmMtJpPnhU' }
    ],
    algorithms: [
      { name: 'Kruskal\'s MST', id: 'exp-18', desc: 'Edge-sort + Union-Find.', complexity: 'O(E log E)' },
      { name: 'Prim\'s MST', id: 'exp-19', desc: 'Greedy vertex expansion.', complexity: 'O(E log V)' }
    ]
  },

  'greedy/shortest-path': {
    title: 'Dijkstra\'s Algorithm',
    desc: 'Single-Source Shortest Path on non-negative weighted graphs.',
    icon: GitBranch, color: '#065f46', visualType: 'dijkstra_visual',
    videoId: 'XB4MIexjvY0', videoTitle: "Dijkstra's Shortest Path Algorithm | DAA | Gate Smashers",
    formula: 'd[v] = min(d[v], d[u] + w(u,v))  [Relaxation]',
    formulaDesc: 'Update shortest distance to v if going through u gives a shorter path',
    keyFacts: ['Works ONLY on non-negative edge weights', 'Fails with negative edges — use Bellman-Ford instead', 'O(E log V) with binary heap', 'O(V²) with adjacency matrix (dense graphs)', 'Foundation of GPS routing (A* is Dijkstra + heuristic)'],
    properties: [
      { name: 'Relaxation Step', desc: 'If d[u] + w(u,v) < d[v], update d[v] = d[u] + w(u,v). Core operation of Dijkstra.' },
      { name: 'Greedy Nature', desc: 'Always processes the unvisited vertex with the smallest known distance. Correct only for non-negative weights.' },
      { name: 'Priority Queue', desc: 'Min-heap extracts the nearest unvisited vertex efficiently. O(E log V) total time.' }
    ],
    detailedTheory: 'Dijkstra\'s algorithm maintains a set of vertices whose shortest distance from the source is finalized, and a priority queue of remaining vertices sorted by current best distance. At each step, extract the minimum-distance vertex, finalize it, and relax all its outgoing edges. The key invariant: once a vertex is extracted from the priority queue, its shortest path is determined. This requires non-negative edge weights.',
    proofPoints: [
      'Invariant: When vertex u is extracted, d[u] = δ(s, u) (true shortest path).',
      'Proof by contradiction: Suppose ∃ shorter path P that bypasses u. P must cross the frontier at some vertex w with d[w] ≥ d[u] (since weights are non-negative). Contradiction. ✓'
    ],
    interviewQs: ['Why does Dijkstra fail with negative edge weights?', 'What is the time complexity with a Fibonacci heap?', 'How is A* search related to Dijkstra\'s algorithm?', 'Implement Dijkstra using adjacency list + min-heap.'],
    references: [
      { label: 'GeeksforGeeks: Dijkstra\'s Algorithm', url: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/' },
      { label: 'Visualgo: SSSP', url: 'https://visualgo.net/en/sssp' },
      { label: 'YouTube: Dijkstra – William Fiset', url: 'https://www.youtube.com/watch?v=EFg3u_E6eHU' }
    ],
    algorithms: [
      { name: 'Dijkstra SSSP', id: 'exp-20', desc: 'Min-heap based shortest path.', complexity: 'O(E log V)' }
    ]
  },

  'greedy/knapsack': {
    title: 'Fractional Knapsack',
    desc: 'Maximize value by filling capacity with optimal value-density fractions.',
    icon: GitBranch, color: '#34d399', visualType: 'fractional_knapsack_visual',
    videoId: 'oTTzNMHM05I', videoTitle: 'Fractional Knapsack Problem | Greedy | DAA | Gate Smashers',
    formula: 'Sort by v_i/w_i descending, fill greedily',
    formulaDesc: 'Value density ratio: higher ratio items selected first. Sorting dominates: O(n log n)',
    keyFacts: ['Greedy works here because items are infinitely divisible', '0/1 Knapsack requires DP — Greedy fails there', 'Sort by value/weight ratio: O(n log n)', 'Fill greedily until capacity exhausted', 'Provably optimal by exchange argument'],
    properties: [
      { name: 'Value Density', desc: 'Ratio = value / weight. Higher ratio = more value per unit weight. Our greedy heuristic.' },
      { name: 'Fractional Allowed', desc: 'We can take 0.7 kg of an item. This makes greedy optimal — we never waste capacity.' },
      { name: 'Correctness via Exchange', desc: 'Any deviation from density order can be improved by swapping — contradiction proves optimality.' }
    ],
    detailedTheory: 'The Fractional Knapsack problem asks: given items with values and weights, and a capacity W, maximize total value. Since items can be fractionally taken (like gold dust or liquid), we can always fill the knapsack to exactly capacity W. The optimal strategy: sort items by value per unit weight (density) and fill from highest to lowest. If the knapsack fills mid-item, take the fraction that fits. Greedy is provably optimal here — unlike the 0/1 variant.',
    interviewQs: ['Why does Greedy fail for 0/1 Knapsack?', 'Prove the Fractional Knapsack greedy is optimal.', 'What is the time complexity and why?', 'How would you handle items with equal density?'],
    references: [
      { label: 'GeeksforGeeks: Fractional Knapsack', url: 'https://www.geeksforgeeks.org/fractional-knapsack-problem/' },
      { label: 'YouTube: Fractional vs 0/1 Knapsack', url: 'https://www.youtube.com/watch?v=oTTzNMHM05I' }
    ],
    algorithms: [
      { name: 'Fractional Knapsack', id: 'exp-15', desc: 'Density sort + greedy fill.', complexity: 'O(n log n)' }
    ]
  },

  // ==========================================
  // DYNAMIC PROGRAMMING
  // ==========================================
  'dp/knapsack': {
    title: '0/1 Knapsack Problem',
    desc: 'Binary item selection with DP table — the cornerstone of combinatorial optimization.',
    icon: Layers, color: '#f59e0b', visualType: 'dp_knapsack_visual',
    videoId: 'kvyShzkA1H0', videoTitle: '0/1 Knapsack Dynamic Programming | DAA | Gate Smashers',
    formula: 'V[i][w] = max(V[i-1][w],  v_i + V[i-1][w - w_i])',
    formulaDesc: 'Either skip item i (no change) or take it (add value, reduce capacity)',
    keyFacts: ['O(nW) time and space — pseudo-polynomial (W is not polynomial in input size)', 'Can optimize space to O(W) using a 1D rolling array', 'NP-hard in general — no polynomial algorithm known', 'Foundational for: bin packing, portfolio optimization, resource allocation'],
    properties: [
      { name: 'Overlapping Subproblems', desc: 'V[i][w] is computed from V[i-1][...] — same sub-state is reused many times.' },
      { name: 'Optimal Substructure', desc: 'Best solution for capacity w using items 1..i builds on best for smaller sub-problems.' },
      { name: 'Bottom-Up Tabulation', desc: 'Fill DP table row by row. V[n][W] is the answer. Traceback column finds selected items.' }
    ],
    detailedTheory: 'The 0/1 Knapsack problem: given n items each with value vᵢ and weight wᵢ, and a knapsack of capacity W, find the maximum value subset with total weight ≤ W. Items cannot be fractioned. Greedy fails because high-density items may exceed capacity. DP fills a 2D table V[i][w]: the maximum value using the first i items with capacity w. For each item: either include it (reducing capacity by wᵢ) or skip it.',
    proofPoints: [
      'State: V[i][w] = max value from first i items with capacity exactly w.',
      'Recurrence: V[i][w] = V[i-1][w]  if wᵢ > w  (can\'t fit)',
      '       = max(V[i-1][w],  vᵢ + V[i-1][w-wᵢ])  otherwise',
      'Final answer: V[n][W]. Items selected by traceback from V[n][W]. ∎'
    ],
    interviewQs: ['Solve Knapsack (n=4, W=5, v=[1,6,10,16], w=[1,2,3,5]).', 'How do you reduce Knapsack space from O(nW) to O(W)?', 'Is 0/1 Knapsack NP-hard? Explain.', 'What is the difference between Fractional and 0/1 Knapsack?'],
    references: [
      { label: 'GeeksforGeeks: 0/1 Knapsack', url: 'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/' },
      { label: 'YouTube: Knapsack DP – Aditya Verma', url: 'https://www.youtube.com/watch?v=kvyShzkA1H0' },
      { label: 'Visualgo: DP Problems', url: 'https://visualgo.net/en/dp' }
    ],
    algorithms: [
      { name: '0/1 Knapsack (DP Table)', id: 'exp-16', desc: 'Full 2D tabulation approach.', complexity: 'O(nW)' },
      { name: '0/1 Knapsack (Memoized)', id: 'exp-16', desc: 'Top-down recursive with cache.', complexity: 'O(nW)' }
    ]
  },

  'dp/multistage': {
    title: 'Multistage Graphs',
    desc: 'Shortest path in DAGs with explicit stage boundaries — Forward and Backward DP methods.',
    icon: Layers, color: '#d97706', visualType: 'dp_multistage_visual',
    videoId: '9iE9Mj4m8jk', videoTitle: 'Multistage Graph Forward & Backward Method | DAA | Gate Smashers',
    formula: 'cost(i, j) = min_{k ∈ stage(i+1)} { c(j,k) + cost(i+1, k) }',
    formulaDesc: 'Backward DP: cost from vertex j in stage i = min cost to sink through all reachable next-stage vertices',
    keyFacts: ['Stages partition vertices into ordered layers', 'Edges only go from stage i to stage i+1', 'Forward method: work from source to sink', 'Backward method: work from sink to source', 'O(V + E) — single linear pass'],
    properties: [
      { name: 'Forward Method', desc: 'Compute d(j) = minimum cost from source s to vertex j. Process stage by stage left to right.' },
      { name: 'Backward Method', desc: 'Compute cost(j) = minimum cost from j to sink t. Process stage by stage right to left.' },
      { name: 'Stage Structure', desc: 'All edges go from stage i to stage i+1 — enables efficient single-pass DP without revisiting.' }
    ],
    detailedTheory: 'A Multistage Graph is a directed acyclic graph (DAG) where vertices are partitioned into k stages, and edges only connect adjacent stages. The problem: find the shortest path from source (stage 1) to sink (stage k). DP exploits the stage structure: the optimal path through stage i depends only on the optimal paths from stage i+1 onward. This allows O(V+E) computation vs. exponential brute force.',
    interviewQs: ['Implement the Forward method for a 4-stage graph.', 'When does Multistage Graph DP fail?', 'What is the difference between Forward and Backward methods?'],
    references: [
      { label: 'GeeksforGeeks: Multistage Graph', url: 'https://www.geeksforgeeks.org/multistage-graph-shortest-path/' },
      { label: 'YouTube: Multistage Graph – Abdul Bari', url: 'https://www.youtube.com/watch?v=9iE9Mj4m8jk' }
    ],
    algorithms: [
      { name: 'Multistage Graph (Forward)', id: 'exp-22', desc: 'Source-to-sink DP.', complexity: 'O(V + E)' },
      { name: 'Multistage Graph (Backward)', id: 'exp-22', desc: 'Sink-to-source DP.', complexity: 'O(V + E)' }
    ]
  },

  'dp/floyd': {
    title: 'Floyd-Warshall Algorithm',
    desc: 'All-Pairs Shortest Path via intermediate node relaxation — O(V³) DP.',
    icon: Layers, color: '#b45309', visualType: 'dp_floyd_visual',
    videoId: '4NQ3HnhyNfQ', videoTitle: 'Floyd Warshall Algorithm | All Pairs SP | DAA | Gate Smashers',
    formula: 'D[i][j] = min(D[i][j],  D[i][k] + D[k][j])',
    formulaDesc: 'For each intermediate vertex k, update all pairwise distances through k',
    keyFacts: ['O(V³) time — impractical for V > 1000', 'Works with negative edge weights (but not negative cycles)', 'Detects negative cycles: if D[i][i] < 0 for any i', 'Simple 3-loop implementation', 'Can reconstruct paths using predecessor matrix'],
    properties: [
      { name: 'Triple Nested Loop', desc: 'For each k (intermediate), for each pair (i,j): relax D[i][j] through k. O(V³) total.' },
      { name: 'Negative Weights OK', desc: 'Unlike Dijkstra, Floyd-Warshall handles negative weights. Fails only on negative-weight cycles.' },
      { name: 'Path Reconstruction', desc: 'Maintain P[i][j] = last intermediate vertex on shortest i→j path. Recursively rebuild.' }
    ],
    detailedTheory: 'Floyd-Warshall answers: "what is the shortest path between every pair of vertices?" Start with direct edge weights (or ∞ if no edge). Then, for each potential intermediate vertex k from 1 to V, update every pair (i,j): if going through k is shorter, update. After trying all V intermediates, D[i][j] holds the true shortest path. The elegant DP insight: D_k[i][j] = shortest path using only vertices {1..k} as intermediates.',
    proofPoints: [
      'State: D_k[i][j] = shortest path from i to j using only {1,...,k} as intermediates.',
      'Base: D_0[i][j] = w(i,j) (direct edge), or ∞.',
      'Transition: D_k[i][j] = min(D_{k-1}[i][j],  D_{k-1}[i][k] + D_{k-1}[k][j]). ∎'
    ],
    interviewQs: ['Detect a negative cycle using Floyd-Warshall.', 'How would you reconstruct the actual path?', 'When is Floyd-Warshall preferred over running Dijkstra V times?'],
    references: [
      { label: 'GeeksforGeeks: Floyd-Warshall', url: 'https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/' },
      { label: 'Visualgo: APSP', url: 'https://visualgo.net/en/sssp' },
      { label: 'YouTube: Floyd-Warshall – William Fiset', url: 'https://www.youtube.com/watch?v=4NQ3HnhyNfQ' }
    ],
    algorithms: [
      { name: 'Floyd-Warshall APSP', id: 'exp-14', desc: 'All-pairs shortest path matrix.', complexity: 'O(V³)' }
    ]
  },

  'dp/reliability': {
    title: 'Reliability Design',
    desc: 'Maximize multi-stage system reliability within a cost budget using DP.',
    icon: Layers, color: '#fbbf24', visualType: 'dp_reliability_visual',
    videoId: 'G_UDvXOiREc', videoTitle: 'Reliability Design Problem | DP | DAA | Gate Smashers',
    formula: 'R_i(m_i) = 1 − (1 − r_i)^m_i',
    formulaDesc: 'Reliability of stage i with m_i duplicate devices, each with individual reliability r_i',
    keyFacts: ['m_i duplicates of component i: failure requires ALL copies to fail', 'System reliability = ∏ R_i  across all stages', 'Budget constraint limits total number of devices', 'DP state: f(i, c) = max reliability using stages 1..i with cost ≤ c', 'Used in: aerospace, medical devices, nuclear systems'],
    properties: [
      { name: 'Stage Reliability', desc: 'R_i(m) = 1 − (1 − r_i)^m. Adding redundant copies makes the stage more reliable.' },
      { name: 'System Reliability', desc: 'Total = product of stage reliabilities. One weak stage can drag down the whole system.' },
      { name: 'Budget Constraint', desc: 'Each device costs c_i. Total cost = Σ m_i × c_i ≤ C. DP optimizes over cost states.' }
    ],
    detailedTheory: 'In mission-critical systems (satellites, aircraft, medical equipment), hardware failure is inevitable. The solution: redundancy. Stage i has m_i duplicate components, each independently failing with probability (1 - r_i). The probability that stage i fails = (1 - r_i)^m_i. Reliability = 1 - (1-r_i)^m_i. Total system reliability is the product over all stages. DP maximizes this product subject to a total cost budget.',
    interviewQs: ['How does adding one extra redundant device improve reliability?', 'Why is the product formula used for system reliability?', 'Set up the DP table for a 3-stage system.'],
    references: [
      { label: 'GeeksforGeeks: Reliability Design', url: 'https://www.geeksforgeeks.org/reliability-design-problem/' },
      { label: 'YouTube: Reliability – Abdul Bari', url: 'https://www.youtube.com/watch?v=G_UDvXOiREc' }
    ],
    algorithms: [
      { name: 'Reliability Design (DP)', id: 'exp-98', desc: 'Max reliability under budget.', complexity: 'O(n × C)' }
    ]
  },

  // ==========================================
  // BACKTRACKING
  // ==========================================
  'backtracking': {
    title: 'Backtracking Logic',
    desc: 'Systematic depth-first state-space exploration with constraint pruning.',
    icon: Activity, color: '#ef4444', visualType: 'backtracking_intro_visual',
    videoId: 'DKCbsiDBN6c', videoTitle: 'Introduction to Backtracking | DAA | Gate Smashers',
    formula: 'Explore(state):  if valid → extend;  if violated → backtrack()',
    formulaDesc: 'Incrementally build candidates and abandon branches that violate constraints',
    keyFacts: ['Reduces brute-force exponential search significantly', 'Uses DFS + constraint checking at each step', 'Solution exists at leaves of the implicit search tree', 'Bounding functions turn backtracking into Branch & Bound', 'Classic problems: N-Queens, Sudoku, Graph Coloring, Subset Sum'],
    properties: [
      { name: 'Constraint Functions', desc: 'At each step, verify partial solution is still valid. Prune entire subtree on first violation.' },
      { name: 'State-Space Tree', desc: 'Implicit tree where each node represents a partial assignment. Leaves = complete solutions.' },
      { name: 'Depth-First Search', desc: 'Expands deepest nodes first. Finds the first solution fast; finds all solutions via continuation.' }
    ],
    detailedTheory: 'Backtracking is a refined brute-force: instead of generating all candidates first and filtering, it checks constraints as the solution is built and prunes immediately on violation. This can reduce the search space from O(n!) to negligible for constraint-heavy problems. The key is a tight constraint function — the tighter, the more pruning, the faster the algorithm.',
    interviewQs: ['Implement N-Queens backtracking.', 'What is the difference between Backtracking and Branch & Bound?', 'How do you solve Sudoku with Backtracking?', 'What makes a good bounding function?'],
    references: [
      { label: 'GeeksforGeeks: Backtracking', url: 'https://www.geeksforgeeks.org/backtracking-algorithms/' },
      { label: 'YouTube: Backtracking – Abdul Bari', url: 'https://www.youtube.com/watch?v=DKCbsiDBN6c' },
      { label: 'LeetCode: Backtracking Problems', url: 'https://leetcode.com/tag/backtracking/' }
    ],
    algorithms: [
      { name: 'Graph Coloring', id: 'exp-97', desc: 'M-coloring with constraint checks.', complexity: 'O(m^V)' },
      { name: '8-Queens', id: 'exp-24', desc: 'N queens non-attacking placement.', complexity: 'O(N!)' }
    ]
  },

  '8-queens': {
    title: '8-Queens Problem',
    desc: 'Place 8 queens on an 8×8 board such that no two queens attack each other.',
    icon: Activity, color: '#dc2626', visualType: 'nqueens_visual',
    videoId: 'xFv_Hl4B83A', videoTitle: 'N-Queens Problem Backtracking | DAA | Gate Smashers',
    formula: '|col[i] − col[k]| ≠ |i − k|  and  col[i] ≠ col[k]',
    formulaDesc: 'Safety condition: no two queens share the same column or diagonal',
    keyFacts: ['92 distinct solutions for n=8', 'Only 12 fundamental solutions (excluding rotations/reflections)', 'Backtracking reduces 8^8 = 16M candidates massively', 'Generalized to N-Queens — O(N!) worst case', 'Classic benchmark for backtracking algorithms'],
    properties: [
      { name: 'Column Safety', desc: 'col[i] ≠ col[j] for all i ≠ j. Each queen must occupy a different column.' },
      { name: 'Diagonal Safety', desc: '|col[i] − col[j]| ≠ |i − j| for all i ≠ j. Queens not on the same diagonal.' },
      { name: 'One Queen Per Row', desc: 'Place one queen per row — eliminates row conflicts. Reduces search to column placement only.' }
    ],
    detailedTheory: 'The N-Queens problem asks for all arrangements of N non-attacking queens on an N×N board. By placing one queen per row (fixing row conflicts), we reduce the problem to assigning columns col[1..N]. At each row, we try columns 1 to N, check if the placement conflicts with previously placed queens (column and diagonal checks), and recurse or backtrack.',
    interviewQs: ['How many solutions does the 8-Queens problem have?', 'How would you solve this iteratively without recursion?', 'Optimize the diagonal check to O(1) per placement.', 'How do you find the FIRST solution vs ALL solutions?'],
    references: [
      { label: 'GeeksforGeeks: N-Queens', url: 'https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/' },
      { label: 'LeetCode: N-Queens', url: 'https://leetcode.com/problems/n-queens/' },
      { label: 'YouTube: N-Queens Backtracking', url: 'https://www.youtube.com/watch?v=xFv_Hl4B83A' }
    ],
    algorithms: [
      { name: '8-Queens (Backtracking)', id: 'exp-24', desc: 'Column-by-column safety placement.', complexity: 'O(N!)' }
    ]
  },

  'hamiltonian': {
    title: 'Hamiltonian Cycle',
    desc: 'Find a cycle that visits every vertex exactly once — a classic NP-Complete problem.',
    icon: Activity, color: '#b91c1c', visualType: 'hamiltonian_visual',
    videoId: 'dQr4wZCiJJ4', videoTitle: 'Hamiltonian Cycle Backtracking | DAA | Gate Smashers',
    formula: 'Path[pos] = v  if  adj[path[pos-1]][v] = 1  and  v ∉ path[0..pos-1]',
    formulaDesc: 'Place vertex v at position pos if adjacent to previous vertex and not already visited',
    keyFacts: ['NP-Complete — no polynomial algorithm known', 'Exists in complete graphs (always), sparse graphs (hard to find)', 'Different from Euler Circuit: Euler visits all EDGES, Hamilton visits all VERTICES', 'Backtracking solution: O(n!) worst case', 'Important for Travelling Salesman Problem (TSP)'],
    properties: [
      { name: 'Path Growth', desc: 'Build path array [v₀, v₁, ..., vₙ₋₁]. Add vertex only if adjacent to last and not visited.' },
      { name: 'Cycle Completion', desc: 'After n vertices placed, check if last vertex is adjacent to first vertex (closing the cycle).' },
      { name: 'NP-Complete Status', desc: 'No known polynomial algorithm. Checking a given cycle: O(n). Finding one: exponential.' }
    ],
    detailedTheory: 'A Hamiltonian Cycle visits every vertex of a graph exactly once and returns to the start. Unlike finding an Euler circuit (polynomial), finding a Hamiltonian cycle is NP-Complete — no known polynomial algorithm exists. Backtracking tries to build the path vertex by vertex, checking adjacency at each step and backtracking on dead ends. For dense graphs, pruning is limited and the algorithm approaches O(n!).',
    interviewQs: ['What is the difference between Hamiltonian and Euler circuits?', 'Is every complete graph Hamiltonian? Prove or disprove.', 'How would you check if a given path is Hamiltonian in O(n)?'],
    references: [
      { label: 'GeeksforGeeks: Hamiltonian Cycle', url: 'https://www.geeksforgeeks.org/hamiltonian-cycle-backtracking-6/' },
      { label: 'YouTube: Hamiltonian Cycle – Abdul Bari', url: 'https://www.youtube.com/watch?v=dQr4wZCiJJ4' }
    ],
    algorithms: [
      { name: 'Hamiltonian Cycle', id: 'exp-25', desc: 'Backtracking path construction.', complexity: 'O(n!)' }
    ]
  },

  'branch-bound': {
    title: 'Branch & Bound',
    desc: 'Optimization via aggressive tree pruning using calculated lower and upper bounds.',
    icon: Activity, color: '#991b1b', visualType: 'branch_bound_visual',
    videoId: 'wzF-zGTrNHQ', videoTitle: 'Branch and Bound Algorithm | LC BB FIFO LIFO | Gate Smashers',
    formula: 'Prune if: LowerBound(node) ≥ CurrentBest',
    formulaDesc: 'If the best possible solution in this subtree cannot beat current best, prune the entire branch',
    keyFacts: ['Used for optimization (min/max), not decision problems', 'Requires: feasible solution (upper bound) + relaxed lower bound', 'FIFO B&B = BFS; LIFO B&B = DFS; LC B&B = best-first', 'LC (Least Cost) B&B is typically most efficient', 'Used for: TSP, Integer Programming, Assignment Problem'],
    properties: [
      { name: 'Lower Bound', desc: 'Optimistic estimate of the best solution in this subtree. If weak, little pruning occurs.' },
      { name: 'Upper Bound (Incumbent)', desc: 'Best complete feasible solution found so far. Improved as better solutions are discovered.' },
      { name: 'Pruning Rule', desc: 'If LB(node) ≥ incumbent, no solution in this subtree can improve the answer. Prune it.' }
    ],
    detailedTheory: 'Branch & Bound enhances Backtracking for optimization problems. At each node, compute a lower bound (best-case cost if we continue from here). If this lower bound already exceeds our current best solution (upper bound), the entire subtree is pruned without exploration. The key challenge is designing tight lower bounds — a loose lower bound prunes nothing; a tight one prunes almost everything.',
    interviewQs: ['What makes B&B better than Backtracking for optimization?', 'How do you compute a lower bound for TSP?', 'Compare FIFO, LIFO, and LC Branch & Bound strategies.'],
    references: [
      { label: 'GeeksforGeeks: Branch and Bound', url: 'https://www.geeksforgeeks.org/branch-and-bound-algorithm/' },
      { label: 'YouTube: B&B – Abdul Bari', url: 'https://www.youtube.com/watch?v=wzF-zGTrNHQ' }
    ],
    algorithms: [
      { name: 'TSP (Branch & Bound)', id: 'exp-20', desc: 'Optimal tour via LC B&B.', complexity: 'O(n² × 2ⁿ)' },
      { name: '0/1 Knapsack (B&B)', id: 'exp-16', desc: 'Upper bound via fractional relaxation.', complexity: 'O(2ⁿ) worst' }
    ]
  },

  // ==========================================
  // ADVANCED STRUCTURES
  // ==========================================
  'trees': {
    title: 'AVL Trees & Self-Balancing',
    desc: 'Height-balanced BSTs with guaranteed O(log n) operations through automated rotations.',
    icon: GitBranch, color: '#ec4899', visualType: 'avl_tree_visual',
    videoId: 'jDM6_TnYIqE', videoTitle: 'AVL Trees Rotations Insert Delete | DAA | Gate Smashers',
    formula: 'Balance Factor = Height(Left) − Height(Right)  ∈  {−1, 0, 1}',
    formulaDesc: 'AVL property: balance factor of every node must be −1, 0, or +1',
    keyFacts: ['AVL maintains height ≤ 1.44 log₂(n)', 'Insert/Delete/Search: O(log n) guaranteed', '4 rotation types: LL, RR, LR, RL', 'More strictly balanced than Red-Black trees', 'Better search performance; Red-Black faster for insert/delete'],
    properties: [
      { name: 'LL Rotation (Right)', desc: 'Left-heavy imbalance. Rotate the parent right. Single rotation.' },
      { name: 'RR Rotation (Left)', desc: 'Right-heavy imbalance. Rotate the parent left. Single rotation.' },
      { name: 'LR Rotation', desc: 'Left child is right-heavy. First rotate left child left, then parent right. Double rotation.' },
      { name: 'RL Rotation', desc: 'Right child is left-heavy. First rotate right child right, then parent left. Double rotation.' }
    ],
    detailedTheory: 'A regular BST can degenerate to a linked list (O(n) operations) if elements are inserted in sorted order. AVL trees prevent this by maintaining a strict height balance invariant. After every insert or delete, the tree rebalances itself with O(1) rotations. The height is always bounded by 1.44 log₂(n), guaranteeing O(log n) for all operations.',
    interviewQs: ['When would you use an AVL tree vs a Red-Black tree?', 'Walk through inserting 10, 20, 30 into an AVL tree.', 'How many rotations are needed in the worst case for AVL insert?'],
    references: [
      { label: 'GeeksforGeeks: AVL Tree', url: 'https://www.geeksforgeeks.org/avl-tree-set-1-insertion/' },
      { label: 'Visualgo: BST/AVL', url: 'https://visualgo.net/en/bst' },
      { label: 'YouTube: AVL Rotations – Abdul Bari', url: 'https://www.youtube.com/watch?v=jDM6_TnYIqE' }
    ],
    algorithms: [
      { name: 'AVL Insert & Rotate', id: 'exp-24', desc: 'Height-balanced insertion.', complexity: 'O(log n)' },
      { name: 'BST Search & Delete', id: 'exp-23', desc: 'Standard BST operations.', complexity: 'O(log n)' }
    ]
  },

  'traversals': {
    title: 'Graph Traversals (BFS & DFS)',
    desc: 'Systematic exploration of graph vertices using queues and stacks.',
    icon: GitBranch, color: '#db2777', visualType: 'graph_traversal_visual',
    videoId: 'pcKY4hjDrxk', videoTitle: 'BFS & DFS Graph Traversals | DAA | Gate Smashers',
    formula: 'BFS: Queue (FIFO)  |  DFS: Stack / Recursion',
    formulaDesc: 'BFS explores level-by-level; DFS explores depth-first before backtracking',
    keyFacts: ['Both run in O(V + E)', 'BFS finds shortest path in unweighted graphs', 'DFS used for: cycle detection, topological sort, SCC', 'BFS level = shortest path in hops', 'DFS timestamps enable many advanced algorithms'],
    properties: [
      { name: 'BFS (Breadth-First)', desc: 'Level-by-level exploration. Uses queue. Finds shortest path (in hops) in unweighted graphs.' },
      { name: 'DFS (Depth-First)', desc: 'Explores each branch fully before backtracking. Uses stack/recursion. Good for cycle detection.' },
      { name: 'Visited Array', desc: 'Prevents infinite loops in cyclic graphs. Mark vertices as visited when first discovered.' }
    ],
    detailedTheory: 'Graph traversals are the foundation of most advanced graph algorithms. BFS explores vertices level by level using a queue, guaranteeing shortest path in unweighted graphs. DFS dives as deep as possible before backtracking, enabling topological sorting, cycle detection, and strongly connected components. Both run in O(V+E) regardless of graph structure.',
    interviewQs: ['How does BFS find the shortest path in an unweighted graph?', 'Use DFS to detect a cycle in a directed graph.', 'What is topological sort and when can you compute it?', 'How does BFS relate to level-order traversal of trees?'],
    references: [
      { label: 'GeeksforGeeks: BFS', url: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/' },
      { label: 'GeeksforGeeks: DFS', url: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/' },
      { label: 'Visualgo: Graph Traversal', url: 'https://visualgo.net/en/dfsbfs' }
    ],
    algorithms: [
      { name: 'BFS (Queue-Based)', id: 'exp-26', desc: 'Level-order graph exploration.', complexity: 'O(V + E)' },
      { name: 'DFS (Recursive)', id: 'exp-25', desc: 'Depth-first branch exploration.', complexity: 'O(V + E)' }
    ]
  },

  'graph-rep': {
    title: 'Graph Representations',
    desc: 'Adjacency Matrix vs Adjacency List — the tradeoffs that decide algorithm performance.',
    icon: GitBranch, color: '#be185d', visualType: 'graph_rep_visual',
    videoId: 'AbPwhOgXWaM', videoTitle: 'Graph Representations Adjacency Matrix & List | Gate Smashers',
    formula: 'Space: Matrix = O(V²)  |  List = O(V + E)',
    formulaDesc: 'For sparse graphs (E << V²), adjacency list is vastly more memory-efficient',
    keyFacts: ['Matrix: O(1) edge check; O(V²) space; good for dense graphs', 'List: O(degree) edge check; O(V+E) space; good for sparse graphs', 'Edge list: O(E) space; slow lookup but easy to sort by weight', 'Incidence matrix: V × E matrix mapping vertices to edges', 'Social networks (sparse): list. Road networks (weights): list. Circuit boards (dense): matrix.'],
    properties: [
      { name: 'Adjacency Matrix A[V×V]', desc: 'A[i][j] = 1 (or weight) if edge i→j exists. O(1) lookup. O(V²) space. Bad for sparse graphs.' },
      { name: 'Adjacency List', desc: 'Array of V lists. List[i] contains all neighbors of vertex i. O(V+E) space. O(degree) edge check.' },
      { name: 'Edge List', desc: 'List of (u, v, w) tuples. O(E) space. O(E) to find neighbors. Easy to sort for Kruskal\'s.' }
    ],
    detailedTheory: 'Choosing the right graph representation dramatically impacts algorithm performance. A dense graph (E ≈ V²) justifies O(V²) matrix space — and gains O(1) edge lookup. A sparse graph (E << V²) like a social network with millions of users and average degree 100 must use adjacency lists — a V×V matrix would require terabytes. Most real-world graphs are sparse.',
    interviewQs: ['When would you use adjacency matrix over adjacency list?', 'Implement DFS with both representations and compare.', 'What is the space complexity for a graph with 10⁶ vertices and 10⁷ edges using each representation?'],
    references: [
      { label: 'GeeksforGeeks: Graph Representations', url: 'https://www.geeksforgeeks.org/graph-and-its-representations/' },
      { label: 'Visualgo: Graph', url: 'https://visualgo.net/en/graphds' }
    ],
    algorithms: [
      { name: 'Graph DFS (Matrix)', id: 'exp-25', desc: 'DFS using adjacency matrix.', complexity: 'O(V²)' },
      { name: 'Graph DFS (List)', id: 'exp-25', desc: 'DFS using adjacency list.', complexity: 'O(V + E)' }
    ]
  },

  'npc': {
    title: 'P vs NP Theory',
    desc: 'The most important unsolved problem in computer science — the limits of efficient computation.',
    icon: GitBranch, color: '#9d174d', visualType: 'np_theory_visual',
    videoId: 'YX40hbAHx3s', videoTitle: 'P vs NP Problem NP-Complete NP-Hard | DAA | Gate Smashers',
    formula: 'P ⊆ NP.  P = NP?  (Unsolved — $1,000,000 prize)',
    formulaDesc: 'P: solvable in polynomial time. NP: verifiable in polynomial time. Are they equal?',
    keyFacts: ['P = problems solvable in O(n^k) time', 'NP = problems verifiable in O(n^k) time', 'NP-Complete = hardest problems in NP (all NP problems reduce to them)', 'Cook\'s Theorem: SAT is NP-Complete (first NP-Complete problem, 1971)', 'TSP, Graph Coloring, Knapsack, Hamiltonian: all NP-Complete'],
    properties: [
      { name: 'Class P', desc: 'Problems solvable in polynomial time. Examples: Sorting, Shortest Path, MST, Bipartite Matching.' },
      { name: 'Class NP', desc: 'Problems where a given solution can be VERIFIED in polynomial time. P ⊆ NP.' },
      { name: 'NP-Complete', desc: 'A problem X is NP-Complete if: X ∈ NP, AND every NP problem reduces to X in polynomial time.' },
      { name: 'NP-Hard', desc: 'At least as hard as NP-Complete, but may not be in NP itself. Examples: Halting Problem.' }
    ],
    detailedTheory: 'The P vs NP question asks whether every problem whose solution can be quickly verified can also be quickly solved. If P = NP, modern cryptography would collapse (breaking RSA is NP). If P ≠ NP (strongly believed), some problems are fundamentally intractable. For NP-Hard problems, we resort to approximation algorithms, heuristics, or special-case tractable instances.',
    interviewQs: ['What does it mean for a problem to be NP-Complete?', 'Prove that if you can solve an NP-Complete problem in polynomial time, then P = NP.', 'What is polynomial reduction?', 'Name 5 NP-Complete problems.'],
    references: [
      { label: 'GeeksforGeeks: P vs NP', url: 'https://www.geeksforgeeks.org/np-completeness-set-1/' },
      { label: 'Clay Mathematics: Millennium Prize', url: 'https://www.claymath.org/millennium-problems/p-vs-np-problem' },
      { label: 'YouTube: P vs NP – Computerphile', url: 'https://www.youtube.com/watch?v=YX40hbAHx3s' }
    ],
    algorithms: [
      { name: 'SAT Problem', id: 'exp-96', desc: 'Boolean satisfiability — NP-Complete.', complexity: 'NP-Complete' },
      { name: 'Graph Coloring', id: 'exp-97', desc: 'M-coloring — NP-Complete.', complexity: 'NP-Complete' }
    ]
  }
};
