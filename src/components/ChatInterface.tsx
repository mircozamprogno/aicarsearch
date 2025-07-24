import { Loader2, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useCarSearch } from '../hooks/useCarSearch';
import { MessageBubble } from './MessageBubble';
import { SearchResults } from './SearchResults';
import { VehicleDetails } from './VehicleDetails';

// Define Language type directly here to avoid import issues
type Language = 'it' | 'en' | 'es' | 'fr' | 'de';

interface Message {
 id: string;
 content: string;
 type: 'user' | 'ai';
 timestamp: Date;
 vehicles?: any[];
 aiResponse?: string;
}

interface ChatInterfaceProps {
 language: Language;
}

export function ChatInterface({ language }: ChatInterfaceProps) {
 const [messages, setMessages] = useState<Message[]>([]);
 const [inputValue, setInputValue] = useState('');
 const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
 const [isDetailsOpen, setIsDetailsOpen] = useState(false);
 
 const { searchCars, getVehicleDetails, isLoading } = useCarSearch();
 const messagesEndRef = useRef<HTMLDivElement>(null);
 const inputRef = useRef<HTMLInputElement>(null);

 const scrollToBottom = () => {
   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 };

 useEffect(() => {
   scrollToBottom();
 }, [messages]);

 const getPlaceholder = (lang: Language) => {
   const placeholders = {
     it: 'Descrivi la tua auto ideale... (es: "Cerco una macchina ibrida familiare sotto i 25000 euro")',
     en: 'Describe your ideal car... (e.g., "I need a reliable family hybrid under 25k")',
     es: 'Describe tu coche ideal... (ej: "Busco un híbrido familiar confiable por menos de 25k")',
     fr: 'Décrivez votre voiture idéale... (ex: "Je cherche une hybride familiale fiable sous 25k")',
     de: 'Beschreiben Sie Ihr ideales Auto... (z.B.: "Ich suche einen zuverlässigen Familienhybrid unter 25k")'
   };
   return placeholders[lang];
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   if (!inputValue.trim() || isLoading) return;

   const userMessage: Message = {
     id: Date.now().toString(),
     content: inputValue,
     type: 'user',
     timestamp: new Date(),
   };

   setMessages(prev => [...prev, userMessage]);
   setInputValue('');

   try {
     // Get conversation context (last search results)
     const lastSearchMessage = messages
       .slice()
       .reverse()
       .find(msg => msg.type === 'ai' && msg.vehicles);
     
     const conversationContext = lastSearchMessage?.vehicles 
       ? { last_search_results: lastSearchMessage.vehicles.map(v => v.id) }
       : undefined;

     const result = await searchCars(inputValue, language, conversationContext);

     if (result.action === 'details' && result.vehicle) {
       // Show vehicle details
       setSelectedVehicle(result.vehicle);
       setIsDetailsOpen(true);
       
       const aiMessage: Message = {
         id: (Date.now() + 1).toString(),
         content: 'Ecco i dettagli del veicolo richiesto:',
         type: 'ai',
         timestamp: new Date(),
       };
       setMessages(prev => [...prev, aiMessage]);
     } else {
       // Show search results
       const aiMessage: Message = {
         id: (Date.now() + 1).toString(),
         content: result.ai_response || 'Ho trovato alcuni veicoli per te.',
         type: 'ai',
         timestamp: new Date(),
         vehicles: result.vehicles,
         aiResponse: result.ai_response,
       };
       setMessages(prev => [...prev, aiMessage]);
     }
   } catch (error) {
     console.error('Search error:', error);
     const errorMessage: Message = {
       id: (Date.now() + 1).toString(),
       content: language === 'it' 
         ? 'Mi dispiace, si è verificato un errore. Riprova più tardi.' 
         : 'Sorry, an error occurred. Please try again later.',
       type: 'ai',
       timestamp: new Date(),
     };
     setMessages(prev => [...prev, errorMessage]);
   }
 };

 const handleVehicleClick = async (vehicleId: number) => {
   try {
     const vehicle = await getVehicleDetails(vehicleId);
     setSelectedVehicle(vehicle);
     setIsDetailsOpen(true);
   } catch (error) {
     console.error('Error fetching vehicle details:', error);
   }
 };

 const handleKeyPress = (e: React.KeyboardEvent) => {
   if (e.key === 'Enter' && !e.shiftKey) {
     e.preventDefault();
     handleSubmit(e as any);
   }
 };

 return (
   <>
     <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl h-600 flex flex-col overflow-hidden">
       {/* Messages Container */}
       <div className="flex-1 overflow-y-auto p-6 space-y-4">
         {messages.length === 0 && (
           <div className="text-center text-gray-500 mt-20">
             <div className="text-lg font-medium mb-2">
               {language === 'it' && '👋 Ciao! Come posso aiutarti a trovare la tua auto ideale?'}
               {language === 'en' && '👋 Hello! How can I help you find your perfect car?'}
               {language === 'es' && '👋 ¡Hola! ¿Cómo puedo ayudarte a encontrar tu coche perfecto?'}
               {language === 'fr' && '👋 Salut! Comment puis-je vous aider à trouver votre voiture parfaite?'}
               {language === 'de' && '👋 Hallo! Wie kann ich Ihnen helfen, Ihr perfektes Auto zu finden?'}
             </div>
             <div className="text-sm">
               {language === 'it' && 'Inizia descrivendo quello che cerchi...'}
               {language === 'en' && 'Start by describing what you\'re looking for...'}
               {language === 'es' && 'Comienza describiendo lo que buscas...'}
               {language === 'fr' && 'Commencez par décrire ce que vous cherchez...'}
               {language === 'de' && 'Beginnen Sie mit der Beschreibung dessen, was Sie suchen...'}
             </div>
           </div>
         )}

         {messages.map((message) => (
           <div key={message.id} className="animate-fade-in">
             <MessageBubble message={message} />
             {message.vehicles && message.vehicles.length > 0 && (
               <div className="mt-4">
                 <SearchResults 
                   vehicles={message.vehicles} 
                   onVehicleClick={handleVehicleClick}
                   language={language}
                 />
               </div>
             )}
           </div>
         ))}

         {isLoading && (
           <div className="flex justify-start animate-fade-in">
             <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
               <div className="flex items-center space-x-2">
                 <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                 <span className="text-sm text-gray-600">
                   {language === 'it' && 'Sto cercando...'}
                   {language === 'en' && 'Searching...'}
                   {language === 'es' && 'Buscando...'}
                   {language === 'fr' && 'Recherche...'}
                   {language === 'de' && 'Suche...'}
                 </span>
               </div>
             </div>
           </div>
         )}

         <div ref={messagesEndRef} />
       </div>

       {/* Input Form */}
       <div className="border-t border-gray-200 p-4 bg-white/50">
         <form onSubmit={handleSubmit} className="flex space-x-3">
           <input
             ref={inputRef}
             type="text"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             onKeyPress={handleKeyPress}
             placeholder={getPlaceholder(language)}
             className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-md text-sm"
             disabled={isLoading}
           />
           <button
             type="submit"
             disabled={!inputValue.trim() || isLoading}
             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 font-medium"
           >
             {isLoading ? (
               <Loader2 className="w-4 h-4 animate-spin" />
             ) : (
               <Send className="w-4 h-4" />
             )}
           </button>
         </form>
       </div>
     </div>

     {/* Vehicle Details Modal */}
     {selectedVehicle && (
       <VehicleDetails
         vehicle={selectedVehicle}
         isOpen={isDetailsOpen}
         onClose={() => {
           setIsDetailsOpen(false);
           setSelectedVehicle(null);
         }}
         language={language}
       />
     )}
   </>
 );
}