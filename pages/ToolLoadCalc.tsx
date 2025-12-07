
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Zap, 
  AlertTriangle, 
  DollarSign, 
  Clock, 
  Search, 
  Monitor, 
  ChefHat, 
  Fan, 
  Tv, 
  Check,
  X,
  Globe,
  Info,
  BatteryCharging
} from 'lucide-react';
import { LoadItem } from '../types';

// Enhanced data with categories
const APPLIANCE_LIBRARY = [
  // Kitchen
  { name: 'Refrigerator', watts: 200, category: 'Kitchen', icon: ChefHat },
  { name: 'Microwave', watts: 1000, category: 'Kitchen', icon: ChefHat },
  { name: 'Induction Cooktop', watts: 2000, category: 'Kitchen', icon: ChefHat },
  { name: 'Dishwasher', watts: 1200, category: 'Kitchen', icon: ChefHat },
  { name: 'Kettle', watts: 1500, category: 'Kitchen', icon: ChefHat },
  
  // Climate
  { name: 'Ceiling Fan', watts: 75, category: 'Climate', icon: Fan },
  { name: 'AC (Window/Split)', watts: 1500, category: 'Climate', icon: Fan },
  { name: 'Space Heater', watts: 1500, category: 'Climate', icon: Fan },
  { name: 'Water Heater/Geyser', watts: 4000, category: 'Climate', icon: Fan },
  
  // Living/Office
  { name: 'LED Light Bulb', watts: 10, category: 'Living', icon: Zap },
  { name: 'Television (LED)', watts: 150, category: 'Living', icon: Tv },
  { name: 'Gaming PC / Desktop', watts: 400, category: 'Office', icon: Monitor },
  { name: 'Laptop Charger', watts: 65, category: 'Office', icon: Monitor },
  { name: 'WiFi Router', watts: 15, category: 'Office', icon: Monitor },
  
  // Laundry/Utility
  { name: 'Washing Machine', watts: 500, category: 'Utility', icon: Zap },
  { name: 'Clothes Dryer', watts: 3000, category: 'Utility', icon: Zap },
  { name: 'Water Pump', watts: 750, category: 'Utility', icon: Zap },
  { name: 'EV Charger', watts: 7000, category: 'Utility', icon: Zap },
];

const CATEGORIES = ['Kitchen', 'Climate', 'Living', 'Office', 'Utility'];

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$)' },
  { code: 'CAD', symbol: 'C$', label: 'CAD (C$)' },
  { code: 'JPY', symbol: '¥', label: 'JPY (¥)' },
  { code: 'CNY', symbol: '¥', label: 'CNY (¥)' },
  { code: 'AED', symbol: 'dh', label: 'AED (dh)' },
  { code: 'SAR', symbol: 'SR', label: 'SAR (SR)' },
  { code: 'NGN', symbol: '₦', label: 'NGN (₦)' },
  { code: 'ZAR', symbol: 'R', label: 'ZAR (R)' },
];

