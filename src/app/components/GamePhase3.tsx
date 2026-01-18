import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { 
  Heart, Home, Zap, Droplet, Phone, Package, Activity, ClipboardCheck,
  TrendingUp, Users, CheckCircle2, AlertCircle, Award
} from 'lucide-react';
import { PreparednessData } from './GamePhase1';
import { ResponseData } from './GamePhase2';

interface GamePhase3Props {
  disaster: string;
  preparedness: PreparednessData;
  response: ResponseData;
  onComplete: () => void;
}

interface RecoveryTask {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  points: number;
}

export function GamePhase3({ disaster, preparedness, response, onComplete }: GamePhase3Props) {
  const [rdanaCompleted, setRdanaCompleted] = useState(false);
  const [infrastructureTasks, setInfrastructureTasks] = useState<RecoveryTask[]>([
    { id: 'power', name: 'Restore Electricity', description: 'Coordinate with electric cooperative', completed: false, points: 15 },
    { id: 'water', name: 'Restore Water Supply', description: 'Repair water system', completed: false, points: 15 },
    { id: 'roads', name: 'Clear Roads & Debris', description: 'Remove obstacles for access', completed: false, points: 10 },
    { id: 'comms', name: 'Restore Communications', description: 'Repair cell towers, radios', completed: false, points: 10 }
  ]);
  
  const [reliefDistributed, setReliefDistributed] = useState(false);
  const [medicalCareProvided, setMedicalCareProvided] = useState(false);
  const [psychosocialSupport, setPsychosocialSupport] = useState(false);
  const [buildBackBetter, setBuildBackBetter] = useState(false);
  const [drrmPlanUpdated, setDrrmPlanUpdated] = useState(false);

  const toggleInfrastructureTask = (taskId: string) => {
    setInfrastructureTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const calculateRecoveryScore = () => {
    let score = 0;
    
    if (rdanaCompleted) score += 20;
    score += infrastructureTasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);
    if (reliefDistributed) score += 15;
    if (medicalCareProvided) score += 10;
    if (psychosocialSupport) score += 10;
    if (buildBackBetter) score += 10;
    if (drrmPlanUpdated) score += 10;
    
    return score;
  };

  const calculateFinalScore = () => {
    const prepWeight = 30;
    const responseWeight = 40;
    const recoveryWeight = 30;
    
    const prepScore = (preparedness.preparednessScore / 100) * prepWeight;
    const respScore = (response.responseScore / 100) * responseWeight;
    const recovScore = (calculateRecoveryScore() / 100) * recoveryWeight;
    
    return Math.round(prepScore + respScore + recovScore);
  };

  const getPerformanceGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', label: 'Outstanding', color: 'text-green-600' };
    if (score >= 80) return { grade: 'B', label: 'Very Good', color: 'text-blue-600' };
    if (score >= 70) return { grade: 'C', label: 'Good', color: 'text-yellow-600' };
    if (score >= 60) return { grade: 'D', label: 'Fair', color: 'text-orange-600' };
    return { grade: 'F', label: 'Needs Improvement', color: 'text-red-600' };
  };

  const recoveryProgress = calculateRecoveryScore();
  const finalScore = calculateFinalScore();
  const performance = getPerformanceGrade(finalScore);

  const isReadyToComplete = rdanaCompleted && reliefDistributed && infrastructureTasks.filter(t => t.completed).length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Home className="w-8 h-8 text-green-600" />
                PHASE 3: AFTER THE DISASTER
              </h1>
              <p className="text-gray-600">Rehabilitation & Recovery</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Recovery Progress: {recoveryProgress}%
            </Badge>
          </div>
          <Progress value={recoveryProgress} className="h-3" />
        </div>

        <Tabs defaultValue="rdana" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="rdana" className="gap-2">
              <ClipboardCheck className="w-4 h-4" />
              RDANA
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="gap-2">
              <Zap className="w-4 h-4" />
              Infrastructure
            </TabsTrigger>
            <TabsTrigger value="relief" className="gap-2">
              <Package className="w-4 h-4" />
              Relief
            </TabsTrigger>
            <TabsTrigger value="health" className="gap-2">
              <Heart className="w-4 h-4" />
              Health
            </TabsTrigger>
            <TabsTrigger value="bbb" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Build Back
            </TabsTrigger>
          </TabsList>

          {/* RDANA Tab */}
          <TabsContent value="rdana" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapid Damage Assessment and Needs Analysis (RDANA)</CardTitle>
                <CardDescription>
                  Systematic assessment of damage and community needs - required by NDRRMC protocols
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-bold mb-3">Assessment Results: Barangay San Roque</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Home className="w-4 h-4 text-orange-600" />
                        Infrastructure Damage
                      </h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• {response.casualties < 10 ? '45' : '120'} houses damaged</li>
                        <li>• {response.casualties < 10 ? '5' : '25'} houses destroyed</li>
                        <li>• Roads: Passable with clearing</li>
                        <li>• Water system: {response.casualties < 10 ? 'Minor damage' : 'Major damage'}</li>
                        <li>• Power lines: Down in several areas</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        Affected Population
                      </h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Families affected: {response.casualties < 10 ? '250' : '600'}</li>
                        <li>• Currently in evacuation: {response.evacuationsIssued ? '180' : '50'} families</li>
                        <li>• Casualties: {response.casualties} persons</li>
                        <li>• Injuries: {Math.round(response.casualties * 2)} persons</li>
                        <li>• Missing: {response.evacuationsIssued ? '0' : '3'} persons</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Package className="w-4 h-4 text-green-600" />
                        Immediate Needs
                      </h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Food packs: {response.casualties < 10 ? '250' : '600'} families</li>
                        <li>• Drinking water: Critical</li>
                        <li>• Hygiene kits: 500 families</li>
                        <li>• Temporary shelter: {response.casualties < 10 ? '25' : '80'} families</li>
                        <li>• Medical supplies: Urgent</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-600" />
                        Critical Services
                      </h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Health center: Operational</li>
                        <li>• Evacuation center: {response.evacuationCenterManaged ? 'Well-managed' : 'Needs support'}</li>
                        <li>• Communication: Limited</li>
                        <li>• Transportation: Partially restored</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Impact of Preparedness */}
                <Card className={`border-2 ${preparedness.preparednessScore >= 70 ? 'border-green-400 bg-green-50' : 'border-orange-400 bg-orange-50'}`}>
                  <CardContent className="pt-4">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Impact of Your Preparedness
                    </h3>
                    {preparedness.preparednessScore >= 70 ? (
                      <div className="text-sm text-green-900 space-y-1">
                        <p>✅ <strong>Excellent preparedness</strong> significantly reduced casualties and damage!</p>
                        <p>✅ Well-prepared Go Bags meant families evacuated quickly and safely</p>
                        <p>✅ Pre-identified evacuation centers operated smoothly</p>
                        <p>✅ Community drills resulted in orderly evacuation and high compliance</p>
                        <p>✅ Early warning understanding saved lives through timely action</p>
                      </div>
                    ) : (
                      <div className="text-sm text-orange-900 space-y-1">
                        <p>⚠️ Limited preparedness resulted in higher casualties and damage</p>
                        <p>⚠️ Lack of Go Bags caused delays and confusion during evacuation</p>
                        <p>⚠️ Evacuation centers were unprepared, causing additional stress</p>
                        <p>💡 Better preparedness in the future will save more lives!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {!rdanaCompleted ? (
                  <Button onClick={() => setRdanaCompleted(true)} size="lg" className="w-full">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Complete and Submit RDANA Report
                  </Button>
                ) : (
                  <div className="bg-green-100 p-4 rounded border border-green-500 text-green-800">
                    <CheckCircle2 className="w-5 h-5 inline mr-2" />
                    <strong>RDANA Complete!</strong> Report submitted to Municipal DRRMO and NDRRMC.
                  </div>
                )}

                <div className="bg-yellow-50 p-3 rounded border border-yellow-300 text-sm">
                  <strong>📋 NDRRMC Protocol:</strong> RDANA must be conducted within 24 hours after disaster 
                  to assess damage, identify needs, and coordinate relief operations.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Tab */}
          <TabsContent value="infrastructure" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Restore Critical Infrastructure</CardTitle>
                <CardDescription>
                  Coordinate with utility companies and government agencies to restore essential services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {infrastructureTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleInfrastructureTask(task.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      task.completed
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{task.name}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <Badge variant={task.completed ? 'default' : 'secondary'}>
                        +{task.points} points
                      </Badge>
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 p-4 rounded border border-blue-200 text-sm">
                  <strong>⚡ Recovery Priority:</strong> Restore critical infrastructure (water, power, roads, communications) 
                  to enable relief operations and help community return to normal life.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Relief Tab */}
          <TabsContent value="relief" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Coordinate Relief Distribution</CardTitle>
                <CardDescription>
                  Work with DSWD and NGOs for systematic and equitable relief distribution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded border-2 border-gray-200">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Relief Distribution Plan
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-semibold mb-1">Phase 1: Emergency Relief (Days 1-3)</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Food packs (rice, canned goods, noodles)</li>
                        <li>Drinking water (5L per family per day)</li>
                        <li>Basic hygiene kits</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-semibold mb-1">Phase 2: Extended Relief (Week 1-4)</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Continued food and water supply</li>
                        <li>Kitchen utensils and beddings</li>
                        <li>Clothing and personal items</li>
                        <li>Educational materials for children</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-semibold mb-1">Distribution Method (DSWD Protocol)</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Verified beneficiary list (avoid duplication)</li>
                        <li>Priority: Vulnerable groups (elderly, PWD, pregnant)</li>
                        <li>Transparent distribution with documentation</li>
                        <li>Community volunteers assist in packing/distribution</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {!reliefDistributed ? (
                  <Button onClick={() => setReliefDistributed(true)} size="lg" className="w-full">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Execute Relief Distribution
                  </Button>
                ) : (
                  <div className="bg-green-100 p-4 rounded border border-green-500 text-green-800">
                    <CheckCircle2 className="w-5 h-5 inline mr-2" />
                    <strong>Relief Distribution Complete!</strong> All affected families received aid packages.
                  </div>
                )}

                <div className="bg-yellow-50 p-3 rounded border border-yellow-300 text-sm">
                  <strong>📦 DSWD Guidelines:</strong> Relief must be distributed equitably, with priority to 
                  the most vulnerable. Keep detailed records for transparency and accountability.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Tab */}
          <TabsContent value="health" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Health & Psychosocial Support</CardTitle>
                <CardDescription>
                  Provide medical care and mental health support to affected communities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setMedicalCareProvided(true)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      medicalCareProvided
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Activity className="w-8 h-8 text-red-600" />
                      <h3 className="font-bold">Medical Services</h3>
                    </div>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>✓ Treat injuries and illnesses</li>
                      <li>✓ Provide medicines and first aid</li>
                      <li>✓ Coordinate with DOH medical teams</li>
                      <li>✓ Monitor for disease outbreak</li>
                      <li>✓ Vaccinations and health education</li>
                    </ul>
                    {medicalCareProvided && (
                      <div className="mt-3 text-green-700 font-semibold text-sm">
                        ✅ Medical care provided
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => setPsychosocialSupport(true)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      psychosocialSupport
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Heart className="w-8 h-8 text-pink-600" />
                      <h3 className="font-bold">Psychosocial Support</h3>
                    </div>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>✓ Trauma counseling sessions</li>
                      <li>✓ Activities for children (normalize routine)</li>
                      <li>✓ Grief support groups</li>
                      <li>✓ Stress management workshops</li>
                      <li>✓ Livelihood restoration planning</li>
                    </ul>
                    {psychosocialSupport && (
                      <div className="mt-3 text-green-700 font-semibold text-sm">
                        ✅ Psychosocial support provided
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-pink-50 p-4 rounded border border-pink-200 text-sm">
                  <strong>❤️ Mental Health Matters:</strong> Disasters cause psychological trauma. DOH and DSWD 
                  recommend psychosocial first aid, counseling, and community activities to help people recover 
                  emotionally, not just physically.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Build Back Better Tab */}
          <TabsContent value="bbb" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Build Back Better (BBB)</CardTitle>
                <CardDescription>
                  Implement lessons learned and strengthen resilience for future disasters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border-2 border-blue-300">
                  <h3 className="font-bold mb-3 text-lg">Build Back Better Principles (NDRRMC)</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Don't just rebuild - make communities safer and more resilient than before!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-white p-3 rounded">
                      <h4 className="font-semibold mb-2 text-blue-700">🏗️ Structural Improvements</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Relocate houses from hazard-prone areas</li>
                        <li>• Use disaster-resilient building materials</li>
                        <li>• Elevate houses in flood-prone zones</li>
                        <li>• Strengthen evacuation centers</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded">
                      <h4 className="font-semibold mb-2 text-green-700">🌳 Environmental Measures</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Plant mangroves for storm surge protection</li>
                        <li>• Restore watershed areas</li>
                        <li>• Improve drainage systems</li>
                        <li>• Protect remaining natural buffers</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded">
                      <h4 className="font-semibold mb-2 text-purple-700">👥 Community Capacity</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Strengthen BDRRMC (Barangay DRRM Committee)</li>
                        <li>• Train more community responders</li>
                        <li>• Improve early warning systems</li>
                        <li>• Conduct regular drills</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded">
                      <h4 className="font-semibold mb-2 text-orange-700">📋 Policy & Planning</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Update hazard maps</li>
                        <li>• Enforce building codes</li>
                        <li>• Increase DRRM budget allocation</li>
                        <li>• Integrate DRRM in development plans</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setBuildBackBetter(true)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    buildBackBetter
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold mb-1">Implement Build Back Better Strategy</h3>
                      <p className="text-sm text-gray-600">
                        Commit to resilient reconstruction and risk reduction measures
                      </p>
                    </div>
                    {buildBackBetter ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    ) : (
                      <Button>Implement BBB</Button>
                    )}
                  </div>
                </div>

                <div
                  onClick={() => setDrrmPlanUpdated(true)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    drrmPlanUpdated
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold mb-1">Update Barangay DRRM Plan</h3>
                      <p className="text-sm text-gray-600">
                        Incorporate lessons learned from this disaster into the DRRM plan
                      </p>
                    </div>
                    {drrmPlanUpdated ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    ) : (
                      <Button>Update Plan</Button>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm">
                  <strong>🔄 Continuous Improvement:</strong> RA 10121 requires regular review and updating 
                  of DRRM plans based on new experiences, hazards, and vulnerabilities. Learning from each 
                  disaster makes us more resilient!
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Completion Card */}
        {isReadyToComplete && (
          <Card className="mt-6 border-4 border-green-500 bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Recovery Phase Complete!</h2>
                <p className="text-gray-600">Review your overall performance and learning outcomes</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Preparedness</p>
                  <p className="text-3xl font-bold text-blue-700">{preparedness.preparednessScore}%</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Response</p>
                  <p className="text-3xl font-bold text-orange-700">{response.responseScore}%</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Recovery</p>
                  <p className="text-3xl font-bold text-green-700">{recoveryProgress}%</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg mb-6 text-center border-2 border-yellow-400">
                <p className="text-sm text-gray-700 mb-2">OVERALL PERFORMANCE</p>
                <p className={`text-6xl font-bold ${performance.color} mb-2`}>{performance.grade}</p>
                <p className="text-xl font-semibold mb-1">{performance.label}</p>
                <p className="text-3xl font-bold text-gray-800">{finalScore}%</p>
              </div>

              <Button onClick={onComplete} size="lg" className="w-full gap-2">
                <CheckCircle2 className="w-5 h-5" />
                View Detailed Report & Learning Outcomes
              </Button>
            </CardContent>
          </Card>
        )}

        {!isReadyToComplete && (
          <Card className="mt-6 border-2 border-yellow-400 bg-yellow-50">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-700" />
                <div>
                  <p className="font-semibold text-yellow-900">Complete Required Tasks</p>
                  <p className="text-sm text-yellow-800">
                    Minimum requirements: Complete RDANA, Distribute Relief, and Restore at least 2 Infrastructure Services
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
