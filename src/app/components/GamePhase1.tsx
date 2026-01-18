import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';

import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  AlertCircle, CheckCircle2, Package, MapPin, Users, DollarSign,
  GraduationCap, AlertTriangle, Cloud, Activity, Flashlight, Radio,
  Utensils, Droplets, BriefcaseMedical, FileText, Banknote, Shirt,
  Tent, Phone, Wrench, Scissors, Ticket, School, Church, Building2,
  Warehouse
} from 'lucide-react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

interface GamePhase1Props {
  disaster: string;
  onComplete: (preparednessData: PreparednessData) => void;
}

export interface PreparednessData {
  goBagItems: string[];
  evacuationCenter: string;
  budgetAllocated: number;
  drillsCompleted: boolean;
  riskAssessmentDone: boolean;
  earlyWarningUnderstood: boolean;
  preparednessScore: number;
}

const DISASTER_ALERTS = {
  typhoon: {
    agency: 'PAGASA (Weather)',
    signal: 'Signal #4 (Very Strong Typhoon)',
    advisory: 'A Super Typhoon is coming! Winds are very strong. The sea might rise (storm surge). Heavy rain is falling.',
    color: 'bg-red-100 border-red-500 text-red-900'
  },
  earthquake: {
    agency: 'PHIVOLCS (Quakes)',
    signal: 'Earthquake Alert',
    advisory: 'A very strong earthquake happened! Buildings might shake. Watch out for aftershocks (smaller shakes).',
    color: 'bg-orange-100 border-orange-500 text-orange-900'
  },
  flood: {
    agency: 'PAGASA (Weather)',
    signal: 'Red Rainfall Warning',
    advisory: 'Too much rain! Floods are rising fast. Low places will be underwater.',
    color: 'bg-blue-100 border-blue-500 text-blue-900'
  },
  volcano: {
    agency: 'PHIVOLCS (Volcanoes)',
    signal: 'Alert Level 4',
    advisory: 'The volcano might erupt (explode) soon! Dangerous ash and lava are coming.',
    color: 'bg-orange-100 border-orange-500 text-orange-900'
  },
  landslide: {
    agency: 'PAGASA & MGB',
    signal: 'Landslide Warning',
    advisory: 'It rained too much on the mountains. The soil is soft and might slide down. Dangerous!',
    color: 'bg-amber-100 border-amber-500 text-amber-900'
  },
  fire: {
    agency: 'BFP (Firefighters)',
    signal: 'Fire Alarm',
    advisory: 'Big fire in the village! The wind is spreading the fire. Everyone must leave now!',
    color: 'bg-red-100 border-red-500 text-red-900'
  }
};

const GO_BAG_ITEMS = [
  { id: 'water', name: 'Bottled Water (3L per person)', category: 'essential', points: 10, icon: Droplets },
  { id: 'food', name: 'Ready-to-eat Food (3-day supply)', category: 'essential', points: 10, icon: Utensils },
  { id: 'firstaid', name: 'First Aid Kit', category: 'essential', points: 10, icon: BriefcaseMedical },
  { id: 'flashlight', name: 'Flashlight & Batteries', category: 'essential', points: 8, icon: Flashlight },
  { id: 'radio', name: 'Battery-powered Radio', category: 'essential', points: 8, icon: Radio },
  { id: 'whistle', name: 'Emergency Whistle', category: 'essential', points: 6, icon: AlertCircle },
  { id: 'documents', name: 'Important Documents (Waterproof)', category: 'essential', points: 10, icon: FileText },
  { id: 'cash', name: 'Emergency Cash', category: 'essential', points: 8, icon: Banknote },
  { id: 'medicine', name: 'Personal Medicines', category: 'essential', points: 9, icon: BriefcaseMedical },
  { id: 'clothes', name: 'Extra Clothes', category: 'comfort', points: 5, icon: Shirt },
  { id: 'blanket', name: 'Blanket/Mat', category: 'comfort', points: 5, icon: Tent },
  { id: 'toiletries', name: 'Hygiene Items', category: 'comfort', points: 6, icon: CheckCircle2 },
  { id: 'phone', name: 'Phone & Powerbank', category: 'communication', points: 9, icon: Phone },
  { id: 'rope', name: 'Rope/Cord', category: 'tools', points: 4, icon: Wrench },
  { id: 'knife', name: 'Multi-tool/Swiss Knife', category: 'tools', points: 4, icon: Scissors },
  { id: 'mask', name: 'Face Masks', category: 'health', points: 7, icon: Ticket }, // Using Ticket as generic rect shape or Mask if available? lucide doesn't have Mask. Using Ticket as placeholder or just generic
  { id: 'alcohol', name: 'Alcohol/Sanitizer', category: 'health', points: 6, icon: Droplets }
];

