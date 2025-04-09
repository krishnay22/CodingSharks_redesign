import React, { useState } from 'react';

// ToggleButton Component
const ToggleButton = ({ onChange, defaultMonthly = true, children }) => {
  const [isMonthly, setIsMonthly] = useState(defaultMonthly);
 
  const handleToggle = (value) => {
    setIsMonthly(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "20px",
        position: "relative",
        minHeight: "650px",
        background: "#F8F8F8",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Toggle Switch */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "50%",
          transform: "translateX(50%)",
          display: "flex",
          borderRadius: "50px",
          border: "1px solid #e0e0e0",
          overflow: "hidden",
          padding: "2px",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <button
          onClick={() => handleToggle(true)}
          style={{
            backgroundColor: isMonthly ? "#FF9674" : "transparent",
            color: isMonthly ? "#ffffff" : "#000000",
            border: "none",
            padding: "8px 20px",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: isMonthly ? "100" : "100", 
            fontSize: "14px",
            transition: "all 0.3s ease",
            outline: "none",
          }}
        >
          Monthly
        </button>
        <button
          onClick={() => handleToggle(false)}
          style={{
            backgroundColor: !isMonthly ? "#FF9674" : "transparent",
            color: !isMonthly ? "#ffffff" : "#000000",
            border: "none",
            padding: "8px 20px",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: !isMonthly ? "100" : "100", 
            fontSize: "14px",
            transition: "all 0.3s ease",
            outline: "none",
          }}
        >
          Weekly
        </button>
      </div>

  
      <div style={{ width: "100%", paddingTop: "60px" }}>
        {children}
      </div>
    </div>
  );
};


const LeaderboardItem = ({ rank, score, questionsSolved, name, avatarUrl, logo, width, height }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #e0e0e0',
      borderRadius: '24px',
      padding: '10px',
      marginBottom: '15px',
      backgroundColor: 'white',
      width: '100%',
      maxWidth: width,
      height: height,
      flexWrap: 'wrap'
    }}>

      <div style={{
        fontSize: '44px',
        fontWeight: 'normal',
        minWidth: '50px',
        textAlign: 'center',
        marginRight: '32px'
      }}>
        {rank}.
      </div>

   
      <div style={{
        width: '137px',
        height: '113px',
        borderRadius: '24px',
        overflow: 'hidden',
        marginRight: '15px',
        border: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          logo
        )}
      </div>

   
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}>
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '15px',
          padding: '5px 15px',
          fontSize: '34px',
          color: '#555',
          textAlign: 'left',
          width: '436px',
          height: '56px',
        }}>
          Score: {score}
        </div>
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '15px',
          padding: '5px 15px',
          fontSize: '34px',
          color: '#555',
          textAlign: 'left',
          width: '436px',
          height: '56px',
        }}>
          Questions Solved: {questionsSolved}
        </div>
      </div>

  
      <div style={{
        width: '1px',
        height: '120px',
        backgroundColor: '#e0e0e0',
        margin: '0 15px'
      }}></div>

    
      <div style={{
        fontSize: '34px',
        color: '#666',
        fontWeight: 'normal',
        width: '219px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'center'
      }}>
        {name}
      </div>
    </div>
  );
};


const Leaderboard = ({ type = "Monthly" }) => {

  const leaderboardData = [
    { rank: 1, score: 12435, questionsSolved: 12, name: 'Anubhav Parte', avatarUrl: null, logo: null },
    { rank: 2, score: 11430, questionsSolved: 10, name: 'Anubhav', avatarUrl: null, logo: null },
    { rank: 3, score: 11025, questionsSolved: 8, name: 'Monika Patidar', avatarUrl: null, logo: null },
    {
      rank: 4,
      score: 10850,
      questionsSolved: 7,
      name: 'Sakshi Jain',
      avatarUrl: "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg",
      logo: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20C24.1421 20 27.5 16.6421 27.5 12.5C27.5 8.35786 24.1421 5 20 5C15.8579 5 12.5 8.35786 12.5 12.5C12.5 16.6421 15.8579 20 20 20Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32.5 35C32.5 28.0964 26.9036 22.5 20 22.5C13.0964 22.5 7.5 28.0964 7.5 35" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];


  const dimensions = [
    { width: '100%', height: '150px' },
    { width: '90%', height: '150px' },
    { width: '90%', height: '150px' },
    { width: '100%', height: '150px' }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f8f8f8',
      borderRadius: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1248px',
      width: '100%',
      margin: '0 auto'
    }}>
      {leaderboardData.map((item, index) => (
        <LeaderboardItem
          key={item.rank}
          rank={item.rank}
          score={item.score}
          questionsSolved={item.questionsSolved}
          name={item.name}
          avatarUrl={item.avatarUrl}
          logo={item.logo}
          width={dimensions[index]?.width || '100%'}
          height={dimensions[index]?.height || '100px'}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  
  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <ToggleButton 
        defaultMonthly={isMonthly} 
        onChange={setIsMonthly}
      >
        {isMonthly ? <Leaderboard type="Monthly" /> : <Leaderboard type="Weekly" />}
      </ToggleButton>
    </div>
  );
};

export default App;