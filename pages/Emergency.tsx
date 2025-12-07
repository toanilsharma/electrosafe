import React from 'react';
import { AlertTriangle, Phone, Power, DoorOpen, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Emergency = () => {
  return (
    <div className="min-h-screen bg-red-600 text-white pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b border-red-400 pb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-yellow-300 animate-pulse" />
            <h1 className="text-3xl font-extrabold tracking-tight uppercase">Emergency Protocol</h1>
          </div>
          <Link to="/" className="text-white/80 hover:text-white font-medium text-sm underline">
            Exit Emergency Mode
          </Link>
        </div>

        <div className="space-y-6">
          
          {/* Step 1: Immediate Action */}
          <section className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl animate-slide-up">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-4 rounded-full">
                <Power className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-red-700">1. ISOLATE POWER</h2>
                <p className="text-lg font-medium leading-relaxed">
                  If safe to do so, go to your Main Electrical Panel and switch off the <strong className="text-red-600">MAIN BREAKER</strong> immediately.
                </p>
                <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-100 text-sm">
                  <strong>Warning:</strong> Do not touch the panel if it is hot, buzzing loudly, or if you are standing in water.
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Fire Safety */}
          <section className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl animate-slide-up delay-100">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <Flame className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-orange-700">2. CHECK FOR FIRE</h2>
                <p className="text-lg font-medium leading-relaxed">
                  Do NOT use water on electrical fires. Use a <strong className="text-orange-600">Class C (CO2 or Powder)</strong> Fire Extinguisher only.
                </p>
                <p className="mt-2 text-gray-600">
                  If the fire is spreading or you do not have an extinguisher, close the door to the room to contain it.
                </p>
              </div>
            </div>
          </section>

           {/* Step 3: Evacuate */}
          <section className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl animate-slide-up delay-200">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <DoorOpen className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-blue-700">3. EVACUATE</h2>
                <p className="text-lg font-medium leading-relaxed">
                  If there is smoke, get everyone outside immediately. Do not delay to pack belongings.
                </p>
              </div>
            </div>
          </section>

          {/* Step 4: Call Help */}
          <section className="bg-red-800 text-white rounded-2xl p-8 shadow-xl border border-red-400 animate-slide-up delay-300 text-center">
            <Phone className="w-12 h-12 mx-auto mb-4 text-white/90" />
            <h2 className="text-2xl font-bold mb-4">CALL EMERGENCY SERVICES</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-xs opacity-70">USA / NA</div>
                <div className="text-xl font-bold">911</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-xs opacity-70">UK / HK</div>
                <div className="text-xl font-bold">999</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-xs opacity-70">Europe / India</div>
                <div className="text-xl font-bold">112</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-xs opacity-70">Australia</div>
                <div className="text-xl font-bold">000</div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};