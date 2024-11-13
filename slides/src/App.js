
import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import PresentationReader from './components/PresentationReader';
import ReadSlides from './components/ReadSlides';
import CopySlide from './components/CopySlide';
import CreatePresentation from './components/CreatePresentation';
import SlideList from './components/SlideList';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState('CreatePresentation'); 

  const clientId = '936151289702-l28ht7vapsj9qsaelbehcr7ciu9l45uu.apps.googleusercontent.com';
  const apiKey = 'AIzaSyCbv-WHa16pqTq0i1t0c9le95e2O3-zEMU';

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: apiKey,
          clientId: clientId,
          discoveryDocs: [
            'https://slides.googleapis.com/$discovery/rest?version=v1',
          ],
          scope: 'https://www.googleapis.com/auth/presentations',
        })
        .then(
          () => {
            console.log('GAPI inicializado');
          },
          (error) => {
            console.error('Error al inicializar GAPI:', error);
          }
        );
    };

    gapi.load('client:auth2', initClient);
  }, [apiKey, clientId]);

  const onSuccess = (response) => {
    setIsAuthenticated(true);
    setUser(response.profileObj);
    setToken(response.accessToken);
    console.log('Inicio de sesión exitoso:', response);
  };

  const onFailure = (response) => {
    console.error('Error en el inicio de sesión:', response);
  };

  const onLogoutSuccess = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken('');
    console.log('Cierre de sesión exitoso');
  };

  return (
      <div
        className="App"
        style={{          
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop:'3rem',
        }}
      >     
      {!isAuthenticated ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Iniciar sesión con Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          scope="https://www.googleapis.com/auth/presentations"
        />
      ) : (
        <div className="main-container">
           <div className='user-log-info'>
            <p>Bienvenido, {user.name}</p> 
            <GoogleLogout
              clientId={clientId}
              buttonText="Cerrar sesión"
              onLogoutSuccess={onLogoutSuccess}
            />           
            </div> 
            <div className='sidebar-content-box'>
            <div className="sidebar">                  
            <button className={`icon-new_releases ${activeTab === 'CreatePresentation' ? 'active' : ''}`} onClick={() => setActiveTab('CreatePresentation')}></button>
            <button className={`icon-library_books ${activeTab === 'PresentationReader' ? 'active' : ''}`} onClick={() => setActiveTab('PresentationReader')}></button>
            <button className={`icon-slideshow ${activeTab === 'ReadSlides' ? 'active' : ''}`} onClick={() => setActiveTab('ReadSlides')}></button>
            <button className={`icon-content_copy ${activeTab === 'CopySlide' ? 'active' : ''}`} onClick={() => setActiveTab('CopySlide')}></button>
            <button className={`icon-format_list_bulleted ${activeTab === 'SlideList' ? 'active' : ''}`} onClick={() => setActiveTab('SlideList')}></button>
            <button className="last"></button>
          </div>
          <div className="content">
            {activeTab === 'CreatePresentation' && <CreatePresentation />}
            {activeTab === 'PresentationReader' && <PresentationReader />}
            {activeTab === 'ReadSlides' && <ReadSlides />}
            {activeTab === 'CopySlide' && <CopySlide />}
            {activeTab === 'SlideList' && <SlideList />}
          </div>
            </div>

        </div>
      )}
    </div>
  );
}

export default App;
