
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HAZARD_GALLERY } from '../data';
import { HazardImage } from '../types';
import { X, AlertTriangle, ShieldCheck } from 'lucide-react';

export const Gallery = () => {
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<HazardImage | null>(null);

  useEffect(() => {
    if (location.state?.id) {
      const found = HAZARD_GALLERY.find(h => h.id === location.state.id);
      if (found) setSelectedImage(found);
    }
  }, [location.state]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Hazard Gallery</h1>
        <p className="mt-2 text-gray-600">Visual examples of common electrical dangers. Learn to identify them before they cause harm.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HAZARD_GALLERY.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedImage(item)}
            className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all"
          >
            <div className="aspect-w-16 aspect-h-12 bg-gray-200">
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Click to analyze risk</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full transition z-10"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                 <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
              <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
                <p className="text-gray-600 mb-6">{selectedImage.description}</p>
                
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="text-xs font-bold text-red-600 uppercase tracking-wide flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3 h-3" /> Risk
                    </div>
                    <p className="text-sm text-red-900 font-medium">{selectedImage.risk}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="text-xs font-bold text-green-600 uppercase tracking-wide flex items-center gap-1 mb-1">
                      <ShieldCheck className="w-3 h-3" /> Solution
                    </div>
                    <p className="text-sm text-green-900 font-medium">{selectedImage.prevention}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
