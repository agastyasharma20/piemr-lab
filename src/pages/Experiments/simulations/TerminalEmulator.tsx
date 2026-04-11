import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCcw } from 'lucide-react';

const TerminalEmulator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'cmd' | 'output', text: string }[]>([
    { type: 'output', text: 'Welcome to PIEMR UNIX Simulator v1.0.0' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'cmd' as const, text: `$ ${cmd}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands: ls, pwd, date, cal, echo, clear, whoami, uname, help' });
        break;
      case 'ls':
        newHistory.push({ type: 'output', text: 'documents/  images/  projects/  test.txt  piemr_lab/' });
        break;
      case 'pwd':
        newHistory.push({ type: 'output', text: '/home/student/piemr_virtual_lab' });
        break;
      case 'date':
        newHistory.push({ type: 'output', text: new Date().toString() });
        break;
      case 'cal':
        newHistory.push({ type: 'output', text: '    April 2026\nSu Mo Tu We Th Fr Sa\n          1  2  3  4\n 5  6  7  8  9 10 11\n12 13 14 15 16 17 18\n19 20 21 22 23 24 25\n26 27 28 29 30' });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', text: 'student_piemr' });
        break;
      case 'uname':
        newHistory.push({ type: 'output', text: 'Linux PIEMR-Terminal 5.15.0-generic x86_64' });
        break;
      case 'clear':
        setHistory([{ type: 'output', text: 'Terminal cleared.' }]);
        return;
      default:
        if (cleanCmd.startsWith('echo ')) {
          newHistory.push({ type: 'output', text: cmd.slice(5) });
        } else if (cleanCmd === '') {
          // do nothing
        } else {
          newHistory.push({ type: 'output', text: `bash: command not found: ${cleanCmd}` });
        }
    }
    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div style={{
      background: '#0d1117',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      fontFamily: '"Fira Code", monospace',
      display: 'flex',
      flexDirection: 'column',
      height: '400px'
    }}>
      {/* WINDOW BAR */}
      <div style={{
        background: '#161b22',
        padding: '0.75rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ color: '#8b949e', fontSize: '0.8rem', marginLeft: '0.5rem' }}>piemr@terminal: ~</span>
        </div>
        <button onClick={() => setHistory([])} style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer' }}>
          <RefreshCcw size={14} />
        </button>
      </div>

      {/* OUTPUT AREA */}
      <div 
        ref={scrollRef}
        style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          fontSize: '0.9rem',
          lineHeight: 1.5,
          color: '#e6edf3'
        }}
      >
        {history.map((line, idx) => (
          <div key={idx} style={{ 
            color: line.type === 'cmd' ? '#58a6ff' : '#e6edf3',
            marginBottom: '0.25rem',
            whiteSpace: 'pre-wrap'
          }}>
            {line.text}
          </div>
        ))}
        {history.length === 0 && <span style={{ opacity: 0.3 }}>No history.</span>}
      </div>

      {/* INPUT AREA */}
      <form onSubmit={handleSubmit} style={{ 
        padding: '1rem', 
        background: '#161b22', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <span style={{ color: '#238636', fontWeight: 'bold' }}>→</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#e6edf3',
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: '0.9rem'
          }}
          autoFocus
        />
        <Send size={16} color="#8b949e" style={{ cursor: 'pointer' }} onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default TerminalEmulator;
