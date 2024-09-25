import { useRef } from 'react';
import './App.css'

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeUrl = "https://iframe-web-six.vercel.app/";

  const sendMessageToIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage("Hello from parent!", iframeUrl); // Ensure to specify the iframe origin for security
    }
  };

  return (
    <>
      <div>

        <iframe
          ref={iframeRef}
          style={{ height: window.innerHeight, width: window.innerWidth }}
          id="Mantis"
          frameBorder="0"
          allowFullScreen
          src={iframeUrl}
        ></iframe>
      </div>
      <div className="card">
        <button onClick={sendMessageToIframe}>
          Send message from parent
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