const EVACUATION_CENTERS = [
  { id: 'school', name: 'Kiling Elementary School', capacity: 500, readiness: 'Good', points: 10, icon: School, color: 'bg-blue-100 text-blue-600' },
  { id: 'hall', name: 'Barangay Hall & Covered Court', capacity: 300, readiness: 'Fair', points: 8, icon: Building2, color: 'bg-orange-100 text-orange-600' },
  { id: 'church', name: 'Local Church/Chapel', capacity: 200, readiness: 'Good', points: 9, icon: Church, color: 'bg-purple-100 text-purple-600' },
  { id: 'gym', name: 'Municipal Gymnasium', capacity: 800, readiness: 'Excellent', points: 10, icon: Warehouse, color: 'bg-green-100 text-green-600' }
];

function DraggableItem({ item, onSelect }: { item: typeof GO_BAG_ITEMS[0], onSelect: () => void }) {
  const Icon = item.icon;
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData('itemId', item.id)}
      onDoubleClick={onSelect}
      className="bg-white p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] cursor-move hover:translate-y-1 hover:shadow-none transition-all group select-none active:scale-95 flex items-center gap-3"
      title="Drag or Double Tap to Add"
    >
      <div className="p-2 bg-blue-100 border-2 border-black rounded-lg">
        <Icon className="w-6 h-6 text-black" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm text-black">{item.name}</p>
        <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">{item.category}</p>
      </div>
    </div>
  );
}

