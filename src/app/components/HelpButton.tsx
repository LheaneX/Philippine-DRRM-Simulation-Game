import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent } from '@/app/components/ui/card';
import { HelpCircle, BookOpen, Shield, AlertTriangle, Users } from 'lucide-react';

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-2xl z-50 hover:scale-110 transition-transform"
        title="Help & DRRM Terms"
      >
        <HelpCircle className="w-8 h-8" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <HelpCircle className="w-6 h-6" />
              Help & DRRM Reference Guide
            </DialogTitle>
            <DialogDescription>
              Quick reference for disaster management terms and concepts
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="terms" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="terms">DRRM Terms</TabsTrigger>
              <TabsTrigger value="agencies">Agencies</TabsTrigger>
              <TabsTrigger value="alerts">Alert Levels</TabsTrigger>
              <TabsTrigger value="tips">Quick Tips</TabsTrigger>
            </TabsList>

            {/* DRRM Terms */}
            <TabsContent value="terms" className="space-y-3 mt-4">
              <Card>
                <CardContent className="pt-4 space-y-3 text-sm">
                  <div>
                    <h3 className="font-bold text-blue-700">DRRM</h3>
                    <p className="text-gray-700">
                      <strong>Disaster Risk Reduction and Management</strong> - A comprehensive approach to 
                      reducing disaster risks and managing their impacts through prevention, preparedness, 
                      response, and recovery.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-700">RA 10121</h3>
                    <p className="text-gray-700">
                      <strong>Republic Act No. 10121</strong> - The Philippine Disaster Risk Reduction and 
                      Management Act of 2010. This law established the NDRRMC and mandated DRRM councils 
                      at all government levels.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-700">BDRRMC</h3>
                    <p className="text-gray-700">
                      <strong>Barangay Disaster Risk Reduction and Management Committee</strong> - The 
                      frontline disaster response team at the barangay level, composed of officials and 
                      community volunteers.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-700">Go Bag (Grab Bag)</h3>
                    <p className="text-gray-700">
                      Emergency kit containing essential supplies for at least 72 hours: water, food, 
                      first aid, important documents, flashlight, radio, medicines, and hygiene items.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-700">Evacuation Center</h3>
                    <p className="text-gray-700">
                      Pre-identified safe location (school, barangay hall, gym) where residents go during 
                      disasters. Must have basic facilities: water, toilets, sleeping area, and cooking area.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-700">RDANA</h3>
                    <p className="text-gray-700">
                      <strong>Rapid Damage Assessment and Needs Analysis</strong> - Quick assessment 
                      conducted within 24 hours after a disaster to determine damage, casualties, and 
                      immediate needs for relief operations.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-700">Build Back Better (BBB)</h3>
                    <p className="text-gray-700">
                      Recovery principle that emphasizes not just rebuilding what was destroyed, but 
                      making communities more resilient through better planning, stronger structures, 
                      and risk reduction measures.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-700">Storm Surge (Daluyong ng Dagat)</h3>
                    <p className="text-gray-700">
                      Abnormal rise in sea level during typhoons, causing coastal flooding. Can reach 
                      2-3 meters or higher, extremely dangerous and life-threatening.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-700">Hazard Map</h3>
                    <p className="text-gray-700">
                      Map showing areas prone to specific hazards (flooding, landslides, fault lines, 
                      volcanic danger zones). Used for planning evacuation routes and safe zones.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Agencies */}
            <TabsContent value="agencies" className="space-y-3 mt-4">
              <Card>
                <CardContent className="pt-4 space-y-3 text-sm">
                  <div>
                    <h3 className="font-bold text-blue-700">🌦️ PAGASA</h3>
                    <p className="text-gray-700">
                      <strong>Philippine Atmospheric, Geophysical and Astronomical Services Administration</strong>
                      <br />
                      Issues weather forecasts, typhoon warnings, rainfall advisories, and tropical cyclone 
                      warning signals. Monitor their bulletins during typhoons and heavy rains.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-orange-700">🌋 PHIVOLCS</h3>
                    <p className="text-gray-700">
                      <strong>Philippine Institute of Volcanology and Seismology</strong>
                      <br />
                      Monitors earthquakes, volcanoes, and tsunamis. Issues earthquake bulletins, volcano 
                      alert levels, and tsunami advisories. Maintains seismic networks across the country.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-red-700">🏛️ NDRRMC</h3>
                    <p className="text-gray-700">
                      <strong>National Disaster Risk Reduction and Management Council</strong>
                      <br />
                      Main policymaking and coordinating body for disaster management. Leads national 
                      response during major disasters, coordinates all agencies and LGUs.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-purple-700">🏥 DOH</h3>
                    <p className="text-gray-700">
                      <strong>Department of Health</strong>
                      <br />
                      Provides medical response, deploys health emergency teams, supplies medicines, 
                      monitors disease outbreaks, and provides psychosocial support after disasters.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-green-700">👥 DSWD</h3>
                    <p className="text-gray-700">
                      <strong>Department of Social Welfare and Development</strong>
                      <br />
                      Coordinates relief operations, distributes food packs and assistance, manages 
                      family food packs, provides social services to affected families.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-red-700">🔥 BFP</h3>
                    <p className="text-gray-700">
                      <strong>Bureau of Fire Protection</strong>
                      <br />
                      Responds to fires, conducts search and rescue operations, assists in evacuations 
                      during floods and other disasters. Call 911 or local fire station.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-700">👮 PNP</h3>
                    <p className="text-gray-700">
                      <strong>Philippine National Police</strong>
                      <br />
                      Maintains peace and order during disasters, assists in evacuations, manages traffic, 
                      prevents looting, and supports rescue operations.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-green-700">🎖️ AFP</h3>
                    <p className="text-gray-700">
                      <strong>Armed Forces of the Philippines</strong>
                      <br />
                      Provides heavy equipment, helicopters, boats for large-scale rescue and relief 
                      operations. Assists in evacuations and clearing operations.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-700">🏘️ LGU / DRRMO</h3>
                    <p className="text-gray-700">
                      <strong>Local Government Unit / Disaster Risk Reduction and Management Office</strong>
                      <br />
                      Municipal/City DRRMO coordinates local disaster response, manages evacuation centers, 
                      and works with barangays. Your direct partner in disaster management.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alert Levels */}
            <TabsContent value="alerts" className="space-y-3 mt-4">
              <Card>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">🌀 Tropical Cyclone Warning Signals (PAGASA)</h3>
                    <div className="space-y-2 text-sm">
                      <div className="bg-yellow-50 p-2 rounded border border-yellow-300">
                        <strong>Signal #1:</strong> Winds 39-61 km/h expected in 36 hours - Be alert
                      </div>
                      <div className="bg-orange-50 p-2 rounded border border-orange-300">
                        <strong>Signal #2:</strong> Winds 62-88 km/h expected in 24 hours - Prepare
                      </div>
                      <div className="bg-orange-100 p-2 rounded border border-orange-400">
                        <strong>Signal #3:</strong> Winds 89-117 km/h expected in 18 hours - Very dangerous
                      </div>
                      <div className="bg-red-100 p-2 rounded border border-red-400">
                        <strong>Signal #4:</strong> Winds 118-184 km/h expected in 12 hours - Extremely dangerous, evacuate
                      </div>
                      <div className="bg-red-200 p-2 rounded border border-red-500">
                        <strong>Signal #5:</strong> Winds >185 km/h expected in 12 hours - Catastrophic, take shelter NOW
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">🌧️ Rainfall Warning System (PAGASA)</h3>
                    <div className="space-y-2 text-sm">
                      <div className="bg-yellow-50 p-2 rounded border border-yellow-300">
                        <strong>Yellow Warning:</strong> 7.5-15 mm/hr - Flooding possible in low areas
                      </div>
                      <div className="bg-orange-100 p-2 rounded border border-orange-400">
                        <strong>Orange Warning:</strong> 15-30 mm/hr - Flooding expected, prepare to evacuate
                      </div>
                      <div className="bg-red-100 p-2 rounded border border-red-500">
                        <strong>Red Warning:</strong> >30 mm/hr - Serious flooding, evacuate immediately
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">🌋 Volcano Alert Levels (PHIVOLCS)</h3>
                    <div className="space-y-2 text-sm">
                      <div className="bg-green-50 p-2 rounded border border-green-300">
                        <strong>Alert Level 0:</strong> No alert - Normal, quiet
                      </div>
                      <div className="bg-yellow-50 p-2 rounded border border-yellow-300">
                        <strong>Alert Level 1:</strong> Low-level unrest - Monitoring
                      </div>
                      <div className="bg-yellow-100 p-2 rounded border border-yellow-400">
                        <strong>Alert Level 2:</strong> Increasing unrest - Prepare for possible eruption
                      </div>
                      <div className="bg-orange-100 p-2 rounded border border-orange-400">
                        <strong>Alert Level 3:</strong> Magma near surface - High eruption possibility
                      </div>
                      <div className="bg-red-100 p-2 rounded border border-red-500">
                        <strong>Alert Level 4:</strong> Hazardous eruption IMMINENT (hours to days) - EVACUATE NOW
                      </div>
                      <div className="bg-red-200 p-2 rounded border border-red-600">
                        <strong>Alert Level 5:</strong> Hazardous eruption IN PROGRESS - Stay in safe areas
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">🏚️ Earthquake Intensity Scale (PHIVOLCS)</h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>Intensity I-II:</strong> Scarcely perceptible, weak</p>
                      <p><strong>Intensity III-IV:</strong> Moderately strong, felt by most</p>
                      <p><strong>Intensity V:</strong> Strong - Objects fall</p>
                      <p><strong>Intensity VI:</strong> Very strong - Difficult to stand</p>
                      <p><strong>Intensity VII:</strong> Destructive - Damage to buildings</p>
                      <p><strong>Intensity VIII-X:</strong> Very destructive to catastrophic</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quick Tips */}
            <TabsContent value="tips" className="space-y-3 mt-4">
              <Card>
                <CardContent className="pt-4 space-y-4 text-sm">
                  <div className="bg-blue-50 p-4 rounded border border-blue-300">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Before a Disaster (Preparedness)
                    </h3>
                    <ul className="space-y-1 list-disc list-inside text-gray-700">
                      <li>Prepare Go Bag with 72-hour supplies</li>
                      <li>Know your evacuation center and route</li>
                      <li>Keep important documents in waterproof container</li>
                      <li>Participate in barangay drills</li>
                      <li>Have emergency contact list and battery-powered radio</li>
                      <li>Secure loose objects that could become projectiles</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-4 rounded border border-orange-300">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      During a Disaster (Response)
                    </h3>
                    <ul className="space-y-1 list-disc list-inside text-gray-700">
                      <li><strong>Typhoon:</strong> Stay indoors, away from windows. Evacuate if in low-lying/coastal areas</li>
                      <li><strong>Earthquake:</strong> Duck, Cover, Hold. Don't run outside during shaking</li>
                      <li><strong>Flood:</strong> Move to higher ground. Never walk/drive through floodwater</li>
                      <li><strong>Fire:</strong> Alert others, call BFP (911), evacuate using safest route</li>
                      <li>Follow instructions from authorities</li>
                      <li>Monitor PAGASA/PHIVOLCS bulletins via radio</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded border border-green-300">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      After a Disaster (Recovery)
                    </h3>
                    <ul className="space-y-1 list-disc list-inside text-gray-700">
                      <li>Wait for all-clear signal before returning home</li>
                      <li>Check for structural damage, gas leaks, electrical hazards</li>
                      <li>Boil water before drinking if water system damaged</li>
                      <li>Document damage with photos for insurance/assistance</li>
                      <li>Participate in community clean-up and recovery</li>
                      <li>Seek medical/psychosocial help if needed</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded border border-purple-300">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Emergency Numbers Philippines
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      <div><strong>911</strong> - Emergency Hotline</div>
                      <div><strong>117</strong> - NDRRMC Hotline</div>
                      <div><strong>143</strong> - Philippine Red Cross</div>
                      <div><strong>922-9406</strong> - PAGASA</div>
                      <div><strong>426-1468 to 79</strong> - PHIVOLCS</div>
                      <div><strong>163</strong> - DSWD Hotline</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded border border-yellow-300">
                    <h3 className="font-bold mb-2">💡 Remember:</h3>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Better to evacuate early than to wait too long</li>
                      <li>• Your life is more valuable than property</li>
                      <li>• Help vulnerable populations (elderly, PWD, children)</li>
                      <li>• Stay calm and follow official advisories</li>
                      <li>• Disasters can be survived with proper preparation!</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
