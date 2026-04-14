import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';

// Common Handle styles
const handleStyle = { background: '#39ff14', width: '10px', height: '10px', border: '2px solid #000' };

export const InputNode = ({ data, isConnectable }: NodeProps) => {
  const val = data.val as number;
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', padding: '10px', borderRadius: '8px', border: `2px solid ${val ? '#39ff14' : '#374151'}`, boxShadow: val ? '0 0 10px #39ff14' : 'none', color: 'white' }}
    >
      <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>IN:</div>
      <button 
        style={{ width: 30, height: 30, borderRadius: '50%', background: val ? '#39ff14' : '#1f2937', color: val ? '#000' : '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
        data-action="toggle" // We use standard DOM event delegation in parent for toggle
      >
        {val}
      </button>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} style={{...handleStyle, right: '-6px'}} />
    </motion.div>
  );
};

export const OutputNode = ({ data, isConnectable }: NodeProps) => {
  const val = data.val as number;
  return (
    <motion.div 
       style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', padding: '10px', borderRadius: '8px', border: `2px solid ${val ? '#39ff14' : '#374151'}`, boxShadow: val ? '0 0 10px #39ff14' : 'none', color: 'white' }}
    >
      <Handle type="target" id="a" position={Position.Left} isConnectable={isConnectable} style={{...handleStyle, left: '-6px'}} />
      <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>OUT:</div>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: val ? '#39ff14' : '#1f2937', color: val ? '#000' : '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {val}
      </div>
    </motion.div>
  );
};

export const GateNode = ({ data, isConnectable }: NodeProps) => {
  const type = data.gateType as string;
  const isUnary = type === 'NOT'; // NOT gate only has 1 input
  const val = data.val as number; // the precalculated output of this gate
  
  return (
    <div style={{ background: 'rgba(26,92,190,0.8)', padding: '12px 20px', borderRadius: '8px', border: `2px solid rgba(255,255,255,0.2)`, color: 'white', fontWeight: 'bold', minWidth: '80px', textAlign: 'center', boxShadow: val ? '0 0 10px rgba(26,92,190,0.8)' : '0 4px 6px rgba(0,0,0,0.5)' }}>
      {/* Target (Inputs) Handles */}
      {isUnary ? (
        <Handle type="target" id="a" position={Position.Left} style={{...handleStyle, left: '-6px', top: '50%'}} isConnectable={isConnectable} />
      ) : (
        <>
          <Handle type="target" id="a" position={Position.Left} style={{...handleStyle, left: '-6px', top: '25%'}} isConnectable={isConnectable} />
          <Handle type="target" id="b" position={Position.Left} style={{...handleStyle, left: '-6px', top: '75%'}} isConnectable={isConnectable} />
        </>
      )}

      {/* Label */}
      <div>{type}</div>

      {/* Source (Output) Handle */}
      <Handle type="source" position={Position.Right} style={{...handleStyle, right: '-6px'}} isConnectable={isConnectable} />
    </div>
  );
};
