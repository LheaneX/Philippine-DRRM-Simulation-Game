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
        <p>Welcome, Junior Safety Hero! 🎖️</p>
        <p>
          In this game, you will learn how to be a hero for your community by preparing for disasters
          and helping people stay safe!
        </p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="font-semibold mb-2">What is DRRM?</p>
          <p className="text-sm">
            It stands for **Disaster Risk Reduction and Management**. It simply means:
            **"Being ready so we don't get hurt!"**
          </p>
        </div>
        <p className="text-sm text-gray-600">
          Click "Next" to learn the 4 steps to safety →
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
        <p className="font-semibold">There are 4 main steps to being safe:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-orange-50 p-3 rounded-lg border-2 border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold">1. Prevention (Stopping it)</h3>
            </div>
            <p className="text-sm">
              Making sure bad things don't happen. Like fixing weak houses or checking for landslides.
            </p>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold">2. Preparedness (Getting Ready)</h3>
            </div>
            <p className="text-sm">
              Getting ready before danger comes. Packing bags, doing drills, and knowing where to go.
            </p>
          </div>

          <div className="bg-red-50 p-3 rounded-lg border-2 border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-red-600" />
              <h3 className="font-bold">3. Response (Taking Action)</h3>
            </div>
            <p className="text-sm">
              Helping people when the disaster happens. Rescuing people and giving them food.
            </p>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-green-600" />
              <h3 className="font-bold">4. Recovery (Fixing it)</h3>
            </div>
            <p className="text-sm">
              Fixing homes and helping people get back to normal life after the disaster.
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
            <h3 className="font-bold text-blue-700">🌦️ PAGASA (Weather)</h3>
            <p className="text-sm">
              Tells us if a typhoon or heavy rain is coming.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-orange-700">🌋 PHIVOLCS (Volcanoes & Quakes)</h3>
            <p className="text-sm">
              Watches volcanoes and earthquakes to warn us of danger.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-red-700">🏛️ NDRRMC (Safety Bosses)</h3>
            <p className="text-sm">
              The big group that leads everyone in keeping the country safe.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-green-700">🏥 Helpers (Police, Fire, Doctors)</h3>
            <p className="text-sm">
              Police, Firefighters, Soldiers, and Doctors who come to save the day!
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
            <h3 className="font-bold mb-2">📋 PHASE 1: BEFORE (Getting Ready)</h3>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Check weather news</li>
              <li>Check your village for dangers</li>
              <li>Pack your Go Bags</li>
              <li>Practice drills</li>
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
            <h3 className="font-bold mb-2">🚨 PHASE 2: DURING (Taking Action)</h3>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Decide quickly to save people</li>
              <li>Tell people to evacuate</li>
              <li>Ask for help from Firefighters and Police</li>
              <li>Keep everyone safe in the evacuation center</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
            <h3 className="font-bold mb-2">🏗️ PHASE 3: AFTER (Recovery)</h3>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Check what is broken</li>
              <li>Distribute food and water</li>
              <li>Help sick people</li>
              <li>Fix electricity and water</li>
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
            <li>What decisions followed safety laws ✅</li>
            <li>What mistakes to avoid ❌</li>
            <li>Real-world lessons from Philippine disasters</li>
            <li>Tips for improvement</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm">
            <strong>🎯 Remember:</strong> This game teaches real safety rules. Every decision
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
              className={`w-3 h-3 rounded-full transition-all ${index === currentStep
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
