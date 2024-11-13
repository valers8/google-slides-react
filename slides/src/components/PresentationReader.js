// PresentationReader.js
import React, { useState } from 'react';
import { gapi } from 'gapi-script';

const PresentationReader = () => {
  const [presentationId, setPresentationId] = useState('');
  const [presentationTitle, setPresentationTitle] = useState('');

  const readPresentation = async () => {
    try {
      const response = await gapi.client.slides.presentations.get({
        presentationId: presentationId,
      });
      setPresentationTitle(response.result.title);
      console.log('Título de la presentación:', response.result.title);
    } catch (error) {
      console.error('Error al leer la presentación:', error);
    }
  };

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems: "baseline",
      }}>
        <h2 style={{fontWeight:"500"}}>Leer título de presentación</h2>
      <input
        type="text"
        placeholder="ID de la presentación"
        value={presentationId}
        onChange={(e) => setPresentationId(e.target.value)}
      />
      <button className="action-button" onClick={readPresentation}><div class="action-button-title">Leer titulo</div><svg className="icon-check-circle" viewBox="0 0 24 24" width="24" height="24">
          <path d="M9.984 17.016l9-9-1.406-1.453-7.594 7.594-3.563-3.563-1.406 1.406zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"></path>
        </svg></button>
      {presentationTitle && (
        <p>Título de la presentación: {presentationTitle}</p>
      )}
    </div>
  );
};

export default PresentationReader;
