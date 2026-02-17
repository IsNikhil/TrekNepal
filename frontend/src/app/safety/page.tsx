import {
  Shield, AlertTriangle, Phone, Heart, Thermometer,
  Wind, Zap, MapPin, Clock, ChevronRight, CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

const amsSymptoms = [
  { severity: 'Mild AMS', color: 'bg-yellow-50 border-yellow-200', icon: '⚠️', symptoms: ['Headache', 'Fatigue', 'Loss of appetite', 'Mild nausea', 'Difficulty sleeping'], action: 'Rest at current altitude. Do NOT ascend until symptoms resolve. Hydrate well. Ibuprofen for headache.' },
  { severity: 'Moderate AMS', color: 'bg-orange-50 border-orange-200', icon: '🚨', symptoms: ['Severe headache (not relieved by medication)', 'Vomiting', 'Extreme fatigue', 'Shortness of breath at rest', 'Unsteady gait'], action: 'DESCEND immediately — minimum 500-1000m. Take Diamox 250mg if available. Seek medical help.' },
  { severity: 'HACE / HAPE', color: 'bg-red-50 border-red-200', icon: '🆘', symptoms: ['Confusion / altered consciousness', 'Cannot walk straight', 'Gurgling sound when breathing', 'Coughing blood-tinged froth', 'Extreme breathlessness at rest'], action: 'LIFE-THREATENING. Descend NOW regardless of time/weather. Use GAMOW bag if available. Call helicopter rescue immediately.' },
];

const emergencyContacts = [
  { org: 'Nepal Police Emergency', number: '100', note: 'Available 24/7' },
  { org: 'Mountain Rescue Association Nepal', number: '+977-1-4411105', note: 'Specialized mountain rescue' },
  { org: 'CIWEC Clinic Kathmandu', number: '+977-1-4435232', note: 'Travel medicine specialists' },
  { org: 'Nepal SOS International', number: '+977-1-4434650', note: '24hr emergency coordination' },
  { org: 'Himalayan Rescue Association', number: '+977-1-4440292', note: 'Aid posts on major routes' },
];

const sosSteps = [
  'Stay calm. Assess the patient and situation.',
  'Move to a safe location away from hazards (rockfall, weather exposure).',
  'Call Nepal Police (100) or Mountain Rescue (+977-1-4411105).',
  'Provide GPS coordinates or nearest landmark/village name.',
  'If altitude illness — begin descent immediately, do NOT wait for rescue.',
  'Administer Diamox/Dexamethasone if available and trained.',
  'Keep patient warm, hydrated, and conscious.',
  'Mark helicopter landing zone with bright colors if possible.',
];

const acclimatizationRules = [
  { rule: 'The "Golden Rule"', detail: 'Never ascend with AMS symptoms. Descend if symptoms worsen overnight.' },
  { rule: 'Ascend slowly', detail: 'Above 3,000m: ascend no more than 300-500m per day in sleeping altitude.' },
  { rule: 'Rest days', detail: 'Take one acclimatization rest day for every 1,000m gain above 3,000m.' },
  { rule: '"Climb high, sleep low"', detail: 'Day hikes to higher altitudes then return to sleep at lower elevation.' },
  { rule: 'Hydration', detail: 'Drink 4-6 liters of water per day at altitude. Avoid alcohol and sleeping pills.' },
  { rule: 'Diamox', detail: 'Acetazolamide 125-250mg twice daily can aid acclimatization. Consult doctor before trek.' },
];

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold mb-3">Himalayan Safety Hub</h1>
          <p className="text-red-100 text-lg max-w-xl mx-auto">
            Essential safety information for trekking in Nepal. Altitude illness kills — know the signs, know when to descend.
          </p>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-700 text-white py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Nepal Police: <a href="tel:100" className="underline">100</a>
          </div>
          <div className="text-red-300">|</div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Mountain Rescue: <a href="tel:+97714411105" className="underline">+977-1-4411105</a>
          </div>
          <div className="text-red-300">|</div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            CIWEC Clinic: <a href="tel:+97714435232" className="underline">+977-1-4435232</a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* AMS Recognition */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Altitude Illness (AMS) Recognition</h2>
              <p className="text-sm text-gray-500">Know the three stages — your life may depend on it</p>
            </div>
          </div>

          <div className="space-y-4">
            {amsSymptoms.map(({ severity, color, icon, symptoms, action }) => (
              <div key={severity} className={`rounded-2xl border p-5 ${color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="font-bold text-gray-900 text-lg">{severity}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Symptoms</p>
                    <ul className="space-y-1">
                      {symptoms.map(s => (
                        <li key={s} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Action</p>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">{action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Acclimatization Rules */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-trek-100 rounded-xl flex items-center justify-center">
              <Wind className="w-5 h-5 text-trek-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Acclimatization Rules</h2>
              <p className="text-sm text-gray-500">Follow these to prevent altitude illness</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {acclimatizationRules.map(({ rule, detail }) => (
              <div key={rule} className="flex items-start gap-4 p-4">
                <CheckCircle className="w-5 h-5 text-trek-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{rule}</div>
                  <div className="text-gray-600 text-sm mt-0.5">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SOS Protocol */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Emergency SOS Protocol</h2>
              <p className="text-sm text-gray-500">What to do when someone needs rescue</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            {sosSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency contacts */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Emergency Contacts</h2>
              <p className="text-sm text-gray-500">Save these before you leave</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {emergencyContacts.map(({ org, number, note }) => (
              <div key={org} className="flex items-center gap-4 p-4">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm">{org}</div>
                  <div className="text-xs text-gray-500">{note}</div>
                </div>
                <a
                  href={`tel:${number}`}
                  className="flex items-center gap-2 bg-trek-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-trek-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {number}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Helicopter info */}
        <section className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Helicopter Evacuation</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Nepal helicopter rescue services operate in most trekking areas. Response time is typically
                2-4 hours from major towns. Rescue costs NPR 300,000–600,000 (USD 2,200–4,500).
              </p>
              <div className="space-y-2">
                {[
                  'Ensure you have comprehensive travel insurance with helicopter evacuation cover',
                  'CIWEC, Fishtail Air, and Simrik Air operate emergency services',
                  'Provide accurate GPS coordinates when calling for rescue',
                  'Clear helicopter landing zone: flat area 30x30m, mark with bright cloth',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Weather section */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
              <Wind className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Weather Safety</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { season: 'Pre-Monsoon (Mar-May)', desc: 'Best visibility, rhododendrons in bloom. Watch for afternoon thunderstorms above 4000m.' },
              { season: 'Monsoon (Jun-Sep)', desc: 'Heavy rain, flash flood risk, leeches below 3000m. High passes may close. Not recommended.' },
              { season: 'Post-Monsoon (Oct-Nov)', desc: 'Crystal clear skies, ideal conditions. Most popular season — expect crowds.' },
              { season: 'Winter (Dec-Feb)', desc: 'Cold but clear. High passes (>5000m) may be snowbound. Less crowded. Good for lower treks.' },
            ].map(({ season, desc }) => (
              <div key={season} className="bg-gray-50 rounded-xl p-4">
                <div className="font-semibold text-sm text-gray-900 mb-1">{season}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-gradient-to-r from-trek-600 to-trek-700 text-white rounded-2xl p-8 text-center">
          <Clock className="w-10 h-10 mx-auto mb-3 text-trek-200" />
          <h3 className="text-xl font-bold mb-2">Before You Trek</h3>
          <p className="text-trek-100 text-sm max-w-md mx-auto mb-5">
            Get travel insurance, learn AMS symptoms, download offline maps, and register with your embassy.
            Preparation saves lives.
          </p>
          <Link href="/explore" className="bg-white text-trek-700 font-bold px-6 py-3 rounded-full hover:bg-trek-50 transition-colors inline-block">
            Explore Trails Safely
          </Link>
        </section>
      </div>
    </div>
  );
}
