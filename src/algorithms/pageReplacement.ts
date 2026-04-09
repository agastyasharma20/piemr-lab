export interface PageReplacementResult {
  pageFaults: number;
  pageHits: number;
  framesSteps: (number | null)[][]; // Snapshot of frames at each step
  isFault: boolean[]; // Whether step caused fault
}

export const fifoReplacement = (pages: number[], frameCount: number): PageReplacementResult => {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  const framesSteps: (number | null)[][] = [];
  const isFault: boolean[] = [];
  let faults = 0;
  let hits = 0;
  const queue: number[] = [];

  for (const page of pages) {
    if (frames.includes(page)) {
      hits++;
      isFault.push(false);
    } else {
      faults++;
      isFault.push(true);
      if (queue.length < frameCount) {
        const emptyIdx = frames.indexOf(null);
        frames[emptyIdx] = page;
        queue.push(page);
      } else {
        const victim = queue.shift()!;
        const victimIdx = frames.indexOf(victim);
        frames[victimIdx] = page;
        queue.push(page);
      }
    }
    framesSteps.push([...frames]);
  }

  return { pageFaults: faults, pageHits: hits, framesSteps, isFault };
};

export const lruReplacement = (pages: number[], frameCount: number): PageReplacementResult => {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  const framesSteps: (number | null)[][] = [];
  const isFault: boolean[] = [];
  let faults = 0;
  let hits = 0;
  const lastUsed: Map<number, number> = new Map(); // page -> last step idx

  for (let step = 0; step < pages.length; step++) {
    const page = pages[step];
    if (frames.includes(page)) {
      hits++;
      isFault.push(false);
    } else {
      faults++;
      isFault.push(true);
      if (frames.includes(null)) {
        const emptyIdx = frames.indexOf(null);
        frames[emptyIdx] = page;
      } else {
        let lruPage = frames[0] as number;
        let oldestUsed = lastUsed.get(lruPage) || 0;
        
        for (let i = 1; i < frameCount; i++) {
          const checkPage = frames[i] as number;
          const used = lastUsed.get(checkPage) || 0;
          if (used < oldestUsed) {
            oldestUsed = used;
            lruPage = checkPage;
          }
        }
        const victimIdx = frames.indexOf(lruPage);
        frames[victimIdx] = page;
      }
    }
    lastUsed.set(page, step);
    framesSteps.push([...frames]);
  }

  return { pageFaults: faults, pageHits: hits, framesSteps, isFault };
};

export const optimalReplacement = (pages: number[], frameCount: number): PageReplacementResult => {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  const framesSteps: (number | null)[][] = [];
  const isFault: boolean[] = [];
  let faults = 0;
  let hits = 0;

  for (let currentIndex = 0; currentIndex < pages.length; currentIndex++) {
    const page = pages[currentIndex];
    if (frames.includes(page)) {
      hits++;
      isFault.push(false);
    } else {
      faults++;
      isFault.push(true);
      if (frames.includes(null)) {
        const emptyIdx = frames.indexOf(null);
        frames[emptyIdx] = page;
      } else {
        let farthestDist = -1;
        let victimIdx = -1;

        for (let i = 0; i < frameCount; i++) {
          const checkPage = frames[i] as number;
          let nextUse = -1;
          for (let j = currentIndex + 1; j < pages.length; j++) {
            if (pages[j] === checkPage) {
              nextUse = j;
              break;
            }
          }

          if (nextUse === -1) {
            victimIdx = i;
            break; // Will never be used, optimal victim
          }
          if (nextUse > farthestDist) {
            farthestDist = nextUse;
            victimIdx = i;
          }
        }
        frames[victimIdx] = page;
      }
    }
    framesSteps.push([...frames]);
  }

  return { pageFaults: faults, pageHits: hits, framesSteps, isFault };
};
