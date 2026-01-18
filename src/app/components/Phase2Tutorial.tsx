import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import {
    Siren, Clock, Activity, Users, Radio, ArrowRight, ArrowLeft, CheckCircle
} from 'lucide-react';

interface Phase2TutorialProps {
    onComplete: () => void;
}

const steps = [
    {
        title: "Phase 2: Response",
        icon: Siren,
        color: "text-red-600",
        content: (
            <div className="space-y-4">
                <p className="text-lg">
                    The disaster is here! 🚨 Your goal is to <strong>save lives</strong> and <strong>manage the emergency</strong>.
                </p>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h3 className="font-bold flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-red-600" />
                        Time is Ticking!
                    </h3>
                    <p>
                        You have limited time to make decisions. Watch the timer at the top right!
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "Managing Panic",
        icon: Users,
        color: "text-orange-600",
        content: (
            <div className="space-y-4">
                <p>
                    Keep the community calm. High panic leads to chaos!
                </p>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h3 className="font-bold mb-2">How to lower panic:</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Make correct decisions</li>
                        <li>Coordinate with agencies</li>
                        <li>Issue evacuation orders early</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        title: "Agency Coordination",
        icon: Radio,
        color: "text-blue-600",
        content: (
            <div className="space-y-4">
                <p>
                    You are not alone! Call for help from government agencies.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white p-2 border rounded">🔥 <strong>BFP</strong> (Fire)</div>
                    <div className="bg-white p-2 border rounded">👮 <strong>PNP</strong> (Police)</div>
                    <div className="bg-white p-2 border rounded">🎖️ <strong>AFP</strong> (Army)</div>
                    <div className="bg-white p-2 border rounded">🏥 <strong>DOH</strong> (Health)</div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    Click the agency buttons on the left to activate them.
                </p>
            </div>
        )
    },
    {
        title: "Making Decisions",
        icon: Activity,
        color: "text-green-600",
        content: (
            <div className="space-y-4">
                <p>
                    You will face critical situations. Choose the best action!
                </p>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="font-semibold text-center mb-2">Think like a Safety Hero:</p>
                    <div className="flex gap-2 justify-center">
                        <div className="bg-white p-2 rounded border shadow-sm">Safety First</div>
                        <div className="bg-white p-2 rounded border shadow-sm">Save Lives</div>
                        <div className="bg-white p-2 rounded border shadow-sm">Follow Law</div>
                    </div>
                </div>
            </div>
        )
    }
];

export function Phase2Tutorial({ onComplete }: Phase2TutorialProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
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

    const CurrentIcon = steps[currentStep].icon;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-xl w-full border-4 border-blue-500 shadow-2xl animate-in zoom-in-95 duration-300">
                <CardHeader className="bg-gray-50 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CurrentIcon className={`w-8 h-8 ${steps[currentStep].color}`} />
                            <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
                        </div>
                        <div className="text-sm text-gray-500 font-bold">
                            {currentStep + 1} / {steps.length}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="min-h-[200px]">
                        {steps[currentStep].content}
                    </div>

                    <div className="flex justify-between items-center mt-8 pt-4 border-t">
                        <Button variant="ghost" onClick={onComplete} className="text-gray-500 hover:text-gray-700">
                            Skip Tutorial
                        </Button>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                                disabled={currentStep === 0}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                                {currentStep === steps.length - 1 ? (
                                    <>
                                        I'm Ready! <CheckCircle className="w-4 h-4 ml-2" />
                                    </>
                                ) : (
                                    <>
                                        Next <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
