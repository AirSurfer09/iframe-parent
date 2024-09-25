import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeUrl = "https://iframe-web-six.vercel.app/";
  const [iframeCount, setIframeCount] = useState<number | null>(null);
  const sendMessageToIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage("Hello from parent!", iframeUrl); // Ensure to specify the iframe origin for security
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {

      if (typeof event.data === 'number') {
        setIframeCount(event.data);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <div>
        <iframe
          ref={iframeRef}
          style={{
            height: "50vh",
            width: "80vw"
          }}
          id="Mantis"
          allowFullScreen
          src={iframeUrl}
        ></iframe>
      </div>
      <div className="card">
        <button onClick={sendMessageToIframe}>
          Send message from parent
        </button>
        <p>
          {iframeCount || "No count from iframe yet"}
        </p>
      </div>
    </>
  )
}

export default App
