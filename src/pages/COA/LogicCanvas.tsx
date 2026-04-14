import { useState, useCallback, useRef, useEffect } from 'react';
import type { DragEvent } from 'react';
import { 
  ReactFlow, 
  ReactFlowProvider, 
  addEdge, 
  useNodesState, 
  useEdgesState, 
  Controls, 
  Background,
  applyNodeChanges
} from '@xyflow/react';
import type { 
  Connection,
  Edge,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import { Download, User, Trash2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { InputNode, OutputNode, GateNode } from './Logic/CustomNodes';
import { evaluateLogicCircuit } from './Logic/LogicEngine';
import type { LogicNodeData } from './Logic/LogicEngine';

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  gateNode: GateNode,
};

interface LogicCanvasProps {
  expTitle: string;
}

const initialNodes: Node<LogicNodeData, string>[] = [];
const initialEdges: Edge[] = [];

const LogicCanvasEditor = ({ expTitle }: LogicCanvasProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  const exportRef = useRef<HTMLDivElement>(null);
  const [studentName, setStudentName] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Trigger Evaluation whenever edges or nodes change their logic values
  useEffect(() => {
    // We must evaluate to find new truth values of nodes
    const processedNodes = evaluateLogicCircuit(nodes, edges);
    // Only setNodes if there's a difference to avoid infinite loop
    let needsUpdate = false;
    for(let i=0; i<processedNodes.length; i++) {
        if(processedNodes[i].data.val !== nodes.find(n => n.id === processedNodes[i].id)?.data.val) {
            needsUpdate = true; break;
        }
    }
    if (needsUpdate) {
        setNodes(processedNodes);
    }
  }, [edges, nodes, setNodes]);

  const onConnect = useCallback((params: Connection | Edge) => {
    // Only allow single connection to target handles to prevent override bugs
    const existingEdge = edges.find(e => e.target === params.target && e.targetHandle === params.targetHandle);
    if (!existingEdge) {
        setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#39ff14', strokeWidth: 2, filter: 'drop-shadow(0 0 5px #39ff14)' } } as any, eds));
    }
  }, [edges, setEdges]);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow-type');
      const gateType = event.dataTransfer.getData('application/reactflow-gatetype');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node<LogicNodeData, string> = {
        id: uuidv4(),
        type,
        position,
        data: { val: 0, gateType: gateType as any },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    // Toggle input values if clicking an InputNode button
    const target = event.target as HTMLElement;
    if (target.dataset.action === 'toggle' && node.type === 'inputNode') {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return { ...n, data: { ...n.data, val: n.data.val === 0 ? 1 : 0 } };
          }
          return n;
        })
      );
    }

    // Delete node if holding SHIFT
    if (event.shiftKey) {
        setNodes(nds => nds.filter(n => n.id !== node.id));
        setEdges(eds => eds.filter(e => e.source !== node.id && e.target !== node.id));
    }
  };

  const handleExport = async (format: 'png' | 'pdf') => {
    if (!exportRef.current) return;
    setIsExporting(true);
    
    // Fit view before export
    reactFlowInstance?.fitView({ padding: 0.2 });

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(exportRef.current!, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#0a0f1c'
        });
        const imgData = canvas.toDataURL('image/png');

        if (format === 'png') {
          const link = document.createElement('a');
          link.download = `PIEMR_Experiment.png`;
          link.href = imgData;
          link.click();
        } else {
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`PIEMR_Experiment.pdf`);
        }
      } catch (err) {
        console.error("Export failed", err);
      }
      setIsExporting(false);
    }, 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '800px', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Exporter UI Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '1rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
               <User size={16} color="var(--text-secondary)" style={{ marginRight: '0.5rem' }} />
               <input 
                  type="text" 
                  placeholder="Enter Student Name..." 
                  value={studentName} 
                  onChange={(e) => setStudentName(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '180px', fontSize: '0.9rem' }}
               />
            </div>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}><span style={{fontWeight:'bold', color:'white'}}>Shift+Click</span> on node to delete</span>
         </div>
         <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => { setNodes([]); setEdges([]); }} style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <Trash2 size={14} /> Clear Canvas
            </button>
            <button onClick={() => handleExport('png')} style={{ background: 'var(--accent-tertiary)', color: 'black', border: 'none', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <Download size={14} /> PNG
            </button>
            <button onClick={() => handleExport('pdf')} style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <Download size={14} /> PDF
            </button>
         </div>
      </div>

      <div ref={exportRef} style={{ display: 'flex', flex: 1, background: '#0a0f1c', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-glow)' }}>
         
         {/* CircuitVerse Sidebar Clone */}
         <div style={{ width: '250px', background: '#111827', borderRight: '1px solid #1f2937', display: 'flex', flexDirection: 'column', gap: '1rem' }} data-html2canvas-ignore="true">
            <div style={{ padding: '1rem', borderBottom: '1px solid #1f2937', color: 'white', fontWeight: 'bold' }}>CIRCUIT ELEMENTS</div>
            
            <div style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold' }}>I/O Elements</div>
              <div 
                onDragStart={(event) => event.dataTransfer.setData('application/reactflow-type', 'inputNode')} draggable
                style={{ padding: '8px', background: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '0.9rem', cursor: 'grab', display: 'flex', justifyContent: 'center' }}
              >
                Input Toggle
              </div>
              <div 
                onDragStart={(event) => event.dataTransfer.setData('application/reactflow-type', 'outputNode')} draggable
                style={{ padding: '8px', background: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '0.9rem', cursor: 'grab', display: 'flex', justifyContent: 'center' }}
              >
                Output Display
              </div>
            </div>

            <div style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold' }}>Logic Gates</div>
              
              {['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR'].map(gate => (
                <div 
                  key={gate}
                  onDragStart={(event) => {
                    event.dataTransfer.setData('application/reactflow-type', 'gateNode');
                    event.dataTransfer.setData('application/reactflow-gatetype', gate);
                  }} 
                  draggable
                  style={{ padding: '8px', background: 'rgba(26,92,190,0.3)', border: '1px solid rgba(26,92,190,0.8)', borderRadius: '6px', color: '#93c5fd', fontSize: '0.9rem', cursor: 'grab', display: 'flex', justifyContent: 'center' }}
                >
                  {gate} Gate
                </div>
              ))}
            </div>
         </div>

         {/* Canvas Area */}
         <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            
            {/* Embedded Header Title for Export */}
            {isExporting && (
               <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, background: 'rgba(0,0,0,0.8)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h2 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>{expTitle}</h2>
                  <p style={{ color: 'var(--text-secondary)', margin: '0.3rem 0 0', fontSize: '0.9rem' }}>Performed by: <span style={{color:'var(--accent-primary)', fontWeight:'bold'}}>{studentName || 'Anonymous Student'}</span></p>
               </div>
            )}

            <div style={{ flex: 1 }} ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={(changes) => {
                    // we need to proxy the state handler properly since ReactFlow's type definition expects exact signature
                    setNodes((nds) => applyNodeChanges(changes, nds));
                }}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
              >
                <Background color="#374151" gap={20} />
                <Controls style={{ background: '#111827', fill: 'white', border: '1px solid #374151' }} />
              </ReactFlow>
            </div>
         </div>
      </div>
    </div>
  );
};

const LogicCanvas = ({ expTitle }: LogicCanvasProps) => (
  <ReactFlowProvider>
    <LogicCanvasEditor expTitle={expTitle} />
  </ReactFlowProvider>
);

export default LogicCanvas;
