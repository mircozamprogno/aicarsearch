import { Car, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { LanguageSelector } from './components/LanguageSelector';


// Define Language type directly here to avoid import issues
type Language = 'it' | 'en' | 'es' | 'fr' | 'de';

function App() {
  const [language, setLanguage] = useState<Language>('it');

  const getWelcomeMessage = (lang: Language) => {
    const messages = {
      it: 'Trova la tua auto ideale con l\'AI',
      en: 'Find your perfect car with AI',
      es: 'Encuentra tu coche perfecto con IA',
      fr: 'Trouvez votre voiture parfaite avec l\'IA',
      de: 'Finden Sie Ihr perfektes Auto mit KI'
    };
    return messages[lang];
  };

  const getSubtitle = (lang: Language) => {
    const subtitles = {
      it: 'Descrivi quello che cerchi in linguaggio naturale',
      en: 'Describe what you\'re looking for in natural language',
      es: 'Describe lo que buscas en lenguaje natural',
      fr: 'Décrivez ce que vous cherchez en langage naturel',
      de: 'Beschreiben Sie in natürlicher Sprache, was Sie suchen'
    };
    return subtitles[lang];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-400/20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-400/20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-300/10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSelector 
          currentLanguage={language} 
          onLanguageChange={setLanguage} 
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen">
        {/* Header */}
        <div className="text-center pt-16 pb-8 px-4 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Car className="w-12 h-12 text-blue-600 mr-3" />
              <Sparkles className="w-6 h-6 text-purple-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4 leading-tight">
            {getWelcomeMessage(language)}
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {getSubtitle(language)}
          </p>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 w-full max-w-4xl mx-auto px-4 pb-8">
          <ChatInterface language={language} />
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-gray-500 text-sm">
          <p>Powered by AI • Built with ❤️</p>
        </footer>
      </div>
    </div>
  );
}

export default App;