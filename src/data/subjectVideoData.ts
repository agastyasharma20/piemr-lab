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
// COMPUTER ORGANIZATION & ARCHITECTURE (COA)
// ============================================================
export const COA_VIDEOS: Record<string, TopicVideo> = {
  'basic-structure': {
    videoId: 'mCaJuNBjMxw',
    videoTitle: 'Basic Structure of Computer | COA | Gate Smashers',
    channelName: 'Gate Smashers',
    refs: [
      { label: 'GeeksforGeeks: Computer Organization', url: 'https://www.geeksforgeeks.org/computer-organization-and-architecture/' },
      { label: 'NPTEL: COA Lecture Notes', url: 'https://nptel.ac.in/courses/106/102/106102062/' },
      { label: 'William Stallings: COA Textbook', url: 'https://www.pearson.com/en-us/subject-catalog/p/computer-organization-and-architecture/P200000003482' },
    ],
    interviewQs: [
      'What is the difference between a RISC and CISC processor?',
      'Explain the role of the MAR and MBR in the fetch cycle.',
      'What are the three types of system buses and their functions?',
      'Describe the fetch-decode-execute instruction cycle.',
      'What is the difference between hardwired and microprogrammed control unit?'
    ]
  },
  'computer-arithmetic': {
    videoId: 'SmFaZrJ2bGk',
    videoTitle: "Booth's Algorithm Multiplication | COA | Gate Smashers",
    channelName: 'Gate Smashers',
    refs: [
      { label: "GeeksforGeeks: Booth's Algorithm", url: "https://www.geeksforgeeks.org/computer-organization-booth-s-algorithm/" },
      { label: 'GeeksforGeeks: 2s Complement', url: 'https://www.geeksforgeeks.org/2s-complement/' },
      { label: 'Visualgo: Arithmetic Demo', url: 'https://visualgo.net/' },
    ],
    interviewQs: [
      "Trace Booth's Algorithm for 7 × (−3).",
      'Why does modern hardware use 2\'s complement instead of sign-magnitude?',
      'What is the difference between a Half Adder and Full Adder?',
      'Explain the Restoring Division algorithm.',
      'How does IEEE 754 floating point represent ±∞ and NaN?'
    ]
  },
  'io-organization': {
    videoId: 'jUFgncoKdxQ',
    videoTitle: 'I/O Organization DMA Interrupts | COA | Gate Smashers',
    channelName: 'Gate Smashers',
    refs: [
      { label: 'GeeksforGeeks: DMA', url: 'https://www.geeksforgeeks.org/direct-memory-access-dma/' },
      { label: 'GeeksforGeeks: I/O Organization', url: 'https://www.geeksforgeeks.org/io-interface-interrupt-dma-mode/' },
      { label: 'NPTEL: I/O Systems', url: 'https://nptel.ac.in/courses/106/102/106102062/' },
    ],
    interviewQs: [
      'What is DMA and how does it differ from programmed I/O?',
      'Explain "Cycle Stealing" in DMA operations.',
      'What is the difference between synchronous and asynchronous data transfer?',
      'How does interrupt-driven I/O work?',
      'Compare USB, PCI, and SCSI interfaces.'
    ]
  },
  'memory-organization': {
    videoId: 'aVnfXnHIExs',
    videoTitle: 'Cache Memory Mapping Techniques | COA | Gate Smashers',
    channelName: 'Gate Smashers',
    refs: [
      { label: 'GeeksforGeeks: Cache Memory', url: 'https://www.geeksforgeeks.org/cache-memory-in-computer-organization/' },
      { label: 'GeeksforGeeks: Virtual Memory', url: 'https://www.geeksforgeeks.org/virtual-memory-in-operating-system/' },
      { label: 'CMU: Memory Hierarchy Lecture', url: 'https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/11-memory-hierarchy.pdf' },
    ],
    interviewQs: [
      'Explain Direct, Associative, and Set-Associative cache mapping.',
      'What is the difference between write-through and write-back policy?',
      'How does a TLB (Translation Lookaside Buffer) speed up virtual memory access?',
      'What is thrashing in virtual memory?',
      'Calculate the effective memory access time given hit ratio and cache/RAM latency.'
    ]
  },
  'multiprocessors': {
    videoId: 'FZGugFqdr60',
    videoTitle: 'Pipelining Hazards RISC CISC | COA | Gate Smashers',
    channelName: 'Gate Smashers',
    refs: [
      { label: 'GeeksforGeeks: Pipelining', url: 'https://www.geeksforgeeks.org/computer-organization-and-architecture-pipelining-set-1-execution-stages-throughput/' },
      { label: 'GeeksforGeeks: RISC vs CISC', url: 'https://www.geeksforgeeks.org/risc-and-cisc-architectures/' },
      { label: 'Patterson & Hennessy: Computer Architecture', url: 'https://www.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6' },
    ],
    interviewQs: [
      'What are the three types of pipeline hazards?',
      "Calculate speedup: 4-stage pipeline, 200 instructions, 1ns clock.",
      'Why is branch prediction critical for modern CPUs?',
      'How does SIMD differ from scalar instruction execution?',
      'Explain tightly vs. loosely coupled multiprocessor systems.'
    ]
  }
};

