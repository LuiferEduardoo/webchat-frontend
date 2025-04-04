import React from 'react';

const ChatNotSelected: React.FC = () => {
  return (
    <div
      style={{
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h5 style={{ color: '#6c757d' }}>Chat no seleccionado aun</h5>
      <p style={{ color: '#6c757d', marginTop: '1rem' }}>
        Porfavor selecciona un chat para empezar a hablar.
      </p>
    </div>
  );
};

export default ChatNotSelected;
