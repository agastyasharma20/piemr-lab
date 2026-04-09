export type DiskRequest = number;

export interface DiskSchedulingResult {
  sequence: number[];
  totalSeekTime: number;
  steps: {
    from: number;
    to: number;
    distance: number;
    accumulatedSeekTime: number;
  }[];
}

export interface DiskSchedulingParams {
  requests: DiskRequest[];
  head: number;
  diskSize?: number;
  direction?: 'left' | 'right';
}

function createResult(sequence: number[], head: number): DiskSchedulingResult {
  let totalSeekTime = 0;
  const steps = [];
  let currentHead = head;

  for (const req of sequence) {
    if (req === currentHead) continue;
    const distance = Math.abs(req - currentHead);
    totalSeekTime += distance;
    steps.push({
      from: currentHead,
      to: req,
      distance,
      accumulatedSeekTime: totalSeekTime
    });
    currentHead = req;
  }

  return { sequence, totalSeekTime, steps };
}

export const fcfs = ({ requests, head }: DiskSchedulingParams): DiskSchedulingResult => {
  return createResult(requests, head);
};

export const sstf = ({ requests, head }: DiskSchedulingParams): DiskSchedulingResult => {
  const reqs = [...requests];
  const sequence: number[] = [];
  let currentHead = head;

  while (reqs.length > 0) {
    let closestIndex = 0;
    let minDistance = Math.abs(reqs[0] - currentHead);

    for (let i = 1; i < reqs.length; i++) {
      const dist = Math.abs(reqs[i] - currentHead);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }

    const nextReq = reqs.splice(closestIndex, 1)[0];
    sequence.push(nextReq);
    currentHead = nextReq;
  }

  return createResult(sequence, head);
};

export const scan = ({ requests, head, diskSize = 200, direction = 'right' }: DiskSchedulingParams): DiskSchedulingResult => {
  const left = requests.filter(r => r < head).sort((a, b) => a - b);
  const right = requests.filter(r => r > head).sort((a, b) => a - b);
  
  let sequence: number[] = [];

  if (direction === 'right') {
    sequence = [...right];
    if (left.length > 0) {
      if (sequence[sequence.length - 1] !== diskSize - 1 && head !== diskSize - 1) {
          sequence.push(diskSize - 1);
      }
      sequence = [...sequence, ...left.reverse()];
    }
  } else {
    sequence = [...left.reverse()];
    if (right.length > 0) {
      if (sequence[sequence.length - 1] !== 0 && head !== 0) {
          sequence.push(0);
      }
      sequence = [...sequence, ...right];
    }
  }

  return createResult(sequence, head);
};

export const cscan = ({ requests, head, diskSize = 200, direction = 'right' }: DiskSchedulingParams): DiskSchedulingResult => {
  const left = requests.filter(r => r < head).sort((a, b) => a - b);
  const right = requests.filter(r => r > head).sort((a, b) => a - b);
  
  let sequence: number[] = [];

  if (direction === 'right') {
    sequence = [...right];
    if (left.length > 0) {
      if (sequence[sequence.length - 1] !== diskSize - 1 && head !== diskSize - 1) {
          sequence.push(diskSize - 1);
      }
      sequence.push(0);
      sequence = [...sequence, ...left];
    }
  } else {
    sequence = [...left.reverse()];
    if (right.length > 0) {
      if (sequence[sequence.length - 1] !== 0 && head !== 0) {
          sequence.push(0);
      }
      sequence.push(diskSize - 1);
      sequence = [...sequence, ...right.reverse()];
    }
  }

  return createResult(sequence, head);
};

export const look = ({ requests, head, direction = 'right' }: DiskSchedulingParams): DiskSchedulingResult => {
  const left = requests.filter(r => r < head).sort((a, b) => a - b);
  const right = requests.filter(r => r > head).sort((a, b) => a - b);
  
  let sequence: number[] = [];

  if (direction === 'right') {
    sequence = [...right, ...left.reverse()];
  } else {
    sequence = [...left.reverse(), ...right];
  }

  return createResult(sequence, head);
};

export const clook = ({ requests, head, direction = 'right' }: DiskSchedulingParams): DiskSchedulingResult => {
  const left = requests.filter(r => r < head).sort((a, b) => a - b);
  const right = requests.filter(r => r > head).sort((a, b) => a - b);
  
  let sequence: number[] = [];

  if (direction === 'right') {
    sequence = [...right, ...left];
  } else {
    sequence = [...left.reverse(), ...right.reverse()];
  }

  return createResult(sequence, head);
};
