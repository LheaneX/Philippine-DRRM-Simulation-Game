import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { 
  AlertCircle, CheckCircle2, Package, MapPin, Users, DollarSign, 
  GraduationCap, AlertTriangle, Cloud, Activity
} from 'lucide-react';
import { useDrop } from 'react-dnd';
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
    agency: 'PAGASA',
    signal: 'Tropical Cyclone Warning Signal #4',
    advisory: 'Super Typhoon "Maring" is approaching with winds of 185 km/h. Storm surge of 2-3 meters expected in coastal barangays. Heavy to intense rainfall expected.',
    color: 'bg-red-100 border-red-500 text-red-900'
  },
  earthquake: {
    agency: 'PHIVOLCS',
    signal: 'Earthquake Advisory',
    advisory: 'Magnitude 7.2 earthquake detected. Epicenter: West Valley Fault, Metro Manila. Strong shaking felt. Aftershocks expected. Tsunami threat being assessed.',
    color: 'bg-orange-100 border-orange-500 text-orange-900'
  },
  flood: {
    agency: 'PAGASA',
    signal: 'Red Rainfall Warning',
    advisory: 'Heavy to intense rainfall (15-30 mm/hour) observed. Serious flooding expected in low-lying areas. Monsoon enhanced by tropical cyclone.',
    color: 'bg-blue-100 border-blue-500 text-blue-900'
  },
  volcano: {
    agency: 'PHIVOLCS',
    signal: 'Alert Level 4',
    advisory: 'Taal Volcano showing signs of hazardous eruption within hours to days. Volcanic earthquakes detected. Base surges and pyroclastic flows possible.',
    color: 'bg-orange-100 border-orange-500 text-orange-900'
  },
  landslide: {
    agency: 'PAGASA & MGB',
    signal: 'Landslide Warning',
    advisory: 'Continuous heavy rainfall in mountainous areas. Ground saturation critical. High risk of landslides and debris flows.',
    color: 'bg-amber-100 border-amber-500 text-amber-900'
  },
  fire: {
    agency: 'BFP',
    signal: 'Fire Incident Alert',
    advisory: 'Multiple structure fire reported in densely populated barangay. Strong winds spreading fire rapidly. Immediate evacuation required.',
    color: 'bg-red-100 border-red-500 text-red-900'
  }
};

const GO_BAG_ITEMS = [
  { id: 'water', name: 'Bottled Water (3L per person)', category: 'essential', points: 10 },
  { id: 'food', name: 'Ready-to-eat Food (3-day supply)', category: 'essential', points: 10 },
  { id: 'firstaid', name: 'First Aid Kit', category: 'essential', points: 10 },
  { id: 'flashlight', name: 'Flashlight & Batteries', category: 'essential', points: 8 },
  { id: 'radio', name: 'Battery-powered Radio', category: 'essential', points: 8 },
  { id: 'whistle', name: 'Emergency Whistle', category: 'essential', points: 6 },
  { id: 'documents', name: 'Important Documents (in waterproof bag)', category: 'essential', points: 10 },
  { id: 'cash', name: 'Emergency Cash', category: 'essential', points: 8 },
  { id: 'medicine', name: 'Personal Medicines', category: 'essential', points: 9 },
  { id: 'clothes', name: 'Extra Clothes', category: 'comfort', points: 5 },
  { id: 'blanket', name: 'Blanket/Mat', category: 'comfort', points: 5 },
  { id: 'toiletries', name: 'Hygiene Items', category: 'comfort', points: 6 },
  { id: 'phone', name: 'Phone & Powerbank', category: 'communication', points: 9 },
  { id: 'rope', name: 'Rope/Cord', category: 'tools', points: 4 },
  { id: 'knife', name: 'Multi-tool/Swiss Knife', category: 'tools', points: 4 },
  { id: 'mask', name: 'Face Masks', category: 'health', points: 7 },
  { id: 'alcohol', name: 'Alcohol/Sanitizer', category: 'health', points: 6 }
];

