import { useEffect, useState } from 'react';

function Loading() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', () => setLoading(false));
    }
  }, []);

  return (
    <div
      className='fixed left-0 top-0 z-50 h-screen w-screen bg-white'
      style={{ top: loading ? '0px' : '100vh', transition: 'all 0.5s ease-in' }}
    >
      <div className='flex h-screen'>
        <div className='m-auto'>
          <h1 className='capirola text-6xl'>Loading...</h1>
        </div>
      </div>
    </div>
  );
}

export default Loading;
