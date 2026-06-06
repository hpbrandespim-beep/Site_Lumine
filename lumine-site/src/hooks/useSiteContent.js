import { useEffect, useState } from 'react';
import { loadSiteContent, normalizeSiteContent } from '../data/content.js';

export function useSiteContent() {
  const [content, setContent] = useState(() => loadSiteContent());

  useEffect(() => {
    function updateContent(event) {
      setContent(event.detail || loadSiteContent());
    }

    function handleStorage(event) {
      if (event.key === 'lumine-site-content-v1') setContent(loadSiteContent());
    }

    function handlePreviewMessage(event) {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== 'lumine-preview-content') return;

      setContent(normalizeSiteContent(event.data.content));
    }

    window.addEventListener('lumine-content-updated', updateContent);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('message', handlePreviewMessage);

    return () => {
      window.removeEventListener('lumine-content-updated', updateContent);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('message', handlePreviewMessage);
    };
  }, []);

  return content;
}