const EVACUATION_CENTERS = [
  { id: 'school', name: 'Barangay Elementary School', capacity: 500, readiness: 'Good', points: 10 },
  { id: 'hall', name: 'Barangay Hall & Covered Court', capacity: 300, readiness: 'Fair', points: 8 },
  { id: 'church', name: 'Local Church/Chapel', capacity: 200, readiness: 'Good', points: 9 },
  { id: 'gym', name: 'Municipal Gymnasium', capacity: 800, readiness: 'Excellent', points: 10 }
];

function DraggableItem({ item }: { item: typeof GO_BAG_ITEMS[0] }) {
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData('itemId', item.id)}
      className="bg-white p-3 rounded-lg border-2 border-gray-300 cursor-move hover:border-blue-500 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2">
        <Package className="w-5 h-5 text-blue-600" />
        <div className="flex-1">
          <p className="font-semibold text-sm">{item.name}</p>
          <p className="text-xs text-gray-500 capitalize">{item.category}</p>
        </div>
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
      className="min-h-[300px] bg-gradient-to-br from-blue-50 to-green-50 border-4 border-dashed border-blue-400 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          Your Go Bag
        </h3>
        <div className="text-right">
          <p className="text-sm text-gray-600">Items: {items.length}/12</p>
          <p className="text-lg font-bold text-blue-600">Score: {totalPoints}/100</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="font-semibold">Drag items here to build your Go Bag</p>
          <p className="text-sm">Essential items for emergency evacuation</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {itemObjects.map((item) => item && (
            <div key={item.id} className="bg-white p-3 rounded-lg border-2 border-green-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">+{item.points} points</p>
              </div>
              <button
                onClick={() => onDrop(item.id)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {totalPoints >= 80 && (
        <div className="mt-4 bg-green-100 p-3 rounded-lg border border-green-500 text-green-800 text-sm">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  PHASE 1: BEFORE THE DISASTER
                </h1>
                <p className="text-gray-600">Preparedness & Prevention</p>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Preparedness Score: {calculatePreparednessScore()}%
              </Badge>
            </div>
            <Progress value={calculatePreparednessScore()} className="h-3" />
          </div>

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="alert" className="gap-2">
                <AlertTriangle className="w-4 h-4" />
                Alert
              </TabsTrigger>
              <TabsTrigger value="assessment" className="gap-2">
                <Activity className="w-4 h-4" />
                Assessment
              </TabsTrigger>
              <TabsTrigger value="gobag" className="gap-2">
                <Package className="w-4 h-4" />
                Go Bag
              </TabsTrigger>
              <TabsTrigger value="evacuation" className="gap-2">
                <MapPin className="w-4 h-4" />
                Evacuation
              </TabsTrigger>
              <TabsTrigger value="preparation" className="gap-2">
                <GraduationCap className="w-4 h-4" />
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
                      Understanding This Alert (Required)
                    </h3>
                    <p className="text-sm mb-3">
                      As Barangay DRRM Officer, you must understand what this alert means for your community:
                    </p>
                    
                    {disaster === 'typhoon' && (
                      <div className="text-sm space-y-2 mb-4">
                        <p><strong>Signal #4 means:</strong> Winds of 171-220 km/h expected in 12 hours</p>
                        <p><strong>Actions:</strong> All residents in coastal and low-lying areas must evacuate immediately</p>
                        <p><strong>Storm Surge:</strong> Life-threatening sea level rise of 2-3 meters</p>
                      </div>
                    )}
                    
                    {disaster === 'earthquake' && (
                      <div className="text-sm space-y-2 mb-4">
                        <p><strong>Magnitude 7.2:</strong> Major earthquake causing serious damage</p>
                        <p><strong>Actions:</strong> Check for structural damage, prepare for aftershocks</p>
                        <p><strong>West Valley Fault:</strong> Major fault line affecting Metro Manila</p>
                      </div>
                    )}

                    {!earlyWarningUnderstood && (
                      <Button 
                        onClick={() => setEarlyWarningUnderstood(true)}
                        className="w-full"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        I Understand This Alert
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
                  <CardTitle>Barangay Risk Assessment</CardTitle>
                  <CardDescription>
                    Conduct a rapid risk assessment of your barangay as required by RA 10121
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-bold mb-3">Barangay Profile: Barangay San Roque</h3>
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
                            <p className="font-semibold">Identified vulnerable populations</p>
                            <p className="text-sm text-gray-600">Elderly, PWD, pregnant women, children</p>
                          </div>
                        </label>
                      </div>

                      <div className="bg-white p-3 rounded border-2 border-gray-200">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked disabled />
                          <div className="flex-1">
                            <p className="font-semibold">Mapped hazard-prone areas</p>
                            <p className="text-sm text-gray-600">Low-lying areas, near waterways</p>
                          </div>
                        </label>
                      </div>

                      <div className="bg-white p-3 rounded border-2 border-gray-200">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked disabled />
                          <div className="flex-1">
                            <p className="font-semibold">Listed critical infrastructure</p>
                            <p className="text-sm text-gray-600">Health center, water system, power lines</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {!riskAssessmentDone ? (
                    <Button onClick={() => setRiskAssessmentDone(true)} className="w-full" size="lg">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Complete Risk Assessment
                    </Button>
                  ) : (
                    <div className="bg-green-100 p-4 rounded border border-green-500 text-green-800">
                      <CheckCircle2 className="w-5 h-5 inline mr-2" />
                      <strong>Risk Assessment Complete!</strong> You've identified key vulnerabilities in your barangay.
                    </div>
                  )}

                  <div className="bg-yellow-50 p-3 rounded border border-yellow-300 text-sm">
                    <strong>💡 RA 10121 Requirement:</strong> All barangays must conduct regular risk assessments 
                    to identify hazards and vulnerable populations.
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
                        Available Items (Drag to Go Bag)
                      </h3>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                        {GO_BAG_ITEMS.filter(item => !goBagItems.includes(item.id)).map(item => (
                          <DraggableItem key={item.id} item={item} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <GoBagDropZone items={goBagItems} onDrop={handleGoBagDrop} />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded border border-blue-200 text-sm">
                    <strong>📦 NDRRMC Go Bag Guidelines:</strong> A proper Go Bag contains supplies for 
                    at least 72 hours (3 days) including water, food, first aid, important documents, 
                    and communication devices.
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
                    {EVACUATION_CENTERS.map(center => (
                      <div
                        key={center.id}
                        onClick={() => setEvacuationCenter(center.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          evacuationCenter === center.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {evacuationCenter === center.id ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                          ) : (
                            <MapPin className="w-6 h-6 text-gray-400 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <h3 className="font-bold mb-1">{center.name}</h3>
                            <div className="text-sm space-y-1">
                              <p><strong>Capacity:</strong> {center.capacity} persons</p>
                              <p><strong>Readiness:</strong> 
                                <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${
                                  center.readiness === 'Excellent' ? 'bg-green-200 text-green-800' :
                                  center.readiness === 'Good' ? 'bg-blue-200 text-blue-800' :
                                  'bg-yellow-200 text-yellow-800'
                                }`}>
                                  {center.readiness}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {evacuationCenter && (
                    <div className="bg-green-100 p-4 rounded border border-green-500 text-green-800">
                      <CheckCircle2 className="w-5 h-5 inline mr-2" />
                      <strong>Evacuation Center Selected!</strong> Coordinate with the center to prepare facilities.
                    </div>
                  )}

                  <div className="bg-yellow-50 p-3 rounded border border-yellow-300 text-sm">
                    <strong>🏫 RA 10121 Guideline:</strong> Evacuation centers must be safe, accessible, 
                    and equipped with basic facilities (water, toilets, sleeping area, cooking area).
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
                    Final preparations before the disaster strikes
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
                      Allocate DRRM Budget
                    </h3>
                    
                    <div className="bg-white p-4 rounded border-2 border-gray-200">
                      <p className="text-sm mb-3">
                        <strong>Available Barangay DRRM Fund:</strong> ₱100,000
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <label className="block text-sm">
                          <strong>Allocate for immediate disaster response:</strong>
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
                    <strong>📜 RA 10121 Mandate:</strong> LGUs must allocate at least 5% of their budget 
                    to DRRM activities (70% for disaster preparedness, 30% for quick response fund).
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
                      ? 'All minimum requirements met. You may proceed to the Response Phase.'
                      : 'Complete required tasks: Go Bag (5+ items), Evacuation Center, Alert Understanding, Risk Assessment'
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
