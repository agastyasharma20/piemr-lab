export const diskAlgorithmDetails: Record<string, any> = {
  FCFS: {
    name: 'First-Come, First-Serve (FCFS)',
    definition: 'FCFS is the simplest disk scheduling algorithm. As the name suggests, this algorithm entertains requests in the exact order they arrive in the disk queue. It does not provide any optimization or prioritization.',
    analogy: 'Imagine a queue at a grocery store checkout. The cashier processes the customers in the exact order they lined up, regardless of whether someone has one item or a full cart. It is fair but can be highly inefficient.',
    pseudocode: `FOR each request in queue:
    Seek from current_head to request
    accumulated_seek += absolute(request - current_head)
    current_head = request
END FOR`,
    example: 'Suppose a disk queue holds requests for I/O to blocks on cylinders: 82, 170, 43, 140. Given the disk head is initially at 50, the head will move sequentially: 50 → 82 → 170 → 43 → 140. Total head movement = |82-50| + |170-82| + |43-170| + |140-43| = 344 cylinders.',
    timeComplexity: 'O(N) Operations',
    advantage: 'Every request gets a fair chance. No starvation occurs.',
    disadvantage: 'Results in completely random and wild head swings over the disk (lower throughput).'
  },
  SSTF: {
    name: 'Shortest Seek Time First (SSTF)',
    definition: 'SSTF algorithm selects the disk I/O request which requires the least disk arm movement from its current position regardless of the direction.',
    analogy: 'A delivery driver making drop-offs. Rather than driving across the city strictly based on the order the packages were loaded, they deliver to the next closest house to save gas and time.',
    pseudocode: `WHILE queue is not empty:
    Find request 'R' with minimum absolute distance from current_head
    Seek to 'R'
    accumulated_seek += absolute(R - current_head)
    current_head = R
    REMOVE R from queue
END WHILE`,
    example: 'Requests: 82, 170, 43. Initial head: 50. The closest to 50 is 43 (distance 7). After 43, the closest remaining is 82 (distance 39). Finally, 170. Path: 50 → 43 → 82 → 170. Total movement = 7 + 39 + 88 = 134 cylinders.',
    timeComplexity: 'O(N^2) Operations',
    advantage: 'Significant reduction in total seek time compared to FCFS. Increased throughput.',
    disadvantage: 'Can cause starvation for requests that are far away from the head if new close requests keep arriving.'
  },
  SCAN: {
    name: 'SCAN (Elevator Algorithm)',
    definition: 'In SCAN, the disk arm moves in a particular direction servicing the requests in its path until it reaches the end of the disk, then it reverses its direction and services the remaining tracks.',
    analogy: 'Think of a building elevator. It goes all the way to the top floor, stopping at requested floors along the way. Once it hits the top, it reverses and stops at floors on its way back down.',
    pseudocode: `Sort all requests
Split into 'Left' and 'Right' of current_head
IF direction is Right:
    Service all 'Right' requests sequentially
    Move to End of Disk (Disk Size - 1)
    Reverse direction, Service all 'Left' requests sequentially
END IF`,
    example: 'Requests: 82, 170, 43. Initial head: 50 (Direction: Right, Disk limits: 0-199). Path goes to right first: 50 → 82 → 170 → 199 (end of disk). Reverses to left: 199 → 43. Total movement = 149 + 156 = 305.',
    timeComplexity: 'O(N log N) Operations (due to sorting)',
    advantage: 'High throughput and low variance of response time.',
    disadvantage: 'Long waiting times for requests sitting near the opposite end of the disk.'
  },
  'C-SCAN': {
    name: 'Circular SCAN (C-SCAN)',
    definition: 'C-SCAN is a variant of SCAN designed to provide a more uniform wait time. It moves from one end of the disk to the other, servicing requests. Upon reaching the end, it immediately jumps back to the beginning WITHOUT servicing any requests on the return trip.',
    analogy: 'A street sweeper cleaning a one-way street. Once it reaches the end of the block, it does not sweep backward. It drives back to the start of the block and begins sweeping in the same direction again.',
    pseudocode: `Sort all requests split into Left and Right
IF direction is Right:
    Service all 'Right' requests sequentially
    Jump from End of Disk (199) to Start of Disk (0)
    Service all remaining 'Left' requests moving right
END IF`,
    example: 'Requests: 82, 170, 43. Head: 50 (Right). Path: 50 → 82 → 170 → 199. Jumps to 0. Servicing continues right: 0 → 43. Total movement = (199-50) + (199) jump + (43-0) = 391.',
    timeComplexity: 'O(N log N)',
    advantage: 'Provides a more uniform waiting time compared to SCAN.',
    disadvantage: 'Includes dead seek time (the heavy jump from one end to the other).'
  },
  LOOK: {
    name: 'LOOK Algorithm',
    definition: 'LOOK is the practical version of SCAN. To save time, instead of blindly going all the way to the absolute end of the disk, the arm only goes as far as the last request in that direction before reversing.',
    analogy: 'A smart elevator driver. They look to see if anyone called the elevator on a higher floor. If the highest requested floor is 8, they stop at 8 and reverse direction immediately, ignoring floors 9 and 10.',
    pseudocode: `Sort all requests
Split into 'Left' and 'Right'
IF direction is Right:
    Service all 'Right' requests up to MAX_RIGHT_REQUEST
    Reverse direction
    Service all 'Left' requests sequentially
END IF`,
    example: 'Requests: 82, 170, 43. Head: 50 (Right). Path: 50 → 82 → 170 (Stops here, 199 is ignored). Reverses direction: 170 → 43. Total movement = (170-50) + (170-43) = 120 + 127 = 247.',
    timeComplexity: 'O(N log N)',
    advantage: 'Eliminates unnecessary travel to the extreme edges of the disk, making it much more efficient than pure SCAN.',
    disadvantage: 'Overhead to find the extreme actual requests before traversing.'
  },
  'C-LOOK': {
    name: 'Circular LOOK (C-LOOK)',
    definition: 'C-LOOK is combining C-SCAN and LOOK. The arm services requests in one direction up to the last request (not the end of the disk), and then jumps back to the furthest request on the opposite end (not 0).',
    analogy: 'The street sweeper from C-SCAN, but they only sweep exactly between the first and last spots where dirt exists, ignoring the completely clean ends of the street.',
    pseudocode: `Sort all requests
Split into 'Left' and 'Right'
IF direction is Right:
    Service all 'Right' requests sequentially up to MAX_REQUEST
    Jump directly to the MIN_REQUEST on the far left
    Service 'Left' requests moving right
END IF`,
    example: 'Requests: 82, 170, 43. Head: 50. Goes right: 50 → 82 → 170. Jumps completely back to the lowest request: 170 → 43. Total distance = 120 + 127 (jump) = 247.',
    timeComplexity: 'O(N log N)',
    advantage: 'Maximally optimizes travel distances while keeping uniform wait times.',
    disadvantage: 'Same overhead pattern as LOOK to dynamically calculate furthest targets.'
  }
};
