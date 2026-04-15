
export interface TopicContent {
  id: string;
  title: string;
  badge: string;
  description: string;
  detailedTheory: string;
  analogy: string;
  simulation?: {
    type: 'disk' | 'cpu' | 'page' | 'terminal' | 'ipc-producer' | 'ipc-reader' | 'ipc-philosopher' | 'bankers';
    algorithm?: string;
  };
  mathematics: {
    formula: string;
    explanation: string;
  }[];
  interviewQs: string[];
  videoId: string;
  videoTitle: string;
  quiz: {
    question: string;
    options: string[];
    answer: number;
    explanation?: string;
  }[];
}

export const OS_TOPIC_DATA: Record<string, TopicContent> = {

  // ═══════════════════════════════════════════════════
  // INTRODUCTION TO OS
  // ═══════════════════════════════════════════════════
  'intro': {
    id: 'intro',
    title: 'Introduction to Operating Systems',
    badge: 'Core Architecture',
    description: 'The foundational software layer that bridges user applications and raw hardware architecture.',
    detailedTheory: 'An Operating System (OS) is the permanent resident software that manages hardware resources and provides common services for computer programs. It acts as an intermediary between users and computer hardware, handling tasks like memory management, process scheduling, and file system control. The kernel is the core component that has complete control over everything in the system, while the shell provides the user interface.',
    analogy: 'An OS is like a city government. It doesn\'t build products itself but manages roads (memory bus), allocates land (disk space), and coordinates citizens (processes) so they can work efficiently.',
    simulation: { type: 'terminal' },
    mathematics: [
      { formula: 'T = N / t', explanation: 'System Throughput: Number of processes completed per unit time.' },
      { formula: 'U = (T_busy / T_total) × 100', explanation: 'CPU Utilization: Percentage of time the CPU is actively executing.' }
    ],
    interviewQs: [
      'What is the difference between Kernel Mode and User Mode?',
      'Explain the concept of a System Call.',
      'What are the primary functions of an OS?'
    ],
    videoId: 'bkSWNE6PDME',
    videoTitle: 'OS Introduction | Gate Smashers',
    quiz: [
      { question: 'Which mode provides restricted access to hardware?', options: ['Kernel Mode', 'User Mode', 'Simulated Mode', 'Safe Mode'], answer: 1, explanation: 'User mode is the non-privileged mode where applications run.' },
      { question: 'What is the "trap" instruction used for?', options: ['To stop a process', 'To branch to kernel from user mode', 'To delete a file', 'To allocate memory'], answer: 1, explanation: 'A trap is a software-generated interrupt used to transition from user mode to kernel mode.' }
    ]
  },

  'intro/functions-types': {
    id: 'intro-functions-types',
    title: 'OS Functions & Types',
    badge: 'Classification',
    description: 'Classification of operating systems by structure, purpose, and computing environment.',
    detailedTheory: 'Operating systems are classified into several types: Batch OS (groups similar jobs), Time-Sharing OS (allows multiple users simultaneously), Distributed OS (manages a group of independent computers), Real-Time OS (bounded response time), and Network OS (manages network resources). Key functions include Process Management, Memory Management, File System Management, I/O Device Management, and Security & Protection.',
    analogy: 'Types of OS are like types of restaurants: a batch OS is a buffet (serve groups), a real-time OS is a fast-food counter (strict timing), and a distributed OS is a chain franchise (multiple locations, unified management).',
    mathematics: [
      { formula: 'Response Time = Service Time + Wait Time', explanation: 'Total time from request submission to first response.' }
    ],
    interviewQs: [
      'What are the differences between Batch OS and Time-Sharing OS?',
      'What makes a Real-Time OS different from a general-purpose OS?',
      'List 5 primary functions of an operating system.'
    ],
    videoId: 'bkSWNE6PDME',
    videoTitle: 'OS Types | Gate Smashers',
    quiz: [
      { question: 'Which OS type guarantees bounded response time?', options: ['Batch OS', 'Time-Sharing OS', 'Real-Time OS', 'Network OS'], answer: 2, explanation: 'RTOS guarantees that critical tasks are completed within a deadline.' }
    ]
  },

  'intro/strategy': {
    id: 'intro-strategy',
    title: 'OS Design Strategy',
    badge: 'Architecture',
    description: 'Architectural strategies and design philosophies behind modern operating system kernels.',
    detailedTheory: 'OS design follows key strategies: Monolithic Kernels (all services in kernel space — Linux), Microkernels (minimal kernel + user-space servers — Minix), Hybrid Kernels (combination — Windows NT), and Exokernels (minimal abstraction, application-level resource management). The choice impacts performance, security, and modularity.',
    analogy: 'A monolithic kernel is like a single large factory doing everything under one roof, while a microkernel is like outsourcing departments to specialized contractors.',
    mathematics: [
      { formula: 'Context Switch Cost = Save + Restore + Flush', explanation: 'The overhead of switching between processes includes saving/restoring registers and flushing TLBs.' }
    ],
    interviewQs: [
      'Compare Monolithic and Microkernel architectures.',
      'What is a Hybrid Kernel?',
      'Why is context switching expensive?'
    ],
    videoId: 'bkSWNE6PDME',
    videoTitle: 'OS Architecture | Gate Smashers',
    quiz: [
      { question: 'Linux uses which kernel type?', options: ['Microkernel', 'Monolithic', 'Exokernel', 'Nanokernel'], answer: 1, explanation: 'Linux uses a monolithic kernel where all OS services run in kernel space.' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // DISK SCHEDULING (Parent + All Algorithms)
  // ═══════════════════════════════════════════════════
  'disk-scheduling': {
    id: 'disk-scheduling',
    title: 'Disk Scheduling Algorithms',
    badge: 'I/O Efficiency',
    description: 'Optimizing the mechanical movement of the disk head to minimize seek time and maximize data throughput.',
    detailedTheory: 'Disk scheduling is the process of managing I/O requests for a disk. Since seek time is the most expensive part of a disk access, algorithms like SCAN, C-SCAN, and LOOK aim to minimize the total head movement by ordering requests strategically. The three components of disk access time are: Seek Time (move head to cylinder), Rotational Latency (wait for sector), and Transfer Time (read/write data).',
    analogy: 'Disk scheduling is like an elevator (SCAN algorithm). It moves in one direction picking up passengers (requests) until it reaches the top, then reverses.',
    simulation: { type: 'disk', algorithm: 'FCFS' },
    mathematics: [
      { formula: 'Disk Access = Seek + Rotation + Transfer', explanation: 'Total time for a single disk I/O operation.' },
      { formula: 'Total Head Movement = Σ|current - next|', explanation: 'Sum of absolute differences between consecutive cylinder positions.' }
    ],
    interviewQs: [
      'What is the difference between SCAN and C-SCAN?',
      'Why is FCFS considered inefficient for disk scheduling?',
      'Explain the significance of the "Elevator" algorithm.'
    ],
    videoId: '9W7Lid_Xm78',
    videoTitle: 'Disk Scheduling Algorithms | Gate Smashers',
    quiz: [
      { question: 'Which algorithm is known as the Elevator algorithm?', options: ['FCFS', 'SSTF', 'SCAN', 'C-LOOK'], answer: 2, explanation: 'SCAN moves the head like an elevator, servicing requests in one direction then reversing.' },
      { question: 'What is the main goal of disk scheduling?', options: ['Minimize Seek Time', 'Minimize CPU usage', 'Reduce RAM usage', 'Increase disk capacity'], answer: 0, explanation: 'Seek time is the most expensive mechanical component of disk I/O.' }
    ]
  },

  'disk-scheduling/fcfs': {
    id: 'disk-fcfs',
    title: 'FCFS Disk Scheduling',
    badge: 'First Come First Served',
    description: 'The simplest disk scheduling algorithm — processes requests in the exact order they arrive in the queue.',
    detailedTheory: 'First Come First Served (FCFS) is the simplest disk scheduling algorithm. It services I/O requests in the order they arrive, regardless of the current head position. While it is fair and starvation-free, it often results in large total head movements because the disk arm zigzags across the entire platter. This makes it impractical for high-performance systems but useful as a baseline for comparison.\n\nExample: If requests arrive as [98, 183, 37, 122, 14, 124, 65, 67] and the head starts at 53, FCFS would visit them in that exact order, resulting in significant unnecessary movement.',
    analogy: 'FCFS is like a shopkeeper who serves customers in the exact order they enter, even if one customer needs something right next to what the shopkeeper is already holding.',
    simulation: { type: 'disk', algorithm: 'FCFS' },
    mathematics: [
      { formula: 'Total Head Movement = |53-98| + |98-183| + |183-37| + |37-122| + ...', explanation: 'Sum of absolute distances between consecutive positions.' },
      { formula: 'Average Seek = Total Movement / Number of Requests', explanation: 'Average distance the head travels per request.' }
    ],
    interviewQs: [
      'What is the main disadvantage of FCFS disk scheduling?',
      'Is FCFS starvation-free? Why?',
      'Calculate total head movement for queue [98,183,37,122,14] starting at position 53.'
    ],
    videoId: '9W7Lid_Xm78',
    videoTitle: 'FCFS Disk Scheduling | Gate Smashers',
    quiz: [
      { question: 'What is the main disadvantage of FCFS?', options: ['Starvation', 'High seek time', 'Complex implementation', 'Unfair ordering'], answer: 1, explanation: 'FCFS can result in very high total seek time because requests are not optimized for head position.' },
      { question: 'FCFS disk scheduling is also called?', options: ['FIFO', 'LIFO', 'Priority', 'Round Robin'], answer: 0, explanation: 'FCFS follows First-In-First-Out ordering, processing requests in arrival order.' }
    ]
  },

  'disk-scheduling/sstf': {
    id: 'disk-sstf',
    title: 'SSTF Disk Scheduling',
    badge: 'Shortest Seek Time First',
    description: 'Selects the request closest to the current head position, minimizing immediate seek time at each step.',
    detailedTheory: 'Shortest Seek Time First (SSTF) selects the I/O request that requires the least head movement from the current position. It significantly reduces total seek time compared to FCFS. However, SSTF can cause starvation — requests far from the current head position may wait indefinitely if closer requests keep arriving.\n\nSSTF is essentially a greedy algorithm: it makes the locally optimal choice at each step without considering global optimization.',
    analogy: 'SSTF is like a delivery driver who always goes to the nearest house next, even if it means never reaching a house at the far end of town.',
    simulation: { type: 'disk', algorithm: 'SSTF' },
    mathematics: [
      { formula: 'Next Request = argmin(|head - request_i|)', explanation: 'Always select the request closest to the current head position.' },
      { formula: 'Starvation Risk ∝ Distance from Hot Zone', explanation: 'Requests far from the concentrated request zone may starve.' }
    ],
    interviewQs: [
      'How does SSTF differ from FCFS?',
      'Can SSTF cause starvation? Explain.',
      'Is SSTF optimal? Why or why not?'
    ],
    videoId: '9W7Lid_Xm78',
    videoTitle: 'SSTF Disk Scheduling | Gate Smashers',
    quiz: [
      { question: 'What is the main drawback of SSTF?', options: ['High seek time', 'Starvation', 'Complexity', 'No fairness guarantee'], answer: 1, explanation: 'SSTF can cause starvation for requests that are far from the current head position.' }
    ]
  },

  'disk-scheduling/scan': {
    id: 'disk-scan',
    title: 'SCAN Disk Scheduling',
    badge: 'Elevator Algorithm',
    description: 'The disk arm moves in one direction servicing requests, then reverses — like an elevator.',
    detailedTheory: 'The SCAN algorithm (Elevator Algorithm) moves the disk arm from one end to the other, servicing requests along the way. When it reaches the end of the disk, it reverses direction and services requests on the return trip. This eliminates the starvation problem of SSTF while providing reasonable seek times.\n\nSCAN always goes to the end of the disk before reversing, even if there are no more requests in that direction. This is the key difference from LOOK.',
    analogy: 'SCAN is exactly like an elevator in a building — it goes up, stops at every requested floor, reaches the top, then goes down stopping at requested floors.',
    simulation: { type: 'disk', algorithm: 'SCAN' },
    mathematics: [
      { formula: 'Max Head Movement ≤ 2 × (Max Cylinder)', explanation: 'In the worst case, the head traverses the entire disk twice.' },
      { formula: 'Avg Wait = f(position, direction)', explanation: 'Average wait depends on request position relative to current head direction.' }
    ],
    interviewQs: [
      'Why is SCAN called the Elevator Algorithm?',
      'How does SCAN prevent starvation?',
      'What is the difference between SCAN and C-SCAN?'
    ],
    videoId: '9W7Lid_Xm78',
    videoTitle: 'SCAN Disk Scheduling | Gate Smashers',
    quiz: [
      { question: 'SCAN is also known as?', options: ['Greedy Algorithm', 'Elevator Algorithm', 'Circular Algorithm', 'Priority Algorithm'], answer: 1, explanation: 'SCAN moves in one direction like an elevator, servicing all requests then reversing.' }
    ]
  },

  'disk-scheduling/c-scan': {
    id: 'disk-cscan',
    title: 'C-SCAN Disk Scheduling',
    badge: 'Circular SCAN',
    description: 'A variant of SCAN that provides more uniform wait times by always scanning in one direction.',
    detailedTheory: 'Circular SCAN (C-SCAN) is a modification of SCAN that treats the disk cylinders as a circular list. The head moves from one end to the other servicing requests, but when it reaches the other end, it immediately jumps back to the beginning without servicing requests on the return trip. This provides more uniform wait times compared to SCAN, as it avoids the bias where requests just behind the head have waited longest.',
    analogy: 'C-SCAN is like a bus route that only picks up passengers going one way — when it reaches the end, it drives back empty to the starting point.',
    simulation: { type: 'disk', algorithm: 'C-SCAN' },
    mathematics: [
      { formula: 'Uniformity: Wait ≈ constant for all positions', explanation: 'C-SCAN provides more uniform response times than standard SCAN.' }
    ],
    interviewQs: [
      'How does C-SCAN differ from SCAN?',
      'Why does C-SCAN provide more uniform wait times?',
      'When would you choose C-SCAN over SCAN?'
    ],
    videoId: '9W7Lid_Xm78',
    videoTitle: 'C-SCAN Disk Scheduling | Gate Smashers',
    quiz: [
      { question: 'In C-SCAN, what happens when the head reaches the end?', options: ['Reverses direction', 'Stops', 'Jumps to beginning', 'Services in reverse'], answer: 2, explanation: 'C-SCAN jumps back to the beginning without servicing requests on the return trip.' }
    ]
  },

  'disk-scheduling/look': {
    id: 'disk-look',
    title: 'LOOK Disk Scheduling',
    badge: 'Optimized SCAN',
    description: 'An improved SCAN that reverses direction at the last request instead of going to the disk end.',
    detailedTheory: 'LOOK is an optimization of SCAN. Instead of always moving to the end of the disk, the head only moves as far as the last request in the current direction, then reverses. This saves unnecessary head movement beyond the last request.\n\nLOOK "looks ahead" to see if there are any more requests in the current direction — if not, it reverses immediately.',
    analogy: 'LOOK is like an elevator that checks if anyone pressed a higher floor button — if not, it starts going back down immediately instead of going all the way to the top.',
    simulation: { type: 'disk', algorithm: 'LOOK' },
    mathematics: [
      { formula: 'Head Movement < SCAN', explanation: 'LOOK always has equal or less head movement than SCAN since it reverses earlier.' }
    ],
    interviewQs: [
      'How does LOOK improve upon SCAN?',
      'Why doesn\'t LOOK go to the end of the disk?',
      'Compare LOOK and C-LOOK.'
    ],
    videoId: '9W7Lid_Xm78',
    videoTitle: 'LOOK Disk Scheduling | Gate Smashers',
    quiz: [
      { question: 'LOOK reverses at?', options: ['Disk end', 'Last request in direction', 'Middle of disk', 'Random position'], answer: 1, explanation: 'LOOK only goes as far as the last request, not to the physical end of the disk.' }
    ]
  },

  'disk-scheduling/c-look': {
    id: 'disk-clook',
    title: 'C-LOOK Disk Scheduling',
    badge: 'Circular LOOK',
    description: 'Combines C-SCAN\'s uniform wait with LOOK\'s efficiency — the most practical disk scheduling algorithm.',
    detailedTheory: 'Circular LOOK (C-LOOK) is the most practical disk scheduling algorithm in real systems. Like LOOK, it only goes as far as the last request in the current direction. Like C-SCAN, it only services requests in one direction and jumps back to the lowest request (not the beginning of the disk) when done. This provides the best balance of efficiency and uniform response times.',
    analogy: 'C-LOOK is like a smart bus that only goes as far as the last waiting passenger, then teleports back to where the first new passenger is waiting.',
    simulation: { type: 'disk', algorithm: 'C-LOOK' },
    mathematics: [
      { formula: 'C-LOOK ≤ C-SCAN ≤ SCAN in head movement', explanation: 'C-LOOK typically has the lowest total head movement among the SCAN family.' }
    ],
    interviewQs: [
      'Why is C-LOOK considered the best practical disk scheduling algorithm?',
      'How does C-LOOK combine features of LOOK and C-SCAN?',
      'Compare all SCAN variants in terms of head movement.'
    ],
    videoId: '9W7Lid_Xm78',
    videoTitle: 'C-LOOK Disk Scheduling | Gate Smashers',
    quiz: [
      { question: 'C-LOOK jumps back to?', options: ['Disk start', 'First pending request', 'Middle', 'Head position 0'], answer: 1, explanation: 'C-LOOK jumps to the lowest pending request, not the physical start of the disk.' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // CPU SCHEDULING (Parent + All Algorithms)
  // ═══════════════════════════════════════════════════
  'cpu-scheduling': {
    id: 'cpu-scheduling',
    title: 'CPU Scheduling Algorithms',
    badge: 'Process Management',
    description: 'Determining which process in the ready queue gets the CPU next — the heart of multiprogramming.',
    detailedTheory: 'CPU Scheduling is the basis of multiprogrammed operating systems. By switching the CPU among processes, the OS makes the computer more productive. The CPU scheduler selects from the processes in the ready queue and allocates the CPU to one of them. Scheduling criteria include CPU Utilization, Throughput, Turnaround Time, Waiting Time, and Response Time.',
    analogy: 'CPU Scheduling is like a waiter in a restaurant deciding which table to serve next — prioritize efficiency while keeping all customers happy.',
    simulation: { type: 'cpu', algorithm: 'FCFS' },
    mathematics: [
      { formula: 'Turnaround = Completion - Arrival', explanation: 'Total time from process arrival to completion.' },
      { formula: 'Waiting = Turnaround - Burst', explanation: 'Time spent waiting in the ready queue.' },
      { formula: 'Response = First_Run - Arrival', explanation: 'Time from arrival to first execution.' }
    ],
    interviewQs: [
      'What is the difference between preemptive and non-preemptive scheduling?',
      'What scheduling criteria should be maximized vs minimized?',
      'Explain the concept of context switching.'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'CPU Scheduling | Gate Smashers',
    quiz: [
      { question: 'Which metric should be minimized?', options: ['CPU Utilization', 'Throughput', 'Waiting Time', 'Response Time'], answer: 2, explanation: 'Waiting time should be minimized; it represents idle time for a process in the ready queue.' }
    ]
  },

  'cpu-scheduling/fcfs': {
    id: 'cpu-fcfs',
    title: 'FCFS CPU Scheduling',
    badge: 'Non-Preemptive',
    description: 'The simplest CPU scheduling algorithm — processes execute in the order they arrive in the ready queue.',
    detailedTheory: 'First Come First Served (FCFS) CPU scheduling is non-preemptive: once a process starts executing, it runs until completion. The main drawback is the Convoy Effect — short processes stuck behind a long process experience unnecessarily high waiting times.\n\nExample: Processes P1(24ms), P2(3ms), P3(3ms) arriving at t=0: Average waiting time = (0 + 24 + 27)/3 = 17ms. If P2 and P3 ran first: (0 + 3 + 6)/3 = 3ms.',
    analogy: 'FCFS is like a line at a bank where no one is allowed to skip, even if their transaction takes 1 second — everyone waits for the person in front.',
    simulation: { type: 'cpu', algorithm: 'FCFS' },
    mathematics: [
      { formula: 'Convoy Effect: Avg Wait ∝ Max Burst Time', explanation: 'A single long process increases everyone\'s waiting time.' },
      { formula: 'Avg WT = Σ(WT_i) / n', explanation: 'Average waiting time across all processes.' }
    ],
    interviewQs: [
      'What is the Convoy Effect?',
      'Is FCFS preemptive or non-preemptive?',
      'Calculate average waiting time for: P1=24, P2=3, P3=3.'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'FCFS CPU Scheduling | Gate Smashers',
    quiz: [
      { question: 'What problem does FCFS suffer from?', options: ['Starvation', 'Convoy Effect', 'Deadlock', 'Thrashing'], answer: 1, explanation: 'The Convoy Effect occurs when short processes wait behind a long process, increasing average waiting time.' }
    ]
  },

  'cpu-scheduling/sjf': {
    id: 'cpu-sjf',
    title: 'SJF CPU Scheduling',
    badge: 'Optimal Average Wait',
    description: 'Schedules the process with the shortest burst time next — provably optimal for minimizing average waiting time.',
    detailedTheory: 'Shortest Job First (SJF) selects the process with the shortest CPU burst time. It is provably optimal for minimizing average waiting time. However, it requires knowing burst times in advance (often predicted via exponential averaging). SJF can be preemptive (SRTF) or non-preemptive. The main drawback is starvation: long processes may never execute if short processes keep arriving.',
    analogy: 'SJF is like an express lane at a supermarket — people with fewer items (shorter burst) go first.',
    simulation: { type: 'cpu', algorithm: 'SJF' },
    mathematics: [
      { formula: 'τ(n+1) = α × t(n) + (1-α) × τ(n)', explanation: 'Exponential averaging to predict next burst time, where α controls recency weight.' },
      { formula: 'SJF is optimal: Minimizes Σ(WT)', explanation: 'No other algorithm can achieve a lower total waiting time without preemption assumptions.' }
    ],
    interviewQs: [
      'Why is SJF said to be optimal?',
      'How do we predict burst time in SJF?',
      'Can SJF cause starvation? How to solve it?'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'SJF CPU Scheduling | Gate Smashers',
    quiz: [
      { question: 'SJF is optimal for?', options: ['Throughput', 'Response time', 'Average waiting time', 'CPU utilization'], answer: 2, explanation: 'SJF is proven to give the minimum average waiting time among non-preemptive algorithms.' }
    ]
  },

  'cpu-scheduling/srtf': {
    id: 'cpu-srtf',
    title: 'SRTF (Preemptive SJF)',
    badge: 'Shortest Remaining Time',
    description: 'The preemptive version of SJF — a running process is preempted if a new process arrives with shorter remaining time.',
    detailedTheory: 'Shortest Remaining Time First (SRTF) is the preemptive version of SJF. Whenever a new process arrives, SRTF compares its burst time with the remaining time of the currently executing process. If the new process has shorter remaining time, it preempts the current process. SRTF gives optimal average waiting time but has higher overhead due to frequent context switches.',
    analogy: 'SRTF is like a hospital ER where a patient being treated gets interrupted if someone arrives with a more urgent (shorter-to-fix) condition.',
    simulation: { type: 'cpu', algorithm: 'SRTF' },
    mathematics: [
      { formula: 'Preempt if: new_burst < remaining_burst', explanation: 'The decision criterion for preempting the current process.' },
      { formula: 'Context Switches > SJF', explanation: 'SRTF causes more context switches than non-preemptive SJF.' }
    ],
    interviewQs: [
      'How does SRTF differ from SJF?',
      'What is the overhead of SRTF?',
      'When would you prefer SJF over SRTF?'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'SRTF Scheduling | Gate Smashers',
    quiz: [
      { question: 'SRTF is also known as?', options: ['Non-preemptive SJF', 'Preemptive SJF', 'Priority Scheduling', 'FCFS variant'], answer: 1, explanation: 'SRTF is the preemptive version of Shortest Job First scheduling.' }
    ]
  },

  'cpu-scheduling/round-robin': {
    id: 'cpu-rr',
    title: 'Round Robin Scheduling',
    badge: 'Time-Sharing',
    description: 'Each process gets a small fixed time slice (quantum) — the foundation of modern time-sharing systems.',
    detailedTheory: 'Round Robin (RR) assigns a fixed time quantum to each process in circular order. If a process doesn\'t finish within its quantum, it is preempted and placed at the back of the ready queue. RR is designed for time-sharing systems and provides fair CPU allocation.\n\nThe key design challenge is choosing the right time quantum: too small → excessive context switches (overhead); too large → degenerates into FCFS.',
    analogy: 'RR is like a teacher giving each student exactly 2 minutes to present — if you don\'t finish, you go to the back of the line and wait for another turn.',
    simulation: { type: 'cpu', algorithm: 'Round Robin' },
    mathematics: [
      { formula: 'If quantum → ∞, RR becomes FCFS', explanation: 'With a very large quantum, no preemption occurs.' },
      { formula: 'If quantum → 0, RR becomes Processor Sharing', explanation: 'Each process appears to have its own CPU.' },
      { formula: 'Context Switches ≈ N × (Burst / Quantum)', explanation: 'Number of context switches increases as quantum decreases.' }
    ],
    interviewQs: [
      'What happens if the time quantum is too small?',
      'What happens if the time quantum is too large?',
      'How does RR ensure fairness?'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'Round Robin Scheduling | Gate Smashers',
    quiz: [
      { question: 'If time quantum → ∞, Round Robin becomes?', options: ['SJF', 'FCFS', 'Priority', 'SRTF'], answer: 1, explanation: 'With infinite quantum, no preemption occurs — first process runs to completion like FCFS.' }
    ]
  },

  'cpu-scheduling/priority': {
    id: 'cpu-priority',
    title: 'Priority Scheduling',
    badge: 'Priority-Based',
    description: 'Each process is assigned a priority number — the CPU is allocated to the highest priority process.',
    detailedTheory: 'Priority Scheduling assigns a priority to each process. The CPU is allocated to the process with the highest priority (lowest number = highest priority in some systems). It can be preemptive or non-preemptive. The main problem is indefinite blocking (starvation) — low-priority processes may never execute. The solution is Aging: gradually increasing the priority of waiting processes.',
    analogy: 'Priority scheduling is like a VIP line at a club — VIPs get in first, but regular people might wait forever unless the bouncer (aging) starts letting them in.',
    simulation: { type: 'cpu', algorithm: 'Priority' },
    mathematics: [
      { formula: 'Aging: Priority += time_waited × rate', explanation: 'Gradually increase priority to prevent starvation.' },
      { formula: 'Effective Priority = Base + Age Bonus', explanation: 'A process\'s actual scheduling priority increases over time.' }
    ],
    interviewQs: [
      'What is the starvation problem in priority scheduling?',
      'How does aging solve starvation?',
      'Is priority scheduling preemptive or non-preemptive?'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'Priority Scheduling | Gate Smashers',
    quiz: [
      { question: 'How is starvation solved in Priority Scheduling?', options: ['Round Robin', 'Aging', 'Preemption', 'Burst prediction'], answer: 1, explanation: 'Aging gradually increases the priority of waiting processes so they eventually get CPU time.' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // MEMORY MANAGEMENT (Parent + Page Replacement)
  // ═══════════════════════════════════════════════════
  'memory-management': {
    id: 'memory-management',
    title: 'Memory Management & Virtual Memory',
    badge: 'Address Spaces',
    description: 'How the OS allocates, tracks, and virtualizes physical memory for concurrent process execution.',
    detailedTheory: 'Memory management ensures efficient allocation of RAM among processes. Key concepts include Paging (divide memory into fixed-size frames), Segmentation (divide by logical units), and Virtual Memory (use disk as extended RAM via demand paging). Page Replacement algorithms determine which page to evict when RAM is full.',
    analogy: 'Virtual memory is like a desk with limited space — you keep active papers on the desk (RAM) and store the rest in a filing cabinet (disk), swapping as needed.',
    simulation: { type: 'page', algorithm: 'FIFO' },
    mathematics: [
      { formula: 'Page Fault Rate = Faults / References', explanation: 'Ratio of page faults to total memory accesses.' },
      { formula: 'EAT = (1-p) × m + p × (page_fault_time)', explanation: 'Effective Access Time considering page fault probability p.' }
    ],
    interviewQs: [
      'What is the difference between Paging and Segmentation?',
      'Explain Demand Paging.',
      'What is Belady\'s Anomaly?'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'Virtual Memory | Gate Smashers',
    quiz: [
      { question: 'Belady\'s Anomaly occurs in?', options: ['LRU', 'FIFO', 'Optimal', 'All algorithms'], answer: 1, explanation: 'Belady\'s Anomaly: more frames can lead to more page faults, only seen in FIFO.' }
    ]
  },

  'memory-management/fifo': {
    id: 'page-fifo',
    title: 'FIFO Page Replacement',
    badge: 'First In First Out',
    description: 'The oldest page in memory is replaced first — simple but susceptible to Belady\'s Anomaly.',
    detailedTheory: 'FIFO Page Replacement replaces the page that has been in memory the longest. It uses a simple queue. While easy to implement, FIFO suffers from Belady\'s Anomaly — increasing the number of frames can sometimes increase page faults (counterintuitive). This makes FIFO unreliable for performance-critical systems.',
    analogy: 'FIFO is like rotating food in a fridge — you always throw out the oldest item, even if you eat it frequently.',
    simulation: { type: 'page', algorithm: 'FIFO' },
    mathematics: [
      { formula: 'Queue: Oldest → Evicted', explanation: 'The page at the front of the queue (oldest) is always chosen for replacement.' },
      { formula: 'Belady\'s: More Frames ≠ Fewer Faults', explanation: 'FIFO is the only major algorithm vulnerable to this anomaly.' }
    ],
    interviewQs: [
      'What is Belady\'s Anomaly?',
      'Why is FIFO not ideal for page replacement?',
      'Trace FIFO with reference string 7,0,1,2,0,3,0,4 using 3 frames.'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'FIFO Page Replacement | Gate Smashers',
    quiz: [
      { question: 'Which anomaly affects FIFO?', options: ['Starvation', 'Deadlock', 'Belady\'s Anomaly', 'Convoy Effect'], answer: 2, explanation: 'Belady\'s Anomaly: increasing frames can increase faults in FIFO.' }
    ]
  },

  'memory-management/lru': {
    id: 'page-lru',
    title: 'LRU Page Replacement',
    badge: 'Least Recently Used',
    description: 'Replaces the page that hasn\'t been used for the longest time — a good approximation of optimal.',
    detailedTheory: 'Least Recently Used (LRU) replaces the page that has not been accessed for the longest time. It is based on the principle of temporal locality: pages used recently are likely to be used again soon. LRU does not suffer from Belady\'s Anomaly (it\'s a stack algorithm). Implementation can use counter-based tracking or a stack data structure.',
    analogy: 'LRU is like cleaning your closet by removing clothes you haven\'t worn in the longest time — recent favorites stay.',
    simulation: { type: 'page', algorithm: 'LRU' },
    mathematics: [
      { formula: 'LRU does NOT have Belady\'s Anomaly', explanation: 'LRU is a stack algorithm, so more frames always means ≤ faults.' },
      { formula: 'Implementation: Counter or Stack', explanation: 'Counter: timestamp each access. Stack: move used page to top.' }
    ],
    interviewQs: [
      'Why is LRU considered better than FIFO?',
      'How is LRU implemented in hardware?',
      'What is a Stack Algorithm?'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'LRU Page Replacement | Gate Smashers',
    quiz: [
      { question: 'LRU is based on which principle?', options: ['Spatial Locality', 'Temporal Locality', 'Sequential Access', 'Random Access'], answer: 1, explanation: 'LRU uses temporal locality: recently used pages are likely to be used again soon.' }
    ]
  },

  'memory-management/optimal': {
    id: 'page-optimal',
    title: 'Optimal Page Replacement',
    badge: 'Theoretical Best',
    description: 'Replaces the page that will not be used for the longest time in the future — the theoretical lower bound.',
    detailedTheory: 'The Optimal (OPT/MIN) algorithm replaces the page that will not be used for the longest duration in the future. It guarantees the minimum number of page faults for a given reference string, making it the theoretical benchmark. However, it requires future knowledge of the reference string, making it impossible to implement in practice. It is used only for comparison and analysis.',
    analogy: 'Optimal is like having a crystal ball — you remove the page you know you won\'t need the longest. Perfect but impossible in real life.',
    simulation: { type: 'page', algorithm: 'Optimal' },
    mathematics: [
      { formula: 'OPT gives minimum possible page faults', explanation: 'No algorithm can produce fewer faults than OPT for the same reference string and frame count.' }
    ],
    interviewQs: [
      'Why can\'t OPT be implemented in real systems?',
      'What is OPT used for?',
      'Compare FIFO, LRU, and OPT faults for the same reference string.'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'Optimal Page Replacement | Gate Smashers',
    quiz: [
      { question: 'Why is OPT not practically implementable?', options: ['Too slow', 'Too complex', 'Requires future knowledge', 'Uses too much memory'], answer: 2, explanation: 'OPT needs to know the future reference string, which is impossible in real systems.' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // CPU & MEMORY (Legacy mapping)
  // ═══════════════════════════════════════════════════
  'cpu-memory': {
    id: 'cpu-memory',
    title: 'CPU & Memory Allocation',
    badge: 'Resource Management',
    description: 'Mastering how the kernel allocates processor time and primary memory to competing processes.',
    detailedTheory: 'Process scheduling determines which process in the ready queue is allocated the CPU. Memory management ensures that processes have enough space to run while protecting the kernel\'s own memory space. Common concepts include Paging, Segmentation, and Virtual Memory.',
    analogy: 'CPU Scheduling is like a waiter in a restaurant deciding which table to serve next to ensure everyone stays happy.',
    mathematics: [
      { formula: 'WaitTime = StartTime - ArrivalTime', explanation: 'Waiting Time for a single process.' },
      { formula: 'TurnaroundTime = ExitTime - ArrivalTime', explanation: 'Total time a process spends in the system.' }
    ],
    interviewQs: [
      'What is the difference between Paging and Segmentation?',
      'Explain the significance of the PCB.',
      'What is Turnaround Time?'
    ],
    videoId: '5R-o_q0_4gA',
    videoTitle: 'Process Scheduling | Gate Smashers',
    quiz: [
      { question: 'Which scheduling algorithm can lead to starvation?', options: ['Round Robin', 'FCFS', 'SJF', 'Multilevel Queue'], answer: 2, explanation: 'SJF can cause starvation for longer jobs.' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // CONCURRENCY & DEADLOCK
  // ═══════════════════════════════════════════════════
  'concurrency': {
    id: 'concurrency',
    title: 'Concurrency & Deadlocks',
    badge: 'System Stability',
    description: 'Solving the challenges of multiple processes accessing shared resources simultaneously.',
    detailedTheory: 'Concurrency control involves synchronization mechanisms like Semaphores and Mutexes. Without these, systems face Race Conditions. Deadlock is a state where a set of processes are blocked because each is holding a resource and waiting for another one. The four necessary conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.',
    analogy: 'Concurrency is like multiple chefs in a small kitchen. Without coordination, they bump into each other or wait forever for the same knife (Deadlock).',
    simulation: { type: 'ipc-producer' },
    mathematics: [
      { formula: 'Available = Total - Allocated', explanation: 'Banker\'s Algorithm check: ensuring system remains in a safe state.' },
      { formula: 'Need[i] = Max[i] - Allocation[i]', explanation: 'Calculating additional resource requirements for process i.' }
    ],
    interviewQs: [
      'What are the four necessary conditions for Deadlock?',
      'Difference between Mutex and Semaphore.',
      'Explain the Producer-Consumer problem.'
    ],
    videoId: 'q6v20BIdg-A',
    videoTitle: 'Deadlock Conditions | Gate Smashers',
    quiz: [
      { question: 'Which is NOT a condition for deadlock?', options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption', 'Circular Wait'], answer: 2, explanation: 'No-preemption is the condition — if preemption IS possible, deadlocks can be broken.' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // ADVANCED OS
  // ═══════════════════════════════════════════════════
  'advanced-os': {
    id: 'advanced-os',
    title: 'Advanced & Distributed Systems',
    badge: 'Modern Architecture',
    description: 'Exploring Distributed Systems, Real-Time OS (RTOS), and Cloud Containerization.',
    detailedTheory: 'Advanced OS topics cover Distributed Systems (multiple independent CPUs appearing as one), Real-Time systems (bounded response times), and virtualization technologies like Docker and Kubernetes that isolate execution environments.',
    analogy: 'A Distributed OS is like a franchise (e.g., McDonald\'s). Every branch works independently but follows the same central menu and rules.',
    mathematics: [
      { formula: 'Speedup = 1 / ((1-f) + f/n)', explanation: 'Amdahl\'s Law: Maximum improvement possible by parallelizing fraction f across n processors.' }
    ],
    interviewQs: [
      'What is a Real-Time Operating System (RTOS)?',
      'Explain the difference between Monolithic and Microkernel.',
      'What is Distributed Shared Memory?'
    ],
    videoId: 'Vv96H-J6fyo',
    videoTitle: 'RTOS vs Normal OS | Gate Smashers',
    quiz: [
      { question: 'Which kernel is more modular?', options: ['Monolithic', 'Microkernel', 'Hybrid', 'Exokernel'], answer: 1, explanation: 'Microkernels move as much as possible out of kernel space into user space.' }
    ]
  }
};
