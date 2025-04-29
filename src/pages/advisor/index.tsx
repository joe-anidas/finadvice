import { useState } from 'react';
import Head from 'next/head';
import { SendHorizontal, FileText, MicIcon, ImageIcon, Trash } from 'lucide-react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { ChatMessage } from '../../components/advisor/ChatMessage';
import { DocumentUpload } from '../../components/advisor/DocumentUpload';

// Define message types to match the API
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export default function Advisor() {
  const [messages, setMessages] = useState<Array<Message & { timestamp: Date }>>([
    {
      role: 'assistant',
      content: 'Hi there! I\'m your AI financial assistant. How can I help you with your financial planning, investments, or other money matters today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = {
      role: 'user' as const,
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Prepare conversation history for API request
      // We need to strip timestamps and only include roles and content
      const apiHistory = messages
        .filter(msg => msg.role !== 'system')
        .map(({ role, content }) => ({ 
          role, 
          content 
        }));
      
      // Call our API endpoint that connects to Groq
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: apiHistory
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.content) {
        const aiResponse = {
          role: 'assistant' as const,
          content: data.content,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error getting financial advice:', error);
      const errorMessage = {
        role: 'assistant' as const,
        content: 'Sorry, I encountered an issue processing your financial question. Please try again later.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    if (!files.length) return;
    
    // Add user upload message
    const uploadMessage = {
      role: 'user' as const,
      content: `Uploaded financial document: ${files[0].name}`,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, uploadMessage]);
    setLoading(true);
    
    try {
      // In a real implementation, you would:
      // 1. Upload the file to your server
      // 2. Extract text/data from the document
      // 3. Send that data to Groq along with context
      
      // For now, we'll simulate this process
      setTimeout(async () => {
        // Simulate document analysis request to API
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              message: `Analyze this financial document: ${files[0].name}. It contains investment statements and portfolio allocation data.`,
              history: messages.filter(msg => msg.role !== 'system').map(({ role, content }) => ({ role, content }))
            }),
          });
          
          if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
          }
          
          const data = await response.json();
          
          const aiResponse = {
            role: 'assistant' as const,
            content: data.content || "I've analyzed your financial document. Based on your investment statement, your portfolio appears to have some imbalances. Would you like specific recommendations to optimize your asset allocation?",
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
          const errorMessage = {
            role: 'assistant' as const,
            content: 'Sorry, I encountered an issue analyzing your financial document. Please try again later.',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        } finally {
          setLoading(false);
          setShowUpload(false);
        }
      }, 1500);
    } catch (error) {
      console.error('Error processing document:', error);
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hi there! I\'m your AI financial assistant. How can I help you with your financial planning, investments, or other money matters today?',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      <Head>
        <title>AI Financial Advisor | FinAssist</title>
        <meta name="description" content="Get personalized financial advice powered by Groq AI" />
      </Head>

      <DashboardLayout>
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-accent-900">AI Financial Advisor</h1>
            <button
              onClick={clearChat}
              className="text-accent-600 hover:text-accent-900 flex items-center"
            >
              <Trash className="h-4 w-4 mr-1" />
              Clear Chat
            </button>
          </div>

          <div className="flex-grow bg-white rounded-lg shadow overflow-hidden flex flex-col">
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {loading && (
                <div className="flex justify-center">
                  <div className="loading-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
            </div>

            {showUpload && (
              <div className="p-4 border-t border-accent-200">
                <DocumentUpload onUpload={handleFileUpload} onCancel={() => setShowUpload(false)} />
              </div>
            )}

            <div className="border-t border-accent-200 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUpload(!showUpload)}
                  className="text-accent-600 hover:text-accent-900 p-2 rounded-full hover:bg-accent-100"
                  aria-label="Upload document"
                >
                  <FileText className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="text-accent-600 hover:text-accent-900 p-2 rounded-full hover:bg-accent-100"
                  aria-label="Voice input"
                >
                  <MicIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="text-accent-600 hover:text-accent-900 p-2 rounded-full hover:bg-accent-100"
                  aria-label="Image upload"
                >
                  <ImageIcon className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  placeholder="Ask me anything about your finances..."
                  className="input flex-grow"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn-primary p-2 rounded-full"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                >
                  <SendHorizontal className="h-5 w-5" />
                </button>
              </form>
              <div className="mt-2 text-xs text-accent-500 text-center">
                Powered by Groq AI. Your financial data is encrypted and never shared with third parties.
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}