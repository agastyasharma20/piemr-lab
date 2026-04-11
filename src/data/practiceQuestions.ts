import type { Process } from '../algorithms/cpuScheduling';

export interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CPUQuestion {
  id: string;
  title: string;
  description: string;
  processes: Process[];
  quizzes: MCQ[];
}

export interface MemoryQuestion {
  id: string;
  title: string;
  description: string;
  referenceString: string;
  frames: number;
  quizzes: MCQ[];
}

export const cpuPracticeQuestions: CPUQuestion[] = [
  {
    id: 'q1',
    title: 'Standard Scheduling Mix',
    description: 'A mix of 4 processes arriving at different times with varying burst lengths.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 8, priority: 3 },
      { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1 },
      { id: 'P3', arrivalTime: 2, burstTime: 9, priority: 4 },
      { id: 'P4', arrivalTime: 3, burstTime: 5, priority: 2 },
    ],
    quizzes: [
      {
        question: "Using FCFS, which process finishes last?",
        options: ["P1", "P3", "P4", "P2"],
        correctIndex: 2,
        explanation: "In FCFS, processes finish in order of arrival. P4 arrived last (Time 3), so it finishes last."
      },
      {
        question: "What is the waiting time for P2 under FCFS?",
        options: ["0 ms", "7 ms", "8 ms", "4 ms"],
        correctIndex: 1,
        explanation: "P1 runs from 0-8. P2 arrived at 1. So P2 waits from 1 to 8, which is 7 ms."
      }
    ]
  },
  {
    id: 'q2',
    title: 'Short Job Priority',
    description: 'Test how Shortest Job First (SJF) handles processes with very short burst times coming in early.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 2, priority: 2 },
      { id: 'P2', arrivalTime: 0, burstTime: 1, priority: 1 },
      { id: 'P3', arrivalTime: 0, burstTime: 6, priority: 3 },
      { id: 'P4', arrivalTime: 0, burstTime: 3, priority: 4 },
    ],
    quizzes: [
      {
        question: "Under Non-Preemptive SJF, what is the order of execution?",
        options: ["P1, P2, P3, P4", "P2, P1, P4, P3", "P2, P1, P3, P4", "P1, P2, P4, P3"],
        correctIndex: 1,
        explanation: "SJF selects shortest burst first: P2(1), P1(2), P4(3), P3(6)."
      }
    ]
  },
  {
    id: 'q3',
    title: 'The Convoy Effect',
    description: 'A long process (P1) arriving first, followed by several short processes. Observe the effect on Average Wait Time.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 20, priority: 5 },
      { id: 'P2', arrivalTime: 1, burstTime: 2, priority: 1 },
      { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 2 },
      { id: 'P4', arrivalTime: 3, burstTime: 2, priority: 3 },
    ],
    quizzes: [
      {
        question: "How does the Convoy Effect impact average waiting time?",
        options: ["Decreases it", "Increases it significantly", "No impact", "Decreases CPU utilization"],
        correctIndex: 1,
        explanation: "The Convoy effect causes short processes to wait a long time for a single big process, driving up average wait times."
      }
    ]
  }
];

export const memoryPracticeQuestions: MemoryQuestion[] = [
  {
    id: 'm1',
    title: 'Page Replacement Case Study',
    description: 'A complex reference string designed to test FIFO and LRU efficiency.',
    referenceString: '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2',
    frames: 3,
    quizzes: [
      {
        question: "Using FIFO with 3 frames, how many total page faults occur?",
        options: ["10", "15", "13", "12"],
        correctIndex: 2,
        explanation: "FIFO results in 13 page faults for this specific string."
      }
    ]
  },
  {
    id: 'm2',
    title: "Belady's Anomaly Test",
    description: 'A specific string that demonstrates Belady\'s Anomaly in FIFO (Where faults increase as frames increase). Try 3 frames vs 4 frames.',
    referenceString: '1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5',
    frames: 3,
    quizzes: [
      {
        question: "What is Belady's Anomaly?",
        options: ["Faults decrease as frames increase", "Faults stay same as frames increase", "Faults increase as frames increase", "CPU usage drops with more frames"],
        correctIndex: 2,
        explanation: "It is the phenomenon where increasing page frames leads to more page faults in FIFO."
      }
    ]
  },
  {
    id: 'm3',
    title: 'LRU Locality Check',
    description: 'A reference string with high temporal locality. Observe how LRU keeps frequently used pages in memory.',
    referenceString: '1, 2, 3, 2, 1, 5, 2, 1, 6, 2, 5, 6, 3, 1, 3',
    frames: 4,
    quizzes: [
      {
        question: "Which data structure is best to implement LRU accurately?",
        options: ["Stack", "Simple Queue", "Hash Map + Doubly Linked List", "Binary Tree"],
        correctIndex: 2,
        explanation: "A Hash Map + Doubly Linked List allows O(1) tracking and replacement."
      }
    ]
  }
];
