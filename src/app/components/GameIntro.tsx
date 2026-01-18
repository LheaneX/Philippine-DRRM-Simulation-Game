import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Shield, BookOpen, Play, Settings, History, Volume2, VolumeX, Trash2, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { soundManager } from '@/app/utils/sound';

export interface GameHistoryItem {
  date: string;
  disaster: string;
  difficulty: string;
  score: number;
}

interface GameIntroProps {
  onStartGame: (disaster: string, difficulty: 'easy' | 'medium' | 'hard') => void;
  onStartTutorial: () => void;
  history?: GameHistoryItem[];
  onClearHistory?: () => void;
}

const disasters = [
  {
    id: 'typhoon',
    name: 'Typhoon (Bagyo)',
    descriptions: {
      easy: 'Learn safety protocols during a mild tropical storm.',
      medium: 'Manage a Super Typhoon with storm surges threatening coastal barangays.',
      hard: 'Lead your barangay through a catastrophic Category 5 Super Typhoon!'
    },
    icon: '🌀',
    color: 'bg-blue-100 border-blue-300'
  },
  {
    id: 'earthquake',
    name: 'Earthquake',
    descriptions: {
      easy: 'Practice evacuation drills for a minor earthquake.',
      medium: 'Respond to a magnitude 7.2 earthquake in Metro Manila.',
      hard: "Manage a devastating magnitude 8.0 'Big One' earthquake scenario."
    },
    icon: '🏚️',
    color: 'bg-amber-100 border-amber-300'
  },
  {
    id: 'flood',
    name: 'Flooding',
    descriptions: {
      easy: 'Handle minor street flooding with plenty of time to prepare.',
      medium: 'Handle urban flooding during monsoon season.',
      hard: 'Respond to rapid flash floods and dam release warnings!'
    },
    icon: '🌊',
    color: 'bg-cyan-100 border-cyan-300'
  },
  {
    id: 'volcano',
    name: 'Volcanic Eruption',
    descriptions: {
      easy: 'Monitor a volcano showing early signs of unrest.',
      medium: 'Evacuate communities near an erupting volcano.',
      hard: 'Coordinate emergency response during a violent explosive eruption!'
    },
    icon: '🌋',
    color: 'bg-orange-100 border-orange-300'
  },
  {
    id: 'landslide',
    name: 'Landslide',
    descriptions: {
      easy: 'Identify landslide risks in a safe training simulation.',
      medium: 'Respond to landslides in mountainous communities.',
      hard: 'Rescue operation in a massive landslide event with unstable ground.'
    },
    icon: '⛰️',
    color: 'bg-stone-100 border-stone-300'
  },
  {
    id: 'fire',
    name: 'Fire',
    descriptions: {
      easy: 'Learn fire safety and prevention in a controlled setting.',
      medium: 'Manage a fire emergency in a dense urban community.',
      hard: 'Battle a rapidly spreading inferno fueled by strong winds!'
    },
    icon: '🔥',
    color: 'bg-red-100 border-red-300'
  }
];

