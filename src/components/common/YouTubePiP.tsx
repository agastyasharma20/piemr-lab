import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2, Play, Volume2, ExternalLink } from 'lucide-react';

// Inline YouTube SVG brand icon
const YtIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="white">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
  </svg>
);

interface YouTubePiPProps {
  videoId: string;
  videoTitle?: string;
  channelName?: string;
  color?: string;
}

export const YouTubePiP = ({ videoId, videoTitle, channelName = 'Gate Smashers', color = '#3b82f6' }: YouTubePiPProps) => {
  const [mode, setMode] = useState<'closed' | 'pip' | 'expanded'>('pip');
  const [playing, setPlaying] = useState(false);

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (mode === 'closed') {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setMode('pip')}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
          background: 'linear-gradient(135deg, #ff0000, #cc0000)',
          border: 'none', borderRadius: '50%', width: '52px', height: '52px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 8px 32px rgba(255,0,0,0.4)'
        }}
        title="Show Video Lecture"
      >
        <YtIcon size={24} />
      </motion.button>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {mode === 'expanded' ? (
        <motion.div
          key="expanded"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1100,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div style={{ width: '100%', maxWidth: '900px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ background: '#ff0000', borderRadius: '8px', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <YtIcon size={14} />
                  <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>{channelName}</span>
                </div>
                <span style={{ color: 'white', fontSize: '1rem', fontWeight: 600 }}>{videoTitle}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setMode('pip')} style={iconBtnStyle}><Minimize2 size={16} /></button>
                <button onClick={() => setMode('closed')} style={{ ...iconBtnStyle, background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}><X size={16} /></button>
              </div>
            </div>
            <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative', borderRadius: '16px', overflow: 'hidden', border: `2px solid ${color}50` }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videoTitle}
              />
            </div>
            <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'flex-end' }}>
              <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>
                <ExternalLink size={12} /> Open in YouTube
              </a>
            </div>
          </div>
        </motion.div>
      ) : (
        // PiP floating card
        <motion.div
          key="pip"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
            width: '320px',
            background: 'rgba(10,10,20,0.95)',
            borderRadius: '16px',
            border: `1px solid ${color}40`,
            boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), 0 0 40px ${color}20`,
            overflow: 'hidden',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: '#ff0000', borderRadius: '6px', padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <YtIcon size={11} />
                <span style={{ color: 'white', fontSize: '0.65rem', fontWeight: 700 }}>GATE SMASHERS</span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Video Lecture</span>
            </div>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <button onClick={() => setMode('expanded')} style={{ ...miniIconBtnStyle, color }} title="Expand"><Maximize2 size={13} /></button>
              <button onClick={() => setMode('closed')} style={{ ...miniIconBtnStyle, color: '#ef4444' }} title="Close"><X size={13} /></button>
            </div>
          </div>

          {/* Thumbnail / Player */}
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000' }}>
            {!playing ? (
              <>
                <img
                  src={thumbnail}
                  onError={(e) => { (e.target as HTMLImageElement).src = fallbackThumbnail; }}
                  alt={videoTitle}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlaying(true)}
                  style={{
                    position: 'absolute', inset: 0, margin: 'auto',
                    width: '52px', height: '52px',
                    background: 'rgba(255,0,0,0.9)', border: '3px solid white',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 4px 20px rgba(255,0,0,0.5)'
                  }}
                >
                  <Play size={20} color="white" style={{ marginLeft: '3px' }} fill="white" />
                </motion.button>
                <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.8)', borderRadius: '4px', padding: '0.1rem 0.4rem', color: 'white', fontSize: '0.7rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Volume2 size={9} /> HD Lecture
                </div>
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videoTitle}
              />
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: '0.8rem 1rem' }}>
            <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem', lineHeight: 1.3 }}>
              {videoTitle || 'Algorithm Lecture'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Gate Smashers • DAA Series</span>
              <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color, fontSize: '0.72rem', textDecoration: 'none' }}>
                <ExternalLink size={10} /> YouTube
              </a>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setMode('expanded')}
              style={{ marginTop: '0.6rem', width: '100%', padding: '0.5rem', background: `${color}15`, border: `1px solid ${color}30`, borderRadius: '8px', color, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <Maximize2 size={12} /> Watch Full Screen
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const iconBtnStyle: React.CSSProperties = {
  padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const miniIconBtnStyle: React.CSSProperties = {
  padding: '0.25rem', borderRadius: '5px', background: 'transparent',
  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
};