export const ToolLoadCalc = () => {
  const [items, setItems] = useState<LoadItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [costPerUnit, setCostPerUnit] = useState<number>(0.15);
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [backupHours, setBackupHours] = useState(4);

  // Load persistence for Items
  useEffect(() => {
    const saved = localStorage.getItem('load_calc_items');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('load_calc_items', JSON.stringify(items));
  }, [items]);

  // Load persistence for Settings (Rate & Currency)
  useEffect(() => {
    const savedSettings = localStorage.getItem('load_calc_settings');
    if (savedSettings) {
      const { rate, currCode } = JSON.parse(savedSettings);
      if (rate) setCostPerUnit(rate);
      if (currCode) {
        const found = CURRENCIES.find(c => c.code === currCode);
        if (found) setCurrency(found);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('load_calc_settings', JSON.stringify({ rate: costPerUnit, currCode: currency.code }));
  }, [costPerUnit, currency]);

  // Toast Timer
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const addItem = (appliance: typeof APPLIANCE_LIBRARY[0]) => {
    const existingIndex = items.findIndex(i => i.name === appliance.name);
    
    if (existingIndex >= 0) {
      // Increment Qty if exists
      const newItems = [...items];
      newItems[existingIndex].qty += 1;
      setItems(newItems);
    } else {
      // Add new
      setItems([...items, { 
        name: appliance.name, 
        watts: appliance.watts, 
        qty: 1, 
        hoursPerDay: 1 
      }]);
    }
    setToastMsg(`${appliance.name} added!`);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const updateItem = (index: number, field: keyof LoadItem, value: number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  // Calculations
  const totalWatts = items.reduce((acc, item) => acc + (item.watts * item.qty), 0);
  const totalKW = (totalWatts / 1000).toFixed(2);
  const dailyKWh = items.reduce((acc, item) => acc + ((item.watts * item.qty * (item.hoursPerDay || 1)) / 1000), 0);
  const dailyCost = dailyKWh * costPerUnit;
  const monthlyCost = dailyCost * 30;

  // Backup Calculations
  const powerFactor = 0.8;
  const inverterVA = Math.ceil((totalWatts / powerFactor) / 100) * 100; // Round to nearest 100
  const batteryVoltage = inverterVA > 1500 ? 24 : 12; // 24V system for larger loads
  const batteryEfficiency = 0.85;
  const requiredWh = totalWatts * backupHours;
  const requiredAh = Math.ceil(requiredWh / (batteryVoltage * batteryEfficiency));

  // Filter Logic
  const filteredAppliances = APPLIANCE_LIBRARY.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Check className="w-5 h-5 text-green-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header & Cost Settings */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white shadow-xl mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" /> Bill & Load Estimator
            </h1>
            <p className="text-blue-100 mt-2 max-w-lg text-sm md:text-base">
              Estimate electricity costs and calculate required backup power systems (Inverter/Generator).
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Currency Selector */}
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 flex-1 min-w-[140px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3" /> Currency
              </label>
              <select 
                value={currency.code}
                onChange={(e) => {
                  const found = CURRENCIES.find(c => c.code === e.target.value);
                  if (found) setCurrency(found);
                }}
                className="w-full bg-transparent text-white font-bold text-lg border-none focus:ring-0 cursor-pointer p-0"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code} className="text-gray-900">{c.label}</option>
                ))}
              </select>
            </div>

            {/* Rate Input */}
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 flex-1 relative group min-w-[160px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1 flex items-center gap-1">
                Rate per kWh <Info className="w-3 h-3 text-blue-300 cursor-help" />
              </label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-blue-200">{currency.symbol}</span>
                <input 
                  type="number" 
                  value={costPerUnit}
                  onChange={(e) => setCostPerUnit(parseFloat(e.target.value) || 0)}
                  className="w-24 bg-transparent text-white font-bold text-xl p-0 border-none focus:ring-0 outline-none placeholder-white/50"
                  placeholder="0.15"
                  step="0.01"
                />
              </div>
              
              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-0 w-48 bg-gray-900 text-xs text-white p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 hidden md:block">
                Check your electricity bill for "Energy Charge" or "Unit Rate" per kWh.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Library */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Search & Filter */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 sticky top-20 z-10">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Search appliances..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === 'All' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Appliances */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredAppliances.map((app) => {
              // Check if already in list to highlight
              const inListCount = items.find(i => i.name === app.name)?.qty || 0;
              const Icon = app.icon;

              return (
                <button
                  key={app.name}
                  onClick={() => addItem(app)}
                  className={`relative p-4 rounded-xl border text-left transition-all duration-200 group ${
                    inListCount > 0 
                    ? 'bg-blue-50 border-blue-500 shadow-md transform scale-[1.02]' 
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {inListCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                      {inListCount}
                    </div>
                  )}
                  <div className={`p-2 rounded-lg w-fit mb-3 ${inListCount > 0 ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-gray-900 leading-tight mb-1">{app.name}</div>
                  <div className="text-xs text-gray-500 font-mono">{app.watts} Watts</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Bill Summary & Backup Calc */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Bill Summary */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-24">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-bold text-gray-800 text-lg">Your List ({items.length})</h2>
              {items.length > 0 && (
                <button onClick={() => setItems([])} className="text-xs text-red-500 hover:text-red-700 font-medium">
                  Clear All
                </button>
              )}
            </div>

            {/* List Items */}
            <div className="max-h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50/50 custom-scrollbar">
              {items.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-8 h-8 text-gray-300" />
                  </div>
                  <p>List is empty.</p>
                  <p className="text-sm">Tap appliances to add them.</p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 animate-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-gray-900">{item.name}</span>
                      <button onClick={() => removeItem(idx)} className="text-gray-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm bg-gray-50 p-2 rounded-lg">
                      <div className="flex-1">
                        <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Quantity</label>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateItem(idx, 'qty', Math.max(1, item.qty - 1))} className="w-6 h-6 bg-white border rounded hover:bg-gray-100">-</button>
                          <span className="font-mono font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateItem(idx, 'qty', item.qty + 1)} className="w-6 h-6 bg-white border rounded hover:bg-gray-100">+</button>
                        </div>
                      </div>
                      <div className="flex-1 border-l pl-4 border-gray-200">
                        <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Hours / Day</label>
                        <input 
                          type="number" 
                          value={item.hoursPerDay || 1}
                          onChange={(e) => updateItem(idx, 'hoursPerDay', parseFloat(e.target.value))}
                          className="w-16 p-1 border rounded text-center font-mono text-sm"
                          min="0.1" max="24" step="0.5"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total Footer */}
            <div className="bg-gray-900 text-white p-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-gray-400 text-sm font-medium uppercase">Estimated Monthly Bill</span>
                <span className="text-3xl font-bold text-green-400 flex items-center">
                  <span className="text-2xl mr-1 opacity-70">{currency.symbol}</span>
                  {monthlyCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 border-t border-gray-800 pt-3 mt-2">
                <span>Total Load: <span className="text-white">{totalKW} kW</span></span>
                <span>Daily Usage: <span className="text-white">{dailyKWh.toFixed(1)} Units</span></span>
              </div>
            </div>
          </div>

          {/* NEW MODULE: Backup Power Analysis */}
          <div className="bg-indigo-900 text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-indigo-800 flex items-center gap-3">
              <BatteryCharging className="w-6 h-6 text-yellow-400" />
              <h2 className="font-bold text-lg">Backup Power Sizing</h2>
            </div>
            
            <div className="p-6">
              <p className="text-indigo-200 text-sm mb-4">
                Planning to run these {items.length} appliances during a power outage?
              </p>

              <div className="mb-6">
                <label className="text-xs font-bold uppercase text-indigo-300 block mb-2">Desired Backup Time</label>
                <div className="flex gap-2">
                  {[2, 4, 8, 12].map(h => (
                    <button 
                      key={h} 
                      onClick={() => setBackupHours(h)}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold border ${backupHours === h ? 'bg-white text-indigo-900 border-white' : 'bg-indigo-800 text-indigo-300 border-indigo-700 hover:bg-indigo-700'}`}
                    >
                      {h} hrs
                    </button>
                  ))}
                </div>
              </div>

              {items.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-indigo-800 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <div className="text-xs text-indigo-300 uppercase font-bold">Inverter / UPS Capacity</div>
                      <div className="text-xs text-indigo-400">Based on 0.8 Power Factor</div>
                    </div>
                    <div className="text-2xl font-bold text-yellow-400">{inverterVA.toLocaleString()} VA</div>
                  </div>

                  <div className="bg-indigo-800 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <div className="text-xs text-indigo-300 uppercase font-bold">Required Battery Bank</div>
                      <div className="text-xs text-indigo-400">@{batteryVoltage}V System</div>
                    </div>
                    <div className="text-2xl font-bold text-yellow-400">{requiredAh.toLocaleString()} Ah</div>
                  </div>

                   <div className="bg-indigo-800 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <div className="text-xs text-indigo-300 uppercase font-bold">Generator Size</div>
                      <div className="text-xs text-indigo-400">Diesel/Petrol</div>
                    </div>
                    <div className="text-2xl font-bold text-yellow-400">{Math.ceil(totalWatts / 1000 * 1.2)} kW</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-indigo-400 text-sm py-4">
                  Add appliances above to see sizing.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
