import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { 
  BookOpen, Shield, AlertTriangle, Users, Heart, 
  ArrowRight, ArrowLeft, CheckCircle, Home
} from 'lucide-react';

interface TutorialProps {
  onComplete: () => void;
  onExit: () => void;
}

const tutorialSteps = [
  {
    title: "Welcome to DRRM SIM PH",
    icon: Shield,
    color: "text-blue-600",
    content: (
      <div className="space-y-4">
        <p>Welcome, future Barangay DRRM Officer! 🎖️</p>
        <p>
          In this game, you'll learn how Filipino communities prepare for, respond to, 
          and recover from disasters using real Philippine DRRM frameworks.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="font-semibold mb-2">What is DRRM?</p>
          <p className="text-sm">
            <strong>Disaster Risk Reduction and Management (DRRM)</strong> is a comprehensive approach 
            to reducing disaster risks and managing their impacts. In the Philippines, this is guided 
            by Republic Act 10121.
          </p>
        </div>
        <p className="text-sm text-gray-600">
          Click "Next" to learn about the Four Thematic Areas of DRRM →
        </p>
      </div>
    )
  },
  {
    title: "Four Thematic Areas of DRRM",
    icon: BookOpen,
    color: "text-green-600",
    content: (
      <div className="space-y-4">
        <p className="font-semibold">According to RA 10121, DRRM has four key areas:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-orange-50 p-3 rounded-lg border-2 border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold">1. Prevention & Mitigation</h3>
            </div>
            <p className="text-sm">
              Reducing disaster risks before they happen. Building safer structures, 
              conducting hazard mapping, and implementing early warning systems.
            </p>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold">2. Preparedness</h3>
            </div>
            <p className="text-sm">
              Getting ready before disaster strikes. Conducting drills, preparing go bags, 
              identifying evacuation centers, and training DRRM committees.
            </p>
          </div>

          <div className="bg-red-50 p-3 rounded-lg border-2 border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-red-600" />
              <h3 className="font-bold">3. Response</h3>
            </div>
            <p className="text-sm">
              Actions during the disaster. Evacuating residents, rescue operations, 
              managing evacuation centers, and coordinating with emergency services.
            </p>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-green-600" />
              <h3 className="font-bold">4. Rehabilitation & Recovery</h3>
            </div>
            <p className="text-sm">
              Rebuilding after disaster. Restoring services, distributing relief, 
              providing medical care, and implementing "Build Back Better."
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-300">
          <p className="text-sm">
            <strong>💡 In the game:</strong> You'll experience all four areas as you manage a disaster 
            from start to finish!
          </p>
        </div>
      </div>
    )
  },
  {
    title: "Philippine Government Agencies",
    icon: Users,
    color: "text-purple-600",
    content: (
      <div className="space-y-4">
        <p>You'll work with these real Philippine government agencies:</p>

        <div className="space-y-2">
          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-blue-700">🌦️ PAGASA</h3>
            <p className="text-sm">
              <strong>Philippine Atmospheric, Geophysical and Astronomical Services Administration</strong>
              <br />
              Provides typhoon signals, rainfall warnings, and weather forecasts.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-orange-700">🌋 PHIVOLCS</h3>
            <p className="text-sm">
              <strong>Philippine Institute of Volcanology and Seismology</strong>
              <br />
              Monitors earthquakes, volcanic activity, and issues hazard alerts.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-red-700">🏛️ NDRRMC</h3>
            <p className="text-sm">
              <strong>National Disaster Risk Reduction and Management Council</strong>
              <br />
              National-level coordination of disaster response and policies.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-green-700">🏥 DOH, DSWD, BFP, PNP, AFP</h3>
            <p className="text-sm">
              Health services, social welfare, fire protection, police, and armed forces - 
              all working together during disasters.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "How the Game Works",
    icon: Heart,
    color: "text-pink-600",
    content: (
      <div className="space-y-4">
        <p className="font-semibold">Your journey through a disaster has 3 phases:</p>

        <div className="space-y-3">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
            <h3 className="font-bold mb-2">📋 PHASE 1: BEFORE THE DISASTER</h3>
            <p className="text-sm mb-2">Preparedness & Prevention Phase</p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Read PAGASA/PHIVOLCS advisories and alerts</li>
              <li>Conduct barangay risk assessment</li>
              <li>Prepare Go Bags (drag-and-drop emergency items)</li>
              <li>Identify evacuation centers</li>
              <li>Allocate DRRM budget</li>
              <li>Conduct drills and training</li>
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
            <h3 className="font-bold mb-2">🚨 PHASE 2: DURING THE DISASTER</h3>
            <p className="text-sm mb-2">Response Phase</p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Make time-sensitive decisions under pressure</li>
              <li>Issue evacuation orders</li>
              <li>Coordinate with BFP, PNP, AFP, and barangay tanods</li>
              <li>Manage evacuation centers</li>
              <li>Respond to emergencies (injuries, fires, trapped residents)</li>
              <li>Handle random events and complications</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
            <h3 className="font-bold mb-2">🏗️ PHASE 3: AFTER THE DISASTER</h3>
            <p className="text-sm mb-2">Rehabilitation & Recovery Phase</p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Conduct Rapid Damage Assessment and Needs Analysis (RDANA)</li>
              <li>Restore electricity, water, and communications</li>
              <li>Coordinate relief distribution with DSWD</li>
              <li>Provide medical and psychosocial support</li>
              <li>Implement "Build Back Better" strategies</li>
              <li>Update barangay DRRM plans</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-300">
          <p className="text-sm">
            <strong>📊 Scoring:</strong> Your preparedness affects casualties, damage, and recovery speed. 
            Good preparation saves lives! 💚
          </p>
        </div>
      </div>
    )
  },
  {
    title: "Game Controls & Features",
    icon: CheckCircle,
    color: "text-teal-600",
    content: (
      <div className="space-y-4">
        <p className="font-semibold">Here's what you can do in the game:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold mb-2">🖱️ Click & Select</h3>
            <p className="text-sm">Make decisions by clicking buttons and options</p>
          </div>

          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold mb-2">🎒 Drag & Drop</h3>
            <p className="text-sm">Build Go Bags by dragging emergency items</p>
          </div>

          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold mb-2">❓ Help Button</h3>
            <p className="text-sm">Always available - explains DRRM terms and concepts</p>
          </div>

          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold mb-2">💾 Auto-Save</h3>
            <p className="text-sm">Your progress is automatically saved</p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold mb-2">📚 Educational Feedback</h3>
          <p className="text-sm mb-2">
            After each scenario, you'll receive detailed feedback:
          </p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>What decisions followed RA 10121 protocols ✅</li>
            <li>What mistakes violated DRRM standards ❌</li>
            <li>Real-world lessons from Philippine disasters</li>
            <li>Tips for improvement</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm">
            <strong>🎯 Remember:</strong> This game teaches real DRRM practices. Every decision 
            matters - just like in real life! Your goal is to protect your community and save lives. 💪
          </p>
        </div>

        <p className="text-center font-semibold text-lg mt-6">
          Ready to become a DRRM hero? Let's start! 🦸‍♂️
        </p>
      </div>
    )
  }
];

export function Tutorial({ onComplete, onExit }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  const CurrentIcon = tutorialSteps[currentStep].icon;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Tutorial Progress
            </span>
            <span className="text-sm font-semibold text-gray-600">
              {currentStep + 1} / {tutorialSteps.length}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Tutorial Card */}
        <Card className="border-2 shadow-2xl">
          <CardHeader className="border-b-2 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center gap-3">
              <CurrentIcon className={`w-10 h-10 ${tutorialSteps[currentStep].color}`} />
              <CardTitle className="text-2xl">{tutorialSteps[currentStep].title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 min-h-[400px]">
            {tutorialSteps[currentStep].content}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <Button 
            variant="outline" 
            onClick={onExit}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Exit Tutorial
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              className="gap-2"
            >
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Start Playing!
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {tutorialSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentStep
                  ? 'bg-blue-600 w-8'
                  : index < currentStep
                  ? 'bg-green-400'
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