// ============================================================
// OPERATING SYSTEMS (OS)
// ============================================================
export const OS_VIDEOS: Record<string, TopicVideo> = {
  'intro': {
    videoId: 'bkSWNE6PDME',
    videoTitle: 'Introduction to Operating Systems | OS | Gate Smashers',
    channelName: 'Gate Smashers',
    refs: [
      { label: 'GeeksforGeeks: OS Introduction', url: 'https://www.geeksforgeeks.org/introduction-of-operating-system-set-1/' },
      { label: 'OS: Three Easy Pieces (Free Textbook)', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
      { label: 'NPTEL: Operating Systems', url: 'https://nptel.ac.in/courses/106/105/106105214/' },
    ],
    interviewQs: [
      'What is the difference between a process and a thread?',
      'Explain kernel mode vs user mode protection.',
      'What is a system call? Give 5 examples.',
      'What are the main functions of an Operating System?',
      'Explain the concept of a Context Switch.'
    ]
  },
  'disk-scheduling': {
    videoId: 'vu2jBLZiybo',
    videoTitle: 'Disk Scheduling Algorithms FCFS SSTF SCAN | OS | Gate Smashers',
    channelName: 'Gate Smashers',
    refs: [
      { label: 'GeeksforGeeks: Disk Scheduling', url: 'https://www.geeksforgeeks.org/disk-scheduling-algorithms/' },
      { label: 'GeeksforGeeks: SCAN Algorithm', url: 'https://www.geeksforgeeks.org/scan-elevator-disk-scheduling-algorithms/' },
      { label: 'Visualgo: Disk Scheduling Simulation', url: 'https://visualgo.net/' },
    ],
    interviewQs: [
      'Calculate total head movement for FCFS, SSTF, SCAN for requests [98, 183, 37, 122, 14, 124, 65, 67] with head at 53.',
      'Why does SSTF cause starvation?',
      'What is the difference between SCAN and C-SCAN?',
      'When would you prefer FCFS over SSTF?',
      'What is rotational latency and how does it affect disk performance?'
    ]
  },
  'cpu-memory': {
    videoId: 'To6SEXDKEHo',
    videoTitle: 'CPU Scheduling Algorithms Process States | OS | Gate Smashers',
    channelName: 'Gate Smashers',
    refs: [
      { label: 'GeeksforGeeks: CPU Scheduling', url: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/' },
      { label: 'GeeksforGeeks: Paging', url: 'https://www.geeksforgeeks.org/paging-in-operating-system/' },
      { label: 'OS: Three Easy Pieces: Virtualization', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf' },
    ],
    interviewQs: [
      'Draw the 5-state process model with all transitions.',
      'Compare FCFS, SJF, Round Robin, and Priority scheduling.',
      'Calculate average waiting time for SJF: P1=6, P2=8, P3=7, P4=3.',
      'What is Belady\'s Anomaly in page replacement?',
      'Explain internal vs external fragmentation.'
    ]
  },
  'concurrency': {
    videoId: '0rXaRIIThOw',
    videoTitle: "Deadlock Detection Banker's Algorithm | OS | Gate Smashers",
    channelName: 'Gate Smashers',
    refs: [
      { label: "GeeksforGeeks: Banker's Algorithm", url: "https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/" },
      { label: 'GeeksforGeeks: Semaphore', url: 'https://www.geeksforgeeks.org/semaphores-in-process-synchronization/' },
      { label: 'GeeksforGeeks: Deadlock', url: 'https://www.geeksforgeeks.org/deadlock-in-os/' },
    ],
    interviewQs: [
      'State the 4 necessary conditions for a deadlock (Coffman conditions).',
      "Trace Banker's Algorithm: 3 processes, 3 resources, given Allocation and Max matrices.",
      'What is the difference between a Mutex and a Semaphore?',
      'Explain the Producer-Consumer problem and its semaphore solution.',
      'What is a race condition? How do you prevent it?'
    ]
  },
  'advanced-os': {
    videoId: '2BJ-KHWGAn4',
    videoTitle: 'Virtualization Hypervisors Distributed OS | Gate Smashers',
    channelName: 'Gate Smashers',
    refs: [
      { label: 'GeeksforGeeks: Virtualization', url: 'https://www.geeksforgeeks.org/virtualization-cloud-computing-types/' },
      { label: 'GeeksforGeeks: Distributed Systems', url: 'https://www.geeksforgeeks.org/distributed-systems/' },
      { label: 'OS: Three Easy Pieces: Concurrency', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf' },
    ],
    interviewQs: [
      'What is the difference between Type-1 and Type-2 hypervisors?',
      'Explain the CAP theorem in distributed systems.',
      'What is the difference between a microkernel and monolithic kernel?',
      'How does Docker differ from a Virtual Machine?',
      'What is a distributed file system? Name examples.'
    ]
  }
};
