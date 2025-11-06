import React, { useState, useEffect, useRef } from 'react';
import { useHospitalAuth } from '../../context/HospitalAuthContext';
import { useToast } from '../../context/ToastContext';
import { hospitalChatAPI } from '../../services/api';
import { 
  MessageSquare, 
  Send, 
  Loader2, 
  User, 
  Building2,
  AlertCircle,
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HospitalChatPage = () => {
  const { hospital, logout } = useHospitalAuth();
  const { success, error: showError } = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/hospital/login');
  };

  useEffect(() => {
    fetchMessages();
    
    // Start polling every 3 seconds
    pollingIntervalRef.current = setInterval(() => {
      fetchMessages(true); // Silent refresh
    }, 3000);

    return () => {
      // Cleanup: stop polling when component unmounts
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      
      const response = await hospitalChatAPI.getMessages();
      
      if (response.data.success) {
        setMessages(response.data.data.messages || []);
        setError('');
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      if (!silent) {
        setError('Failed to load messages');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    setSending(true);
    setError('');

    try {
      const response = await hospitalChatAPI.sendMessage(newMessage.trim());
      
      if (response.data.success) {
        success('Message sent', 'Your message has been sent to the admin');
        setNewMessage('');
        // Immediately fetch updated messages
        await fetchMessages(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
      showError('Failed to send message', err.response?.data?.message || 'Please try again later');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const timeString = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    if (date.toDateString() === today.toDateString()) {
      return `Today ${timeString}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${timeString}`;
    } else {
      return `${date.toLocaleDateString()} ${timeString}`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-zinc-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                to="/hospital/dashboard"
                className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5 text-zinc-600" />
              </Link>
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-900">Chat with Admin</h1>
                <p className="text-sm text-zinc-600">Get help with blood requests and queries</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-5xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="p-4 bg-blue-100 rounded-full mb-4">
                  <MessageSquare className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">No messages yet</h3>
                <p className="text-zinc-600 max-w-md">
                  Start a conversation with the admin for urgent blood requests or any queries
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => {
                  const isHospital = msg.sender === 'hospital';
                  
                  return (
                    <div
                      key={msg._id || index}
                      className={`flex ${isHospital ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                      <div className={`flex gap-3 max-w-[70%] ${isHospital ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isHospital ? 'bg-blue-600' : 'bg-zinc-600'
                        }`}>
                          {isHospital ? (
                            <Building2 className="h-4 w-4 text-white" />
                          ) : (
                            <User className="h-4 w-4 text-white" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div>
                          <div className={`rounded-lg px-4 py-2 ${
                            isHospital 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white border border-zinc-200 text-zinc-900'
                          }`}>
                            <p className="text-xs font-medium mb-1 opacity-75">
                              {msg.senderName || (isHospital ? hospital?.Hosp_Name : 'Admin')}
                            </p>
                            <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                          </div>
                          <p className={`text-xs text-zinc-500 mt-1 ${isHospital ? 'text-right' : 'text-left'}`}>
                            {formatTime(msg.timestamp)}
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
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-zinc-200 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
          
          <p className="text-xs text-zinc-500 mt-2 text-center">
            Messages refresh every 3 seconds • Replies from admin will appear here
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalChatPage;
