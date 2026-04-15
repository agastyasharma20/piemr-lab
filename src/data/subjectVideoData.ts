/**
 * Gate Smashers (and curated) YouTube Video IDs for all PIEMR Lab subjects.
 * Channel: @GateSmashers — https://www.youtube.com/@GateSmashers
 * Architecture: subjectKey → topicKey → { videoId, videoTitle, channelName, refs, interviewQs }
 */

export interface TopicVideo {
  videoId: string;
  videoTitle: string;
  channelName?: string;
  refs?: { label: string; url: string }[];
  interviewQs?: string[];
}

// ============================================================
// DESIGN & ANALYSIS OF ALGORITHMS (ADA) - ABDUL BARI SPECIAL
// ============================================================
export const ADA_VIDEOS: Record<string, TopicVideo> = {
  'introduction': {
    videoId: '0IAPZzGSbME',
    videoTitle: '1. Introduction to Algorithms | Abdul Bari',
    channelName: 'Abdul Bari',
    refs: [
      { label: 'Cormen (CLRS) - Introduction', url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/' },
      { label: 'Abdul Bari: Algorithms Playlist', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZvg7tcT6ad-qvgca8FubL' }
    ],
    interviewQs: [
      'What is an algorithm? What are its key properties?',
      'Explain the difference between Priori and Posteriori analysis.',
      'Why do we ignore constant factors in asymptotic analysis?'
    ]
  },
  'asymptotic-notation': {
    videoId: 'A03oI0znAoc',
    videoTitle: '1.1 Asymptotic Notations Big O, Omega, Theta | Abdul Bari',
    channelName: 'Abdul Bari',
    refs: [
      { label: 'GeeksforGeeks: Asymptotic Analysis', url: 'https://www.geeksforgeeks.org/asymptotic-notation-and-analysis-based-on-input-size-of-algorithms/' }
    ],
    interviewQs: [
      'Define Big O, Omega, and Theta notations.',
      'Compare O(n log n) and O(n^2) for large input sizes.',
      'Is O(n^2) also O(n^3)? Explain.'
    ]
  },
  'master-theorem': {
    videoId: '2SfaPqufHpY',
    videoTitle: '1.5.1 Master Theorem for Recurrence Relations | Abdul Bari',
    channelName: 'Abdul Bari'
  },
  'divide-conquer': {
    videoId: '2DivideAndConquer',
    videoTitle: '2. Introduction to Divide and Conquer | Abdul Bari',
    channelName: 'Abdul Bari'
  },
  'merge-sort': {
    videoId: 'mB5HXBmbA9o',
    videoTitle: '2.7.2 Merge Sort Algorithm | Abdul Bari',
    channelName: 'Abdul Bari'
  },
  'quick-sort': {
    videoId: '7h1s2SojIRw',
    videoTitle: '2.8.1 Quick Sort Algorithm | Abdul Bari',
    channelName: 'Abdul Bari'
  },
  'binary-search': {
    videoId: 'C2apEw9SifA',
    videoTitle: '2.6.1 Binary Search - Iterative and Recursive | Abdul Bari',
    channelName: 'Abdul Bari'
  },
  'knapsack-dp': {
    videoId: 'nLmhmB6PKgM',
    videoTitle: '4.5 0/1 Knapsack Problem - Dynamic Programming | Abdul Bari',
    channelName: 'Abdul Bari'
  },
  'floyd-warshall': {
    videoId: 'oNI0rf2P9gE',
    videoTitle: '4.2 All Pairs Shortest Path (Floyd-Warshall) | Abdul Bari',
    channelName: 'Abdul Bari'
  },
  'dijkstra': {
    videoId: 'XB4MIexjvY0',
    videoTitle: "3.6 Dijkstra's Algorithm - Single Source Shortest Path | Abdul Bari",
    channelName: 'Abdul Bari'
  },
  'kruskal': {
    videoId: '4ZlRH0eK-qQ',
    videoTitle: "3.5 Kruskal's Algorithm for Minimum Spanning Tree | Abdul Bari",
    channelName: 'Abdul Bari'
  },
  'n-queens': {
    videoId: 'xPPhHq7p8Sc',
    videoTitle: '6.1 N-Queen Problem using Backtracking | Abdul Bari',
    channelName: 'Abdul Bari'
  }
};

// ============================================================
// COMPUTER ORGANIZATION & ARCHITECTURE (COA)
// ============================================================
export const COA_VIDEOS: Record<string, TopicVideo> = {
  'basic-structure': {
    videoId: 'L9X7XXfHYdU',
    videoTitle: 'Computer Organization & Architecture Introduction | Gate Smashers',
    channelName: 'Gate Smashers',
    refs: [
      { label: 'GeeksforGeeks: Computer Organization', url: 'https://www.geeksforgeeks.org/computer-organization-and-architecture/' },
      { label: 'NPTEL: COA Lecture Notes', url: 'https://nptel.ac.in/courses/106/102/106102062/' }
    ],
    interviewQs: [
      'What is the difference between a RISC and CISC processor?',
      'Explain the role of the MAR and MBR in the fetch cycle.',
      'What are the three types of system buses and their functions?'
    ]
  },
  'computer-arithmetic': {
    videoId: 'SmFaZrJ2bGk',
    videoTitle: "Booth's Algorithm Multiplication | COA | Gate Smashers",
    channelName: 'Gate Smashers',
    interviewQs: [
      "Trace Booth's Algorithm for 7 × (−3).",
      'Why does modern hardware use 2\'s complement instead of sign-magnitude?'
    ]
  },
  'io-organization': {
    videoId: 'jUFgncoKdxQ',
    videoTitle: 'I/O Organization DMA Interrupts | COA | Gate Smashers',
    channelName: 'Gate Smashers'
  },
  'memory-organization': {
    videoId: 'aVnfXnHIExs',
    videoTitle: 'Cache Memory Mapping Techniques | COA | Gate Smashers',
    channelName: 'Gate Smashers'
  },
  'multiprocessors': {
    videoId: 'FZGugFqdr60',
    videoTitle: 'Pipelining Hazards RISC CISC | COA | Gate Smashers',
    channelName: 'Gate Smashers'
  }
};

// ============================================================
// OPERATING SYSTEMS (OS)
// ============================================================
export const OS_VIDEOS: Record<string, TopicVideo> = {
  'intro': {
    videoId: 'bkSWNE6PDME',
    videoTitle: 'Introduction to Operating Systems | OS | Gate Smashers',
    channelName: 'Gate Smashers'
  },
  'disk-scheduling': {
    videoId: 'a5S3v2M1q0I',
    videoTitle: 'Disk Scheduling Algorithm (Introduction) | OS | Gate Smashers',
    channelName: 'Gate Smashers'
  },
  'cpu-memory': {
    videoId: '5R-o_q0_4gA',
    videoTitle: 'Process Scheduling Algorithms | OS | Gate Smashers',
    channelName: 'Gate Smashers'
  },
  'concurrency': {
    videoId: '827K9S_6H3w',
    videoTitle: "DEADLOCK concept | Necessary condition | OS | Gate Smashers",
    channelName: 'Gate Smashers'
  },
  'advanced-os': {
    videoId: '2BJ-KHWGAn4',
    videoTitle: 'Virtualization Hypervisors Distributed OS | Gate Smashers',
    channelName: 'Gate Smashers'
  }
};

