// ReadSlides.js
import React, { useState } from 'react';
import { gapi } from 'gapi-script';

const ReadSlides = () => {
  const [presentationId, setPresentationId] = useState('');
  const [slides, setSlides] = useState([]);

  const readSlides = async () => {
    try {
      const response = await gapi.client.slides.presentations.get({
        presentationId: presentationId,
      });
      const slidesData = response.result.slides.map((slide, index) => ({
        id: slide.objectId,
        title: slide.pageElements
          .filter((element) => element.shape)
          .map((element) => element.shape.text?.textElements?.map((te) => te.textRun?.content).join(''))
          .join('') || `Diapositiva ${index + 1}`,
      }));
      setSlides(slidesData);
    } catch (error) {
      console.error('Error al leer las diapositivas:', error);
    }
  };

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems: "baseline",
      }}>
         <h2 style={{fontWeight:"500"}}>Leer diapositivas</h2>
      <input
        type="text"
        placeholder="ID de la presentación"
        value={presentationId}
        onChange={(e) => setPresentationId(e.target.value)}
      />
       <button className="action-button" onClick={readSlides}><div class="action-button-title">Leer</div><svg className="icon-check-circle" viewBox="0 0 24 24" width="24" height="24">
          <path d="M9.984 17.016l9-9-1.406-1.453-7.594 7.594-3.563-3.563-1.406 1.406zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"></path>
        </svg></button>
      <ul>
        {slides.map((slide) => (
          <li key={slide.id}>{slide.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReadSlides;
