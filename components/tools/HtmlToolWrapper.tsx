
import React from 'react';

interface HtmlToolWrapperProps {
  htmlContent: string;
}

const HtmlToolWrapper: React.FC<HtmlToolWrapperProps> = ({ htmlContent }) => {
  return (
    <iframe
      srcDoc={htmlContent}
      title="Electrical Safety Tool"
      className="w-full h-full border-0"
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default HtmlToolWrapper;
