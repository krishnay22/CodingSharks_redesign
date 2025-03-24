import React from 'react';

const LeaderboardItem = ({ rank, score, questionsSolved, name, avatarUrl, width, height }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #e0e0e0',
      borderRadius: '15px',
      padding: '10px',
      marginBottom: '15px',
      backgroundColor: 'white',
      width: '100%',  // Making it responsive
      maxWidth: width,  // Dynamically setting width
      height: height, // Dynamically setting height
      flexWrap: 'wrap' // Allows wrapping on small screens
    }}>
      {/* Rank */}
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        minWidth: '50px',
        textAlign: 'center',
        marginRight: '10px'
      }}>
        {rank}.
      </div>
      
      {/* Avatar */}
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '10px',
        overflow: 'hidden',
        marginRight: '15px',
        border: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}> 
      </div>
      
      {/* Stats */}
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
          fontSize: '14px',
          color: '#555',
          textAlign: 'center'
        }}>
          Score: {score}
        </div>
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '15px',
          padding: '5px 15px',
          fontSize: '14px',
          color: '#555',
          textAlign: 'center'
        }}>
          Questions Solved: {questionsSolved}
        </div>
      </div>
      
      {/* Divider */}
      <div style={{
        width: '1px',
        height: '60px',
        backgroundColor: '#e0e0e0',
        margin: '0 15px'
      }}></div>
      
      {/* User name */}
      <div style={{
        fontSize: '18px',
        color: '#666',
        fontWeight: '500',
        width: '150px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'center'
      }}>
        {name}
      </div>
    </div>
  );
};

const Leaderboard = () => {
  // Sample data
  const leaderboardData = [
    { rank: 1, score: 12435, questionsSolved: 12, name: 'Anubhav Parte', avatarUrl: null },
    { rank: 2, score: 11430, questionsSolved: 10, name: 'Anubhav', avatarUrl: null },
    { rank: 3, score: 11025, questionsSolved: 8, name: 'Monika Patidar', avatarUrl: null },
    { rank: 4, score: 10850, questionsSolved: 7, name: 'Sakshi Jain', avatarUrl: null }
  ];

  // Custom height & width for each item (Responsive)
  const dimensions = [
    { width: '100%', height: '120px' }, // 1st item
    { width: '90%', height: '110px' },  // 2nd item
    { width: '80%', height: '100px' },  // 3rd item
    { width: '70%', height: '90px' }    // 4th item
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
      maxWidth: '1067px',
      width: '100%', // Responsive width
      margin: '0 auto'
    }}>
      <h2 style={{
        color: '#333',
        textAlign: 'center',
        marginBottom: '20px'
      }}>Leaderboard</h2>

      {leaderboardData.map((item, index) => (
        <LeaderboardItem
          key={item.rank}
          rank={item.rank}
          score={item.score}
          questionsSolved={item.questionsSolved}
          name={item.name}
          avatarUrl={item.avatarUrl}
          width={dimensions[index]?.width || '100%'}  // Assign width
          height={dimensions[index]?.height || '100px'} // Assign height
        />
      ))}
    </div>
  );
};

export default Leaderboard;
