import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import {
  AlertTriangle, Users, Radio, Siren, CheckCircle2, XCircle, Clock,
  TrendingDown, TrendingUp, AlertCircle, Phone, Megaphone, Waves, Home, Zap, Truck, Activity, Mountain, Flame
} from 'lucide-react';
import { Phase2Tutorial } from './Phase2Tutorial';
import { PreparednessData } from './GamePhase1';
import { soundManager } from '@/app/utils/sound';

interface EmergencyOption {
  action: string;
  outcome: string;
  correct: boolean;
}

interface EmergencyEvent {
  id: string;
  type: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  icon: any;
  options: EmergencyOption[];
}

export interface ResponseData {
  evacuationsIssued: boolean;
  agenciesCoordinated: string[];
  emergenciesHandled: number;
  evacuationCenterManaged: boolean;
  casualties: number;
  publicCompliance: number;
  responseScore: number;
}

interface GamePhase2Props {
  disaster: string;
  difficulty: 'easy' | 'medium' | 'hard';
  preparedness: PreparednessData;
  onComplete: (responseData: ResponseData) => void;
}

const DISASTER_EVENTS = {
  typhoon: [
    {
      id: 'evac1',
      type: 'Evacuation Decision',
      description: 'PAGASA Signal #4 is now in effect. Coastal residents are asking if they should evacuate now.',
      severity: 'high' as const,
      icon: Megaphone,
      options: [
        {
          action: 'Order immediate mandatory evacuation of all coastal and low-lying areas',
          outcome: 'Correct! Early evacuation saves lives. Residents moved to safety before peak storm.',
          correct: true
        },
        {
          action: 'Wait for Signal #5 before ordering evacuation',
          outcome: 'Incorrect. Signal #5 doesn\'t exist. Delayed evacuation puts lives at risk!',
          correct: false
        },
        {
          action: 'Let residents decide for themselves',
          outcome: 'Incorrect. As DRRM Officer, you must issue clear evacuation orders per RA 10121.',
          correct: false
        }
      ]
    },
    {
      id: 'storm1',
      type: 'Storm Surge Warning',
      description: 'PAGASA warns of 2-3 meter storm surge in 2 hours. Some families refuse to leave their homes.',
      severity: 'high' as const,
      icon: Waves,
      options: [
        {
          action: 'Coordinate with Barangay Tanods and PNP for forced evacuation',
          outcome: 'Correct! Forced evacuation is legal when lives are in imminent danger (PD 1566).',
          correct: true
        },
        {
          action: 'Respect their decision and leave them',
          outcome: 'Incorrect. Storm surges are deadly - you must evacuate all residents from danger zones.',
          correct: false
        }
      ]
    },
    {
      id: 'rescue1',
      type: 'Rescue Request',
      description: 'Family is trapped on roof by rising floodwater. Strong winds make rescue dangerous.',
      severity: 'high' as const,
      icon: Home,
      options: [
        {
          action: 'Coordinate with BFP and AFP for rescue operation using appropriate equipment',
          outcome: 'Correct! Professional rescue teams have training and equipment for dangerous conditions.',
          correct: true
        },
        {
          action: 'Send barangay tanods immediately without waiting',
          outcome: 'Incorrect. Untrained rescuers in dangerous conditions may become victims themselves.',
          correct: false
        }
      ]
    },
    {
      id: 'hospital_power',
      type: 'Critical Infrastructure',
      description: 'District Hospital reports power failure. Generators are failing. Patients on life support at risk.',
      severity: 'high' as const,
      icon: Zap,
      options: [
        {
          action: 'Prioritize fuel delivery and coordinate technical team from Electric Coop',
          outcome: 'Correct! Securing power for critical lifeline facilities is a top priority.',
          correct: true
        },
        {
          action: 'Relocate all patients to the Barangay Hall',
          outcome: 'Incorrect. Moving critical patients during a storm is extremely dangerous and facilities are inadequate.',
          correct: false
        }
      ]
    },
    {
      id: 'food_shortage',
      type: 'Relief Operations',
      description: 'Evacuees are increasing rapidly. Food stocks in the center are running low.',
      severity: 'medium' as const,
      icon: Truck,
      options: [
        {
          action: 'Request augmentation from DSWD and Municipal DRRMO',
          outcome: 'Correct! Local government should request higher level support when local resources are insufficient.',
          correct: true
        },
        {
          action: 'Ask evacuees to go home and get food',
          outcome: 'Incorrect. Sending people back to danger zones defeats the purpose of evacuation!',
          correct: false
        }
      ]
    }
  ],
  earthquake: [
    {
      id: 'aftershock1',
      type: 'Aftershock Warning',
      description: 'PHIVOLCS warns of strong aftershocks. People want to return home to get belongings.',
      severity: 'high' as const,
      icon: Activity,
      options: [
        {
          action: 'Prohibit entry to damaged buildings until structural inspection',
          outcome: 'Correct! Aftershocks can collapse weakened structures. Safety first per NDRRMC protocols.',
          correct: true
        },
        {
          action: 'Allow quick trips with escorts',
          outcome: 'Incorrect. Even brief exposure to unstable buildings during aftershocks is extremely dangerous.',
          correct: false
        }
      ]
    },
    {
      id: 'fire1',
      type: 'Fire Emergency',
      description: 'Electrical fire breaks out in damaged building due to exposed wires. Spreading quickly.',
      severity: 'high' as const,
      icon: Flame,
      options: [
        {
          action: 'Immediately call BFP, evacuate adjacent houses, coordinate rescue with trained personnel',
          outcome: 'Correct! Quick BFP response and systematic evacuation prevents fire from spreading.',
          correct: true
        },
        {
          action: 'Organize community bucket brigade to fight fire',
          outcome: 'Incorrect. Large fires need professional firefighters. Focus on evacuation and rescue.',
          correct: false
        }
      ]
    }
  ],
  volcanic_eruption: [
    {
      id: 'eruption_level4',
      type: 'Alert Level 4 Raised',
      description: 'PHIVOLCS raises Alert Level to 4. Hazardous eruption imminent.',
      severity: 'high' as const,
      icon: Mountain,
      options: [
        {
          action: 'Issue immediate mandatory evacuation, coordinate transportation, activate all evacuation centers',
          outcome: 'Correct! Alert Level 4 means eruption within hours to days - immediate action required!',
          correct: true
        },
        {
          action: 'Prepare evacuation but wait for Level 5',
          outcome: 'Incorrect. Alert Level 5 means eruption in progress - too late! Act at Level 4.',
          correct: false
        }
      ]
    }
  ],
  landslide: [
    {
      id: 'landslide1',
      type: 'Landslide Risk',
      description: 'Continuous rain saturating mountainside. Ground showing cracks. Houses at risk.',
      severity: 'high' as const,
      icon: Mountain,
      options: [
        {
          action: 'Immediately evacuate at-risk houses, coordinate with MGB and DENR for assessment',
          outcome: 'Correct! Ground cracks are warning signs - evacuate before catastrophic failure.',
          correct: true
        },
        {
          action: 'Monitor situation and prepare to evacuate if landslide occurs',
          outcome: 'Incorrect. Landslides happen in seconds - must evacuate at first warning signs!',
          correct: false
        }
      ]
    }
  ],
  fire: [
    {
      id: 'fire1',
      type: 'Urban Fire',
      description: 'Fire spreading rapidly in dense community. Strong winds. Multiple families trapped.',
      severity: 'high' as const,
      icon: Flame,
      options: [
        {
          action: 'Immediately call BFP, evacuate adjacent houses, coordinate rescue with trained personnel',
          outcome: 'Correct! Quick BFP response and systematic evacuation prevents fire from spreading.',
          correct: true
        },
        {
          action: 'Organize community bucket brigade to fight fire',
          outcome: 'Incorrect. Large fires need professional firefighters. Focus on evacuation and rescue.',
          correct: false
        }
      ]
    }
  ]
};

