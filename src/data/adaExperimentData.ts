export const adaExperiments = [
  // 1-4: Fundamentals & Arrays
  {
    id: 'exp-1',
    number: 1,
    title: '1D & 2D Array Operations',
    aim: 'Implementing fundamental memory layouts using 1D and 2D arrays and performing basic operations.',
    theory: 'Arrays are contiguous memory blocks storing homogeneous data. 1D arrays utilize linear offset mapping: Index = Base + i * size. 2D arrays use Row-Major (Base + (i*Cols + j) * size) or Column-Major order.',
    constraints: 'N, M <= 1000. Access Time: O(1).',
    analogy: '1D array is like a single-story row of pigeonholes. 2D array is a multi-story building where each room is identified by (Floor, Room#).',
    algorithm: '1. Declare array. 2. Fetch input via loops. 3. Perform addition/access/traversal.',
    quiz: [{ question: 'Row major formula for A[i][j] in M columns?', options: ['i*M + j', 'j*M + i', 'i+j', 'i*j'], answer: 'i*M + j' }]
  },
  {
    id: 'exp-2',
    number: 2,
    title: 'Insertion in 1D Array',
    aim: 'Performing insertion operations at first, middle, and last indices of a 1D array.',
    theory: 'Insertion requires shifting existing elements if space is available. Inserting at the start is O(N) due to shifting all elements, while at the end is O(1).',
    constraints: 'Max size N must accommodate the new element.',
    analogy: 'Inserting a person into a crowded queue: everyone behind the spot must step back to make room.',
    algorithm: '1. If start: shift all from i=N down to 0. 2. If middle: shift from i=N down to pos. 3. Place element.',
    quiz: [{ question: 'Worst case complexity for inserting at index 0?', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'], answer: 'O(N)' }]
  },
  {
    id: 'exp-3',
    number: 3,
    title: 'Deletion in 1D Array',
    aim: 'Performing deletion operations at first, middle, and last indices of a 1D array.',
    theory: 'Deletion involves removing an element and shifting subsequent elements forward to maintain contiguity. Removing from the end is O(1); from the start is O(N).',
    constraints: 'Array must not be empty.',
    analogy: 'Removing a book from a shelf: you push all remaining books together to fill the gap.',
    algorithm: '1. Identify pos. 2. For i from pos to N-1: A[i] = A[i+1]. 3. Reduce size count.',
    quiz: [{ question: 'Deletion at the end of an array takes?', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'], answer: 'O(1)' }]
  },
  {
    id: 'exp-4',
    number: 4,
    title: 'Matrix Addition (2D)',
    aim: 'Computing the sum of two 2D matrices with user-defined dimensions.',
    theory: 'Matrix addition is only possible if both matrices have identical dimensions (M x N). Summation is element-wise: C[i][j] = A[i][j] + B[i][j].',
    constraints: 'Dimensions (R1, C1) must equal (R2, C2).',
    analogy: 'Adding two spreadsheets where each cell in the first matches a cell in the second.',
    algorithm: '1. Read R, C. 2. Use nested loops (i, j). 3. C[i][j] = A[i][j] + B[i][j].',
    quiz: [{ question: 'Addition complexity for N x N matrix?', options: ['O(N)', 'O(N^2)', 'O(N^3)', 'O(2^N)'], answer: 'O(N^2)' }]
  },

  // 5-7: Searching
  {
    id: 'exp-5',
    number: 5,
    title: 'Linear Search',
    aim: 'Implementing sequential searching logic to find a target element.',
    theory: 'Linear Search visits every element from start to finish. It does not require sorted data. Worst case: O(N) when element is last or missing.',
    constraints: 'Any array type (sorted or unsorted).',
    analogy: 'Checking every room in a hallway one-by-one to find a specific friend.',
    algorithm: '1. Loop through i=0 to N-1. 2. If A[i] == x return i. 3. End loop.',
    quiz: [{ question: 'Time complexity of Linear Search?', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'], answer: 'O(N)' }]
  },
  {
    id: 'exp-6',
    number: 6,
    title: 'Binary Search (Iterative)',
    aim: 'Efficiently searching a sorted array using the iterative Divide & Conquer approach.',
    theory: 'Binary Search halves the search space in each step. It requires pre-sorted data. Complexity: O(log N).',
    constraints: 'Data MUST be sorted.',
    analogy: 'Looking for a word in a dictionary by opening the middle and deciding which half to search next.',
    algorithm: '1. Low=0, High=N-1. 2. mid = (Low+High)/2. 3. If x < A[mid] High=mid-1; else Low=mid+1.',
    quiz: [{ question: 'What property must the input have for Binary Search?', options: ['Be Large', 'Be Sorted', 'Be Positive', 'Be Random'], answer: 'Be Sorted' }]
  },
  {
    id: 'exp-7',
    number: 7,
    title: 'Binary Search (Recursive)',
    aim: 'Implementing Binary Search using recursion.',
    theory: 'Uses the same logic as iterative search but stores the execution state in the function call stack.',
    constraints: 'Sorted input only.',
    analogy: 'Delegating the search task: "Check the middle. If it is not there, tell the next person to search the left/right half."',
    algorithm: '1. Base Case: if L > H return -1. 2. if A[mid]==x return mid. 3. Else recurse on left or right half.',
    quiz: [{ question: 'Space complexity of recursive vs iterative search?', options: ['Recursive is higher', 'Recursive is lower', 'Both equal', 'Iteration higher'], answer: 'Recursive is higher' }]
  },

  // 8-12: Sorting
  {
    id: 'exp-8',
    number: 8,
    title: 'Bubble Sort',
    aim: 'Implementing the simplest comparison-based sorting technique.',
    theory: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. "Bubbles" the largest element to the end.',
    constraints: 'N <= 1000 for efficient execution.',
    analogy: 'Heavy bubbles sink in water while light ones rise. Here, large numbers "sink" to the end of the array.',
    algorithm: '1. Outer loop i=0..N-1. 2. Inner loop j=0..N-i-1. 3. if A[j] > A[j+1] swap.',
    quiz: [{ question: 'Worst case complexity of Bubble Sort?', options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(log N)'], answer: 'O(N^2)' }]
  },
  {
    id: 'exp-9',
    number: 9,
    title: 'Insertion Sort',
    aim: 'Implementing sorting by building a sorted sub-sequence.',
    theory: 'Consumes one input element per repetition and grows a sorted output list. At each iteration, it removes one element and inserts it into the correct position in the sorted part.',
    constraints: 'Best for nearly sorted data.',
    analogy: 'Sorting a hand of playing cards: you pick a card and "insert" it into its correct spot among the cards you already hold.',
    algorithm: '1. Loop i from 1 to N. 2. key = A[i]. 3. Shift A[j] > key to the right. 4. A[j+1] = key.',
    quiz: [{ question: 'Complexity of Insertion Sort on already sorted data?', options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'], answer: 'O(N)' }]
  },
  {
    id: 'exp-10',
    number: 10,
    title: 'Selection Sort',
    aim: 'Sorting by repeatedly selecting the minimum element.',
    theory: 'Divides the list into a sorted and unsorted part. It repeatedly picks the smallest element from the unsorted part and moves it to the end of the sorted part.',
    constraints: 'O(N^2) even in the best case.',
    analogy: 'Finding the shortest person in a row and swapping them with the person at the front.',
    algorithm: '1. Loop i=0..N. 2. find min in range [i..N]. 3. swap A[i] with A[min].',
    quiz: [{ question: 'Number of swaps in Selection Sort inner loop?', options: ['1 per outer loop', 'N per outer loop', 'N^2', 'Zero'], answer: '1 per outer loop' }]
  },
  {
    id: 'exp-11',
    number: 11,
    title: 'Quick Sort',
    aim: 'Implementing the high-performance Pivot-based sorting algorithm.',
    theory: 'Pick a "pivot" element and partition the array around it. After partitioning, all elements smaller than pivot are on the left, and larger ones on the right. Recurse.',
    constraints: 'Worst case O(N^2) if pivot selection is poor.',
    analogy: 'A library sorting books by picking a random book and putting all older books to its left and newer books to its right.',
    algorithm: '1. Choose pivot. 2. Partition A[L..H]. 3. QuickSort(left) and QuickSort(right).',
    quiz: [{ question: 'Standard average complexity of Quick Sort?', options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(log N)'], answer: 'O(N log N)' }]
  },
  {
    id: 'exp-12',
    number: 12,
    title: 'Merge Sort',
    aim: 'Implementing Stable sorting using recursive merging.',
    theory: 'A Divide and Conquer algorithm that divides the array into halves, sorts them, and then merges the sorted halves.',
    constraints: 'Requires O(N) auxiliary space.',
    analogy: 'Breaking a pack of cards into two halves, sorting each half, and then "zipping" them back together in order.',
    algorithm: '1. mid=L+(H-L)/2. 2. MergeSort(left), MergeSort(right). 3. Merge results.',
    quiz: [{ question: 'Merge sort is based on which paradigm?', options: ['Greedy', 'B&B', 'Divide and Conquer', 'DP'], answer: 'Divide and Conquer' }]
  },

  // 13-14: Advanced Matrix
  {
    id: 'exp-13',
    number: 13,
    title: 'Matrix Multiplication',
    aim: 'Implementing standard O(N^3) matrix multiplication logic.',
    theory: 'The number of columns in the first matrix must equal the number of rows in the second. C[i][j] = Σ (A[i][k] * B[k][j]).',
    constraints: 'C1 == R2.',
    analogy: 'Calculating the total cost of multiple orders where row i is the items in order i and column j is the price at store j.',
    algorithm: '1. Loop i, j, k. 2. C[i][j] += A[i][k] * B[k][j].',
    quiz: [{ question: 'Standard multiplication complexity?', options: ['O(N^2)', 'O(N^3)', 'O(N log N)', 'O(1)'], answer: 'O(N^3)' }]
  },
  {
    id: 'exp-14',
    number: 14,
    title: "Strassen's Matrix Multiplication",
    aim: 'Implementing the advanced sub-cubic matrix multiplication algorithm.',
    theory: 'Strassen\'s reduces the number of recursive multiplications from 8 to 7, resulting in a complexity of O(N^2.81). It is faster for very large matrices.',
    constraints: 'Input dimensions should ideally be a power of 2.',
    analogy: 'A shortcut mathematical trick that allows you to multiply large numbers with fewer manual calculations.',
    algorithm: '1. Divide matrices into 4 sub-matrices. 2. Compute 7 products (P1-P7). 3. Combine to form result.',
    quiz: [{ question: 'Complexity of Strassen\'s?', options: ['O(N^3)', 'O(N^2.81)', 'O(N^2)', 'O(N log N)'], answer: 'O(N^2.81)' }]
  },

  // 15-20: Greedy & DP
  {
    id: 'exp-15',
    number: 15,
    title: 'Fractional Knapsack (Greedy)',
    aim: 'Maximizing value by picking items based on ratio (divisible items).',
    theory: 'In fractional knapsack, items can be broken. Greedy choice based on profit/weight ratio always leads to an optimal solution.',
    constraints: 'Weights and Profits are non-negative.',
    analogy: 'Filling a bag with loose gold dust and mercury rather than whole bars.',
    algorithm: '1. Sort by Ratio P/W descending. 2. Add full items until weight exceeded. 3. Take fraction of next item.',
    quiz: [{ question: 'Basis of sorting for Fractional Knapsack?', options: ['Profit only', 'Weight only', 'Value/Weight ratio', 'Random'], answer: 'Value/Weight ratio' }]
  },
  {
    id: 'exp-16',
    number: 16,
    title: '0/1 Knapsack (DP)',
    aim: 'Maximizing value by choosing whole items using dynamic programming.',
    theory: 'Unlike fractional, items cannot be broken. DP stores solutions to sub-problems to avoid redundant calculations.',
    constraints: 'O(N*W) complexity.',
    analogy: 'Selecting the best combination of electronic gadgets for a heist: you either take a laptop or you don\'t.',
    algorithm: '1. Create Table dp[N+1][W+1]. 2. if wt[i] <= w: include or exclude. 3. Return dp[N][W].',
    quiz: [{ question: 'Can we use Greedy for 0/1 Knapsack?', options: ['Yes', 'No', 'Only for sorted data', 'Sometimes'], answer: 'No' }]
  },
  {
    id: 'exp-17',
    number: 17,
    title: 'Huffman Coding',
    aim: 'Greedy implementation of optimal lossless data compression.',
    theory: 'Assigns variable-length bit strings to characters based on frequency. More frequent characters get shorter codes.',
    constraints: 'Frequencies must sum to 1.',
    analogy: 'Morse code: "E" is a single dot, whereas "Q" is much longer.',
    algorithm: '1. Build priority queue of frequencies. 2. Merge 2 min nodes into 1. 3. Repeat to form tree.',
    quiz: [{ question: 'Structure used for Huffman tree construction?', options: ['Stack', 'Priority Queue', 'Array', 'Hash Map'], answer: 'Priority Queue' }]
  },
  {
    id: 'exp-18',
    number: 18,
    title: 'Kruskal\'s MST',
    aim: 'Finding Minimum Spanning Tree using edge-based greedy selection.',
    theory: 'Sorts all edges and picks the smallest edge that does not form a cycle. Uses Union-Find data structure.',
    constraints: 'Weighted, connected, undirected graph.',
    analogy: 'Connecting cities with fiber optics using the cheapest possible cables and ensuring no redundant loops.',
    algorithm: '1. Sort edges by weight. 2. Add edge if it doesn\'t cause cycle. 3. Repeat for V-1 edges.',
    quiz: [{ question: 'Complexity of Kruskal\'s?', options: ['O(V^2)', 'O(E log E)', 'O(V+E)', 'O(V^3)'], answer: 'O(E log E)' }]
  },
  {
    id: 'exp-19',
    number: 19,
    title: 'Prim\'s MST',
    aim: 'Finding Minimum Spanning Tree using vertex-based greedy expansion.',
    theory: 'Starts from a vertex and grows the bridge by always picking the smallest weight edge connecting to an unvisited vertex.',
    constraints: 'Works best on dense graphs.',
    analogy: 'Spreading water on a surface: it always flows to the nearest available adjacent point.',
    algorithm: '1. pick root. 2. find min weight edge from visited to unvisited. 3. Update.',
    quiz: [{ question: 'Greedy choice in Prim\'s is based on?', options: ['Min edge globally', 'Min edge from visited set', 'Max edge', 'Random'], answer: 'Min edge from visited set' }]
  },
  {
    id: 'exp-20',
    number: 20,
    title: "Dijkstra's Shortest Path",
    aim: 'Single source shortest path calculation in weighted graphs.',
    theory: 'Finds the shortest path from a source vertex to all other vertices. Does not work with negative edge weights.',
    constraints: 'Weights >= 0.',
    analogy: 'A GPS finding the fastest route to every distinct neighborhood from your house.',
    algorithm: '1. Set dist=inf. 2. dist[source]=0. 3. Relax neighbors of min unvisited dist.',
    quiz: [{ question: 'Limitation of Dijkstra?', options: ['Slow', 'Fails on negative weights', 'Limited to 10 vertices', 'None'], answer: 'Fails on negative weights' }]
  },

  // 21-26: Graphs & Trees
  {
    id: 'exp-21',
    number: 21,
    title: 'Graph Repr (Matrix & List)',
    aim: 'Implementing graph storage using Adjacency Matrix and Adjacency List.',
    theory: 'Adjacency Matrix uses N x N space (V²). Adjacency List uses O(V+E) space and is better for sparse graphs.',
    constraints: 'V <= 1000 for matrix.',
    analogy: 'A flight map: Matrix is a grid of all city pairs; List is a phonebook of cities and where you can fly to from each.',
    algorithm: '1. Matrix: adj[u][v]=1. 2. List: array of vectors adj[u].push_back(v).',
    quiz: [{ question: 'Best representation for a sparse graph?', options: ['Matrix', 'List', 'Stack', 'Queue'], answer: 'List' }]
  },
  {
    id: 'exp-22',
    number: 22,
    title: 'Graph Repr (Adjacency List)',
    aim: 'Detailed implementation of the memory-efficient Adjacency List structure.',
    theory: 'Uses linked lists or dynamic arrays at each node index to store only the connected edges.',
    constraints: 'Memory O(V+E).',
    analogy: 'Social media: a list of users where each user has a list of their specific followers.',
    algorithm: '1. Define Graph class. 2. Use linked labels for neighbors. 3. Print mapping.',
    quiz: [{ question: 'Space complexity for V vertices and E edges?', options: ['O(V^2)', 'O(V+E)', 'O(E^2)', 'O(1)'], answer: 'O(V+E)' }]
  },
  {
    id: 'exp-23',
    number: 23,
    title: 'Binary Search Tree (BST)',
    aim: 'Implementing BST with Insertion, Deletion, Search, and Traversals.',
    theory: 'A hierarchical structure where left child < parent < right child. Allows search in O(h) where h is height.',
    constraints: 'Worst case h=N (skewed tree).',
    analogy: 'A filing system where every folder to the left is alphabetically smaller, and right is larger.',
    algorithm: '1. Insert: traverse till null. 2. Search: recurse left if x < root. 3. Traverse: Inorder (LPR).',
    quiz: [{ question: 'Traversal that gives sorted order in BST?', options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'], answer: 'Inorder' }]
  },
  {
    id: 'exp-24',
    number: 24,
    title: 'AVL Tree (Balanced)',
    aim: 'Implementing AVL Trees with rotation logic and height balancing.',
    theory: 'A self-balancing BST where the difference between heights of left and right subtrees is at most 1. Uses LL, RR, LR, RL rotations.',
    constraints: 'Maintains O(log N) search even in worst case.',
    analogy: 'A scale that automatically re-arranges its weights to stay perfectly level.',
    algorithm: '1. Standard insert. 2. Calculate balance factor. 3. If unbalanced, apply rotation.',
    quiz: [{ question: 'Balance factor range allowed in AVL?', options: ['0. 1', '-1, 0, 1', '-2 to 2', 'Any'], answer: '-1, 0, 1' }]
  },
  {
    id: 'exp-25',
    number: 25,
    title: 'Depth First Search (DFS)',
    aim: 'Exploring graph nodes recursively through deepest branches.',
    theory: 'Uses a stack (or recursion) to go as deep as possible before backtracking. Essential for detecting cycles and connectivity.',
    constraints: 'Requires a "visited" array.',
    analogy: 'Exploring a maze by following one hand along the wall until you hit a dead end.',
    algorithm: '1. Mark visited. 2. For neighbor: if not visited, DFS(neighbor).',
    quiz: [{ question: 'Data structure used in DFS?', options: ['Queue', 'Stack', 'Linked List', 'Table'], answer: 'Stack' }]
  },
  {
    id: 'exp-26',
    number: 26,
    title: 'Breadth First Search (BFS)',
    aim: 'Exploring graph nodes level-by-level using a queue.',
    theory: 'Explores neighbors at the current depth before moving to the next level. Finds the shortest path in unweighted graphs.',
    constraints: 'Uses a queue.',
    analogy: 'Ripples in a pond: the wave hits all nearest points before expanding further out.',
    algorithm: '1. Enqueue root. 2. Dequeue u, visit unvisited neighbors, Enqueue them.',
    quiz: [{ question: 'BFS finds which path in unweighted graphs?', options: ['Longest', 'Shortest', 'Random', 'Critical'], answer: 'Shortest' }]
  },
  {
    id: 'exp-27',
    number: 27,
    title: 'Heap Sort',
    aim: 'Implementing sorting by building a Max/Min Heap structure.',
    theory: 'A comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.',
    constraints: 'Complexity: O(N log N) for all cases.',
    analogy: 'A tournament where the winner (max) always rises to the top, then is moved to the hall of fame while others compete again.',
    algorithm: '1. Build Max Heap. 2. Swap max with last. 3. Heapify the root. 4. Reduce size and repeat.',
    quiz: [{ question: 'Complexity of building a heap from an array?', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N log N)'], answer: 'O(N)' }]
  },
  {
    id: 'exp-28',
    number: 28,
    title: 'Job Scheduling with Deadlines',
    aim: 'Maximizing profit by scheduling jobs before their respective deadlines.',
    theory: 'A Greedy approach where jobs are sorted by profit and assigned to the latest possible free slot before their deadline.',
    constraints: 'Greedy choice based on profit is optimal.',
    analogy: 'Managing a busy schedule with different assignments: you pick the one that pays most and do it at the last possible minute to keep earlier slots free.',
    algorithm: '1. Sort jobs by profit descending. 2. Find free slot <= deadline. 3. Assign job and mark slot.',
    quiz: [{ question: 'Greedy parameter for Job Scheduling?', options: ['Deadline', 'Profit', 'Duration', 'Arrival Time'], answer: 'Profit' }]
  },
  {
    id: 'exp-29',
    number: 29,
    title: 'Longest Common Subsequence (LCS)',
    aim: 'Finding the longest sequence that appears in the same relative order in two strings.',
    theory: 'A classic DP problem. If last chars match: 1 + LCS(prefix); else max(LCS with choice of skipping char).',
    constraints: 'O(N * M) space and time.',
    analogy: 'Comparing two different DNA strands to find the longest common genetic sequence.',
    algorithm: '1. Table L[M+1][N+1]. 2. if s1[i]==s2[j] L[i][j]=1+L[i-1][j-1]. 3. else L[i][j]=max(L[i-1][j], L[i][j-1]).',
    quiz: [{ question: 'Complexity of recursive LCS without memoization?', options: ['O(N)', 'O(N^2)', 'O(2^N)', 'O(N log N)'], answer: 'O(2^N)' }]
  },
  {
    id: 'exp-30',
    number: 30,
    title: 'N-Queens Problem',
    aim: 'Placing N chess queens on an NxN board so that no two queens threaten each other.',
    theory: 'A Backtracking problem. Place a queen in a row and check for conflicts. If no solution possible, backtrack and try next column.',
    constraints: 'N <= 12 for efficient execution.',
    analogy: 'Placing hostile soldiers in a field where they can fire in straight or diagonal lines; each needs to be safely out of range of others.',
    algorithm: '1. if row == N return true. 2. try columns 0 to N-1. 3. if safe, place and recurse. 4. if false, remove and backtrack.',
    quiz: [{ question: 'Paradigms used for N-Queens?', options: ['Greedy', 'Divide & Conquer', 'Backtracking', 'Branch & Bound'], answer: 'Backtracking' }]
  }
];
