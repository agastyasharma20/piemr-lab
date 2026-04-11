import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCcw, HelpCircle, ChevronRight } from 'lucide-react';

interface QuizProps {
  questions: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
}

const QuizComponent: React.FC<QuizProps> = ({ questions }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === questions[currentStep].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {score === questions.length ? '🏆' : score > questions.length / 2 ? '👏' : '📚'}
        </div>
        <h2>Assessment Complete!</h2>
        <p style={{ fontSize: '1.5rem', margin: '1rem 0', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
          Your Score: {score} / {questions.length}
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {score === questions.length ? "Perfect score! You've mastered this experiment." : "Good effort! Review the theory and try again to improve your score."}
        </p>
        <button 
          onClick={resetQuiz}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'var(--accent-primary)', color: 'white', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}
        >
          <RefreshCcw size={18} />
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--accent-tertiary)', fontWeight: 600 }}>Question {currentStep + 1} of {questions.length}</span>
        <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            style={{ height: '100%', background: 'var(--accent-tertiary)' }}
          />
        </div>
      </div>

      <h3 style={{ fontSize: '1.3rem', marginBottom: '2rem', lineHeight: 1.4 }}>{q.question}</h3>

      <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
        {q.options.map((option, idx) => {
          let stateStyle = {};
          if (isAnswered) {
            if (idx === q.answer) stateStyle = { background: 'rgba(15,158,110,0.15)', borderColor: 'var(--success)' };
            else if (idx === selectedOption) stateStyle = { background: 'rgba(239,68,68,0.15)', borderColor: 'var(--danger)' };
          } else if (selectedOption === idx) {
            stateStyle = { background: 'rgba(37,99,235,0.15)', borderColor: 'var(--accent-primary)' };
          }

          return (
            <motion.button
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                textAlign: 'left', padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', cursor: isAnswered ? 'default' : 'pointer', fontSize: '1rem', transition: 'all 0.2s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                ...stateStyle
              }}
              whileHover={!isAnswered ? { x: 5, background: 'rgba(255,255,255,0.06)' } : {}}
            >
              <span>{option}</span>
              {isAnswered && idx === q.answer && <CheckCircle2 size={18} color="var(--success)" />}
              {isAnswered && idx === selectedOption && idx !== q.answer && <XCircle size={18} color="var(--danger)" />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{ marginBottom: '2rem', padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '4px solid var(--accent-tertiary)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-tertiary)', marginBottom: '0.5rem', fontWeight: 600 }}>
              <HelpCircle size={16} />
              Explanation
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{q.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!isAnswered ? (
          <button 
            disabled={selectedOption === null}
            onClick={handleCheck}
            style={{ padding: '0.8rem 2rem', borderRadius: '8px', background: selectedOption !== null ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', color: selectedOption !== null ? 'white' : 'var(--text-muted)', border: 'none', cursor: selectedOption !== null ? 'pointer' : 'default', fontWeight: 700 }}
          >
            Check Answer
          </button>
        ) : (
          <button 
            onClick={handleNext}
            style={{ padding: '0.8rem 2rem', borderRadius: '8px', background: 'var(--accent-tertiary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem' }}
          >
            {currentStep < questions.length - 1 ? 'Next Question' : 'View Results'}
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
