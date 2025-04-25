import { SearchIcon, BookOpenCheck, Newspaper, BrainCircuit, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ChatContainer from './ChatContainer';
import { useState } from 'react';

const Header = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 mb-8 relative">
      <div className="absolute top-0 right-0 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleChat}
          className="rounded-full"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="text-center space-y-2 relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleChat}
            className="rounded-full"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900">WebResearchAI </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A powerful AI-driven research assistant that performs comprehensive web searches, data extraction, and analysis using advanced language models.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/50 backdrop-blur-sm border-2">
          <CardContent className="p-4 text-center space-y-2">
            <SearchIcon className="w-6 h-6 mx-auto text-blue-500" />
            <h3 className="font-semibold">Web Search</h3>
            <p className="text-sm text-gray-600">Systematic search across authoritative sources</p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-2">
          <CardContent className="p-4 text-center space-y-2">
            <BookOpenCheck className="w-6 h-6 mx-auto text-green-500" />
            <h3 className="font-semibold">Data Extraction</h3>
            <p className="text-sm text-gray-600">Extract primary content via web crawling</p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-2">
          <CardContent className="p-4 text-center space-y-2">
            <Newspaper className="w-6 h-6 mx-auto text-purple-500" />
            <h3 className="font-semibold">News Analysis</h3>
            <p className="text-sm text-gray-600">Extract and analyze recent news coverage</p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-2">
          <CardContent className="p-4 text-center space-y-2">
            <BrainCircuit className="w-6 h-6 mx-auto text-orange-500" />
            <h3 className="font-semibold">Smart Synthesis</h3>
            <p className="text-sm text-gray-600">Organize findings into coherent analysis</p>
          </CardContent>
        </Card>
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-3xl h-[80vh]">
            <ChatContainer onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
