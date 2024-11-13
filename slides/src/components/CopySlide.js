// CopySlide.js
import React, { useState } from 'react';
import { gapi } from 'gapi-script';
import SlideList from './SlideList';

const CopySlide = () => {
  const [sourcePresentationId, setSourcePresentationId] = useState('');
  const [slideObjectId, setSlideObjectId] = useState('');
  const [targetPresentationId, setTargetPresentationId] = useState('');

  const copySlide = async () => {
    try {
      // Step 1: Retrieve the slide from the source presentation
      const response = await gapi.client.slides.presentations.pages.get({
        presentationId: sourcePresentationId,
        pageObjectId: slideObjectId,
      });
  
      const slide = response.result;
  
      // Step 2: Add a blank slide in the target presentation
      const newSlideResponse = await gapi.client.slides.presentations.batchUpdate({
        presentationId: targetPresentationId,
        requests: [
          {
            createSlide: {
              slideLayoutReference: {
                predefinedLayout: 'BLANK',
              },
            },
          },
        ],
      });
  
      const newSlideObjectId = newSlideResponse.result.replies[0].createSlide.objectId;
  
      // Step 3: Duplicate elements onto the new slide
      const elementRequests = slide.pageElements.map((element) => {
        // Adjust this to copy text boxes, images, etc. depending on element type
        if (element.shape) {
          return {
            createShape: {
              objectId: element.objectId, // You may want to assign new object IDs
              shapeType: element.shape.shapeType,
              elementProperties: {
                pageObjectId: newSlideObjectId,
                size: element.size,
                transform: element.transform,
              },
            },
          };
        }
        // Add cases for other element types like images if needed
        return null;
      }).filter(Boolean); // Filter out any unsupported element types
  
      await gapi.client.slides.presentations.batchUpdate({
        presentationId: targetPresentationId,
        requests: elementRequests,
      });
  
      console.log('Slide copied successfully.');
    } catch (error) {
      console.error('Error copying the slide:', error);
    }
  };

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems: "baseline",
      }}>
         <h2 style={{fontWeight:"500"}}>Copiar diapositiva</h2>
         <input
        type="text"
        placeholder="ID de la presentación origen"
        value={sourcePresentationId}
        onChange={(e) => setSourcePresentationId(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID de la diapositiva a copiar"
        value={slideObjectId}
        onChange={(e) => setSlideObjectId(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID de la presentación destino"
        value={targetPresentationId}
        onChange={(e) => setTargetPresentationId(e.target.value)}
      />    
     
       <button className="action-button" onClick={copySlide}> <div class="action-button-title">Copiar</div><svg className="icon-check-circle" viewBox="0 0 24 24" width="24" height="24">
          <path d="M9.984 17.016l9-9-1.406-1.453-7.594 7.594-3.563-3.563-1.406 1.406zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"></path>
        </svg>
        </button>
      
    </div>
  );
};

export default CopySlide;
