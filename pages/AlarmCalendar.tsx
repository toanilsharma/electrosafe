import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Bell, AlertTriangle, ShieldAlert, ArrowRight, Download, Search } from 'lucide-react';

const RECALLED_PRODUCTS = [
  { id: 1, brand: 'Kidde', type: 'Smoke/Carbon Monoxide Alarm', issue: 'Alarm can fail to alert consumers to a fire or CO incident.', year: '2021', model: 'TruSense Series' },
  { id: 2, brand: 'Schneider Electric', type: 'Electrical Panel', issue: 'Overheating leading to thermal burn and fire hazards.', year: '2022', model: 'Square D QO Plug-on Neutral' },
  { id: 3, brand: 'Eaton', type: 'Circuit Breaker', issue: 'Breaker can misfire and fail to trip during an overload.', year: '2020', model: 'BR Series 15A & 20A' },
  { id: 4, brand: 'Dehumidifiers', type: 'Various Brands (Midea, GE, etc.)', issue: 'Units can overheat, smoke, and catch fire.', year: '2021', model: 'Over 2 million units' },
  { id: 5, brand: 'Generac', type: 'Portable Generator', issue: 'Fingers can get amputated by the folding handle.', year: '2022', model: '6500W & 8000W' },
];

export const AlarmCalendar: React.FC = () => {
  const [installDate, setInstallDate] = useState<string>('');
  const [alarmType, setAlarmType] = useState<string>('smoke'); // smoke (10 yr), CO (7 yr)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getExpirationDetails = () => {
    if (!installDate) return null;
    
    const start = new Date(installDate);
    const yearsToLive = alarmType === 'smoke' ? 10 : 7;
    
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + yearsToLive);
    
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isExpired = diffDays <= 0;

    return { 
      expirationDate: end.toLocaleDateString(), 
      isExpired, 
      daysLeft: isExpired ? 0 : diffDays,
      yearsToLive,
      endObj: end
    };
  };

  const generateICS = (endObj: Date, typeStr: string) => {
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const start = formatDate(endObj);
    // Make it a 1 hour event
    const end = new Date(endObj.getTime() + 60 * 60 * 1000);
    const endFormated = formatDate(end);

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ElectroSafe.homes//Alarm Calendar//EN
BEGIN:VEVENT
UID:${new Date().getTime()}@electrosafe.homes
DTSTAMP:${formatDate(new Date())}
DTSTART:${start}
DTEND:${endFormated}
SUMMARY:CRITICAL: Replace ${typeStr} Alarm
DESCRIPTION:Your ${typeStr} alarm has reached its manufacturer end-of-life and will no longer reliably detect deadly gases or fires. Replace it immediately. (Generated via ElectroSafe.homes)
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: Replace ${typeStr} Alarm tomorrow!
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `replace_${alarmType}_alarm.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const details = getExpirationDetails();
  
  const filteredRecalls = RECALLED_PRODUCTS.filter(p => 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>Recall Radar & Smoke Alarm Calendar | ElectroSafe.homes</title>
        <meta name="description" content="Generate a 10-year calendar reminder for your smoke alarms and check our database for dangerous, recalled electrical panels and products." />
        <link rel="canonical" href="https://electrosafe.homes/alarm-calendar" />
      </Helmet>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Bell className="w-4 h-4 text-orange-600 animate-wiggle" /> Time Bomb Check
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-6 tracking-tight">
          The 10-Year <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Alarm Calendar</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Sensors chemically degrade over time. Smoke alarms die at 10 years; Carbon Monoxide alarms die at 7. Put a reminder in your calendar today, so you don't burn tomorrow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        
        {/* Input Panel */}
        <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-6">Set Your Expiration Timer</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-2">What type of alarm?</label>
              <div className="flex gap-4">
                 <button 
                   onClick={() => setAlarmType('smoke')}
                   className={`flex-1 py-3 px-4 rounded-xl font-bold border-2 transition-all ${
                     alarmType === 'smoke' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white dark:bg-gray-900 dark:bg-gray-900 border-slate-200 dark:border-gray-700 dark:border-gray-700 text-slate-500 dark:text-gray-400 dark:text-gray-400 hover:border-orange-300'
                   }`}
                 >
                   Smoke (10 Yr)
                 </button>
                 <button 
                   onClick={() => setAlarmType('co')}
                   className={`flex-1 py-3 px-4 rounded-xl font-bold border-2 transition-all ${
                     alarmType === 'co' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white dark:bg-gray-900 dark:bg-gray-900 border-slate-200 dark:border-gray-700 dark:border-gray-700 text-slate-500 dark:text-gray-400 dark:text-gray-400 hover:border-orange-300'
                   }`}
                 >
                   Carbon Monoxide (7 Yr)
                 </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-2">Manufacture Date (Printed on Back)</label>
              <input 
                type="date"
                className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 text-slate-900 dark:text-gray-100 dark:text-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none font-medium text-lg"
                value={installDate}
                onChange={(e) => setInstallDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            
            <div className="bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 rounded-xl p-4 flex gap-3 items-start border border-slate-200 dark:border-gray-700 dark:border-gray-700">
               <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
               <p className="text-sm text-slate-700 dark:text-gray-300 dark:text-gray-300">
                 You must un-mount the alarm from the ceiling to look at the sticker on the back. Do not guess.
               </p>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className={`rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all duration-500 ${
          details ? (details.isExpired ? 'bg-red-900' : 'bg-slate-900') : 'bg-slate-800'
        }`}>
           
           <h2 className="text-xl font-bold text-white mb-6 relative z-10">Sensor Status</h2>
           
           {details ? (
             <div className="space-y-6 relative z-10 animate-fade-in">
               
               {details.isExpired ? (
                 <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 text-center animate-pulse">
                    <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-3xl font-black text-white mb-2">DEAD SENSOR</h3>
                    <p className="text-red-200 text-lg">
                      This alarm expired on <strong>{details.expirationDate}</strong>. It will no longer reliably detect a fire.
                    </p>
                 </div>
               ) : (
                 <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-black text-white mb-2">{details.daysLeft}</div>
                    <div className="text-orange-300 font-bold uppercase tracking-wider text-sm mb-4">Days of Protection Left</div>
                    <p className="text-slate-300">
                      Your {alarmType} sensor will chemically expire on <strong>{details.expirationDate}</strong>.
                    </p>
                 </div>
               )}

               {!details.isExpired && (
                 <button 
                   onClick={() => generateICS(details.endObj, alarmType.toUpperCase())}
                   className="w-full flex justify-center items-center gap-2 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg shadow-orange-500/30 transform hover:-translate-y-1"
                 >
                   <Calendar className="w-5 h-5" /> Download .ICS Calendar Reminder
                 </button>
               )}
               
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center py-10 opacity-50 relative z-10">
               <Calendar className="w-12 h-12 text-slate-400 mb-4" />
               <p className="text-slate-400 text-center font-medium">Enter the date to calculate<br/>your sensor's death date.</p>
             </div>
           )}
        </div>
      </div>

      {/* Feature 9b: The Recall Radar */}
      <div className="mt-16 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 dark:border-gray-700 dark:border-gray-700">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
               <h2 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-2">The Recall Radar</h2>
               <p className="text-slate-600 dark:text-gray-400 dark:text-gray-400">Millions of dangerous electrical products are sitting in homes right now. Check if yours is one of them.</p>
            </div>
            
            <div className="relative w-full md:w-72">
               <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
               <input 
                 type="text"
                 placeholder="Search brands (e.g. Kidde, Eaton)"
                 className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 dark:border-gray-700">
                     <th className="py-4 px-4 font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300">Brand / Type</th>
                     <th className="py-4 px-4 font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 hidden md:table-cell">Model Data</th>
                     <th className="py-4 px-4 font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300">Deadly Defect</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredRecalls.length > 0 ? (
                    filteredRecalls.map(item => (
                      <tr key={item.id} className="border-b border-slate-100 dark:border-gray-800 dark:border-gray-800 hover:bg-red-50/50 transition-colors">
                         <td className="py-4 px-4">
                            <div className="font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100">{item.brand}</div>
                            <div className="text-sm text-slate-500 dark:text-gray-400 dark:text-gray-400">{item.type}</div>
                         </td>
                         <td className="py-4 px-4 hidden md:table-cell">
                            <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 text-slate-700 dark:text-gray-300 dark:text-gray-300 text-xs rounded-md font-mono mb-1">{item.model}</span>
                            <div className="text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400">Recalled: {item.year}</div>
                         </td>
                         <td className="py-4 px-4">
                            <div className="flex items-start gap-2 text-red-700">
                               <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                               <span className="text-sm font-medium">{item.issue}</span>
                            </div>
                         </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-500 dark:text-gray-400 dark:text-gray-400">
                        No recalls found matching your search. Constantly check the CPSC website for updates.
                      </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
         
         <div className="mt-8 text-center">
             <a href="https://www.cpsc.gov/Recalls" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
               View Official Gov CPSC Database <ArrowRight className="w-4 h-4" />
             </a>
         </div>
      </div>
      
    </div>
  );
};
