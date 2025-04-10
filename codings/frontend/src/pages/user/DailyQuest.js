import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function QuestionTimer() {
  const [time, setTime] = useState('0:00');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        const [minutes, seconds] = prevTime.split(':').map(Number);
        let newSeconds = seconds + 1;
        let newMinutes = minutes;

        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes += 1;
        }

        if (newMinutes >= 10) {
          clearInterval(timer);
          return '10:00';
        }

        const totalSeconds = newMinutes * 60 + newSeconds;
        const maxSeconds = 10 * 60;
        setProgress((totalSeconds / maxSeconds) * 100);

        return `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    console.log("Answer submitted");
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: 'clamp(10px, 2vw, 20px)',
      borderRadius: '20px',
      minHeight: 'clamp(400px, 80vh, 650px)',
      background: '#F8F8F8',
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
    questionBox: {
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '15px',
      marginBottom: '20px',
      color: '#555',
      fontSize: '25px',
      lineHeight: '1.5',
      backgroundColor: '#ffffff',
    },
    timerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
    },
    timer: {
      fontSize: '120px',
      fontWeight: '300',
      color: '#ff9d76',
      margin: '20px 0',
    },
    progressBarContainer: {
      width: '100%',
      maxWidth: '400px',
      position: 'relative',
      marginTop: '10px',
    },
    progressBar: {
      height: '4px',
      width: '100%',
      background: '#e0e0e0',
    },
    progress: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '4px',
      width: `${progress}%`,
      background: '#ff9d76',
      transition: 'width 1s linear',
    },
    button: {
      marginTop: '30px',
      padding: '12px 30px',
      border: '1px solid #ccc',
      borderRadius: '50px',
      background: 'white',
      fontSize: '18px',
      color: '#555',
      cursor: 'pointer',
      alignSelf: 'center',
      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.questionBox}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p>
          Write a JavaScript function named <strong>sum</strong> that takes two parameters and returns their sum. Then, call the function with the numbers 5 and 7 and log the result to the console.
        </p>
      </motion.div>

      <motion.div
        style={styles.timerContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.div
          style={styles.timer}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, repeatType: 'loop', duration: 2 }}
        >
          {time}
        </motion.div>

        <div style={styles.progressBarContainer}>
          <div style={styles.progressBar}></div>
          <div style={styles.progress}></div>
        </div>

        <motion.button
          style={styles.button}
          whileHover={{ scale: 1.1, backgroundColor: '#ff9d76', color: 'white' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
        >
          send answer
        </motion.button>
      </motion.div>
    </div>
  );
}
