
export interface TopicContent {
  id: string;
  title: string;
  badge: string;
  description: string;
  detailedTheory: string;
  analogy: string;
  simulation?: {
    type: 'logic' | 'asm';
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

export const COA_TOPIC_DATA: Record<string, TopicContent> = {
  'basic-structure': {
    id: 'basic-structure',
    title: 'Basic Structure of Computer',
    badge: 'Hardware Logic',
    description: 'Understanding the fundamental architecture, register organization, and system buses.',
    detailedTheory: 'Computer Organization refers to the operational units and their interconnections that realize the architectural specifications. It includes the CPU, Main Memory, and I/O devices connected via the System Bus (Data, Address, and Control lines).',
    analogy: 'A computer\'s structure is like a factory floor. The CPU is the processing machine, registers are the local bins for parts, and the System Bus is the conveyor belt system.',
    simulation: { type: 'asm' },
    mathematics: [
      { formula: 'Max Addressable RAM = 2^N', explanation: 'Where N is the width of the Address Bus in bits.' },
      { formula: 'CPI = Total_Cycles / Instruction_Count', explanation: 'Cycles Per Instruction: A measure of execution efficiency.' }
    ],
    interviewQs: [
      'What is the difference between Architecture and Organization?',
      'Explain Von Neumann Bottleneck.',
      'What are the 3 types of system buses?'
    ],
    videoId: 'L9X7XXfHYdU',
    videoTitle: 'COA Introduction | Gate Smashers',
    quiz: [
      { question: 'Which bus is unidirectional?', options: ['Data Bus', 'Address Bus', 'Control Bus', 'Expansion Bus'], answer: 1, explanation: 'The address bus is unidirectional because the CPU only sends memory addresses out; it never receives them via this bus.' },
      { question: 'Role of the Program Counter (PC)?', options: ['Stores data', 'Holds next instruction address', 'Controls ALU', 'Manages I/O'], answer: 1, explanation: 'The program counter (PC) holds the memory address of the next instruction to be fetched and executed.' }
    ]
  },
  'computer-arithmetic': {
    id: 'computer-arithmetic',
    title: 'Computer Arithmetic',
    badge: 'Binary Logic',
    description: 'Fast binary multiplication and division algorithms like Booth\'s and Restoring Division.',
    detailedTheory: 'Computer Arithmetic handles how the computer performs basic math on binary numbers. Specialized algorithms like Booth\'s Algorithm allow for faster multiplication of signed binary numbers by reducing the number of additions required.',
    analogy: 'Computer Arithmetic is like a specialized calculator that only knows binary but is optimized for extreme speed using mathematical "shortcuts".',
    simulation: { type: 'logic' },
    mathematics: [
      { formula: 'Range (n-bit 2\'s Complement) = [-2^(n-1), 2^(n-1) - 1]', explanation: 'The range of numbers representable in 2\'s complement.' }
    ],
    interviewQs: [
      'Explain Booth\'s Algorithm for multiplication.',
      'What is overflow in binary addition and how is it detected?',
      'Compare Restoring and Non-Restoring division.'
    ],
    videoId: 'SmFaZrJ2bGk',
    videoTitle: 'Booth\'s Algorithm | Gate Smashers',
    quiz: [
      { question: 'Booth\'s algorithm is used for?', options: ['Addition', 'Division', 'Signed Multiplication', 'Floating Point'], answer: 2, explanation: 'Booth\'s algorithm is a highly efficient method for performing multiplication on signed binary numbers.' }
    ]
  },
  'io-organization': {
    id: 'io-organization',
    title: 'I/O Organization',
    badge: 'System Interconnect',
    description: 'Mastering the communication between CPU, memory, and high-speed peripheral devices.',
    detailedTheory: 'I/O Organization covers how devices communicate with the system. Key techniques include Programmed I/O, Interrupt-Driven I/O, and Direct Memory Access (DMA), which allows devices to transfer data to memory without constant CPU intervention.',
    analogy: 'DMA is like having a delivery service that puts groceries directly in your fridge while you continue working, instead of you having to go to the door for every single item.',
    simulation: { type: 'logic' },
    mathematics: [
      { formula: 'Transfer Rate = Bus_Width * Frequency', explanation: 'The theoretical maximum bandwidth of a system bus.' }
    ],
    interviewQs: [
      'What is DMA and why is it used?',
      'Difference between Memory-Mapped I/O and Isolated I/O.',
      'How does an Daisy Chaining priority work?'
    ],
    videoId: 'q_p_x_h_2zU',
    videoTitle: 'I/O Organization | Gate Smashers',
    quiz: [
      { question: 'Which I/O technique requires no CPU intervention for data transfer?', options: ['Programmed I/O', 'Interrupt-Driven I/O', 'DMA', 'Polling'], answer: 2, explanation: 'Direct Memory Access (DMA) allows hardware subsystems to access main memory independently of the CPU.' }
    ]
  },
  'memory-organization': {
    id: 'memory-organization',
    title: 'Memory Organization',
    badge: 'Cache & Hierarchy',
    description: 'Deep dive into Cache memory, mapping techniques, and virtual memory management.',
    detailedTheory: 'Memory Hierarchy aims to provide a large amount of memory at a fast speed. Cache memory sits between the CPU and Main Memory to store frequently accessed data. Mapping techniques (Direct, Associative, Set-Associative) determine how data is cached.',
    analogy: 'Cache is like the small notebook on your desk where you keep frequent numbers, while Main Memory is the large filing cabinet in the next room.',
    simulation: { type: 'logic' },
    mathematics: [
      { formula: 'Average Memory Access Time (AMAT) = HitTime + MissRate * MissPenalty', explanation: 'The efficiency formula for a cached memory system.' }
    ],
    interviewQs: [
      'What is Cache Mapping?',
      'Explain the Principle of Locality (Temporal and Spatial).',
      'What is a Page Fault?'
    ],
    videoId: 'p8S_YrsT0O8',
    videoTitle: 'Cache Mapping | Gate Smashers',
    quiz: [
      { question: 'Which mapping technique is most flexible?', options: ['Direct Mapping', 'Fully Associative', 'Set Associative', 'Linear Mapping'], answer: 1, explanation: 'Fully Associative mapping allows any block of main memory to be placed in any cache line, offering maximum efficiency but higher circuit complexity.' }
    ]
  },
  'multiprocessors': {
    id: 'multiprocessors',
    title: 'Multiprocessors & Pipelining',
    badge: 'Parallel Compute',
    description: 'Instruction-level parallelism, pipelining hazards, and multiprocessor architectures.',
    detailedTheory: 'Pipelining is a technique where multiple instructions are overlapped in execution. Multiprocessor systems use multiple CPUs to execute tasks in parallel, requiring cache coherence protocols like MESI.',
    analogy: 'Pipelining is like an assembly line in a car factory. While one worker fixes the engine, the next starts on the chassis of the next car.',
    simulation: { type: 'asm' },
    mathematics: [
      { formula: 'Speedup (S) = n * k / (k + n - 1)', explanation: 'Ideal speedup of a k-stage pipeline with n instructions.' }
    ],
    interviewQs: [
      'What are Pipeline Hazards (Structural, Data, Control)?',
      'Difference between RISC and CISC.',
      'Explain Flynn\'s Classification (SISD, SIMD, MISD, MIMD).'
    ],
    videoId: '2O7K1G792_Q',
    videoTitle: 'Pipelining in COA | Gate Smashers',
    quiz: [
      { question: 'Which hazard occurs due to branching?', options: ['Data Hazard', 'Structural Hazard', 'Control Hazard', 'Mechanical Hazard'], answer: 2, explanation: 'Control hazards (or branch hazards) arise from the delay in determining the proper instruction to fetch next after a branch.' }
    ]
  }
};
