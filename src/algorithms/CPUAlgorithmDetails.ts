export const cpuAlgorithmDetails: Record<string, any> = {
  FCFS: {
    name: 'First-Come, First-Serve (FCFS)',
    definition: 'FCFS is a non-preemptive scheduling algorithm where the process that requests the CPU first becomes precisely the process that gets the CPU first. It is typically managed using a simple FIFO queue.',
    analogy: 'Standing in line at a bank teller. The person who arrived first gets fully served before the teller talks to the second person, even if the first person is doing a 30-minute transaction and the second person just wants to cash a check.',
    pseudocode: `Sort processes by Arrival Time
time = 0
FOR each process in sorted_processes:
    IF time < process.arrivalTime:
        time = process.arrivalTime
    process.startTime = time
    time += process.burstTime
    process.endTime = time
    process.turnAroundTime = process.endTime - process.arrivalTime
    process.waitingTime = process.turnAroundTime - process.burstTime
END FOR`,
    timeComplexity: 'O(N log N) for initial sorting',
    advantage: 'Simplest CPU scheduling algorithm to implement and understand.',
    disadvantage: 'Suffers from the Convoy Effect: short processes get stuck waiting for a long process to finish, causing high average waiting times.'
  },
  SJF: {
    name: 'Shortest Job First (SJF) - Non-Preemptive',
    definition: 'SJF associates with each process the length of its next CPU burst. When the CPU is available, it is assigned to the process that has the smallest next CPU burst.',
    analogy: 'A supermarket express lane. Customers with the fewest items in their carts are served first to get the maximum number of people out of the store as fast as possible.',
    pseudocode: `time = 0
ready_queue = []
WHILE remaining_processes > 0:
    Add all processes that have arrived by 'time' to ready_queue
    IF ready_queue is empty:
        time++
        CONTINUE
    Sort ready_queue by Burst Time
    selected_process = ready_queue.pop_first()
    time += selected_process.burstTime
    selected_process.complete()
END WHILE`,
    timeComplexity: 'O(N^2) if re-sorting dynamically without a Min-Heap',
    advantage: 'Provably gives the minimum average waiting time for a given set of processes.',
    disadvantage: 'Cannot be perfectly implemented at the OS level because there is no way to perfectly know the exact length of the next CPU burst beforehand.'
  },
  SRTF: {
    name: 'Shortest Remaining Time First (SRTF) - Preemptive',
    definition: 'SRTF is the preemptive version of SJF. If a new process arrives with a CPU burst length less than the remaining time of the currently executing process, the current process is pre-empted.',
    analogy: 'A doctor treating a patient with a mild cold. Suddenly, an emergency trauma patient arrives. The doctor pauses treating the cold patient (preemption) to immediately treat the trauma patient (shortest remaining critical time).',
    pseudocode: `time = 0
WHILE remaining_processes > 0:
    Add arrived processes to ready_queue
    selected = process in ready_queue with lowest remaining_burst
    Execute selected for 1 unit of time
    time++
    selected.remaining_burst--
    IF selected.remaining_burst == 0:
        selected.complete()
        remove from ready_queue
END WHILE`,
    timeComplexity: 'O(N * Max_Burst_Time)',
    advantage: 'Much better response times for short processes compared to non-preemptive SJF.',
    disadvantage: 'Context switching overhead is high due to constant preemption.'
  },
  Priority: {
    name: 'Priority Scheduling (Non-Preemptive)',
    definition: 'A priority number is associated with each process, and the CPU is allocated to the process with the highest priority. Equal-priority processes are scheduled in FCFS order.',
    analogy: 'Boarding an airplane. First-class passengers board first, then business class, then economy. Inside economy, they board First-Come First-Serve.',
    pseudocode: `time = 0
WHILE processes remaining:
    available = Get processes where arrivalTime <= time
    IF empty: time++; CONTINUE
    selected = available process with highest Priority
    Execute selected until completion
    time += selected.burstTime
END WHILE`,
    timeComplexity: 'O(N^2) dynamically',
    advantage: 'Allows critical system processes to run immediately without waiting for background tasks.',
    disadvantage: 'Indefinite blocking (Starvation) of low priority processes. Solution: Aging (gradually increasing priority of waiting processes).'
  },
  'Round Robin': {
    name: 'Round Robin (RR)',
    definition: 'Designed for time-sharing systems. A small unit of time, called a time quantum or time slice, is defined. The ready queue is a circular queue, and the CPU scheduler goes around assigning each process the CPU for up to 1 time quantum.',
    analogy: 'A teacher answering questions in a classroom. To be fair, the teacher gives exactly 2 minutes to each student raising their hand. If a student needs more time, they go to the back of the line and wait for the next exact round.',
    pseudocode: `queue = [first_process]
time = 0
WHILE queue not empty:
    process = queue.dequeue()
    execution_time = MIN(process.remainingTime, Time_Quantum)
    time += execution_time
    process.remainingTime -= execution_time
    
    Add newly arrived processes during this time to queue
    IF process.remainingTime > 0:
        queue.enqueue(process)
END WHILE`,
    timeComplexity: 'O(N * Total_Burst_Time / Quantum)',
    advantage: 'Excellent fairness and response time. Guarantees no starvation.',
    disadvantage: 'If the time quantum is too small, context switching overhead dominates. If too large, it degrades into FCFS.'
  }
};
