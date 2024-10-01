import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Popup() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEmergencyClick = () => {
    // Redirect to the emergency page or any URL you want
    navigate('/emergency');
  };

  const handleHelpRequest = () => {
    // Close the popup and then redirect to the home page or any URL you want
    setIsOpen(false);
    navigate('/');
  };

  if (!isOpen) return null; // If the popup is closed, don't render anything

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
      }}>
        <span style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '24px',
          cursor: 'pointer',
        }} onClick={handleClose}>&times;</span>
        <h1>WELCOME TO CALM CONNECT!</h1>
        
        <button onClick={handleEmergencyClick} style={{
          backgroundColor: 'teal',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer',
        }}>
          START NOW
        </button>
        <button onClick={handleHelpRequest} style={{
          backgroundColor: 'blue',
          color: '#fff',
          padding: '10px 20px',
          margin: '10px',
          cursor: 'pointer',
          borderRadius: '5px',
        }}>
          KNOW MORE
        </button>
      </div>
    </div>
  );
}

export default Popup;
