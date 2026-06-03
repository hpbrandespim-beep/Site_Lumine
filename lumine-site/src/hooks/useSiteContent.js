import { useEffect, useState } from 'react';
import { loadSiteContent } from '../data/content.js';

export function useSiteContent() {
  const [content, setContent] = useState(() => loadSiteContent());

  useEffect(() => {
    function updateContent(event) {
      setContent(event.detail || loadSiteContent());
    }

    function handleStorage(event) {
      if (event.key === 'lumine-site-content-v1') setContent(loadSiteContent());
    }

    window.addEventListener('lumine-content-updated', updateContent);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('lumine-content-updated', updateContent);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return content;
}
