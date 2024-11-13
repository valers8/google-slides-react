import React, { useState } from 'react';
import { gapi } from 'gapi-script';

const SlideList = ({ presentationId, onSelectSlide }) => {
  const [slides, setSlides] = useState([]);
  const [error, setError] = useState(null);

  const fetchSlides = () => {
    gapi.client.slides.presentations
      .get({ presentationId })
      .then((response) => {
        setSlides(response.result.slides);
        setError(null);
      })
      .catch((err) => {
        setError('Error al obtener las diapositivas.');
        console.error(err);
      });
  };

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems: "baseline",
      }}>
      <button className="action-button" onClick={fetchSlides}><div class="action-button-title">Ver lista de diapositivas</div><svg className="icon-check-circle" viewBox="0 0 24 24" width="24" height="24">
          <path d="M9.984 17.016l9-9-1.406-1.453-7.594 7.594-3.563-3.563-1.406 1.406zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"></path>
        </svg></button>
      {error && <p>{error}</p>}
      <ul>
        {slides.map((slide, index) => (
          <li key={slide.objectId}>
            Diapositiva #{index + 1} - ID: {slide.objectId}
            <button onClick={() => onSelectSlide(slide.objectId)}>
              Seleccionar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlideList;
