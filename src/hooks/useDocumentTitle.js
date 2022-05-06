import { useEffect, useState } from 'react';

export const useDocumentTitle = (title) => {
  const [documentTitle, setDocumentTitle] = useState(title);
  useEffect(() => {
    document.title = `${title} | Quizzz`;
  }, [title]);
  return { documentTitle, setDocumentTitle };
};
