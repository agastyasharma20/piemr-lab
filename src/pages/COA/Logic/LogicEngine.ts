import type { Edge, Node } from '@xyflow/react';

export type GateType = 'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND' | 'NOR';

export type LogicNodeData = Record<string, unknown> & {
  gateType?: GateType; // Only for 'gate' nodes
  val: number; // 0 or 1
  label?: string;
};

export const evaluateLogicCircuit = (nodes: Node<LogicNodeData, string>[], edges: Edge[]) => {
  // We will perform an iterative relaxation approach (simulate signal propagation)
  // We clone nodes to not mutate state directly if not needed, but we return a new array
  let currentNodes = JSON.parse(JSON.stringify(nodes)) as Node<LogicNodeData, string>[];
  let changed = true;
  let iterations = 0;
  const MAX_ITERATIONS = 50; // prevent oscillator infinite loops (e.g. NOT gate looped to itself)

  while (changed && iterations < MAX_ITERATIONS) {
    changed = false;
    iterations++;

    const newNodes = currentNodes.map(node => {
      // Inputs don't change through evaluation, they are set by user
      if (node.type === 'inputNode') {
        return node;
      }

      // Find all incoming edges to this node
      const incomingEdges = edges.filter(e => e.target === node.id);

      if (node.type === 'outputNode' || node.type === 'gateNode') {
        // Collect inputs from source nodes
        const inputs: Record<string, number> = {};
        
        incomingEdges.forEach(edge => {
          const sourceNode = currentNodes.find(n => n.id === edge.source);
          if (sourceNode) {
             // Handle names: typically 'a' or 'b'
             const targetHandle = edge.targetHandle || 'a';
             inputs[targetHandle] = sourceNode.data.val;
          }
        });

        // Compute new value based on node type
        let newVal = 0;

        if (node.type === 'outputNode') {
          // Output node just mirrors its input (assume 'a' handle)
          newVal = inputs['a'] !== undefined ? inputs['a'] : 0;
        } 
        else if (node.type === 'gateNode') {
          const a = inputs['a'] || 0;
          const b = inputs['b'] || 0;

          switch (node.data.gateType) {
            case 'AND': newVal = a & b; break;
            case 'OR': newVal = a | b; break;
            case 'XOR': newVal = a ^ b; break;
            case 'NAND': newVal = ~(a & b) & 1; break;
            case 'NOR': newVal = ~(a | b) & 1; break;
            case 'NOT': newVal = (~a) & 1; break; // only uses handle 'a'
            default: newVal = 0;
          }
        }

        // Check if value changed
        if (newVal !== node.data.val) {
          changed = true;
          return { ...node, data: { ...node.data, val: newVal } };
        }
      }
      return node;
    });

    currentNodes = newNodes;
  }

  return currentNodes;
};
