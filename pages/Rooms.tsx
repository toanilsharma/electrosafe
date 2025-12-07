
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROOMS } from '../data';
import { CheckSquare, AlertTriangle, ThumbsUp, XCircle, Wrench, HardHat } from 'lucide-react';

export const Rooms = () => {
  const location = useLocation();
  const [activeRoomId, setActiveRoomId] = useState(ROOMS[0].id);

  useEffect(() => {
    if (location.state?.id) {
      setActiveRoomId(location.state.id);
    }
  }, [location.state]);

  const activeRoom = ROOMS.find(r => r.id === activeRoomId) || ROOMS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Room-by-Room Safety</h1>
        <p className="mt-2 text-gray-600">Select a room to view specific hazards and safety checklists.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          {ROOMS.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoomId(room.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeRoomId === room.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <room.icon className={`w-5 h-5 ${activeRoomId === room.id ? 'text-white' : 'text-gray-400'}`} />
              <span className="font-medium">{room.name}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8 border-b pb-6">
            <div className="p-3 bg-blue-50 rounded-full">
              <activeRoom.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{activeRoom.name} Safety</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <h3 className="flex items-center gap-2 font-bold text-red-700 mb-4">
                <AlertTriangle className="w-5 h-5" /> Common Hazards
              </h3>
              <ul className="space-y-2">
                {activeRoom.hazards.map((hazard, i) => (
                  <li key={i} className="flex items-start gap-2 text-red-900 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                    {hazard}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <h3 className="flex items-center gap-2 font-bold text-green-700 mb-4">
                <CheckSquare className="w-5 h-5" /> Inspection Checklist
              </h3>
              <ul className="space-y-2">
                {activeRoom.checklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-green-900 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-green-500" /> DOs
              </h3>
              <ul className="space-y-3">
                {activeRoom.dos.map((d, i) => (
                  <li key={i} className="text-gray-600 text-sm pl-4 border-l-2 border-green-200">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" /> DON'Ts
              </h3>
              <ul className="space-y-3">
                {activeRoom.donts.map((d, i) => (
                  <li key={i} className="text-gray-600 text-sm pl-4 border-l-2 border-red-200">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DIY vs Pro Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-600" /> What You Can Fix (DIY)
              </h3>
              <ul className="space-y-2">
                {activeRoom.homeownerFix.map((fix, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                    {fix}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HardHat className="w-5 h-5 text-orange-600" /> Call a Certified Electrician
              </h3>
              <ul className="space-y-2">
                {activeRoom.electricianFix.map((fix, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                    {fix}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