function GoBagDropZone({ items, onDrop }: { items: string[], onDrop: (itemId: string) => void }) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    if (itemId) {
      onDrop(itemId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const itemObjects = items.map(id => GO_BAG_ITEMS.find(item => item.id === id)).filter(Boolean);
  const totalPoints = itemObjects.reduce((sum, item) => sum + (item?.points || 0), 0);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="min-h-[400px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-3xl p-6 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="font-black text-xl flex items-center gap-2 uppercase tracking-wide">
          <Package className="w-6 h-6" />
          Your Go Bag
        </h3>
        <div className="text-right">
          <Badge variant="outline" className="text-sm font-bold bg-blue-200 text-black border-2 border-black mb-1">
            {items.length}/12 Items
          </Badge>
          <p className="text-2xl font-black text-black">
            {totalPoints}<span className="text-sm text-gray-500 ml-1">/100 PTS</span>
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border-4 border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
          <Package className="w-20 h-20 mx-auto mb-4 text-gray-300 transform -rotate-12" />
          <p className="font-bold text-xl text-gray-400">BAG IS EMPTY</p>
          <p className="text-sm text-gray-400 font-medium">Drag items here or Double Tap to add</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
          {itemObjects.map((item) => item && (
            <div key={item.id} className="bg-green-100 p-2 rounded-lg border-2 border-black flex items-center gap-2 shadow-[2px_2px_0px_0px_#000]">
              <CheckCircle2 className="w-5 h-5 text-black" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{item.name}</p>
                <p className="text-xs font-bold text-green-700">+{item.points} pts</p>
              </div>
              <button
                onClick={() => onDrop(item.id)}
                className="w-6 h-6 flex items-center justify-center bg-red-400 border-2 border-black rounded hover:bg-red-500 transition-colors"
                title="Remove"
              >
                <span className="text-black font-bold text-xs">X</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {totalPoints >= 80 && (
        <div className="mt-4 bg-green-100 p-3 rounded-lg border border-green-500 text-green-800 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000]">
          <CheckCircle2 className="w-4 h-4 inline mr-2" />
          Excellent preparation! Your Go Bag meets NDRRMC standards.
        </div>
      )}
    </div>
  );
}

export function GamePhase1({ disaster, onComplete }: GamePhase1Props) {
  const [goBagItems, setGoBagItems] = useState<string[]>([]);
  const [evacuationCenter, setEvacuationCenter] = useState<string>('');
  const [budgetAllocated, setBudgetAllocated] = useState<number>(0);
  const [drillsCompleted, setDrillsCompleted] = useState(false);
  const [riskAssessmentDone, setRiskAssessmentDone] = useState(false);
  const [earlyWarningUnderstood, setEarlyWarningUnderstood] = useState(false);
  const [currentTab, setCurrentTab] = useState('alert');

  const alert = DISASTER_ALERTS[disaster as keyof typeof DISASTER_ALERTS];

  const handleGoBagDrop = (itemId: string) => {
    if (goBagItems.includes(itemId)) {
      setGoBagItems(goBagItems.filter(id => id !== itemId));
    } else if (goBagItems.length < 12) {
      setGoBagItems([...goBagItems, itemId]);
    }
  };

  const calculatePreparednessScore = () => {
    let score = 0;

    // Go Bag (40 points max)
    const goBagScore = goBagItems.reduce((sum, id) => {
      const item = GO_BAG_ITEMS.find(i => i.id === id);
      return sum + (item?.points || 0);
    }, 0);
    score += Math.min(goBagScore * 0.4, 40);

    // Evacuation Center (15 points)
    if (evacuationCenter) {
      const center = EVACUATION_CENTERS.find(c => c.id === evacuationCenter);
      score += center?.points || 0;
    }

    // Risk Assessment (15 points)
    if (riskAssessmentDone) score += 15;

    // Early Warning (10 points)
    if (earlyWarningUnderstood) score += 10;

    // Drills (10 points)
    if (drillsCompleted) score += 10;

    // Budget (10 points)
    if (budgetAllocated >= 50000) score += 10;
    else if (budgetAllocated >= 30000) score += 5;

    return Math.round(score);
  };

  const handleComplete = () => {
    const preparednessScore = calculatePreparednessScore();
    onComplete({
      goBagItems,
      evacuationCenter,
      budgetAllocated,
      drillsCompleted,
      riskAssessmentDone,
      earlyWarningUnderstood,
      preparednessScore
    });
  };

  const isReadyToProceed =
    goBagItems.length >= 5 &&
    evacuationCenter !== '' &&
    earlyWarningUnderstood &&
    riskAssessmentDone;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#AEE2FF] p-6 font-['Fredoka']" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-black text-black mb-1">
                  PHASE 1: BEFORE THE DISASTER
                </h1>
                <p className="text-xl font-bold text-gray-600">Preparedness & Prevention</p>
              </div>
              <Badge variant="outline" className="text-xl px-6 py-3 bg-yellow-300 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl">
                Preparedness Score: {calculatePreparednessScore()}%
              </Badge>
            </div>
            <div className="h-6 bg-gray-200 rounded-full border-4 border-black overflow-hidden relative">
              <div
                className="h-full bg-green-400 transition-all duration-500 ease-out border-r-4 border-black"
                style={{ width: `${calculatePreparednessScore()}%` }}
              />
            </div>
          </div>

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
            <TabsList className="flex flex-wrap md:grid w-full h-auto p-2 gap-2 md:grid-cols-5 bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000]">
              <TabsTrigger value="alert" className="data-[state=active]:bg-red-300 data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_#000] flex-1 gap-2 py-3 font-bold">
                <AlertTriangle className="w-5 h-5" />
                Alert
              </TabsTrigger>
              <TabsTrigger value="assessment" className="data-[state=active]:bg-blue-300 data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_#000] flex-1 gap-2 py-3 font-bold">
                <Activity className="w-5 h-5" />
                Assessment
              </TabsTrigger>
              <TabsTrigger value="gobag" className="data-[state=active]:bg-green-300 data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_#000] flex-1 gap-2 py-3 font-bold">
                <Package className="w-5 h-5" />
                Go Bag
              </TabsTrigger>
              <TabsTrigger value="evacuation" className="data-[state=active]:bg-purple-300 data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_#000] flex-1 gap-2 py-3 font-bold">
                <MapPin className="w-5 h-5" />
                Evacuation
              </TabsTrigger>
              <TabsTrigger value="preparation" className="data-[state=active]:bg-orange-300 data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_#000] flex-1 gap-2 py-3 font-bold">
                <GraduationCap className="w-5 h-5" />
                Drills
              </TabsTrigger>
            </TabsList>

            {/* ALERT TAB */}
            <TabsContent value="alert" className="space-y-4">
              <Card className={`border-4 ${alert.color}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-10 h-10" />
                    <div>
                      <CardTitle className="text-2xl">{alert.agency} Advisory</CardTitle>
                      <CardDescription className="text-base font-semibold text-gray-800">
                        {alert.signal}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">{alert.advisory}</p>

                  <div className="bg-white/80 p-4 rounded-lg">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Cloud className="w-5 h-5" />
                      What does this mean? (Required)
                    </h3>
                    <p className="text-sm mb-3">
                      As the Safety Hero, you must understand the danger:
                    </p>

                    {disaster === 'typhoon' && (
                      <div className="text-sm space-y-2 mb-4">
                        <p><strong>Signal #4 means:</strong> Very strong winds that can blow roofs away.</p>
                        <p><strong>Actions:</strong> All families near the sea must leave now!</p>
                        <p><strong>Storm Surge:</strong> Big waves from the sea.</p>
                      </div>
                    )}

                    {disaster === 'earthquake' && (
                      <div className="text-sm space-y-2 mb-4">
                        <p><strong>Magnitude 7.2:</strong> A very strong earthquake!</p>
                        <p><strong>Actions:</strong> Check if buildings are safe. Watch out for falling objects.</p>
                        <p><strong>Danger:</strong> The ground shook very hard.</p>
                      </div>
                    )}

                    {!earlyWarningUnderstood && (
                      <Button
                        onClick={() => setEarlyWarningUnderstood(true)}
                        className="w-full"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        I Understand! Let's Prepare!
                      </Button>
                    )}

                    {earlyWarningUnderstood && (
                      <div className="bg-green-100 p-3 rounded border border-green-500 text-green-800">
                        <CheckCircle2 className="w-4 h-4 inline mr-2" />
                        Alert understood! You may proceed with preparations.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ASSESSMENT TAB */}
            <TabsContent value="assessment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Check Your Village Safety</CardTitle>
                  <CardDescription>
                    Check if your neighborhood is safe and who needs help.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-bold mb-3">Location Profile: Quezon Province</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Population:</strong> 3,500 residents</p>
                        <p><strong>Households:</strong> 850 families</p>
                        <p><strong>Vulnerable Groups:</strong> 200 elderly, 150 children under 5</p>
                      </div>
                      <div>
                        <p><strong>Location:</strong> Coastal/Low-lying</p>
                        <p><strong>Infrastructure:</strong> Mostly light materials</p>
                        <p><strong>Hazards:</strong> Flooding, Storm Surge</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold">Risk Assessment Checklist:</h3>

                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded border-2 border-gray-200">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked disabled />
                          <div className="flex-1">
                            <p className="font-semibold">Find people who need extra help</p>
                            <p className="text-sm text-gray-600">Grandparents, babies, and sick people</p>
                          </div>
                        </label>
                      </div>

                      <div className="bg-white p-3 rounded border-2 border-gray-200">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked disabled />
                          <div className="flex-1">
                            <p className="font-semibold">Find dangerous places</p>
                            <p className="text-sm text-gray-600">Places that flood easily or are near cliffs</p>
                          </div>
                        </label>
                      </div>

                      <div className="bg-white p-3 rounded border-2 border-gray-200">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked disabled />
                          <div className="flex-1">
                            <p className="font-semibold">List important buildings</p>
                            <p className="text-sm text-gray-600">Hospital, water pipes, and electricity poles</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {!riskAssessmentDone ? (
                    <Button onClick={() => setRiskAssessmentDone(true)} className="w-full" size="lg">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Complete Safety Check
                    </Button>
                  ) : (
                    <div className="bg-green-100 p-4 rounded border border-green-500 text-green-800">
                      <CheckCircle2 className="w-5 h-5 inline mr-2" />
                      <strong>Safety Check Complete!</strong> You know the dangers now.
                    </div>
                  )}

                  <div className="bg-yellow-50 p-3 rounded border border-yellow-300 text-sm">
                    <strong>💡 Safety Tip:</strong> Always know who needs help and where the safe places are!
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* GO BAG TAB */}
            <TabsContent value="gobag" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prepare Emergency Go Bags</CardTitle>
                  <CardDescription>
                    Drag items to build a complete Go Bag. Each family should have one ready.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Available Items (Drag or Double Tap)
                      </h3>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                        {GO_BAG_ITEMS.filter(item => !goBagItems.includes(item.id)).map(item => (
                          <DraggableItem key={item.id} item={item} onSelect={() => handleGoBagDrop(item.id)} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <GoBagDropZone items={goBagItems} onDrop={handleGoBagDrop} />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded border border-blue-200 text-sm">
                    <strong>📦 Go Bag Tip:</strong> A Go Bag must have food, water, and tools for
                    3 days. It helps you stay alive!
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* EVACUATION TAB */}
            <TabsContent value="evacuation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Select Evacuation Center</CardTitle>
                  <CardDescription>
                    Choose the most appropriate evacuation center for your barangay
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {EVACUATION_CENTERS.map(center => {
                      const Icon = center.icon;
                      return (
                        <div
                          key={center.id}
                          onClick={() => setEvacuationCenter(center.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:-translate-y-1 ${evacuationCenter === center.id
                            ? 'border-green-500 bg-green-50 shadow-md ring-2 ring-green-200'
                            : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50 shadow-sm'
                            }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-full ${center.color}`}>
                              <Icon className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg">{center.name}</h3>
                                {evacuationCenter === center.id && (
                                  <CheckCircle2 className="w-6 h-6 text-green-600 animate-in zoom-in" />
                                )}
                              </div>
                              <div className="space-y-2 mt-2">
                                <Badge variant="outline" className="bg-white">
                                  Capacity: {center.capacity}
                                </Badge>
                                <Badge
                                  variant={center.readiness === 'Excellent' ? 'default' : 'secondary'}
                                  className={
                                    center.readiness === 'Excellent' ? 'bg-green-600 ml-2' :
                                      center.readiness === 'Good' ? 'bg-blue-600 text-white ml-2' :
                                        'bg-yellow-500 text-black ml-2'
                                  }
                                >
                                  {center.readiness} Readiness
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {evacuationCenter && (
                    <div className="bg-green-100 p-4 rounded border border-green-500 text-green-800">
                      <CheckCircle2 className="w-5 h-5 inline mr-2" />
                      <strong>Evacuation Center Selected!</strong> Coordinate with the center to prepare facilities.
                    </div>
                  )}

                  <div className="bg-yellow-50 p-3 rounded border border-yellow-300 text-sm">
                    <strong>🏫 Safety Tip:</strong> Safe places must have toilets, water, and a place to sleep.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PREPARATION TAB */}
            <TabsContent value="preparation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Conduct Drills and Allocate Budget</CardTitle>
                  <CardDescription>
                    Getting money and people ready!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Drills */}
                  <div className="space-y-3">
                    <h3 className="font-bold flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Emergency Drills
                    </h3>

                    <div className="bg-white p-4 rounded border-2 border-gray-200">
                      <div className="flex items-start gap-3 mb-3">
                        <Users className="w-6 h-6 text-blue-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">Earthquake & Evacuation Drill</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Practice "Duck, Cover, Hold" and evacuation procedures with the community
                          </p>
                          <ul className="text-sm space-y-1 mb-3">
                            <li>✓ Identified safe zones and exit routes</li>
                            <li>✓ Practiced carrying emergency kits</li>
                            <li>✓ Tested assembly point procedures</li>
                          </ul>
                        </div>
                      </div>

                      {!drillsCompleted ? (
                        <Button onClick={() => setDrillsCompleted(true)} className="w-full">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Complete Drills with Community
                        </Button>
                      ) : (
                        <div className="bg-green-100 p-3 rounded border border-green-500 text-green-800 text-sm">
                          <CheckCircle2 className="w-4 h-4 inline mr-2" />
                          Drills completed! Community is prepared and knows evacuation procedures.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-3">
                    <h3 className="font-bold flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Set Emergency Budget (Money)
                    </h3>

                    <div className="bg-white p-4 rounded border-2 border-gray-200">
                      <p className="text-sm mb-3">
                        <strong>Available Village Funds:</strong> ₱100,000
                      </p>

                      <div className="space-y-2 mb-4">
                        <label className="block text-sm">
                          <strong>Save money for the disaster:</strong>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="10000"
                          value={budgetAllocated}
                          onChange={(e) => setBudgetAllocated(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm">
                          <span>₱0</span>
                          <span className="font-bold text-lg text-blue-600">
                            ₱{budgetAllocated.toLocaleString()}
                          </span>
                          <span>₱100,000</span>
                        </div>
                      </div>

                      <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
                        <p><strong>Planned allocation:</strong></p>
                        <p>• Emergency supplies: ₱{Math.round(budgetAllocated * 0.4).toLocaleString()}</p>
                        <p>• Evacuation center operations: ₱{Math.round(budgetAllocated * 0.3).toLocaleString()}</p>
                        <p>• Emergency response team: ₱{Math.round(budgetAllocated * 0.3).toLocaleString()}</p>
                      </div>

                      {budgetAllocated >= 50000 && (
                        <div className="mt-3 bg-green-100 p-2 rounded border border-green-500 text-green-800 text-sm">
                          ✓ Adequate budget allocated for comprehensive response
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm">
                    <strong>📜 Law Rule:</strong> We must save 5% of our money for safety and disasters (Quick Response Fund).
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Complete Phase Button */}
          <Card className="mt-6 border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">Ready to Proceed?</h3>
                  <p className="text-sm text-gray-600">
                    {isReadyToProceed
                      ? 'Good job! You are ready for the next step.'
                      : 'Please finish: Go Bag (5 items), Safe Place, Understanding Alert, Safety Check'
                    }
                  </p>
                </div>
                <Button
                  onClick={handleComplete}
                  disabled={!isReadyToProceed}
                  size="lg"
                  className="gap-2"
                >
                  {isReadyToProceed ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Proceed to Response Phase
                    </>
                  ) : (
                    'Complete Requirements First'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DndProvider>
  );
}
