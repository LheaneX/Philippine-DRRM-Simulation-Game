import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { 
  AlertTriangle, Users, Radio, Siren, Heart, Flame, Phone,
  CheckCircle2, XCircle, Clock, TrendingDown, TrendingUp
} from 'lucide-react';
import { PreparednessData } from './GamePhase1';

interface GamePhase2Props {
  disaster: string;
  preparedness: PreparednessData;
  onComplete: (responseData: ResponseData) => void;
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

interface EmergencyEvent {
  id: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  options: {
    action: string;
    outcome: string;
    correct: boolean;
  }[];
}

const DISASTER_EVENTS = {
  typhoon: [
    {
      id: 'evac1',
      type: 'Evacuation Decision',
      description: 'PAGASA Signal #4 is now in effect. Coastal residents are asking if they should evacuate now.',
      severity: 'high' as const,
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
    }
  ],
  earthquake: [
    {
      id: 'aftershock1',
      type: 'Aftershock Warning',
      description: 'PHIVOLCS warns of strong aftershocks. People want to return home to get belongings.',
      severity: 'high' as const,
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
      options: [
        {
          action: 'Immediately call BFP, evacuate surrounding areas, cut power supply',
          outcome: 'Correct! Coordinate with fire experts and prevent further casualties through evacuation.',
          correct: true
        },
        {
          action: 'Use water from nearby source to fight fire',
          outcome: 'Incorrect. Electrical fires need specialized response - water may electrocute people!',
          correct: false
        }
      ]
    },
    {
      id: 'injury1',
      type: 'Mass Casualties',
      description: 'Multiple injuries reported. Local health center overwhelmed. Need emergency medical response.',
      severity: 'high' as const,
      options: [
        {
          action: 'Activate Rural Health Unit emergency protocols, request DOH assistance, triage patients',
          outcome: 'Correct! Proper triage and coordination with health authorities saves the most lives.',
          correct: true
        },
        {
          action: 'Transport all injured to city hospital immediately',
          outcome: 'Partially correct but may overwhelm one facility. Triage and distributed care is better.',
          correct: false
        }
      ]
    }
  ],
  flood: [
    {
      id: 'flood1',
      type: 'Flash Flood Alert',
      description: 'PAGASA Red Rainfall Warning. Water rising rapidly in low areas. Traffic jam blocking evacuation route.',
      severity: 'high' as const,
      options: [
        {
          action: 'Coordinate with PNP for traffic management, use alternate routes, deploy boats if needed',
          outcome: 'Correct! Multi-agency coordination and alternate plans ensure successful evacuation.',
          correct: true
        },
        {
          action: 'Wait for traffic to clear naturally',
          outcome: 'Incorrect. Flash floods are deadly - every minute counts! Take immediate action.',
          correct: false
        }
      ]
    }
  ],
  volcano: [
    {
      id: 'volcano1',
      type: 'Volcanic Alert',
      description: 'PHIVOLCS raises alert to Level 4. Hazardous eruption imminent. Need to evacuate 14km radius.',
      severity: 'high' as const,
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

export function GamePhase2({ disaster, preparedness, onComplete }: GamePhase2Props) {
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes simulation
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [evacuationsIssued, setEvacuationsIssued] = useState(false);
  const [agenciesCoordinated, setAgenciesCoordinated] = useState<string[]>([]);
  const [emergenciesHandled, setEmergenciesHandled] = useState(0);
  const [correctDecisions, setCorrectDecisions] = useState(0);
  const [evacuationCenterStatus, setEvacuationCenterStatus] = useState<'idle' | 'active' | 'overwhelmed'>('idle');
  const [publicPanic, setPublicPanic] = useState(20); // Lower is better
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [showEventResult, setShowEventResult] = useState<string | null>(null);

  const events = DISASTER_EVENTS[disaster as keyof typeof DISASTER_EVENTS] || DISASTER_EVENTS.typhoon;
  const currentEvent = events[currentEventIndex];
  const isComplete = currentEventIndex >= events.length;

  // Timer
  useEffect(() => {
    if (timeRemaining > 0 && !isComplete) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isComplete]);

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
      setPublicPanic(Math.max(0, publicPanic - 5));
      addToLog(`✅ ${currentEvent.type}: Correct action taken`);
    } else {
      setPublicPanic(Math.min(100, publicPanic + 10));
      addToLog(`❌ ${currentEvent.type}: Suboptimal decision`);
    }

    setTimeout(() => {
      setShowEventResult(null);
      setCurrentEventIndex(currentEventIndex + 1);
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
                  <p className="font-semibold">Evacuations Issued</p>
                  <p className="text-2xl">{evacuationsIssued ? '✅' : '❌'}</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Siren className="w-8 h-8 text-red-600 animate-pulse" />
                PHASE 2: DURING THE DISASTER
              </h1>
              <p className="text-gray-600">Response Phase - Emergency in Progress</p>
            </div>
            <Badge variant="destructive" className="text-lg px-4 py-2 animate-pulse">
              <Clock className="w-4 h-4 mr-2" />
              Time: {formatTime(timeRemaining)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Status Dashboard */}
          <div className="lg:col-span-1 space-y-4">
            {/* Public Status */}
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Public Panic Level</span>
                    <span className={publicPanic > 50 ? 'text-red-600 font-bold' : 'text-green-600'}>
                      {publicPanic}%
                    </span>
                  </div>
                  <Progress 
                    value={publicPanic} 
                    className={`h-2 ${publicPanic > 50 ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
                  />
                  {publicPanic > 60 && (
                    <p className="text-xs text-red-600 mt-1">⚠️ High panic - coordinate better!</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Evacuation Status</span>
                  </div>
                  <Badge variant={evacuationsIssued ? 'default' : 'destructive'} className="w-full justify-center">
                    {evacuationsIssued ? '✅ Evacuations Ordered' : '⚠️ Not Yet Ordered'}
                  </Badge>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Evacuation Center</span>
                  </div>
                  <Badge 
                    variant={evacuationCenterStatus === 'active' ? 'default' : 'secondary'}
                    className="w-full justify-center"
                  >
                    {evacuationCenterStatus === 'idle' ? 'Standby' : 
                     evacuationCenterStatus === 'active' ? '✅ Operating' : '⚠️ Overwhelmed'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Agencies */}
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Radio className="w-5 h-5" />
                  Agency Coordination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['BFP', 'PNP', 'AFP', 'DOH', 'DSWD'].map(agency => (
                    <Button
                      key={agency}
                      size="sm"
                      variant={agenciesCoordinated.includes(agency) ? 'default' : 'outline'}
                      onClick={() => handleAgencyCoordination(agency)}
                      className="w-full justify-start"
                      disabled={agenciesCoordinated.includes(agency)}
                    >
                      {agenciesCoordinated.includes(agency) ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Phone className="w-4 h-4 mr-2" />}
                      {agency}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Coordinate with agencies for comprehensive response
                </p>
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs max-h-[200px] overflow-y-auto">
                  {eventLog.length === 0 ? (
                    <p className="text-gray-400 italic">No activities yet...</p>
                  ) : (
                    eventLog.map((log, i) => (
                      <p key={i} className="py-1 border-b border-gray-100 last:border-0">{log}</p>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Emergency Events */}
          <div className="lg:col-span-2 space-y-4">
            {/* Quick Actions */}
            {!evacuationsIssued && (
              <Alert className="border-2 border-red-500 bg-red-50">
                <AlertTriangle className="w-5 h-5" />
                <AlertDescription className="flex items-center justify-between">
                  <span className="font-semibold">⚠️ Critical: Issue evacuation orders immediately!</span>
                  <Button onClick={handleEvacuationOrder} variant="destructive">
                    Issue Evacuation Order
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Current Emergency Event */}
            <Card className={`border-4 ${
              currentEvent.severity === 'high' ? 'border-red-500 bg-red-50' :
              currentEvent.severity === 'medium' ? 'border-orange-500 bg-orange-50' :
              'border-yellow-500 bg-yellow-50'
            }`}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-10 h-10 flex-shrink-0 ${
                    currentEvent.severity === 'high' ? 'text-red-600' :
                    currentEvent.severity === 'medium' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="destructive">
                        EMERGENCY {currentEventIndex + 1}/{events.length}
                      </Badge>
                      <Badge variant="outline">
                        {currentEvent.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{currentEvent.description}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-semibold text-red-900">What will you do?</p>
                
                <div className="space-y-3">
                  {currentEvent.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleEventResponse(index)}
                      variant="outline"
                      className="w-full text-left h-auto py-4 px-4 hover:bg-white hover:border-blue-500 justify-start whitespace-normal"
                      disabled={showEventResult !== null}
                    >
                      <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                      <span>{option.action}</span>
                    </Button>
                  ))}
                </div>

                {showEventResult && (
                  <Alert className={`border-2 ${
                    currentEvent.options.find(o => o.outcome === showEventResult)?.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                  }`}>
                    {currentEvent.options.find(o => o.outcome === showEventResult)?.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <AlertDescription className="font-semibold">
                      {showEventResult}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Performance Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{correctDecisions}</p>
                  <p className="text-sm text-gray-600">Correct Decisions</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  {publicPanic < 40 ? (
                    <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  ) : (
                    <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  )}
                  <p className="text-2xl font-bold">{100 - publicPanic}%</p>
                  <p className="text-sm text-gray-600">Public Trust</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{agenciesCoordinated.length}/5</p>
                  <p className="text-sm text-gray-600">Agencies Coordinated</p>
                </CardContent>
              </Card>
            </div>

            {/* Educational Note */}
            <Card className="border-2 border-blue-300 bg-blue-50">
              <CardContent className="pt-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">💡 DRRM Response Principle:</p>
                    <p className="text-gray-700">
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
