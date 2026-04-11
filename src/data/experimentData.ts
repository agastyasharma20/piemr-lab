export interface Experiment {
  id: string;
  number: number;
  title: string;
  aim: string;
  theory: string;
  algorithm?: string;
  simulationType: 'unix-basics' | 'unix-commands' | 'macos' | 'disk-fcfs' | 'disk-sstf' | 'disk-scan' | 'disk-cscan' | 'cpu-fcfs' | 'cpu-sjf' | 'cpu-priority' | 'cpu-rr' | 'page-fifo' | 'page-lru' | 'page-optimal' | 'ipc-producer' | 'ipc-reader' | 'ipc-philosopher' | 'bankers';
  quiz: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
}

export const experiments: Experiment[] = [
  {
    id: 'exp-1',
    number: 1,
    title: 'Study about the basics of UNIX / LINUX',
    aim: 'To study the fundamental concepts, architecture, and history of the UNIX and LINUX operating systems.',
    theory: `
      <h3>Introduction to UNIX</h3>
      <p>UNIX is a powerful, multi-user, multi-tasking operating system developed in 1969 by Ken Thompson and Dennis Ritchie at AT&T Bell Labs. Its design philosophy emphasizes small, modular tools that can be combined to perform complex tasks.</p>
      
      <h3>Linux: The Open Source Successor</h3>
      <p>Linux is a Unix-like kernel created by Linus Torvalds in 1991. It is distributed under the GNU General Public License (GPL), making it free and open-source. Linux is highly modular and widely used in servers, supercomputers, and mobile devices (Android).</p>
      
      <h3>Linux Hardware-Software Hierarchy</h3>
      <ul>
        <li><b>Hardware:</b> The physical layer consisting of the CPU, RAM, and storage.</li>
        <li><b>Kernel:</b> The heart of the OS. It manages memory, processes, and hardware device drivers.</li>
        <li><b>Shell:</b> The interface between the user and the kernel. It interprets commands entered by the user.</li>
        <li><b>Users/Applications:</b> The top layer where end-user programs like editors, compilers, and browsers reside.</li>
      </ul>

      <h3>Key Design Properties</h3>
      <p><b>Multi-User:</b> Allows two or more users to work with their own programs simultaneously. 
      <b>Multi-Tasking:</b> Allows more than one program to run at the same time by sharing the CPU.
      <b>Portability:</b> Written in C, allowing it to be compiled and run on many different hardware architectures.</p>
    `,
    algorithm: `
      <ol>
        <li><b>Bootstrap Loader:</b> The system starts and small code in ROM loads the kernel into memory.</li>
        <li><b>Kernel Initialization:</b> The kernel initializes internal data structures and drivers for memory, CPU, and I/O.</li>
        <li><b>Init Process:</b> The kernel starts the 'init' process (PID 1), which is the ancestor of all other processes.</li>
        <li><b>Service Startup:</b> Init starts system daemons and networking services.</li>
        <li><b>Shell Spawning:</b> The system spawns a terminal interface (Shell) or GUI for user interaction.</li>
        <li><b>Command Execution:</b> User enters a command; Shell parses it and asks the Kernel to execute it via System Calls.</li>
      </ol>
    `,
    simulationType: 'unix-basics',
    quiz: [
      {
        question: "Who developed UNIX from the MULTICS project?",
        options: ["Linus Torvalds", "Ken Thomson & Dennis Ritchie", "Bill Gates", "Steve Jobs"],
        answer: 1,
        explanation: "Ken Thomson and Dennis Ritchie developed UNIX at AT&T Bell Labs in 1969."
      },
      {
        question: "What is the core part of the Linux operating system called?",
        options: ["Shell", "Kernel", "Compiler", "Terminal"],
        answer: 1,
        explanation: "The Kernel is the heart of the operating system, managing hardware and processes."
      }
    ]
  },
  {
    id: 'exp-2',
    number: 2,
    title: 'Study of Basic UNIX Commands',
    aim: 'To gain proficiency in using core UNIX command-line utilities for file system navigation and management.',
    theory: `
      <h3>CLI: The Command Line Interface</h3>
      <p>The CLI is the traditional way to interact with UNIX. Users enter commands as text, and the Shell (the command interpreter) executes them. Commands typically follow the format: <b>command [options] [arguments]</b>.</p>
      
      <h3>Standard Streams</h3>
      <ul>
        <li><b>Standard Input (stdin):</b> Usually the keyboard (File Descriptor 0).</li>
        <li><b>Standard Output (stdout):</b> Usually the screen (File Descriptor 1).</li>
        <li><b>Standard Error (stderr):</b> Where error messages are sent (File Descriptor 2).</li>
      </ul>

      <h3>Essential Command Categories</h3>
      <ul>
        <li><b>Informational:</b> 'date' (current time), 'cal' (calendar), 'whoami' (current user).</li>
        <li><b>Navigation:</b> 'pwd' (print working directory), 'cd' (change directory).</li>
        <li><b>File Management:</b> 'ls' (list), 'cat' (display content), 'touch' (create file).</li>
        <li><b>System:</b> 'uname' (kernel info), 'clear' (wipe screen).</li>
      </ul>
    `,
    algorithm: `
      <ol>
        <li><b>Input:</b> The user types a command string into the terminal/shell.</li>
        <li><b>Tokenization:</b> The shell splits the input into command name, options (flags like -l), and arguments (filenames).</li>
        <li><b>Path Resolution:</b> The shell looks for the command executable in the system path ($PATH).</li>
        <li><b>Process Spawning:</b> The shell uses system calls (fork and exec) to create a new process for the command.</li>
        <li><b>Execution:</b> The CPU runs the command's code.</li>
        <li><b>Output:</b> The command writes results to stdout or stderr.</li>
        <li><b>Return:</b> The process terminates and returns an exit status (0 for success) back to the shell.</li>
      </ol>
    `,
    simulationType: 'unix-commands',
    quiz: [
      {
        question: "Which command is used to list hidden files in UNIX?",
        options: ["ls -h", "ls -l", "ls -a", "ls -r"],
        answer: 2,
        explanation: "The -a option stands for 'all' and shows hidden files (those starting with a dot)."
      },
      {
        question: "How do you create an empty file named 'test.txt'?",
        options: ["mkdir test.txt", "touch test.txt", "cat test.txt", "cd test.txt"],
        answer: 1,
        explanation: "The touch command is primarily used to update timestamps but creates a file if it doesn't exist."
      }
    ]
  },
  {
    id: 'exp-3',
    number: 3,
    title: 'Study of MAC Operating System',
    aim: 'To understand the Darwin-based architecture of macOS and its proprietary system components.',
    theory: `
      <h3>Evolution of Apple OS</h3>
      <p>The modern macOS is built on a foundation called **Darwin**, which is a Unix-based system incorporating the Mach kernel and BSD utilities. It was derived from NeXTSTEP, the OS developed at Steve Jobs' company NeXT.</p>
      
      <h3>Layered Architecture</h3>
      <ul>
        <li><b>User Interface Layer (Aqua):</b> The high-quality graphical interface known for transparency, shadows, and the Dock.</li>
        <li><b>Application Layer (Frameworks):</b> Includes Cocoa (for native Mac apps) and Carbon (legacy support).</li>
        <li><b>Media Layer:</b> Handles 2D/3D graphics (Quartz, Metal), audio (Core Audio), and video (Core Video).</li>
        <li><b>Core Services Layer:</b> Provides low-level services like file management (Finder), networking, and security.</li>
        <li><b>Core OS / Darwin:</b> The Unix kernel (XNU), driver support (I/O Kit), and BSD system calls.</li>
      </ul>

      <h3>File System</h3>
      <p>Modern macOS uses the <b>APFS (Apple File System)</b>, which is optimized for SSDs and features snapshots, cloning, and native encryption.</p>
    `,
    algorithm: `
      <ol>
        <li><b>Boot Loader:</b> UEFI (Unified Extensible Firmware Interface) verifies hardware and loads 'boot.efi'.</li>
        <li><b>Kernel Load:</b> The XNU (X is Not Unix) hybrid kernel is loaded into memory.</li>
        <li><b>Launchd:</b> This is the first user-mode process. It replaces 'init' and manages all system daemons.</li>
        <li><b>User Environment:</b> The WindowServer starts, providing the graphical foundation for Aqua.</li>
        <li><b>LoginScreen:</b> The system authenticates the user and restores their session state.</li>
        <li><b>Finder:</b> The default file manager starts, allowing the user to interact with the system.</li>
      </ol>
    `,
    simulationType: 'macos',
    quiz: [
      {
        question: "What is the Unix-based core layer of macOS called?",
        options: ["Aqua", "Cocoa", "Darwin", "Quartz"],
        answer: 2,
        explanation: "Darwin is the foundational open-source Unix-based system at the heart of macOS."
      },
      {
        question: "Which graphics technology handles 2D rendering in macOS?",
        options: ["OpenGL", "DirectX", "Quartz", "QuickTime"],
        answer: 2,
        explanation: "Quartz is responsible for 2D rendering, fonts, and the Aqua interface visuals."
      }
    ]
  },
  {
    id: 'exp-4',
    number: 4,
    title: 'FCFS Disk Scheduling Algorithm',
    aim: 'To implement the First-Come, First-Served (FCFS) Disk Scheduling algorithm and calculate total head movement.',
    theory: `
      <h3>Disk Scheduling Fundamentals</h3>
      <p>Disk scheduling is performed by the operating system to manage I/O requests arriving for the disk. Since disk access is one of the slowest aspects of a computer system, efficient scheduling is crucial for performance.</p>
      
      <h3>FCFS (First-Come, First-Served)</h3>
      <p>This is the simplest form of disk scheduling. It services requests in the exact order they arrive in the disk queue. It is essentially a FIFO (First-In, First-Out) strategy.</p>
      
      <h3>Key Characteristics</h3>
      <ul>
        <li><b>Fairness:</b> Every request is eventually served in order, so no request is favored over another.</li>
        <li><b>No Starvation:</b> Since every request at the front of the queue is always served, no request waits indefinitely.</li>
        <li><b>Performance:</b> It does not provide the fastest service. Seek time can be very high if requests are spread across distant tracks.</li>
      </ul>
    `,
    algorithm: `
      <ol>
        <li><b>Initialize:</b> Get the initial position of the disk head and the sequence of disk track requests.</li>
        <li><b>Service:</b> Pick the first request in the queue.</li>
        <li><b>Calculate Movement:</b> Add the absolute difference between the current head position and the requested track to the 'Total Head Movement'.</li>
        <li><b>Update Head:</b> Move the disk head to the requested track.</li>
        <li><b>Repeat:</b> Move to the next request in the queue and repeat steps 3-4 until the queue is empty.</li>
        <li><b>Result:</b> Output the Total Head Movement.</li>
      </ol>
    `,
    simulationType: 'disk-fcfs',
    quiz: [
      {
        question: "In FCFS Disk Scheduling, which request is served first?",
        options: ["The one with shortest seek time", "The one that arrived first", "The one at the end of disk", "The one in the middle"],
        answer: 1,
        explanation: "As the name implies, First-Come First-Served processes requests in their arrival order."
      }
    ]
  },
  {
    id: 'exp-5',
    number: 5,
    title: 'SSTF Disk Scheduling Algorithm',
    aim: 'To implement the Shortest Seek Time First (SSTF) Disk Scheduling algorithm to minimize total head movement.',
    theory: `
      <h3>Shortest Seek Time First (SSTF)</h3>
      <p>SSTF selects the disk request that is closest to the current head position, regardless of the direction. It aims to minimize the seek time for the immediate next request.</p>
      
      <h3>Performance Analysis</h3>
      <ul>
        <li><b>High Throughput:</b> By always picking the closest request, it reduces overall seek time compared to FCFS.</li>
        <li><b>Starvation Risk:</b> If a steady stream of requests arrives near the head, requests far from the head might wait indefinitely (Starvation).</li>
      </ul>
      
      <h3>Comparison</h3>
      <p>While SSTF is better than FCFS in terms of performance, it lacks the fairness found in FCFS.</p>
    `,
    algorithm: `
      <ol>
        <li><b>Initialize:</b> Maintain a list of pending disk requests and the current head position.</li>
        <li><b>Find Nearest:</b> Search the pending list for the request with the minimum absolute distance from the current head.</li>
        <li><b>Calculate:</b> Update 'Total Head Movement' by adding the distance to this nearest request.</li>
        <li><b>Move & Remove:</b> Update the head position to the new track and remove that request from the pending list.</li>
        <li><b>Iterate:</b> Repeat steps 2-4 until all requests in the list have been serviced.</li>
      </ol>
    `,
    simulationType: 'disk-sstf',
    quiz: [{ question: "What is a major disadvantage of SSTF?", options: ["High overhead", "Starvation", "Slow response", "Complexity"], answer: 1, explanation: "SSTF can cause starvation for requests that are far from the head if new requests closer to the head keep arriving." }]
  },
  {
    id: 'exp-6',
    number: 6,
    title: 'SCAN Disk Scheduling Algorithm',
    aim: 'To implement the SCAN (Elevator) Disk Scheduling algorithm.',
    theory: `
      <h3>The Elevator Algorithm (SCAN)</h3>
      <p>In the SCAN algorithm, the disk arm starts at one end of the disk and moves toward the other end, servicing requests as it reaches each track, until it gets to the other end of the disk. At the other end, the direction of head movement is reversed, and servicing continues.</p>
      
      <h3>Key Advantages</h3>
      <ul>
        <li><b>Efficiency:</b> It handles a large number of requests more predictably than SSTF.</li>
        <li><b>Deadlock/Starvation:</b> It eliminates starvation as the head eventually covers the entire disk range.</li>
      </ul>
    `,
    algorithm: `
      <ol>
        <li><b>Initialize:</b> Determine the initial head position and the direction of movement (towards 0 or towards the max track).</li>
        <li><b>Sort:</b> Sort the requests in ascending order.</li>
        <li><b>First Pass:</b> Move the head in the chosen direction, servicing all pending requests in that path until the disk boundary (0 or Max) is reached.</li>
        <li><b>Reverse:</b> Change direction at the boundary.</li>
        <li><b>Second Pass:</b> Move the head towards the opposite end, servicing all remaining requests in the sorted list.</li>
        <li><b>Calculate:</b> Total movement includes the distance traveled to the boundary and then back to the last serviced request in the opposite direction.</li>
      </ol>
    `,
    simulationType: 'disk-scan',
    quiz: [{ question: "SCAN is also known as which algorithm?", options: ["Round Robin", "Elevator", "Circular", "Distance-based"], answer: 1, explanation: "It works like an elevator, going floor to floor (track to track) in one direction before reversing." }]
  },
  {
    id: 'exp-7',
    number: 7,
    title: 'C-SCAN Disk Scheduling Algorithm',
    aim: 'To implement the Circular SCAN (C-SCAN) Disk Scheduling algorithm for uniform waiting times.',
    theory: `
      <h3>Circular SCAN (C-SCAN)</h3>
      <p>C-SCAN is a variant of SCAN designed to provide a more uniform wait time. Like SCAN, the head moves from one end of the disk to the other, servicing requests along the way. However, when the head reaches the end, it immediately returns to the beginning of the disk without servicing any requests on the return trip.</p>
      
      <h3>Why C-SCAN?</h3>
      <p>In standard SCAN, requests at the ends of the disk are serviced less frequently than those in the middle. C-SCAN treats the disk as a circular list that wraps around, ensuring all tracks receive equal attention over time.</p>
    `,
    algorithm: `
      <ol>
        <li><b>Sort:</b> Arrange all disk requests in ascending order.</li>
        <li><b>Divide:</b> Identify requests that are greater than the current head position and those that are less.</li>
        <li><b>Forward Pass:</b> Start from the current head and move towards the high end (Max Track), servicing all requests in that range.</li>
        <li><b>The Jump:</b> Upon reaching the Max Track, move the head immediately to track 0 (Total movement increases by the full disk width if calculated strictly, or treated as a fast return).</li>
        <li><b>Second Pass:</b> Move from track 0 towards the initial head position, servicing all requests that were missed in the first pass.</li>
      </ol>
    `,
    simulationType: 'disk-cscan',
    quiz: [{ question: "Does C-SCAN service requests on its return journey?", options: ["Yes", "No", "Only if requested", "Depends on OS"], answer: 1, explanation: "C-SCAN returns to the start immediately with no service provided during the return jump." }]
  },
  {
    id: 'exp-8',
    number: 8,
    title: 'FCFS CPU Scheduling Algorithm',
    aim: 'To implement the First-Come, First-Served (FCFS) CPU scheduling algorithm and calculate average waiting and turnaround time.',
    theory: `
      <h3>Introduction to CPU Scheduling</h3>
      <p>CPU scheduling is the process of determining which process in the ready queue is to be allocated the CPU. The main objective is to keep the CPU as busy as possible (maximize utilization) and provide fair treatment to all processes.</p>
      
      <h3>FCFS (First-Come, First-Served)</h3>
      <p>In FCFS scheduling, the process that requests the CPU first is allocated the CPU first. It is easily managed with a FIFO queue. When a process enters the ready queue, its PCB is linked onto the tail of the queue.</p>
      
      <h3>Key Metrics</h3>
      <ul>
        <li><b>Burst Time:</b> Time required by a process for CPU execution.</li>
        <li><b>Waiting Time:</b> Total time spent by a process in the ready queue.</li>
        <li><b>Turnaround Time:</b> Time interval from submission to completion (Wait Time + Burst Time).</li>
      </ul>
    `,
    algorithm: `
      <ol>
        <li><b>Input:</b> Accept the number of processes and their respective burst times.</li>
        <li><b>Scheduling:</b> Arrange processes in the order of their arrival (default is P1, P2... Pn).</li>
        <li><b>Waiting Time (WT):</b> 
          <ul>
            <li>WT for the first process is 0.</li>
            <li>For subsequent processes: WT[i] = BurstTime[i-1] + WT[i-1].</li>
          </ul>
        </li>
        <li><b>Turnaround Time (TAT):</b> TAT[i] = BurstTime[i] + WT[i].</li>
        <li><b>Average:</b> Calculate the sum of WT and TAT, then divide by the total number of processes.</li>
      </ol>
    `,
    simulationType: 'cpu-fcfs',
    quiz: [{ question: "Is FCFS CPU scheduling preemptive?", options: ["Yes", "No"], answer: 1, explanation: "FCFS is a non-preemptive algorithm; once a process starts, it finishes its burst." }]
  },
  {
    id: 'exp-9',
    number: 9,
    title: 'SJF CPU Scheduling Algorithm',
    aim: 'To implement the Shortest Job First (SJF) CPU scheduling algorithm for optimal average waiting time.',
    theory: `
      <h3>Shortest Job First (SJF)</h3>
      <p>SJF associates with each process the length of its next CPU burst. When the CPU is available, it is assigned to the process that has the smallest next CPU burst. If two processes have the same length, FCFS is used to break the tie.</p>
      
      <h3>Optimality</h3>
      <p>SJF is optimal because it gives the minimum average waiting time for a given set of processes. However, it is difficult to implement in real-time as the next CPU burst length is hard to predict.</p>
      
      <h3>Variations</h3>
      <ul>
        <li><b>Non-preemptive SJF:</b> Once the CPU is given to a process, it cannot be preempted until it completes its burst.</li>
        <li><b>Preemptive SJF (SRTF):</b> If a new process arrives with a shorter burst than the remaining time of the current process, the CPU is preempted.</li>
      </ul>
    `,
    algorithm: `
      <ol>
        <li><b>Sort:</b> Arrange all arrived processes in ascending order of their burst times.</li>
        <li><b>Select:</b> Pick the process with the smallest burst time from the list of processes that have arrived.</li>
        <li><b>Execute:</b> Allocate CPU to this process and let it run to completion (Non-preemptive).</li>
        <li><b>Update:</b> Record completion time and calculate WT and TAT.</li>
        <li><b>Repeat:</b> Continue with the next shortest process until the ready queue is empty.</li>
      </ol>
    `,
    simulationType: 'cpu-sjf',
    quiz: [{ question: "Which algorithm provides the minimum average waiting time?", options: ["FCFS", "SJF", "Round Robin", "Priority"], answer: 1, explanation: "SJF is theoretically optimal for minimizing average wait time." }]
  },
  {
    id: 'exp-10',
    number: 10,
    title: 'Priority CPU Scheduling Algorithm',
    aim: 'To implement the Priority-based CPU scheduling algorithm.',
    theory: `
      <h3>Priority Scheduling</h3>
      <p>A priority is associated with each process, and the CPU is allocated to the process with the highest priority. Equal-priority processes are scheduled in FCFS order.</p>
      
      <h3>Priority Definition</h3>
      <p>Priorities are generally indicated by some fixed range of numbers, such as 0 to 10. However, there is no general agreement on whether 0 represents the highest or lowest priority.</p>
      
      <h3>The Starvation Problem</h3>
      <p>A major problem with priority scheduling is <b>indefinite blocking</b> (Starvation). A low-priority process can stay in the ready queue forever if a stream of high-priority processes keeps arriving. <b>Aging</b>—gradually increasing the priority of processes that wait for a long time—is a common solution.</p>
    `,
    algorithm: `
      <ol>
        <li><b>Input:</b> Accept Process ID, Burst Time, and Priority level for each process.</li>
        <li><b>Sort:</b> Sort the ready queue based on priority (Highest priority first).</li>
        <li><b>Execute:</b> The process at the head of the sorted queue is given the CPU.</li>
        <li><b>Non-preemptive:</b> Let the process finish its execution before picking the next highest priority process.</li>
        <li><b>Calculate:</b> Derive WT, TAT, and completion times for all processes.</li>
      </ol>
    `,
    simulationType: 'cpu-priority',
    quiz: [{ question: "What is 'Starvation' in Priority Scheduling?", options: ["CPU is idle", "Low priority jobs never execute", "High priority jobs execute too fast", "Memory is full"], answer: 1, explanation: "Starvation occurs when low priority processes wait indefinitely while high priority processes keep arriving." }]
  },
  {
    id: 'exp-11',
    number: 11,
    title: 'Round Robin CPU Scheduling Algorithm',
    aim: 'To implement the Round Robin (RR) CPU scheduling algorithm for time-sharing systems.',
    theory: `
      <h3>Round Robin (RR)</h3>
      <p>The Round Robin algorithm is designed specifically for time-sharing systems. It is similar to FCFS but preemption is added to enable the system to switch between processes. A small unit of time, called a <b>time quantum</b> (or time slice), is defined.</p>
      
      <h3>Workflow</h3>
      <p>The ready queue is treated as a circular queue. The CPU scheduler goes around the ready queue, allocating the CPU to each process for a time interval of up to 1 time quantum. If the process finishes before the quantum, it releases the CPU voluntarily; otherwise, the CPU is preempted and the process is placed at the back of the queue.</p>
    `,
    algorithm: `
      <ol>
        <li><b>Define Quantum:</b> Establish a fixed time slice (e.g., 2ms or 4ms).</li>
        <li><b>Ready Queue:</b> Place all arriving processes in a FIFO queue.</li>
        <li><b>Process:</b> Pick the first process and let it run for min(Quantum, Remaining Burst Time).</li>
        <li><b>Check Completion:</b> 
          <ul>
            <li>If the process finishes, remove it from the queue.</li>
            <li>If burst remains, move the process to the end of the ready queue.</li>
          </ul>
        </li>
        <li><b>Context Switch:</b> Move to the next process in the queue.</li>
        <li><b>Repeat:</b> Continue until all processes have zero remaining burst time.</li>
      </ol>
    `,
    simulationType: 'cpu-rr',
    quiz: [{ question: "What happens if the time quantum in Round Robin is very large?", options: ["Becomes SJF", "Becomes FCFS", "Causes Starvation", "System crashes"], answer: 1, explanation: "If the quantum is large enough to cover the longest burst, it effectively becomes FCFS." }]
  },
  {
    id: 'exp-12',
    number: 12,
    title: 'FIFO Page Replacement Algorithm',
    aim: 'To implement the First-In, First-Out (FIFO) Page Replacement algorithm and calculate the total number of page faults.',
    theory: `
      <h3>Virtual Memory & Paging</h3>
      <p>Virtual memory allows the execution of processes that are not completely in memory. Paging is a memory-management scheme that eliminates the need for contiguous allocation of physical memory. When a process requests a page not in memory, a <b>page fault</b> occurs, necessitating page replacement.</p>
      
      <h3>FIFO (First-In, First-Out)</h3>
      <p>This is the simplest page-replacement algorithm. When a page must be replaced, the oldest page (the one that was brought in first) is chosen. It can be implemented using a FIFO queue to track the ages of pages in memory.</p>
      
      <h3>Belady's Anomaly</h3>
      <p>FIFO is unique because it can exhibit Belady's Anomaly: for some page-replacement algorithms, the page-fault rate may increase as the number of allocated frames increases.</p>
    `,
    algorithm: `
      <ol>
        <li><b>Initialize:</b> Create an empty set or queue to represent the frames in memory and set 'Page Faults' to 0.</li>
        <li><b>Iterate:</b> Traverse the page reference string one by one.</li>
        <li><b>Check Presence:</b> 
          <ul>
            <li>If the page is already in memory, it is a <b>Hit</b>. No action needed.</li>
            <li>If not present, it is a <b>Fault</b>. Increment 'Page Faults'.</li>
          </ul>
        </li>
        <li><b>Replace:</b> 
          <ul>
            <li>If frames are available, add the page to an empty frame.</li>
            <li>If all frames are full, remove the page that arrived first (front of the queue) and insert the new page.</li>
          </ul>
        </li>
        <li><b>Repeat:</b> Continue until the end of the reference string.</li>
      </ol>
    `,
    simulationType: 'page-fifo',
    quiz: [{ question: "What is Belady's Anomaly?", options: ["Memory leak", "Page faults increase with more frames", "CPU usage peaks", "Disk crash"], answer: 1, explanation: "Belady's Anomaly is a counter-intuitive situation where increasing the number of page frames results in an increase in the number of page faults for certain reference strings." }]
  },
  {
    id: 'exp-13',
    number: 13,
    title: 'LRU Page Replacement Algorithm',
    aim: 'To implement the Least Recently Used (LRU) Page Replacement algorithm.',
    theory: `
      <h3>Least Recently Used (LRU)</h3>
      <p>If we use the recent past as an approximation of the near future, then we will replace the page that has not been used for the longest period of time. This is the LRU algorithm.</p>
      
      <h3>Principle</h3>
      <p>LRU associates with each page the time of that page's last use. When a page must be replaced, LRU chooses the page that has not been used for the longest period of time. This strategy is generally considered very good and is frequently used in modern operating systems.</p>
      
      <h3>Implementation</h3>
      <p>Usually implemented using a <b>Stack</b> or by adding <b>Counters/Timestamps</b> to each page entry, which adds significant hardware overhead compared to FIFO.</p>
    `,
    algorithm: `
      <ol>
        <li><b>Initialize:</b> Set up the memory with 'n' empty frames and a way to track the usage history (like a stack or counter).</li>
        <li><b>Traverse:</b> Process each page in the reference string.</li>
        <li><b>Logic:</b>
          <ul>
            <li>If page exists (Hit): Update its 'last used' timestamp to current.</li>
            <li>If page is missing (Fault): 
              <ul>
                <li>If free frames exist, insert the page and mark its time.</li>
                <li>If full, find the page with the <b>smallest (oldest)</b> 'last used' timestamp and replace it.</li>
              </ul>
            </li>
          </ul>
        </li>
        <li><b>Calculate:</b> Tally total faults and hits.</li>
      </ol>
    `,
    simulationType: 'page-lru',
    quiz: [{ question: "LRU is based on which principle?", options: ["Future use", "Arrival time", "Recency of use", "Page size"], answer: 2, explanation: "LRU assumes that pages used recently are likely to be used again soon." }]
  },
  {
    id: 'exp-14',
    number: 14,
    title: 'Optimal Page Replacement Algorithm',
    aim: 'To implement the Optimal (OPT/MIN) Page Replacement algorithm.',
    theory: `
      <h3>Optimal Algorithm</h3>
      <p>An optimal page-replacement algorithm has the lowest page-fault rate of all algorithms and will never suffer from Belady's Anomaly. It simply states: <b>Replace the page that will not be used for the longest period of time in the future.</b></p>
      
      <h3>Practicality</h3>
      <p>The optimal algorithm requires future knowledge of the reference string, which is normally not available to the operating system. Therefore, it is used primarily as a theoretical benchmark to measure how well other implementable algorithms (like LRU) perform.</p>
    `,
    algorithm: `
      <ol>
        <li><b>Traverse:</b> Read the page reference string.</li>
        <li><b>On Fault:</b> If memory is full, look ahead into the <b>future</b> part of the reference string.</li>
        <li><b>Search Future:</b> For each page currently in a frame, find the next time it will appear in the string.</li>
        <li><b>Select:</b> 
          <ul>
            <li>If a page will <b>never</b> be used again, replace it first.</li>
            <li>Otherwise, replace the page whose next use is <b>farthest</b> in the future.</li>
          </ul>
        </li>
        <li><b>Execute:</b> Update the frame and continue.</li>
      </ol>
    `,
    simulationType: 'page-optimal',
    quiz: [{ question: "Why is Optimal Page Replacement not practical?", options: ["Too slow", "Uses too much RAM", "Requires knowledge of future requests", "Causes frequent crashes"], answer: 2, explanation: "OS cannot predict future page requests, so this is mainly a theoretical benchmark." }]
  },
  {
    id: 'exp-15',
    number: 15,
    title: 'Producer Consumer Problem',
    aim: 'To implement the classical Producer-Consumer synchronization problem using semaphores.',
    theory: `
      <h3>Introduction to IPC</h3>
      <p>Inter-Process Communication (IPC) is a mechanism that allows processes to communicate and synchronize their actions. The Producer-Consumer problem (also known as the bounded-buffer problem) is one of the most famous challenges in concurrent programming.</p>
      
      <h3>Problem Description</h3>
      <p>There is a buffer of fixed size. A **Producer** puts messages into the buffer, and a **Consumer** takes them out. The constraints are:</p>
      <ul>
        <li>The producer should not try to add data into the buffer if it is full.</li>
        <li>The consumer should not try to remove data from an empty buffer.</li>
        <li>Access to the buffer must be mutually exclusive to prevent race conditions.</li>
      </ul>
      
      <h3>Synchronization Primitives</h3>
      <p>Modern solutions use three semaphores: <b>Mutex</b> (binary semaphore for mutual exclusion), <b>Empty</b> (counting semaphore for empty slots), and <b>Full</b> (counting semaphore for filled slots).</p>
    `,
    algorithm: `
      <p><b>Producer Logic:</b></p>
      <ol>
        <li>Produce an item.</li>
        <li><b>Wait(Empty):</b> Decrease empty slot count; block if 0.</li>
        <li><b>Wait(Mutex):</b> Lock the buffer for exclusive access.</li>
        <li>Add the item to the buffer.</li>
        <li><b>Signal(Mutex):</b> Unlock the buffer.</li>
        <li><b>Signal(Full):</b> Increase full slot count; notify waiting consumers.</li>
      </ol>
      <p><b>Consumer Logic:</b></p>
      <ol>
        <li><b>Wait(Full):</b> Decrease full slot count; block if 0.</li>
        <li><b>Wait(Mutex):</b> Lock the buffer.</li>
        <li>Remove an item from the buffer.</li>
        <li><b>Signal(Mutex):</b> Unlock the buffer.</li>
        <li><b>Signal(Empty):</b> Increase empty slot count; notify waiting producers.</li>
        <li>Consume the item.</li>
      </ol>
    `,
    simulationType: 'ipc-producer',
    quiz: [{ question: "Which semaphore tracks filled buffer slots?", options: ["Mutex", "Empty", "Full", "Signal"], answer: 2, explanation: "The 'Full' counting semaphore tracks how many items are currently in the buffer." }]
  },
  {
    id: 'exp-16',
    number: 16,
    title: 'Reader Writers Problem',
    aim: 'To implement the Reader-Writers synchronization problem to manage concurrent access to a shared resource.',
    theory: `
      <h3>The Reader-Writer Challenge</h3>
      <p>This problem models a situation where multiple processes need to access a shared data object (like a file or database). Processes are categorized into two types: <b>Readers</b> (only want to read data) and <b>Writers</b> (want to update or modify data).</p>
      
      <h3>Synchronization Rules</h3>
      <ul>
        <li>Multiple readers can read the resource simultaneously without any problem.</li>
        <li>A writer must have exclusive access. No other readers or writers can access the resource while a writer is active.</li>
      </ul>
      
      <h3>Wait and Signal</h3>
      <p>We use a binary semaphore <b>rw_mutex</b> to ensure exclusive writing and an integer <b>read_count</b> kept under the protection of another semaphore <b>mutex</b> to manage multiple simultaneous readers.</p>
    `,
    algorithm: `
      <p><b>Writer Process:</b></p>
      <ol>
        <li><b>Lock:</b> Execute Wait(rw_mutex) to gain exclusive access to the shared resource.</li>
        <li><b>Write:</b> Perform the data modification or writing operations.</li>
        <li><b>Unlock:</b> Execute Signal(rw_mutex) to release the resource for other writers or readers.</li>
      </ol>
      <p><b>Reader Process:</b></p>
      <ol>
        <li><b>Entry:</b> Execute Wait(mutex) to safely update the read_count variable.</li>
        <li><b>Counter:</b> Increment read_count. If this is the 1st reader, execute Wait(rw_mutex).</li>
        <li><b>Exit Entry:</b> Execute Signal(mutex) to allow other readers to enter.</li>
        <li><b>Read:</b> Perform the concurrent data reading operation.</li>
        <li><b>Exit:</b> Execute Wait(mutex) to safely decrement read_count.</li>
        <li><b>Cleanup:</b> Decrement read_count. If this is the last reader, execute Signal(rw_mutex).</li>
        <li><b>Finished:</b> Execute Signal(mutex) to release the counter lock.</li>
      </ol>
    `,
    simulationType: 'ipc-reader',
    quiz: [{ question: "Can multiple readers access data simultaneously?", options: ["Yes", "No"], answer: 0, explanation: "Yes, concurrent reading is usually safe and efficient." }]
  },
  {
    id: 'exp-17',
    number: 17,
    title: 'Dining Philosophers Problem',
    aim: 'To implement a solution for the Dining Philosophers problem to avoid deadlock and starvation.',
    theory: `
      <h3>Problem Statement</h3>
      <p>Five philosophers sit around a circular table. They spend their lives alternating between <b>thinking</b> and <b>eating</b>. There is a single bowl of rice in the center and five single chopsticks (or forks) placed between each pair of adjacent philosophers.</p>
      
      <h3>Execution Constraints</h3>
      <p>To eat, a philosopher must pick up both the chopstick to their left and the one to their right. After eating, they put both chopsticks down and return to thinking.</p>
      
      <h3>The Deadlock Risk</h3>
      <p>If every philosopher picks up the left chopstick simultaneously, they will all wait forever for the right chopstick. This is a classic example of a **Deadlock** caused by a circular wait configuration.</p>
    `,
    algorithm: `
      <p><b>Arbitrator Solution:</b></p>
      <ol>
        <li><b>Lock:</b> A philosopher must acquire a global mutex before picking up any chopsticks.</li>
        <li><b>Check:</b> They check if both the left and right chopsticks are available.</li>
        <li><b>Acquire:</b> If both are free, they pick up both chopsticks simultaneously.</li>
        <li><b>Eat:</b> The philosopher transitions to the 'Eating' state for a fixed duration.</li>
        <li><b>Release:</b> They put down both chopsticks and release the global mutex.</li>
        <li><b>Signal:</b> Neighboring hungry philosophers are notified that chopsticks are available.</li>
      </ol>
      <p><b>Resource Hierarchy Solution:</b></p>
      <ol>
        <li><b>Ordering:</b> Every chopstick is assigned a unique numerical ID (0-4).</li>
        <li><b>Policy:</b> A philosopher must always pick up the lower-numbered chopstick first.</li>
        <li><b>Anti-Deadlock:</b> The philosopher between 4 and 0 picks up 0 then 4, breaking the circular wait chain.</li>
      </ol>
    `,
    simulationType: 'ipc-philosopher',
    quiz: [{ question: "The Dining Philosophers problem mainly illustrates which issue?", options: ["Memory leaks", "Deadlock", "Slow networking", "Thrashing"], answer: 1, explanation: "It is a primary example of how a circular wait for resources (forks) can lead to a system deadlock." }]
  },
  {
    id: 'exp-18',
    number: 18,
    title: "Banker's Algorithm",
    aim: "To implement the Banker's Algorithm for deadlock avoidance in multi-resource systems.",
    theory: `
      <h3>Deadlock Avoidance</h3>
      <p>Unlike deadlock detection (finding deadlocks after they occur), the Banker's Algorithm is a **proactive avoidance** strategy. It is used in systems that manage multiple instances of several resource types.</p>
      
      <h3>Safe State</h3>
      <p>When a new request arrives, the system simulates the allocation. It calculates if the remaining resources are enough to satisfy at least one process's maximum future needs. If a sequence of processes exists where everyone can finish, the state is **Safe**; otherwise, it is **Unsafe**, and the request is denied.</p>
      
      <h3>Data Structures</h3>
      <ul>
        <li><b>Available:</b> Vector of length 'm' (resources available).</li>
        <li><b>Max:</b> n x m matrix (maximum demand of each process).</li>
        <li><b>Allocation:</b> n x m matrix (current resource usage).</li>
        <li><b>Need:</b> n x m matrix (Max - Allocation).</li>
      </ul>
    `,
    algorithm: `
      <p><b>Safety Algorithm Sequence:</b></p>
      <ol>
        <li><b>Initialization:</b> Set Work = Available and Finish[i] = false for all processes.</li>
        <li><b>Search:</b> Find an index 'i' where Finish[i] is false and Need[i] ≤ Work.</li>
        <li><b>Selection:</b> If no such process exists, the state is finalized (move to step 5).</li>
        <li><b>Simulation:</b> Assume the process finishes: Work = Work + Allocation[i], Finish[i] = true. Return to step 2.</li>
        <li><b>Validation:</b> If Finish[i] is true for all processes, the system is in a <b>Safe State</b>.</li>
      </ol>
    `,
    simulationType: 'bankers',
    quiz: [{ question: "What does Banker's Algorithm primarily ensure?", options: ["Speed", "Safe state", "Maximum throughput", "Security"], answer: 1, explanation: "Its core purpose is to maintain a 'Safe State' to prevent potential deadlocks." }]
  }
];
