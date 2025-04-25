import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatContainerProps {
  onClose?: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { text: message, isBot: false }]);

      const response = await fetch('https://websearchai-production.up.railway.app/api/research/run', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        text: data.research_data || "No data found",
        isBot: true 
      }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full mx-auto max-w-3xl bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border-2">
      {onClose && (
        <div className="flex justify-end p-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-6 relative">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Start your research by asking a question</p>
          </div>
        )}
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isBot={message.isBot}
          />
        ))}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;
