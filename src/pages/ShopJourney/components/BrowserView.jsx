import React from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const BrowserView = ({ url, isLoading, onBack }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Browser toolbar */}
      <div className="flex items-center gap-2 bg-gray-100 p-2 border-b">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        
        <button 
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          onClick={() => window.open(url, '_blank')}
        >
          <RefreshCw size={18} />
        </button>
        
        <div className="flex-1 bg-white py-1.5 px-3 text-sm rounded-full border text-gray-700 truncate">
          {url}
        </div>
      </div>
      
      {/* Browser content */}
      <div className="flex-1 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading website...</p>
            </div>
          </div>
        ) : (
          <iframe 
            src={url} 
            title="Browser View"
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        )}
      </div>
    </div>
  );
};

export default BrowserView;