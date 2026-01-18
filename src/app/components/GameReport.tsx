import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { 
  Award, CheckCircle2, XCircle, TrendingUp, AlertTriangle, BookOpen,
  Home, Shield, Users, Heart, Lightbulb, RefreshCw
} from 'lucide-react';
import { PreparednessData } from './GamePhase1';
import { ResponseData } from './GamePhase2';

interface GameReportProps {
  disaster: string;
  preparedness: PreparednessData;
  response: ResponseData;
  finalScore: number;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const DISASTER_LESSONS = {
  typhoon: {
    realWorld: 'Typhoon Yolanda (Haiyan) 2013',
    lesson: 'Super Typhoon Yolanda caused massive storm surge casualties because many did not understand what "storm surge" meant. Early evacuation and clear communication saves lives.',
    keyTakeaway: 'PAGASA now uses Filipino terms and clearer warnings. "Daluyong ng Dagat" (storm surge) is now better understood.'
  },
  earthquake: {
    realWorld: 'Bohol Earthquake 2013',
    lesson: 'The magnitude 7.2 earthquake in Bohol showed the importance of earthquake drills and structural assessments. Many casualties occurred in old churches and buildings.',
    keyTakeaway: 'Regular "Duck, Cover, Hold" drills and building code compliance are critical in earthquake-prone areas.'
  },
  flood: {
    realWorld: 'Ondoy Flooding 2009',
    lesson: 'Tropical Storm Ondoy dumped a month\'s worth of rain in 6 hours, causing massive urban flooding. Many were trapped because they didn\'t expect such extreme rainfall.',
    keyTakeaway: 'PAGASA\'s rainfall warning system (Yellow, Orange, Red) helps communities prepare for different flood intensities.'
  },
  volcano: {
    realWorld: 'Taal Volcano Eruption 2020',
    lesson: 'Taal\'s phreatic eruption reminded us that volcanoes can erupt with little warning. PHIVOLCS alert levels must be heeded immediately.',
    keyTakeaway: 'Know your volcano alert levels: Level 4 means evacuate immediately, don\'t wait for Level 5 (eruption in progress).'
  },
  landslide: {
    realWorld: 'Cherry Hills Landslide 1999',
    lesson: 'The Cherry Hills landslide in Antipolo killed dozens. Heavy rainfall saturated slopes, causing catastrophic failure. Ground cracks are warning signs.',
    keyTakeaway: 'Evacuate immediately when ground cracks appear. Landslides happen in seconds - prevention through evacuation is key.'
  },
  fire: {
    realWorld: 'Urban Fires in Dense Communities',
    lesson: 'Fires spread rapidly in densely populated informal settlements. Quick BFP response and community fire lanes save lives and property.',
    keyTakeaway: 'Fire prevention (no open flames, fire lanes, fire extinguishers) and early BFP notification are critical in urban areas.'
  }
};

export function GameReport({ disaster, preparedness, response, finalScore, onPlayAgain, onBackToMenu }: GameReportProps) {
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', label: 'Outstanding', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 80) return { grade: 'B', label: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score >= 70) return { grade: 'C', label: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (score >= 60) return { grade: 'D', label: 'Fair', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { grade: 'F', label: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const performance = getGrade(finalScore);
  const lessonData = DISASTER_LESSONS[disaster as keyof typeof DISASTER_LESSONS];

  // Analysis of decisions
  const correctDecisions: Array<{ text: string; icon: any }> = [];
  const mistakes: Array<{ text: string; icon: any; improvement: string }> = [];

  // Preparedness analysis
  if (preparedness.preparednessScore >= 70) {
    correctDecisions.push({
      text: 'Excellent preparedness planning (Go Bags, drills, risk assessment)',
      icon: Shield
    });
  } else {
    mistakes.push({
      text: 'Insufficient preparedness reduced effectiveness',
      icon: AlertTriangle,
      improvement: 'Always complete comprehensive preparedness: Go Bags, evacuation plans, drills, and risk assessments as required by RA 10121.'
    });
  }

  if (preparedness.goBagItems.length >= 8) {
    correctDecisions.push({
      text: 'Comprehensive Go Bags prepared following NDRRMC guidelines',
      icon: CheckCircle2
    });
  } else if (preparedness.goBagItems.length < 5) {
    mistakes.push({
      text: 'Go Bags were incomplete',
      icon: XCircle,
      improvement: 'NDRRMC recommends Go Bags with at least 72-hour supplies: water, food, first aid, documents, flashlight, radio, and medicines.'
    });
  }

  if (preparedness.drillsCompleted) {
    correctDecisions.push({
      text: 'Community drills conducted - resulted in orderly evacuation',
      icon: Users
    });
  }

  // Response analysis
  if (response.evacuationsIssued) {
    correctDecisions.push({
      text: 'Timely evacuation orders issued - saved lives',
      icon: CheckCircle2
    });
  } else {
    mistakes.push({
      text: 'Failed to issue evacuation orders',
      icon: XCircle,
      improvement: 'As Barangay DRRM Officer, you must issue clear evacuation orders when advisories indicate danger (RA 10121, Section 12).'
    });
  }

  if (response.agenciesCoordinated.length >= 4) {
    correctDecisions.push({
      text: 'Excellent inter-agency coordination (BFP, PNP, DOH, etc.)',
      icon: CheckCircle2
    });
  } else {
    mistakes.push({
      text: 'Limited coordination with emergency agencies',
      icon: AlertTriangle,
      improvement: 'NDRRMC framework emphasizes multi-agency coordination. Always work with BFP, PNP, AFP, DOH, and DSWD during disasters.'
    });
  }

  if (response.casualties === 0) {
    correctDecisions.push({
      text: 'Zero casualties - outstanding life-saving actions!',
      icon: Heart
    });
  } else if (response.casualties < 5) {
    correctDecisions.push({
      text: `Minimal casualties (${response.casualties}) - good response`,
      icon: Heart
    });
  } else {
    mistakes.push({
      text: `${response.casualties} casualties could have been prevented`,
      icon: AlertTriangle,
      improvement: 'Better preparedness and earlier evacuation reduces casualties. Every life matters!'
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header - Performance Grade */}
        <Card className={`border-4 ${performance.bg} mb-6 shadow-2xl`}>
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Mission Complete!</h1>
              <p className="text-gray-600 mb-6">Barangay DRRM Simulation Report</p>
              
              <div className={`inline-block ${performance.bg} border-4 border-${performance.color.split('-')[1]}-400 rounded-2xl px-12 py-6 mb-6`}>
                <p className="text-sm text-gray-600 mb-2">OVERALL PERFORMANCE</p>
                <p className={`text-8xl font-bold ${performance.color} mb-2`}>{performance.grade}</p>
                <p className="text-2xl font-semibold text-gray-700 mb-1">{performance.label}</p>
                <p className="text-4xl font-bold text-gray-800">{finalScore}%</p>
              </div>

              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Preparedness</p>
                  <p className="text-3xl font-bold text-blue-600">{preparedness.preparednessScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Response</p>
                  <p className="text-3xl font-bold text-orange-600">{response.responseScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lives Saved</p>
                  <p className="text-3xl font-bold text-green-600">{Math.max(0, 50 - response.casualties)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="decisions" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Decisions
            </TabsTrigger>
            <TabsTrigger value="lessons" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2">
              <Shield className="w-4 h-4" />
              RA 10121
            </TabsTrigger>
          </TabsList>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>How your decisions impacted the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Before the Disaster (Preparedness)
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Go Bag Items:</span>
                        <Badge>{preparedness.goBagItems.length}/12</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Evacuation Center:</span>
                        <Badge variant={preparedness.evacuationCenter ? 'default' : 'destructive'}>
                          {preparedness.evacuationCenter ? 'Selected' : 'Not Selected'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Assessment:</span>
                        <Badge variant={preparedness.riskAssessmentDone ? 'default' : 'destructive'}>
                          {preparedness.riskAssessmentDone ? 'Done' : 'Skipped'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Drills Conducted:</span>
                        <Badge variant={preparedness.drillsCompleted ? 'default' : 'destructive'}>
                          {preparedness.drillsCompleted ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Budget Allocated:</span>
                        <Badge>₱{preparedness.budgetAllocated.toLocaleString()}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      During the Disaster (Response)
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Evacuation Ordered:</span>
                        <Badge variant={response.evacuationsIssued ? 'default' : 'destructive'}>
                          {response.evacuationsIssued ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Agencies Coordinated:</span>
                        <Badge>{response.agenciesCoordinated.length}/5</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Emergencies Handled:</span>
                        <Badge>{response.emergenciesHandled}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Public Compliance:</span>
                        <Badge>{response.publicCompliance}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Casualties:</span>
                        <Badge variant={response.casualties === 0 ? 'default' : response.casualties < 5 ? 'secondary' : 'destructive'}>
                          {response.casualties}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
                  <CardContent className="pt-4">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Impact of Your Preparedness
                    </h3>
                    {preparedness.preparednessScore >= 70 ? (
                      <div className="space-y-2 text-sm text-green-900">
                        <p>✅ <strong>Excellent preparedness saved lives!</strong></p>
                        <p>• Community drills meant people knew exactly what to do</p>
                        <p>• Well-stocked Go Bags enabled quick, safe evacuation</p>
                        <p>• Pre-identified evacuation centers operated smoothly</p>
                        <p>• Early warning understanding allowed timely action</p>
                        <p>• Result: Minimal casualties and faster recovery</p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm text-orange-900">
                        <p>⚠️ <strong>Limited preparedness led to challenges:</strong></p>
                        <p>• Lack of drills caused confusion during evacuation</p>
                        <p>• Incomplete Go Bags meant families were unprepared</p>
                        <p>• Insufficient planning increased casualties and damage</p>
                        <p>💡 Better preparedness next time will save more lives!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Decisions Tab */}
          <TabsContent value="decisions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Decision Review</CardTitle>
                <CardDescription>What you did right and what could be improved</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Correct Decisions */}
                {correctDecisions.length > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-green-800">
                      <CheckCircle2 className="w-6 h-6" />
                      Correct Decisions (RA 10121 Compliant)
                    </h3>
                    <div className="space-y-2">
                      {correctDecisions.map((decision, index) => {
                        const Icon = decision.icon;
                        return (
                          <div key={index} className="flex items-start gap-3 bg-white p-3 rounded border border-green-200">
                            <Icon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-800">{decision.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Mistakes and Improvements */}
                {mistakes.length > 0 && (
                  <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-300">
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-orange-800">
                      <Lightbulb className="w-6 h-6" />
                      Areas for Improvement
                    </h3>
                    <div className="space-y-3">
                      {mistakes.map((mistake, index) => {
                        const Icon = mistake.icon;
                        return (
                          <div key={index} className="bg-white p-4 rounded border border-orange-200">
                            <div className="flex items-start gap-3 mb-2">
                              <Icon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm font-semibold text-gray-800">{mistake.text}</p>
                            </div>
                            <div className="ml-8 bg-blue-50 p-3 rounded border border-blue-200">
                              <p className="text-xs text-blue-900">
                                <strong>💡 How to improve:</strong> {mistake.improvement}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {mistakes.length === 0 && correctDecisions.length >= 8 && (
                  <div className="bg-gradient-to-r from-yellow-100 to-green-100 p-6 rounded-lg border-2 border-yellow-400 text-center">
                    <Award className="w-16 h-16 text-yellow-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Perfect Execution!</h3>
                    <p className="text-gray-700">
                      You followed all DRRM protocols correctly. Excellent work, Barangay DRRM Officer! 🎖️
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-World Lessons from Philippine Disasters</CardTitle>
                <CardDescription>Learn from actual events to better prepare for the future</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg border-2 border-blue-300">
                  <div className="flex items-start gap-4 mb-4">
                    <BookOpen className="w-8 h-8 text-blue-700 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Real Event: {lessonData.realWorld}
                      </h3>
                      <p className="text-gray-700 mb-3">{lessonData.lesson}</p>
                      <div className="bg-white p-4 rounded border-2 border-blue-300">
                        <p className="font-semibold text-blue-900 mb-2">🎯 Key Takeaway:</p>
                        <p className="text-gray-800">{lessonData.keyTakeaway}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                  <h3 className="font-bold mb-3 text-yellow-900">💡 General DRRM Principles (from Philippine experience)</h3>
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li className="flex gap-2">
                      <span>1.</span>
                      <span><strong>Preparedness saves lives:</strong> Communities that conduct drills and maintain Go Bags have higher survival rates.</span>
                    </li>
                    <li className="flex gap-2">
                      <span>2.</span>
                      <span><strong>Heed early warnings:</strong> PAGASA and PHIVOLCS advisories are based on science - act on them immediately.</span>
                    </li>
                    <li className="flex gap-2">
                      <span>3.</span>
                      <span><strong>Evacuate early:</strong> It's better to evacuate and have nothing happen than to wait too long and lose lives.</span>
                    </li>
                    <li className="flex gap-2">
                      <span>4.</span>
                      <span><strong>Community-based DRRM works:</strong> Strong Barangay DRRM Committees are the first line of defense.</span>
                    </li>
                    <li className="flex gap-2">
                      <span>5.</span>
                      <span><strong>Build Back Better:</strong> Use disasters as opportunities to reduce future risks through better planning and construction.</span>
                    </li>
                  </ul>
                </div>

                <Card className="border-2 border-green-300 bg-green-50">
                  <CardContent className="pt-4">
                    <h3 className="font-bold mb-2 text-green-900">🌟 Remember:</h3>
                    <p className="text-sm text-gray-800">
                      The Philippines faces an average of 20 typhoons per year, plus earthquakes and volcanic activity. 
                      DRRM is not just a program - it's a way of life. Your knowledge and preparedness can save your 
                      family and community. Share what you learned!
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RA 10121 Compliance Tab */}
          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Republic Act 10121 Compliance</CardTitle>
                <CardDescription>How your actions align with Philippine DRRM law</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                  <h3 className="font-bold mb-2 text-blue-900">📜 About RA 10121</h3>
                  <p className="text-sm text-gray-800 mb-2">
                    <strong>Republic Act No. 10121</strong> - "An Act Strengthening the Philippine Disaster Risk 
                    Reduction and Management System" (2010)
                  </p>
                  <p className="text-sm text-gray-700">
                    This law established the NDRRMC, mandated DRRM offices at all government levels, and required 
                    budget allocation for disaster preparedness and response.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold">Your Compliance with RA 10121 Provisions:</h3>
                  
                  <div className={`p-4 rounded-lg border-2 ${preparedness.riskAssessmentDone ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                    <div className="flex items-start gap-3">
                      {preparedness.riskAssessmentDone ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold mb-1">Section 11: Risk Assessment</p>
                        <p className="text-sm text-gray-700">
                          LGUs must conduct hazard and risk assessments to identify vulnerable areas and populations.
                        </p>
                        <p className={`text-sm mt-1 ${preparedness.riskAssessmentDone ? 'text-green-700' : 'text-red-700'}`}>
                          {preparedness.riskAssessmentDone ? '✅ You conducted proper risk assessment' : '❌ You skipped risk assessment'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border-2 ${preparedness.drillsCompleted ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                    <div className="flex items-start gap-3">
                      {preparedness.drillsCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold mb-1">Section 11: Preparedness</p>
                        <p className="text-sm text-gray-700">
                          Conduct disaster drills and simulations to enhance community preparedness.
                        </p>
                        <p className={`text-sm mt-1 ${preparedness.drillsCompleted ? 'text-green-700' : 'text-red-700'}`}>
                          {preparedness.drillsCompleted ? '✅ You conducted community drills' : '❌ You did not conduct drills'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border-2 ${response.evacuationsIssued ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                    <div className="flex items-start gap-3">
                      {response.evacuationsIssued ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold mb-1">Section 12: Response</p>
                        <p className="text-sm text-gray-700">
                          Issue timely warnings and evacuation orders to save lives during disasters.
                        </p>
                        <p className={`text-sm mt-1 ${response.evacuationsIssued ? 'text-green-700' : 'text-red-700'}`}>
                          {response.evacuationsIssued ? '✅ You issued evacuation orders' : '❌ You failed to issue evacuation orders'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border-2 ${response.agenciesCoordinated.length >= 3 ? 'border-green-300 bg-green-50' : 'border-orange-300 bg-orange-50'}`}>
                    <div className="flex items-start gap-3">
                      {response.agenciesCoordinated.length >= 3 ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold mb-1">Section 8: Inter-Agency Coordination</p>
                        <p className="text-sm text-gray-700">
                          DRRM requires coordination among national agencies, LGUs, and civil society.
                        </p>
                        <p className={`text-sm mt-1 ${response.agenciesCoordinated.length >= 3 ? 'text-green-700' : 'text-orange-700'}`}>
                          {response.agenciesCoordinated.length >= 3 
                            ? `✅ Good coordination with ${response.agenciesCoordinated.length} agencies` 
                            : `⚠️ Limited coordination (only ${response.agenciesCoordinated.length} agencies)`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border-2 ${preparedness.budgetAllocated >= 30000 ? 'border-green-300 bg-green-50' : 'border-orange-300 bg-orange-50'}`}>
                    <div className="flex items-start gap-3">
                      {preparedness.budgetAllocated >= 30000 ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold mb-1">Section 21: Local DRRM Fund</p>
                        <p className="text-sm text-gray-700">
                          LGUs must allocate at least 5% of estimated revenue for DRRM (70% for preparedness).
                        </p>
                        <p className={`text-sm mt-1 ${preparedness.budgetAllocated >= 30000 ? 'text-green-700' : 'text-orange-700'}`}>
                          {preparedness.budgetAllocated >= 30000 
                            ? '✅ Adequate budget allocated' 
                            : '⚠️ Insufficient budget allocation'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300">
                  <CardContent className="pt-4">
                    <h3 className="font-bold mb-2 text-purple-900">🏛️ Four Thematic Areas (RA 10121)</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-semibold text-orange-700">1. Prevention & Mitigation</p>
                        <p className="text-gray-600">Reduce disaster risks before they happen</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-semibold text-blue-700">2. Preparedness</p>
                        <p className="text-gray-600">Get ready before disasters strike</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-semibold text-red-700">3. Response</p>
                        <p className="text-gray-600">Take action during emergencies</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-semibold text-green-700">4. Rehabilitation & Recovery</p>
                        <p className="text-gray-600">Rebuild and improve after disasters</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Button size="lg" variant="outline" onClick={onBackToMenu} className="gap-2">
            <Home className="w-5 h-5" />
            Back to Main Menu
          </Button>
          <Button size="lg" onClick={onPlayAgain} className="gap-2">
            <RefreshCw className="w-5 h-5" />
            Play Another Scenario
          </Button>
        </div>

        {/* Educational Footer */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-300">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">🎓 Keep Learning, Keep Preparing!</h3>
              <p className="text-sm text-gray-700 mb-3">
                Every disaster is different, but the principles remain the same: prepare, respond effectively, 
                and build back better. Stay informed, conduct regular drills, and always be ready.
              </p>
              <p className="text-xs text-gray-600">
                For more information: Visit <strong>ndrrmc.gov.ph</strong> | Follow <strong>@NDRRMC_OpCen</strong> on social media
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
