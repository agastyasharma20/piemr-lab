import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2, Play, Volume2, ExternalLink, BookOpen } from 'lucide-react';

// ── Inline YouTube SVG brand icon ──────────────────────────
const YtIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="white">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
  </svg>
);

// ── Channel config ─────────────────────────────────────────
const CHANNEL_META: Record<string, { label: string; shortLabel: string; bg: string; href: string }> = {
  'Gate Smashers': {
    label: 'Gate Smashers',
    shortLabel: 'GS',
    bg: '#ff0000',
    href: 'https://www.youtube.com/@gatesmashers',
  },
  'Abdul Bari': {
    label: 'Abdul Bari',
    shortLabel: 'AB',
    bg: '#1a1aff',
    href: 'https://www.youtube.com/@abdul_bari',
  },
};

// ── Props ──────────────────────────────────────────────────
interface YouTubePiPProps {
  videoId: string;
  videoTitle?: string;
  channelName?: string;   // 'Gate Smashers' | 'Abdul Bari'
  color?: string;
  playlistUrl?: string;
}

export const YouTubePiP = ({
  videoId,
  videoTitle,
  channelName = 'Gate Smashers',
  color = '#3b82f6',
  playlistUrl,
}: YouTubePiPProps) => {
  const [mode, setMode] = useState<'closed' | 'pip' | 'expanded'>('pip');
  const [playing, setPlaying] = useState(false);

  const ch = CHANNEL_META[channelName] ?? CHANNEL_META['Gate Smashers'];
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // ── Closed bubble ────────────────────────────────────────
  if (mode === 'closed') {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setMode('pip'); setPlaying(false); }}
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 1000,
          background: `linear-gradient(135deg, ${ch.bg}, ${ch.bg}cc)`,
          border: 'none', borderRadius: '50%', width: '52px', height: '52px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: `0 8px 28px ${ch.bg}55`,
        }}
        title={`Watch on ${ch.label}`}
      >
        <YtIcon size={24} />
      </motion.button>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {/* ── Full-screen expand overlay ──────────────────── */}
      {mode === 'expanded' ? (
        <motion.div
          key="expanded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1100,
            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(14px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', padding: '2rem',
          }}
        >
          {/* top bar */}
          <div style={{ width: '100%', maxWidth: '920px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              {/* channel pill */}
              <div style={{ background: ch.bg, borderRadius: '8px', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <YtIcon size={13} />
                <span style={{ color: 'white', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{ch.label}</span>
              </div>
              <span style={{ color: 'white', fontSize: '0.97rem', fontWeight: 600, maxWidth: '520px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{videoTitle}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {playlistUrl && (
                <a href={playlistUrl} target="_blank" rel="noopener noreferrer"
                  style={{ ...iconBtnStyle, display: 'flex', alignItems: 'center', gap: '0.35rem', color: color, fontSize: '0.75rem', textDecoration: 'none' }}>
                  <BookOpen size={14} /> Playlist
                </a>
              )}
              <button onClick={() => setMode('pip')} style={iconBtnStyle}><Minimize2 size={15} /></button>
              <button onClick={() => setMode('closed')} style={{ ...iconBtnStyle, background: 'rgba(239,68,68,0.18)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}><X size={15} /></button>
            </div>
          </div>

          {/* video */}
          <div style={{ width: '100%', maxWidth: '920px', paddingTop: '51.75%', position: 'relative', borderRadius: '16px', overflow: 'hidden', border: `2px solid ${color}40`, boxShadow: `0 0 60px ${color}20` }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&color=white`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen title={videoTitle}
            />
          </div>

          <div style={{ marginTop: '0.8rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href={ytUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>
              <ExternalLink size={12} /> Open in YouTube
            </a>
            <a href={ch.href} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: ch.bg, fontSize: '0.8rem', textDecoration: 'none' }}>
              <YtIcon size={12} /> Visit Channel
            </a>
          </div>
        </motion.div>

      ) : (
        /* ── PiP floating card ─────────────────────────── */
        <motion.div
          key="pip"
          initial={{ opacity: 0, y: 50, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          style={{
            position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 1000,
            width: '330px',
            background: 'rgba(8,8,18,0.97)',
            borderRadius: '18px',
            border: `1px solid ${color}35`,
            boxShadow: `0 28px 70px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), 0 0 50px ${color}18`,
            overflow: 'hidden',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* ── Header strip ─────────────────────────────── */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.7rem 0.9rem',
            background: 'rgba(255,255,255,0.035)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              {/* channel badge */}
              <div style={{ background: ch.bg, borderRadius: '6px', padding: '0.22rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
                <YtIcon size={10} />
                <span style={{ color: 'white', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.4px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{ch.label}</span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem', whiteSpace: 'nowrap' }}>Video Lecture</span>
            </div>
            <div style={{ display: 'flex', gap: '0.2rem' }}>
              <button onClick={() => setMode('expanded')} style={miniBtn(color)} title="Expand"><Maximize2 size={12} /></button>
              <button onClick={() => setMode('closed')} style={miniBtn('#ef4444')} title="Close"><X size={12} /></button>
            </div>
          </div>

          {/* ── Thumbnail / player ─────────────────────── */}
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000', cursor: 'pointer' }}
            onClick={() => !playing && setPlaying(true)}>
            {!playing ? (
              <>
                <img
                  src={thumbnail}
                  onError={(e) => { (e.target as HTMLImageElement).src = fallbackThumbnail; }}
                  alt={videoTitle}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.82, transition: 'opacity 0.2s' }}
                />
                {/* dark vignette */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
                {/* glow behind play */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', background: '#ff000040', filter: 'blur(12px)', animation: 'pulse 2s infinite' }} />
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.92 }}
                      style={{
                        width: '54px', height: '54px',
                        background: 'rgba(255,0,0,0.92)',
                        border: '2.5px solid rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 24px rgba(255,0,0,0.5)',
                      }}
                    >
                      <Play size={20} color="white" fill="white" style={{ marginLeft: '3px' }} />
                    </motion.div>
                  </div>
                </div>
                {/* HD badge */}
                <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', display: 'flex', alignItems: 'center', gap: '3px', background: 'rgba(0,0,0,0.78)', borderRadius: '4px', padding: '2px 7px', color: 'rgba(255,255,255,0.85)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3px' }}>
                  <Volume2 size={9} /> HD
                </div>
                {/* channel watermark */}
                <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: `${ch.bg}dd`, borderRadius: '5px', padding: '2px 7px', fontSize: '0.6rem', fontWeight: 800, color: 'white', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {ch.shortLabel}
                </div>
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen title={videoTitle}
              />
            )}
          </div>

          {/* ── Info footer ───────────────────────────── */}
          <div style={{ padding: '0.8rem 0.9rem 0.9rem' }}>
            <div style={{ color: 'white', fontSize: '0.83rem', fontWeight: 600, marginBottom: '0.3rem', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {videoTitle || 'Algorithm Lecture'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ch.bg, boxShadow: `0 0 6px ${ch.bg}` }} />
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>{ch.label}</span>
              </div>
              <a href={ytUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: color, fontSize: '0.68rem', textDecoration: 'none', opacity: 0.8 }}>
                <ExternalLink size={10} /> YouTube
              </a>
            </div>

            {/* action buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => { setPlaying(true); setMode('expanded'); }}
                style={{ flex: 1, padding: '0.5rem', background: `${color}18`, border: `1px solid ${color}35`, borderRadius: '9px', color, fontSize: '0.73rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <Maximize2 size={12} /> Watch Fullscreen
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => { setPlaying(true); }}
                style={{ padding: '0.5rem 0.8rem', background: 'rgba(255,0,0,0.15)', border: '1px solid rgba(255,0,0,0.25)', borderRadius: '9px', color: '#f87171', fontSize: '0.73rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <Play size={11} fill="#f87171" /> Play
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── Style helpers ──────────────────────────────────────────
const iconBtnStyle: React.CSSProperties = {
  padding: '0.45rem', borderRadius: '8px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.65)',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const miniBtn = (c: string): React.CSSProperties => ({
  padding: '0.22rem', borderRadius: '5px',
  background: 'transparent', border: 'none',
  color: c, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
});
