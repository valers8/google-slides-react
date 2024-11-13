// CreatePresentation.js
import React, { useState } from 'react';
import { gapi } from 'gapi-script';

const CreatePresentation = () => {
  const [title, setTitle] = useState('');
  const [newPresentationId, setNewPresentationId] = useState('');

  const createPresentation = async () => {
    try {
      const response = await gapi.client.slides.presentations.create({
        title: title,
      });
      setNewPresentationId(response.result.presentationId);
      console.log('Presentación creada con ID:', response.result.presentationId);
    } catch (error) {
      console.error('Error al crear la presentación:', error);
    }
  };

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems: "baseline",
      }}>
        <h2 style={{fontWeight:"500"}}>Crear presentación</h2>
        <input
        type="text"
        placeholder="Título de la nueva presentación"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />    
      <button className="action-button" onClick={createPresentation}>
        <div class="action-button-title">Crear</div>
        <svg className="icon-check-circle" viewBox="0 0 24 24" width="24" height="24">
          <path d="M9.984 17.016l9-9-1.406-1.453-7.594 7.594-3.563-3.563-1.406 1.406zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"></path>
        </svg>
      </button>
        
      {newPresentationId && <p>ID de la nueva presentación: {newPresentationId}</p>}
    </div>
  );
};

export default CreatePresentation;

