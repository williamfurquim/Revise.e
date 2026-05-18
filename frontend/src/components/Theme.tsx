import { useState, useEffect } from 'react';

export function Theme() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('white-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('white-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (

    <button onClick={() => setIsDark(!isDark)}>
      Ativar modo {isDark ? 'claro' : 'escuro'}
    </button>
    
  );
}