export function GameIntro({ onStartGame, onStartTutorial, history = [], onClearHistory }: GameIntroProps) {
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    soundManager.setMuted(newState);
    if (!newState) soundManager.play('click');
  };

  const handleStart = (id: string) => {
    soundManager.play('start');
    onStartGame(id, difficulty);
  };

  return (
    <div className="min-h-screen bg-[#AEE2FF] p-6 relative font-['Fredoka'] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* Settings Button */}
      <div className="absolute top-4 right-4 z-10 flex gap-3">
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 border-4 border-black bg-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none hover:bg-yellow-200 transition-all"
          onClick={() => { soundManager.play('click'); setShowSettings(true); }}
        >
          <Settings className="w-6 h-6 text-black" />
        </Button>
      </div>

      <div className="max-w-6xl mx-auto pt-8 relative z-0">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center justify-center gap-4 mb-6 bg-white border-4 border-black p-4 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce-slow">
            <Shield className="w-16 h-16 text-blue-500 fill-current" />
            <h1 className="text-6xl font-black text-black tracking-tight" style={{ textShadow: '2px 2px 0px #fff' }}>
              DRRR SIM PH
            </h1>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-2xl font-bold text-slate-800">
              Philippine Disaster Readiness & Risk Reduction Simulation
            </p>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="max-w-2xl mx-auto mb-12 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000]">
          <h3 className="text-center font-black text-2xl mb-6 text-black uppercase tracking-wider">Select Difficulty</h3>
          <div className="flex flex-col md:flex-row gap-4">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <Button
                key={level}
                className={`flex-1 h-16 text-lg font-bold border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all capitalize
                  ${difficulty === level
                    ? level === 'easy' ? 'bg-[#86EFAC] text-black ring-4 ring-green-400 ring-offset-2'
                      : level === 'medium' ? 'bg-[#FDE047] text-black ring-4 ring-yellow-400 ring-offset-2'
                        : 'bg-[#FCA5A5] text-black ring-4 ring-red-400 ring-offset-2'
                    : 'bg-white text-black hover:bg-gray-100'
                  }`}
                onClick={() => { soundManager.play('click'); setDifficulty(level); }}
              >
                {level}
                {level === 'easy' && ' 😊'}
                {level === 'medium' && ' 😐'}
                {level === 'hard' && ' 😱'}
              </Button>
            ))}
          </div>
          <p className="text-center font-bold text-slate-600 mt-4 bg-slate-100 p-2 rounded-lg border-2 border-slate-200">
            {difficulty === 'easy' && 'More time • Less panic • Simpler events'}
            {difficulty === 'medium' && 'Standard gameplay experience'}
            {difficulty === 'hard' && 'Less time • High panic • Critical events!'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-12 px-4 md:px-0">
          <Button
            size="lg"
            onClick={onStartTutorial}
            className="w-full md:w-auto h-14 px-8 text-xl font-bold bg-[#C4B5FD] text-black border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_#000] hover:translate-y-1 hover:shadow-none hover:bg-[#A78BFA] transition-all gap-3"
          >
            <BookOpen className="w-6 h-6" />
            Play Tutorial
          </Button>
          <Button
            size="lg"
            onClick={() => setShowAbout(true)}
            className="w-full md:w-auto h-14 px-8 text-xl font-bold bg-[#FDA4AF] text-black border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_#000] hover:translate-y-1 hover:shadow-none hover:bg-[#FB7185] transition-all"
          >
            About This Game
          </Button>
        </div>

        {/* Disaster Selection */}
        <div className="mb-8">
          <div className="inline-block bg-[#FDBA74] border-4 border-black px-6 py-2 rounded-full shadow-[4px_4px_0px_0px_#000] mb-6 left-1/2 relative -translate-x-1/2">
            <h2 className="text-2xl font-black text-black">CHOOSE YOUR MISSION</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {disasters.map((disaster) => (
            <Card
              key={disaster.id}
              className={`border-4 border-black rounded-3xl overflow-hidden hover:scale-105 transition-all cursor-pointer group relative
                ${disaster.color.replace('bg-', 'bg-').replace('border-', '')} bg-white`}
              style={{ boxShadow: '8px 8px 0px 0px #000' }}
              onClick={() => handleStart(disaster.id)}
            >
              <div className={`h-32 flex items-center justify-center border-b-4 border-black ${disaster.color.split(' ')[0]}`}>
                <span className="text-7xl group-hover:animate-bounce filter drop-shadow-lg transform transition-transform group-hover:rotate-12">{disaster.icon}</span>
              </div>
              <CardHeader className="bg-white">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-black border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase
                    ${difficulty === 'hard' ? 'bg-red-300' : difficulty === 'medium' ? 'bg-yellow-300' : 'bg-green-300'}`}>
                    {difficulty}
                  </span>
                </div>
                <CardTitle className="font-black text-2xl">{disaster.name}</CardTitle>
                <CardDescription className="text-slate-800 font-medium">
                  {disaster.descriptions[difficulty]}
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-white pt-0">
                <Button className="w-full font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-y-1 transition-all bg-black text-white hover:bg-slate-800 rounded-xl">
                  <Play className="w-4 h-4 mr-2" />
                  START MISSION
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm font-bold text-slate-600 bg-white/80 backdrop-blur border-2 border-black/10 rounded-xl p-4 max-w-3xl mx-auto">
          <p>
            <strong>LEARN:</strong> Prevention • Preparedness • Response • Recovery
          </p>
        </div>
      </div>

      {/* About Dialog */}
      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">About DRRR SIM PH</DialogTitle>
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

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Settings & History</DialogTitle>
            <DialogDescription>Manage game settings and view your records.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="settings">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-4 py-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {isMuted ? <VolumeX className="w-5 h-5 text-gray-500" /> : <Volume2 className="w-5 h-5 text-blue-600" />}
                  <div>
                    <h4 className="font-semibold">Sound Effects</h4>
                    <p className="text-sm text-gray-500">Enable or disable game sounds</p>
                  </div>
                </div>
                <Button variant={isMuted ? "outline" : "default"} onClick={toggleMute}>
                  {isMuted ? "Unmute" : "Mute"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history" className="max-h-[60vh] overflow-y-auto space-y-4">
              {history.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No games played yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((record, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded border text-sm">
                      <div>
                        <p className="font-bold capitalize">{record.disaster}</p>
                        <p className="text-xs text-gray-500">{new Date(record.date).toLocaleDateString()} • {record.difficulty}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-blue-600 text-lg">{record.score}</span>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {history.length > 0 && onClearHistory && (
                <Button variant="destructive" className="w-full mt-4 gap-2" onClick={() => { soundManager.play('click'); onClearHistory(); }}>
                  <Trash2 className="w-4 h-4" />
                  Clear History
                </Button>
              )}
            </TabsContent>

            <TabsContent value="about" className="space-y-4 py-4">
              <div className="space-y-4">
                {/* App Information */}
                <div className="p-4 border-4 border-black rounded-xl bg-blue-50 shadow-[4px_4px_0px_0px_#000]">
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="w-6 h-6 text-blue-600" />
                    <h4 className="font-black text-lg uppercase">App Information</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-bold text-gray-700">Name:</p>
                      <p className="text-gray-900">Philippine DRRM Simulation Game</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700">Version:</p>
                      <p className="text-gray-900">1.0.0</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700">Purpose:</p>
                      <p className="text-gray-900">Educational simulation for Disaster Risk Reduction and Management</p>
                    </div>
                  </div>
                </div>

                {/* Developer Information */}
                <div className="p-4 border-4 border-black rounded-xl bg-green-50 shadow-[4px_4px_0px_0px_#000]">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h4 className="font-black text-lg uppercase">Developer</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-bold text-gray-700">Developed by:</p>
                      <p className="text-gray-900 font-semibold text-base">John Denver D. Macaraig</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700">Framework:</p>
                      <p className="text-gray-900">React + Vite + TypeScript</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700">Design:</p>
                      <p className="text-gray-900">Neo-Brutalist UI</p>
                    </div>
                  </div>
                </div>

                {/* Credits */}
                <div className="p-4 border-4 border-black rounded-xl bg-yellow-50 shadow-[4px_4px_0px_0px_#000]">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-6 h-6 text-yellow-600" />
                    <h4 className="font-black text-lg uppercase">Credits</h4>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>Based on Philippine DRRM guidelines and protocols from:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>NDRRMC (National Disaster Risk Reduction and Management Council)</li>
                      <li>OCD (Office of Civil Defense)</li>
                      <li>PAGASA, PHIVOLCS, DSWD, DOH</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