export function GamePhase2({ disaster, difficulty, preparedness, onComplete }: GamePhase2Props) {
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [events, setEvents] = useState<EmergencyEvent[]>([]); // To store randomized events
  const [isReady, setIsReady] = useState(false);

  const [evacuationsIssued, setEvacuationsIssued] = useState(false);
  const [agenciesCoordinated, setAgenciesCoordinated] = useState<string[]>([]);
  const [emergenciesHandled, setEmergenciesHandled] = useState(0);
  const [correctDecisions, setCorrectDecisions] = useState(0);
  const [evacuationCenterStatus, setEvacuationCenterStatus] = useState<'idle' | 'active' | 'overwhelmed'>('idle');
  const [publicPanic, setPublicPanic] = useState(20);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [showEventResult, setShowEventResult] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  // Initialize Random Scenario based on Difficulty
  useEffect(() => {
    try {
      console.log('Initializing Phase 2:', { disaster, difficulty });
      const disasterKey = disaster as keyof typeof DISASTER_EVENTS;
      const allEvents = DISASTER_EVENTS[disasterKey] || DISASTER_EVENTS.typhoon;

      if (!allEvents || allEvents.length === 0) {
        console.error('No events found for disaster:', disaster);
        setEvents([]);
        setIsReady(true);
        return;
      }

      // Shuffle events
      const shuffled = [...allEvents].sort(() => 0.5 - Math.random());

      let eventCount = 3;
      let initialTime = 300;
      let initialPanic = 20;

      if (difficulty === 'easy') {
        eventCount = 3;
        initialTime = 300; // 5 mins
        initialPanic = 10;
      } else if (difficulty === 'medium') {
        eventCount = 4;
        initialTime = 240; // 4 mins
        initialPanic = 20;
      } else if (difficulty === 'hard') {
        eventCount = 5; // Or all if less than 5
        initialTime = 150; // 2.5 mins
        initialPanic = 40;
      }

      const selectedEvents = shuffled.slice(0, Math.min(shuffled.length, eventCount));
      console.log('Selected Events:', selectedEvents);

      setEvents(selectedEvents);
      setTimeRemaining(initialTime);
      setPublicPanic(initialPanic);
      setIsReady(true);

      // Play start sound (safe invoke)
      try {
        soundManager.play('start');
      } catch (e) {
        console.warn('Audio play failed:', e);
      }
    } catch (err) {
      console.error('Error in Phase 2 init:', err);
      setIsReady(true); // Ensure we don't get stuck even if error
    }
  }, [disaster, difficulty]);

  const currentEvent = events[currentEventIndex];
  const isComplete = currentEventIndex >= events.length;

  // Safety check for render
  if (isReady && !currentEvent && !isComplete) {
    // If we are ready but have no event and not complete, it means events array is empty or index out of bounds
    // But if events is empty, isComplete (0 >= 0) is true.
    // So this case handles index mismanagement.
  }

  // Timer
  useEffect(() => {
    if (timeRemaining > 0 && !isComplete && !showTutorial && isReady) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isComplete, showTutorial, isReady]);

  const handleEvacuationOrder = () => {
    if (!evacuationsIssued) {
      setEvacuationsIssued(true);
      setEvacuationCenterStatus('active');
      setPublicPanic(Math.max(0, publicPanic - 10));
      addToLog('✅ Evacuation order issued successfully');

      // Good preparedness means better compliance
      if (preparedness.preparednessScore >= 70) {
        addToLog('🎯 High preparedness resulted in smooth evacuation!');
      }
    }
  };

  const handleAgencyCoordination = (agency: string) => {
    if (!agenciesCoordinated.includes(agency)) {
      setAgenciesCoordinated([...agenciesCoordinated, agency]);
      addToLog(`✅ Coordinated with ${agency}`);
    }
  };

  const handleEventResponse = (optionIndex: number) => {
    const option = currentEvent.options[optionIndex];
    setShowEventResult(option.outcome);

    if (option.correct) {
      setCorrectDecisions(correctDecisions + 1);
      setEmergenciesHandled(emergenciesHandled + 1);

      // Difficulty Logic: Panic Reduction
      const reduction = difficulty === 'easy' ? 10 : difficulty === 'hard' ? 3 : 5;
      setPublicPanic(Math.max(0, publicPanic - reduction));

      addToLog(`✅ ${currentEvent.type}: Correct action taken`);
      soundManager.play('success');
    } else {
      // Difficulty Logic: Panic Increase
      const penalty = difficulty === 'easy' ? 5 : difficulty === 'hard' ? 20 : 10;
      setPublicPanic(Math.min(100, publicPanic + penalty));

      addToLog(`❌ ${currentEvent.type}: Suboptimal decision`);
      soundManager.play('error');
    }

    setTimeout(() => {
      setShowEventResult(null);
      setCurrentEventIndex(currentEventIndex + 1);
      if (currentEventIndex + 1 < events.length) {
        soundManager.play('alert');
      }
    }, 3000);
  };

  const addToLog = (message: string) => {
    setEventLog(prev => [message, ...prev].slice(0, 10));
  };

  const handleComplete = () => {
    const baseScore = (correctDecisions / events.length) * 100;
    const panicPenalty = publicPanic * 0.3;
    const coordinationBonus = agenciesCoordinated.length * 5;
    const responseScore = Math.max(0, Math.min(100, baseScore - panicPenalty + coordinationBonus));

    // Calculate casualties based on preparedness and response
    let casualties = 0;
    if (preparedness.preparednessScore < 50) casualties += 15;
    if (preparedness.preparednessScore < 70) casualties += 10;
    if (!evacuationsIssued) casualties += 20;
    if (correctDecisions < events.length * 0.5) casualties += 15;
    casualties = Math.max(0, Math.min(50, casualties));

    onComplete({
      evacuationsIssued,
      agenciesCoordinated,
      emergenciesHandled,
      evacuationCenterManaged: evacuationCenterStatus !== 'idle',
      casualties,
      publicCompliance: 100 - publicPanic,
      responseScore: Math.round(responseScore)
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6 flex items-center justify-center">
        <Card className="max-w-2xl border-2">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="text-2xl">Response Phase Complete!</CardTitle>
            <CardDescription>Transitioning to Recovery Phase...</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="text-center py-8">
              <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
              <p className="text-lg mb-4">
                The immediate emergency has passed. Your response efforts have stabilized the situation.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold">Difficulty</p>
                  <p className="text-2xl capitalize">{difficulty}</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold">Emergencies Handled</p>
                  <p className="text-2xl">{emergenciesHandled}/{events.length}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-semibold">Agencies Coordinated</p>
                  <p className="text-2xl">{agenciesCoordinated.length}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="font-semibold">Public Compliance</p>
                  <p className="text-2xl">{100 - publicPanic}%</p>
                </div>
              </div>
            </div>

            <Button onClick={handleComplete} size="lg" className="w-full">
              Proceed to Recovery Phase
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (!isReady || !currentEvent) {
    return <div className="min-h-screen flex items-center justify-center">Loading Scenario... {isReady ? '(Preparing Events)' : '(Initializing)'}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDBA74] p-6 font-['Fredoka']" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      {showTutorial && <Phase2Tutorial onComplete={() => setShowTutorial(false)} />}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-black text-black mb-1 flex items-center gap-3 uppercase tracking-tight">
                <Siren className="w-10 h-10 text-red-600 animate-pulse fill-current" />
                PHASE 2: DURING THE DISASTER
              </h1>
              <p className="text-xl font-bold text-gray-700">Response Phase - Emergency in Progress</p>
            </div>
            <Badge variant="destructive" className="text-xl px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_#000] animate-pulse bg-red-500 text-white rounded-xl">
              <Clock className="w-6 h-6 mr-2" />
              Time: {formatTime(timeRemaining)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Status Dashboard */}
          <div className="lg:col-span-1 space-y-4">
            {/* Public Status */}
            <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl overflow-hidden">
              <CardHeader className="pb-3 bg-white border-b-4 border-black">
                <CardTitle className="text-lg font-black flex items-center gap-2 uppercase">
                  <Users className="w-6 h-6" />
                  Community Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 bg-white/90">
                <div>
                  <div className="flex justify-between text-sm mb-1 font-bold">
                    <span>Public Panic Level</span>
                    <span className={publicPanic > 50 ? 'text-red-600' : 'text-green-600'}>
                      {publicPanic}%
                    </span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full border-2 border-black overflow-hidden relative">
                    <div
                      className={`h-full transition-all duration-500 ${publicPanic > 50 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${publicPanic}%` }}
                    />
                  </div>
                  {publicPanic > 60 && (
                    <p className="text-xs font-bold text-red-600 mt-1 bg-red-100 p-1 border border-red-500 rounded">⚠️ High panic - coordinate better!</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1 font-bold">
                    <span>Evacuation Status</span>
                  </div>
                  <div className={`p-2 rounded-lg border-2 border-black text-center font-bold text-sm ${evacuationsIssued ? 'bg-green-300' : 'bg-red-300'}`}>
                    {evacuationsIssued ? '✅ Evacuations Ordered' : '⚠️ Not Yet Ordered'}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1 font-bold">
                    <span>Evacuation Center</span>
                  </div>
                  <div className={`p-2 rounded-lg border-2 border-black text-center font-bold text-sm ${evacuationCenterStatus === 'active' ? 'bg-blue-300' : evacuationCenterStatus === 'idle' ? 'bg-gray-200' : 'bg-red-300'}`}>
                    {evacuationCenterStatus === 'idle' ? 'Standby' :
                      evacuationCenterStatus === 'active' ? '✅ Operating' : '⚠️ Overwhelmed'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agencies */}
            <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl overflow-hidden">
              <CardHeader className="pb-3 bg-white border-b-4 border-black">
                <CardTitle className="text-lg font-black flex items-center gap-2 uppercase">
                  <Radio className="w-6 h-6" />
                  Agency Coordination
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 bg-white/90">
                <div className="space-y-2">
                  {['BFP', 'PNP', 'AFP', 'DOH', 'DSWD'].map(agency => (
                    <Button
                      key={agency}
                      size="sm"
                      variant={agenciesCoordinated.includes(agency) ? 'default' : 'outline'}
                      onClick={() => handleAgencyCoordination(agency)}
                      className={`w-full justify-start font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all ${agenciesCoordinated.includes(agency) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white hover:bg-gray-100'
                        }`}
                      disabled={agenciesCoordinated.includes(agency)}
                    >
                      {agenciesCoordinated.includes(agency) ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Phone className="w-4 h-4 mr-2" />}
                      {agency}
                    </Button>
                  ))}
                </div>
                <p className="text-xs font-bold text-gray-500 mt-3 text-center">
                  Coordinate with agencies for response
                </p>
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl overflow-hidden">
              <CardHeader className="pb-3 bg-white border-b-4 border-black">
                <CardTitle className="text-lg font-black">Activity Log</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 bg-white">
                <div className="space-y-1 text-xs max-h-[200px] overflow-y-auto font-mono">
                  {eventLog.length === 0 ? (
                    <p className="text-gray-400 italic">No activities yet...</p>
                  ) : (
                    eventLog.map((log, i) => (
                      <p key={i} className="py-2 border-b-2 border-gray-100 last:border-0 font-bold text-gray-700">{log}</p>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Emergency Events */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            {!evacuationsIssued && (
              <Alert className="border-4 border-black bg-red-200 shadow-[8px_8px_0px_0px_#000] rounded-xl">
                <AlertTriangle className="w-8 h-8 text-black" />
                <AlertDescription className="flex flex-col md:flex-row items-center justify-between gap-4 w-full ml-2">
                  <span className="font-black text-lg text-red-900 uppercase">Critical: Issue evacuation orders!</span>
                  <Button onClick={handleEvacuationOrder} className="bg-red-600 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-red-700 hover:shadow-none hover:translate-y-1 transition-all">
                    ISSUE ORDER NOW
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Current Emergency Event */}
            <Card className={`border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden transform transition-all duration-300 ${currentEvent.severity === 'high' ? 'bg-red-100' :
              currentEvent.severity === 'medium' ? 'bg-orange-100' :
                'bg-yellow-100'
              }`}>
              <CardHeader className="bg-white/40 backdrop-blur-md border-b-4 border-black pb-6 pt-6">
                <div className="flex items-start gap-4">
                  {currentEvent.icon ? (
                    <div className={`p-4 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_#000] ${currentEvent.severity === 'high' ? 'bg-red-200' :
                      currentEvent.severity === 'medium' ? 'bg-orange-200' : 'bg-yellow-200'
                      }`}>
                      <currentEvent.icon className="w-12 h-12 text-black" />
                    </div>
                  ) : (
                    <AlertTriangle className="w-16 h-16 text-black" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="destructive" className="animate-pulse border-2 border-black text-white px-3 py-1 text-sm font-bold shadow-[2px_2px_0px_0px_#000]">
                        EVENT {currentEventIndex + 1}/{events.length}
                      </Badge>
                      <Badge variant="outline" className="text-black font-black border-2 border-black bg-white px-3 py-1 text-sm shadow-[2px_2px_0px_0px_#000]">
                        {currentEvent.severity.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl font-black leading-tight text-black mb-1">
                      {currentEvent.type}
                    </CardTitle>
                    <p className="text-xl font-bold text-gray-800 leading-snug">
                      "{currentEvent.description}"
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                  <div className="h-1 flex-1 bg-black rounded-full"></div>
                  <p className="font-black text-black text-lg uppercase tracking-wider bg-white px-4 py-1 rounded-full border-2 border-black shadow-sm transform -rotate-2">
                    What will you do?
                  </p>
                  <div className="h-1 flex-1 bg-black rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentEvent.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleEventResponse(index)}
                      className="w-full text-left h-auto py-6 px-8 hover:scale-[1.02] active:scale-[0.98] transition-all justify-start whitespace-normal border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:bg-blue-50 group rounded-2xl relative overflow-hidden"
                      disabled={showEventResult !== null}
                    >
                      {/* Option Letter */}
                      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gray-100 border-r-4 border-black flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <span className="text-2xl font-black text-black">{String.fromCharCode(65 + index)}</span>
                      </div>

                      <div className="pl-12 w-full">
                        <span className="text-xl text-black font-bold group-hover:text-blue-900 leading-tight">
                          {option.action}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>

                {showEventResult && (
                  <Alert className={`border-4 border-black rounded-2xl animate-in zoom-in slide-in-from-bottom-5 duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] ${currentEvent.options.find(o => o.outcome === showEventResult)?.correct
                    ? 'bg-green-100'
                    : 'bg-red-100'
                    }`}>
                    {currentEvent.options.find(o => o.outcome === showEventResult)?.correct ? (
                      <CheckCircle2 className="w-10 h-10 text-black mt-1" />
                    ) : (
                      <XCircle className="w-10 h-10 text-black mt-1" />
                    )}
                    <AlertDescription className="ml-4">
                      <span className={`block font-black text-2xl mb-2 uppercase tracking-wide ${currentEvent.options.find(o => o.outcome === showEventResult)?.correct ? 'text-green-900' : 'text-red-900'
                        }`}>
                        {currentEvent.options.find(o => o.outcome === showEventResult)?.correct ? 'Excellent Decision!' : 'Situation Critical!'}
                      </span>
                      <span className="text-black text-lg font-bold leading-snug">
                        {showEventResult}
                      </span>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl overflow-hidden bg-white">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <p className="text-3xl font-black text-black">{correctDecisions}</p>
                  <p className="text-sm font-bold text-gray-600 uppercase">Correct Decisions</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl overflow-hidden bg-white">
                <CardContent className="pt-6 text-center">
                  {publicPanic < 40 ? (
                    <TrendingDown className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  ) : (
                    <TrendingUp className="w-10 h-10 text-red-600 mx-auto mb-2" />
                  )}
                  <p className="text-3xl font-black text-black">{100 - publicPanic}%</p>
                  <p className="text-sm font-bold text-gray-600 uppercase">Public Trust</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl overflow-hidden bg-white">
                <CardContent className="pt-6 text-center">
                  <Users className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <p className="text-3xl font-black text-black">{agenciesCoordinated.length}/5</p>
                  <p className="text-sm font-bold text-gray-600 uppercase">Agencies Coordinated</p>
                </CardContent>
              </Card>
            </div>

            {/* Educational Note */}
            <Card className="border-4 border-black bg-blue-100 shadow-[4px_4px_0px_0px_#000]">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <AlertCircle className="w-8 h-8 text-black flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-black text-lg mb-2 uppercase text-blue-900">💡 DRRM Response Principle:</p>
                    <p className="text-black font-medium leading-relaxed">
                      During disasters, coordination with trained agencies (BFP, PNP, AFP, DOH) is critical.
                      As Barangay DRRM Officer, your role is to coordinate local response and communicate with
                      the Municipal DRRMO and NDRRMC. Clear command structure saves lives!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
