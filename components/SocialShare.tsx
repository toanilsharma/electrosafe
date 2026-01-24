import React from 'react';
import { Share2, MessageCircle, Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';

interface SocialShareProps {
  url?: string;
  title?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'row' | 'column';
}

export const SocialShare: React.FC<SocialShareProps> = ({ 
  url = typeof window !== 'undefined' ? window.location.href : '', 
  title = 'Check out this electrical safety guide!', 
  className = '',
  size = 'md',
  layout = 'row'
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      name: 'Twitter (X)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-black hover:bg-gray-800',
      textColor: 'text-white'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-white'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // You might want to add a toast notification here in a real app
    alert('Link copied to clipboard!');
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`flex ${layout === 'column' ? 'flex-col' : 'flex-row'} items-center gap-2 ${className}`}>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">Share:</span>
      
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link.color} ${link.textColor} ${sizeClasses[size]} rounded-full transition-transform hover:scale-110 shadow-sm flex items-center justify-center`}
          title={`Share to ${link.name}`}
          aria-label={`Share to ${link.name}`}
        >
          <link.icon className={iconSizes[size]} />
        </a>
      ))}
      
      <button
        onClick={copyToClipboard}
        className={`bg-gray-100 hover:bg-gray-200 text-gray-600 ${sizeClasses[size]} rounded-full transition-transform hover:scale-110 shadow-sm flex items-center justify-center`}
        title="Copy Link"
      >
        <LinkIcon className={iconSizes[size]} />
      </button>
    </div>
  );
};
