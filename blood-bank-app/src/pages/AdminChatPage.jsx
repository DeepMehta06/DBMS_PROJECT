import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { adminChatAPI } from '../services/api';
import { 
  MessageSquare, 
  Send, 
  Loader2, 
  User, 
  Building2,
  Search,
  AlertCircle,
  Clock
} from 'lucide-react';

const AdminChatPage = () => {
  const { user } = useAuth();
  const { success, error: showError } = useToast();
  const [conversations, setConversations] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  useEffect(() => {
    fetchConversations();
    
    // Poll conversations every 5 seconds
    pollingIntervalRef.current = setInterval(() => {
      fetchConversations(true);
    }, 5000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedHospitalId) {
      fetchMessages();
      
      // Poll messages every 3 seconds when chat is open
      const messagePolling = setInterval(() => {
        fetchMessages(true);
      }, 3000);

      return () => clearInterval(messagePolling);
    }
  }, [selectedHospitalId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      
      const response = await adminChatAPI.getConversations();
      
      if (response.data.success) {
        setConversations(response.data.data || []);
        setError('');
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
      if (!silent) {
        setError('Failed to load conversations');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const fetchMessages = async (silent = false) => {
    try {
      const response = await adminChatAPI.getMessages(selectedHospitalId);
      
      if (response.data.success) {
        setMessages(response.data.data.messages || []);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      if (!silent) {
        setError('Failed to load messages');
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedHospitalId) return;

    setSending(true);
    setError('');

    try {
      const response = await adminChatAPI.sendMessage(selectedHospitalId, newMessage.trim());
      
      if (response.data.success) {
        success('Message sent', 'Your message has been sent to the hospital');
        setNewMessage('');
        await fetchMessages(true);
        await fetchConversations(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
      showError('Failed to send message', err.response?.data?.message || 'Please try again later');
    } finally {
      setSending(false);
    }
  };

  const handleSelectConversation = (hospitalId) => {
    setSelectedHospitalId(hospitalId);
    setMessages([]);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes < 1 ? 'Just now' : `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConversation = conversations.find(c => c.hospitalId === selectedHospitalId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-zinc-600">Loading chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 shadow-sm flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-900">Hospital Messages</h1>
                <p className="text-sm text-zinc-600">
                  {conversations.length} conversations • {conversations.reduce((sum, c) => sum + (c.unreadCount?.admin || 0), 0)} unread
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-96 bg-white border-r border-zinc-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-zinc-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
                <p className="text-zinc-500">No conversations yet</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.hospitalId}
                  onClick={() => handleSelectConversation(conv.hospitalId)}
                  className={`w-full p-4 border-b border-zinc-200 hover:bg-zinc-50 transition-colors text-left ${
                    selectedHospitalId === conv.hospitalId ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedHospitalId === conv.hospitalId ? 'bg-blue-600' : 'bg-zinc-600'
                    }`}>
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-zinc-900 truncate">{conv.hospitalName}</p>
                        {conv.unreadCount?.admin > 0 && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                            {conv.unreadCount.admin}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-600 truncate mb-1">{conv.lastMessage || 'No messages yet'}</p>
                      {conv.lastMessageTime && (
                        <p className="text-xs text-zinc-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(conv.lastMessageTime)}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col bg-zinc-50">
          {!selectedHospitalId ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-zinc-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Select a conversation</h3>
                <p className="text-zinc-600">Choose a hospital from the list to view messages</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-zinc-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">{selectedConversation?.hospitalName}</p>
                    <p className="text-sm text-zinc-600">{selectedConversation?.hospitalEmail}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-zinc-500">No messages yet</p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, index) => {
                      const isAdmin = msg.sender === 'admin';
                      
                      return (
                        <div
                          key={msg._id || index}
                          className={`flex ${isAdmin ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                        >
                          <div className={`flex gap-3 max-w-[70%] ${isAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              isAdmin ? 'bg-blue-600' : 'bg-zinc-600'
                            }`}>
                              {isAdmin ? (
                                <User className="h-4 w-4 text-white" />
                              ) : (
                                <Building2 className="h-4 w-4 text-white" />
                              )}
                            </div>

                            <div>
                              <div className={`rounded-lg px-4 py-2 ${
                                isAdmin 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-white border border-zinc-200 text-zinc-900'
                              }`}>
                                <p className="text-xs font-medium mb-1 opacity-75">
                                  {msg.senderName || (isAdmin ? 'You' : selectedConversation?.hospitalName)}
                                </p>
                                <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                              </div>
                              <p className={`text-xs text-zinc-500 mt-1 ${isAdmin ? 'text-right' : 'text-left'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit',
                                  hour12: true 
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input */}
              <div className="bg-white border-t border-zinc-200 px-6 py-4">
                {error && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={sending}
                  />
                  <button
                    type="submit"
                    disabled={sending || !newMessage.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChatPage;
