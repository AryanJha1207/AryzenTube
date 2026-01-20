import React, { useState } from 'react';
import './styles/App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        height: '60px',
        backgroundColor: darkMode ? '#212121' : 'white',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>≡</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#FF0000', fontSize: '30px' }}>▶</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? 'white' : '#0f0f0f' }}>QuickTube</span>
          </div>
        </div>
        
        <div style={{ flex: '0.7', maxWidth: '600px' }}>
          <div style={{ display: 'flex' }}>
            <input 
              type="text" 
              placeholder="Search"
              style={{
                flex: 1,
                padding: '10px 16px',
                border: '1px solid #d3d3d3',
                borderRight: 'none',
                borderRadius: '40px 0 0 40px',
                backgroundColor: darkMode ? '#121212' : 'white',
                color: darkMode ? 'white' : 'black'
              }}
            />
            <button style={{
              backgroundColor: darkMode ? '#303030' : '#f8f8f8',
              border: '1px solid #d3d3d3',
              borderLeft: 'none',
              borderRadius: '0 40px 40px 0',
              padding: '0 20px',
              cursor: 'pointer'
            }}>🔍</button>
          </div>
        </div>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{
          width: '240px',
          backgroundColor: darkMode ? '#212121' : 'white',
          height: 'calc(100vh - 60px)',
          padding: '20px 0'
        }}>
          {['Home', 'Explore', 'Subscriptions', 'Library'].map(item => (
            <button key={item} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              width: '100%',
              padding: '12px 24px',
              background: 'none',
              border: 'none',
              color: darkMode ? 'white' : 'black',
              cursor: 'pointer',
              textAlign: 'left'
            }}>
              <span>📺</span>
              <span>{item}</span>
            </button>
          ))}
        </aside>
        
        {/* Main Content */}
        <main style={{ 
          flex: 1, 
          padding: '20px', 
          backgroundColor: darkMode ? '#0f0f0f' : '#f9f9f9',
          minHeight: 'calc(100vh - 60px)'
        }}>
          <h2 style={{ color: darkMode ? 'white' : 'black' }}>Welcome to QuickTube!</h2>
          <p style={{ color: darkMode ? '#aaa' : '#606060' }}>Your YouTube clone is working!</p>
          
          {/* Video Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ 
                cursor: 'pointer',
                backgroundColor: darkMode ? '#212121' : 'white',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  height: '180px', 
                  backgroundColor: '#606060',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>10:30</div>
                </div>
                <div style={{ padding: '12px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: darkMode ? 'white' : 'black' }}>
                    Video Tutorial #{i}
                  </h4>
                  <p style={{ margin: '4px 0', color: darkMode ? '#aaa' : '#606060', fontSize: '14px' }}>
                    Channel Name
                  </p>
                  <p style={{ margin: '4px 0', color: darkMode ? '#aaa' : '#606060', fontSize: '14px' }}>
                    1.2M views • 3 days ago
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Smart Features Demo */}
          <div style={{
            marginTop: '40px',
            padding: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            color: 'white'
          }}>
            <h3>✨ INNOVATIVE FEATURES</h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button style={{
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '25px',
                color: 'white',
                cursor: 'pointer'
              }}>
                🎯 Learning Mode
              </button>
              <button style={{
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '25px',
                color: 'white',
                cursor: 'pointer'
              }}>
                ⏭️ Smart Skip
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;