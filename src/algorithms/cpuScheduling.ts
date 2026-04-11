export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
}

export interface CPUStep {
  startTime: number;
  endTime: number;
  processId: string | 'IDLE';
}

export interface CPUSchedulingResult {
  gantt: CPUStep[];
  turnaroundTimes: Record<string, number>;
  waitingTimes: Record<string, number>;
  averageTurnaroundTime: number;
  averageWaitingTime: number;
}

function calculateMetrics(processes: Process[], completionTimes: Record<string, number>, gantt: CPUStep[]): CPUSchedulingResult {
  const turnaroundTimes: Record<string, number> = {};
  const waitingTimes: Record<string, number> = {};
  let totalTat = 0;
  let totalWt = 0;

  processes.forEach(p => {
    const tat = completionTimes[p.id] - p.arrivalTime;
    const wt = tat - p.burstTime;
    turnaroundTimes[p.id] = tat;
    waitingTimes[p.id] = wt;
    totalTat += tat;
    totalWt += wt;
  });

  const optimizedGantt: CPUStep[] = [];
  for (const step of gantt) {
    if (step.startTime === step.endTime) continue; // skip 0 time
    if (optimizedGantt.length > 0 && optimizedGantt[optimizedGantt.length - 1].processId === step.processId) {
      optimizedGantt[optimizedGantt.length - 1].endTime = step.endTime;
    } else {
      optimizedGantt.push({ ...step });
    }
  }

  return {
    gantt: optimizedGantt,
    turnaroundTimes,
    waitingTimes,
    averageTurnaroundTime: processes.length > 0 ? +(totalTat / processes.length).toFixed(2) : 0,
    averageWaitingTime: processes.length > 0 ? +(totalWt / processes.length).toFixed(2) : 0
  };
}

export const fcfsScheduler = (processes: Process[]): CPUSchedulingResult => {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const gantt: CPUStep[] = [];
  let currentTime = 0;
  
  const completionTimes: Record<string, number> = {};

  sorted.forEach(p => {
    if (currentTime < p.arrivalTime) {
      gantt.push({ startTime: currentTime, endTime: p.arrivalTime, processId: 'IDLE' });
      currentTime = p.arrivalTime;
    }
    
    gantt.push({ startTime: currentTime, endTime: currentTime + p.burstTime, processId: p.id });
    currentTime += p.burstTime;
    completionTimes[p.id] = currentTime;
  });

  return calculateMetrics(processes, completionTimes, gantt);
};

export const sjfNonPreemptive = (processes: Process[]): CPUSchedulingResult => {
  const remaining = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const gantt: CPUStep[] = [];
  let currentTime = 0;
  const completionTimes: Record<string, number> = {};

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrivalTime <= currentTime);
    
    if (available.length === 0) {
      const nextArrival = remaining[0].arrivalTime;
      gantt.push({ startTime: currentTime, endTime: nextArrival, processId: 'IDLE' });
      currentTime = nextArrival;
      continue;
    }

    available.sort((a, b) => a.burstTime - b.burstTime);
    const selected = available[0];
    
    gantt.push({ startTime: currentTime, endTime: currentTime + selected.burstTime, processId: selected.id });
    currentTime += selected.burstTime;
    completionTimes[selected.id] = currentTime;
    
    const index = remaining.findIndex(p => p.id === selected.id);
    remaining.splice(index, 1);
  }

  return calculateMetrics(processes, completionTimes, gantt);
};

export const srtfPreemptive = (processes: Process[]): CPUSchedulingResult => {
  let currentTime = 0;
  let completed = 0;
  const remainingTime = Object.fromEntries(processes.map(p => [p.id, p.burstTime]));
  const completionTimes: Record<string, number> = {};
  const gantt: CPUStep[] = [];

  while (completed < processes.length) {
    const available = processes.filter(p => p.arrivalTime <= currentTime && remainingTime[p.id] > 0);
    
    let nextProcessId: string | 'IDLE' = 'IDLE';
    if (available.length > 0) {
      available.sort((a, b) => remainingTime[a.id] - remainingTime[b.id]);
      nextProcessId = available[0].id;
    }
    
    gantt.push({ startTime: currentTime, endTime: currentTime + 1, processId: nextProcessId });
    
    if (nextProcessId !== 'IDLE') {
      remainingTime[nextProcessId]--;
      if (remainingTime[nextProcessId] === 0) {
        completed++;
        completionTimes[nextProcessId] = currentTime + 1;
      }
    }
    
    currentTime++;
  }

  return calculateMetrics(processes, completionTimes, gantt);
};

export const roundRobin = (processes: Process[], timeQuantum: number): CPUSchedulingResult => {
  const gantt: CPUStep[] = [];
  let currentTime = 0;
  let completed = 0;
  
  const remainingTime = Object.fromEntries(processes.map(p => [p.id, p.burstTime]));
  const completionTimes: Record<string, number> = {};
  
  // Sort by arrival initially
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const queue: Process[] = [];
  const inQueue = new Set<string>();
  
  let pIdx = 0;
  
  while (completed < processes.length) {
    // Fill queue with arriving processes
    while (pIdx < sorted.length && sorted[pIdx].arrivalTime <= currentTime) {
      if (!inQueue.has(sorted[pIdx].id)) {
        queue.push(sorted[pIdx]);
        inQueue.add(sorted[pIdx].id);
      }
      pIdx++;
    }
    
    if (queue.length === 0) {
      const nextArrival = pIdx < sorted.length ? sorted[pIdx].arrivalTime : currentTime + 1;
      gantt.push({ startTime: currentTime, endTime: nextArrival, processId: 'IDLE' });
      currentTime = nextArrival;
      continue;
    }

    const currentProcess = queue.shift()!;
    inQueue.delete(currentProcess.id);
    
    const timeToRun = Math.min(timeQuantum, remainingTime[currentProcess.id]);
    gantt.push({ startTime: currentTime, endTime: currentTime + timeToRun, processId: currentProcess.id });
    
    currentTime += timeToRun;
    remainingTime[currentProcess.id] -= timeToRun;
    
    // Add any newly arrived processes BEFORE re-queuing the current process
    while (pIdx < sorted.length && sorted[pIdx].arrivalTime <= currentTime) {
      if (!inQueue.has(sorted[pIdx].id)) {
        queue.push(sorted[pIdx]);
        inQueue.add(sorted[pIdx].id);
      }
      pIdx++;
    }
    
    if (remainingTime[currentProcess.id] > 0) {
      queue.push(currentProcess);
      inQueue.add(currentProcess.id);
    } else {
      completed++;
      completionTimes[currentProcess.id] = currentTime;
    }
  }

  return calculateMetrics(processes, completionTimes, gantt);
};

export const priorityScheduling = (processes: Process[]): CPUSchedulingResult => {
  const remaining = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const gantt: CPUStep[] = [];
  let currentTime = 0;
  const completionTimes: Record<string, number> = {};

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrivalTime <= currentTime);
    
    if (available.length === 0) {
      const nextArrival = remaining[0].arrivalTime;
      gantt.push({ startTime: currentTime, endTime: nextArrival, processId: 'IDLE' });
      currentTime = nextArrival;
      continue;
    }

    // Lower priority number = higher priority typically
    available.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    const selected = available[0];
    
    gantt.push({ startTime: currentTime, endTime: currentTime + selected.burstTime, processId: selected.id });
    currentTime += selected.burstTime;
    completionTimes[selected.id] = currentTime;
    
    const index = remaining.findIndex(p => p.id === selected.id);
    remaining.splice(index, 1);
  }

  return calculateMetrics(processes, completionTimes, gantt);
};
