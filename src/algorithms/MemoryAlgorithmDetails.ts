export const memoryAlgorithmDetails: Record<string, any> = {
  FIFO: {
    name: 'First-In, First-Out (FIFO) Page Replacement',
    definition: 'FIFO associates with each page the time when that page was brought into memory. When a page must be replaced, the oldest page is chosen.',
    analogy: 'A pantry with a fixed capacity. When you buy new groceries and the pantry is full, you throw out whatever item you bought the longest time ago to make space.',
    pseudocode: `queue = []
FOR each page in reference_string:
    IF page NOT IN memory:
        page_faults++
        IF memory is full:
            oldest_page = queue.pop()
            remove oldest_page from memory
        memory.add(page)
        queue.push(page)
END FOR`,
    timeComplexity: 'O(1) per page access using a strict Queue',
    advantage: 'Extremely easy to understand and implement using a standard Queue data structure.',
    disadvantage: 'Suffers from Belady\'s Anomaly: strangely, increasing the number of page frames can sometimes INCREASE the number of page faults.'
  },
  LRU: {
    name: 'Least Recently Used (LRU) Page Replacement',
    definition: 'LRU replaces the page that has not been actively used for the longest period of time. It relies on the heuristic that pages heavily used in the last few instructions will probably be used heavily again.',
    analogy: 'Organizing a small toolbox. When it is full and you need a new tool, you take out the tool you haven\'t touched in the longest time, assuming you probably won\'t need it soon.',
    pseudocode: `history_list = []
FOR each page in reference_string:
    IF page IN memory:
        Move page to top of history_list (marked as recently used)
    ELSE:
        page_faults++
        IF memory is full:
            least_used = history_list.pop_bottom()
            Remove least_used from memory
        memory.add(page)
        history_list.push_top(page)
END FOR`,
    timeComplexity: 'O(N) per operation using array, O(1) using Hash Map + Doubly Linked List',
    advantage: 'Provides an excellent approximation of the Optimal algorithm. It never suffers from Belady\'s Anomaly.',
    disadvantage: 'Requires hardware assistance (stack or counter implementation) to be fast in real OS environments.'
  },
  Optimal: {
    name: 'Optimal Page Replacement (OPT)',
    definition: 'Replaces the page that will not be used for the longest period of time IN THE FUTURE. Highly theoretical, it provides the lowest possible page-fault rate.',
    analogy: 'A time-traveling chef. They look exactly into next week\'s menu, and throw out the ingredient from today\'s fridge that they specifically know they will not need for the longest time next week.',
    pseudocode: `FOR each page in reference_string:
    IF page NOT IN memory:
        page_faults++
        IF memory is full:
            farthest_page = find page in memory that occurs latest in future reference_string
            Remove farthest_page from memory
        memory.add(page)
END FOR`,
    timeComplexity: 'O(N) search per fault to look ahead into the string',
    advantage: 'Yields the absolute absolute mathematically lowest possible number of page faults.',
    disadvantage: 'Impossible to implement in a real running OS because the OS cannot predict the exact future memory references of an executing process.'
  }
};
