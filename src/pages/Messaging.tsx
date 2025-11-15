import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { 
  Send, 
  Paperclip, 
  Image as ImageIcon,
  Search,
  MoreVertical,
  Phone,
  Video
} from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastMessage: 'I\'ve completed the initial analysis. Let me know if you need any revisions.',
    timestamp: '10:45 AM',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    lastMessage: 'Thanks for accepting my bid! When can we schedule a kickoff call?',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Aisha Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
    lastMessage: 'The environmental report is ready for your review.',
    timestamp: '2 days ago',
    unread: 1,
    online: true,
  },
];

const messages = [
  {
    id: 1,
    sender: 'other',
    text: 'Hi! I wanted to discuss the project scope in more detail.',
    timestamp: '9:30 AM',
  },
  {
    id: 2,
    sender: 'me',
    text: 'Of course! What specific aspects would you like to clarify?',
    timestamp: '9:35 AM',
  },
  {
    id: 3,
    sender: 'other',
    text: 'I\'d like to understand the timeline expectations and any specific deliverables you need.',
    timestamp: '9:40 AM',
  },
  {
    id: 4,
    sender: 'me',
    text: 'Great question. We\'re looking for a comprehensive structural analysis report within 3 weeks. The deliverables should include detailed calculations, recommendations, and CAD drawings.',
    timestamp: '9:42 AM',
  },
  {
    id: 5,
    sender: 'other',
    text: 'Perfect! I can definitely deliver that. I\'ll start with the preliminary assessment this week.',
    timestamp: '9:45 AM',
  },
  {
    id: 6,
    sender: 'other',
    text: 'I\'ve completed the initial analysis. Let me know if you need any revisions.',
    timestamp: '10:45 AM',
  },
];

export function Messaging() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Send message logic here
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-[calc(100vh-4rem)] max-w-7xl mx-auto p-4">
        <Card className="h-full flex flex-col md:flex-row overflow-hidden border-green-100">
          {/* Conversations List */}
          <div className="w-full md:w-96 border-r border-slate-200 flex flex-col md:h-full">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-xl text-slate-900 mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full p-4 rounded-lg mb-2 text-left transition-colors ${
                      selectedConversation.id === conversation.id
                        ? 'bg-green-50 border-2 border-green-200'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>
                            {conversation.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-slate-900 truncate">{conversation.name}</h3>
                          <span className="text-xs text-slate-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-slate-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-green-600 hover:bg-green-700 h-5 min-w-5 flex items-center justify-center p-0 px-1.5">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>
                      {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="text-slate-900">{selectedConversation.name}</h3>
                  <p className="text-sm text-slate-500">
                    {selectedConversation.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 min-h-0">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === 'me'
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'me' ? 'text-green-100' : 'text-slate-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200 flex-shrink-0">
              <div className="flex items-end gap-2">
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
                <Button 
                  onClick={handleSendMessage}
                  className="bg-green-600 hover:bg-green-700 flex-shrink-0"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}