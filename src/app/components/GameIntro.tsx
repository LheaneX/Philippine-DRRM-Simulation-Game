import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Shield, AlertTriangle, Users, Heart, BookOpen, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';

interface GameIntroProps {
  onStartGame: (disaster: string) => void;
  onStartTutorial: () => void;
}

const disasters = [
  {
    id: 'typhoon',
    name: 'Typhoon (Bagyo)',
    description: 'Manage a Super Typhoon with storm surges threatening coastal barangays',
    icon: '🌀',
    difficulty: 'Hard',
    color: 'bg-blue-100 border-blue-300'
  },
  {
    id: 'earthquake',
    name: 'Earthquake',
    description: 'Respond to a magnitude 7.2 earthquake in Metro Manila',
    icon: '🏚️',
    difficulty: 'Hard',
    color: 'bg-amber-100 border-amber-300'
  },
  {
    id: 'flood',
    name: 'Flooding',
    description: 'Handle urban flooding during monsoon season',
    icon: '🌊',
    difficulty: 'Medium',
    color: 'bg-cyan-100 border-cyan-300'
  },
  {
    id: 'volcano',
    name: 'Volcanic Eruption',
    description: 'Evacuate communities near an erupting volcano',
    icon: '🌋',
    difficulty: 'Hard',
    color: 'bg-orange-100 border-orange-300'
  },
  {
    id: 'landslide',
    name: 'Landslide',
    description: 'Respond to landslides in mountainous communities',
    icon: '⛰️',
    difficulty: 'Medium',
    color: 'bg-stone-100 border-stone-300'
  },
  {
    id: 'fire',
    name: 'Fire',
    description: 'Manage a fire emergency in a dense urban community',
    icon: '🔥',
    difficulty: 'Easy',
    color: 'bg-red-100 border-red-300'
  }
];

export function GameIntro({ onStartGame, onStartTutorial }: GameIntroProps) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-16 h-16 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              DRRM SIM PH
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Philippine Disaster Risk Reduction & Management Simulation Game
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Based on Republic Act 10121 & NDRRMC Framework
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2">
            <CardContent className="pt-6 text-center">
              <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Prevention</h3>
              <p className="text-xs text-gray-600">Prepare communities</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Response</h3>
              <p className="text-xs text-gray-600">Save lives during crisis</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6 text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Recovery</h3>
              <p className="text-xs text-gray-600">Rebuild communities</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Learn</h3>
              <p className="text-xs text-gray-600">Real DRRM practices</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4 mb-8">
          <Button size="lg" onClick={onStartTutorial} variant="outline" className="gap-2">
            <BookOpen className="w-5 h-5" />
            Play Tutorial
          </Button>
          <Button size="lg" onClick={() => setShowAbout(true)} variant="outline">
            About This Game
          </Button>
        </div>

        {/* Disaster Selection */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Choose Your Disaster Scenario
          </h2>
          <p className="text-center text-gray-600 mb-6">
            As a Barangay DRRM Officer, you'll lead your community through three phases of disaster management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {disasters.map((disaster) => (
            <Card 
              key={disaster.id} 
              className={`border-2 ${disaster.color} hover:shadow-xl transition-all cursor-pointer transform hover:scale-105`}
              onClick={() => onStartGame(disaster.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-5xl">{disaster.icon}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    disaster.difficulty === 'Hard' ? 'bg-red-200 text-red-800' :
                    disaster.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {disaster.difficulty}
                  </span>
                </div>
                <CardTitle>{disaster.name}</CardTitle>
                <CardDescription className="text-gray-700">
                  {disaster.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2" variant="default">
                  <Play className="w-4 h-4" />
                  Start Scenario
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-600 bg-white/50 rounded-lg p-4">
          <p className="mb-2">
            <strong>Learning Outcomes:</strong> Master the 4 Thematic Areas of DRRM • Understand Philippine Alert Systems • 
            Practice Community-Based Disaster Management
          </p>
          <p className="text-xs">
            This educational game aligns with RA 10121, NDRRMC Framework, and integrates PAGASA, PHIVOLCS, DOH, DSWD, AFP, PNP, and BFP protocols
          </p>
        </div>
      </div>

      {/* About Dialog */}
      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">About DRRM SIM PH</DialogTitle>
            <DialogDescription>
              An Interactive Educational Simulation Game
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold text-base mb-2">🎯 Game Objective</h3>
              <p className="text-gray-700">
                Learn how Filipino communities prepare for, respond to, and recover from disasters using 
                authentic Philippine DRRM frameworks and real-world scenarios.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">🇵🇭 Based on Philippine Laws</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Republic Act 10121 (Philippine DRRM Act of 2010)</li>
                <li>NDRRMC (National Disaster Risk Reduction & Management Council) Framework</li>
                <li>Four Thematic Areas: Prevention, Preparedness, Response, Recovery</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">🏛️ Government Agencies Featured</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>PAGASA</strong> - Weather advisories and typhoon signals</li>
                <li><strong>PHIVOLCS</strong> - Earthquake and volcano monitoring</li>
                <li><strong>NDRRMC</strong> - National coordination</li>
                <li><strong>LGUs</strong> - Municipal/City DRRMO</li>
                <li><strong>DOH</strong> - Medical response</li>
                <li><strong>DSWD</strong> - Relief distribution</li>
                <li><strong>BFP, PNP, AFP</strong> - Emergency response</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">🎮 How to Play</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Choose a disaster scenario</li>
                <li><strong>BEFORE:</strong> Prepare your barangay (assessments, drills, go bags)</li>
                <li><strong>DURING:</strong> Respond to the emergency (evacuations, rescue, coordination)</li>
                <li><strong>AFTER:</strong> Lead recovery efforts (RDANA, relief, rehabilitation)</li>
                <li>Review your performance and learn from mistakes</li>
              </ol>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">📚 Educational Value</h3>
              <p className="text-gray-700">
                This game teaches authentic DRRM practices aligned with Philippine standards. 
                Each decision is evaluated against RA 10121 compliance, and you'll receive 
                educational feedback explaining real-world disaster management protocols.
              </p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-900">
                <strong>Note:</strong> This is an educational simulation. Real disasters require trained 
                professionals and coordinated government response. Always follow official advisories from 
                PAGASA, PHIVOLCS, and your local DRRM office.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
