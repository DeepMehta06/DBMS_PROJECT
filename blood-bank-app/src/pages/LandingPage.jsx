import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Droplets, 
  Heart, 
  Users, 
  Shield, 
  Clock, 
  Activity, 
  Building2, 
  CheckCircle,
  ChevronRight,
  Sparkles,
  Lock,
  Eye,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Droplets,
      title: 'Real-time Blood Inventory',
      description: 'Track blood units across all types with live updates and smart alerts for low stock.',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    {
      icon: Users,
      title: 'Donor Registration & Scheduling',
      description: 'Seamless donor management with appointment scheduling and health tracking.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      icon: Heart,
      title: 'Request & Matching',
      description: 'Intelligent blood matching system connecting hospitals with available units instantly.',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100'
    },
    {
      icon: Shield,
      title: 'Secure Patient Data',
      description: 'HIPAA-compliant data protection with end-to-end encryption for all records.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100'
    },
    {
      icon: Activity,
      title: 'Analytics & Reporting',
      description: 'Comprehensive dashboards with insights on donations, usage, and inventory trends.',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100'
    },
    {
      icon: Building2,
      title: 'Hospital Integration',
      description: 'Direct portal for hospitals to request blood and track delivery status.',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-100'
    }
  ];

  const stats = [
    { label: 'Blood Units Managed', value: '50,000+', icon: Droplets },
    { label: 'Registered Donors', value: '12,000+', icon: Users },
    { label: 'Partner Hospitals', value: '150+', icon: Building2 },
    { label: 'Lives Impacted', value: '25,000+', icon: Heart }
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-rose-50/40 text-zinc-900 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-cyan-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-gradient-to-br from-red-400/25 to-rose-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] bg-gradient-to-br from-emerald-400/20 to-teal-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-gradient-to-br from-purple-400/15 to-pink-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '6s' }} />
        {/* Floating particles */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-red-400/60 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-blue-400/50 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-emerald-400/50 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/70 backdrop-blur-2xl shadow-lg shadow-zinc-900/5 border-b border-white/50' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Droplets className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">Blood Bank MS</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-zinc-600 hover:text-zinc-900 transition-colors">Features</a>
              <a href="#dashboard" className="text-zinc-600 hover:text-zinc-900 transition-colors">Dashboard</a>
              <a href="#security" className="text-zinc-600 hover:text-zinc-900 transition-colors">Security</a>
              <button 
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-600 hover:text-zinc-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-zinc-200">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-zinc-600 hover:text-zinc-900">Features</a>
              <a href="#dashboard" className="block py-2 text-zinc-600 hover:text-zinc-900">Dashboard</a>
              <a href="#security" className="block py-2 text-zinc-600 hover:text-zinc-900">Security</a>
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/50 rounded-full text-blue-700 text-sm font-medium mb-8 shadow-sm animate-pulse" style={{ animationDuration: '3s' }}>
              <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Next-Gen Blood Bank Management</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 bg-clip-text text-transparent">Smart Blood Bank,</span>
              <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>
                Simplified
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Streamline donor engagement, ensure blood availability, and manage your entire blood bank 
              with our secure, intelligent platform designed for modern healthcare.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 hover:from-red-600 hover:via-rose-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-1.5 flex items-center justify-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Heart className="h-5 w-5" />
                Get Started
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/hospital/register')}
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-zinc-800 font-semibold rounded-xl border border-zinc-200/80 shadow-lg shadow-zinc-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/10 hover:-translate-y-1.5 flex items-center justify-center gap-2"
              >
                <Building2 className="h-5 w-5" />
                Hospital Portal
              </button>
            </div>
          </div>

          {/* Floating Blood Types Animation */}
          <div className="relative mt-16 sm:mt-24">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {bloodTypes.map((type, index) => (
                <div 
                  key={type}
                  className="group px-4 sm:px-6 py-3 sm:py-4 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl hover:bg-white hover:border-red-200 transition-all duration-500 hover:-translate-y-3 hover:rotate-2 hover:shadow-xl hover:shadow-red-500/20 cursor-default shadow-lg shadow-zinc-900/5 animate-bounce"
                  style={{ animationDelay: `${index * 150}ms`, animationDuration: '3s' }}
                >
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent group-hover:from-red-600 group-hover:to-rose-600">
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center group p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50 shadow-lg shadow-zinc-900/5 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/25">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent mb-1">{stat.value}</div>
                  <div className="text-sm text-zinc-500 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-zinc-900">
              Everything You Need to 
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"> Manage Blood</span>
            </h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
              Comprehensive tools designed for blood banks, hospitals, and healthcare providers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`group relative p-6 sm:p-8 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:rotate-1 shadow-lg shadow-zinc-900/5`}
                >
                  {/* Animated gradient border on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                  <div className="absolute inset-[1px] bg-white/80 rounded-2xl" />
                  
                  <div className={`relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="relative text-xl font-semibold text-zinc-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="relative text-zinc-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-emerald-50/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-zinc-900">
                Powerful Dashboard,
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent"> Intuitive Design</span>
              </h2>
              <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
                Monitor your blood bank operations in real-time with our comprehensive dashboard. 
                Track inventory levels, donor activities, and hospital requests all in one place.
              </p>
              
              <div className="space-y-4">
                {[
                  'Live inventory tracking by blood type',
                  'Donor appointment management',
                  'Hospital request monitoring',
                  'Expiry date alerts & notifications'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-zinc-700">{item}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/login')}
                className="mt-8 group inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Explore Dashboard
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Dashboard Preview Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-emerald-400/30 to-teal-400/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-emerald-400/10 rounded-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-2xl shadow-emerald-500/10">
                {/* Mini Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-zinc-900">Blood Inventory Overview</h4>
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full absolute" />
                    Live
                  </span>
                </div>

                {/* Blood Type Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    { type: 'A+', units: 45, status: 'good' },
                    { type: 'A-', units: 12, status: 'low' },
                    { type: 'B+', units: 38, status: 'good' },
                    { type: 'B-', units: 8, status: 'critical' },
                    { type: 'AB+', units: 22, status: 'good' },
                    { type: 'AB-', units: 5, status: 'critical' },
                    { type: 'O+', units: 56, status: 'good' },
                    { type: 'O-', units: 15, status: 'low' }
                  ].map((item) => (
                    <div 
                      key={item.type}
                      className={`p-3 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default ${
                        item.status === 'critical' ? 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 shadow-sm shadow-red-100' :
                        item.status === 'low' ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 shadow-sm shadow-amber-100' :
                        'bg-gradient-to-br from-zinc-50 to-slate-50 border border-zinc-200'
                      }`}
                    >
                      <div className="text-lg font-bold text-zinc-900">{item.type}</div>
                      <div className={`text-sm font-medium ${
                        item.status === 'critical' ? 'text-red-600' :
                        item.status === 'low' ? 'text-amber-600' :
                        'text-zinc-500'
                      }`}>{item.units} units</div>
                    </div>
                  ))}
                </div>

                {/* Mini Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-zinc-50 to-slate-100 border border-zinc-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-transparent">201</div>
                    <div className="text-xs text-zinc-500 font-medium">Total Units</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold text-emerald-600">24</div>
                    <div className="text-xs text-zinc-500 font-medium">Today's Donations</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold text-amber-600">8</div>
                    <div className="text-xs text-zinc-500 font-medium">Pending Requests</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section id="security" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-100/80 via-purple-50/60 to-pink-100/80 rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/50 shadow-xl backdrop-blur-sm">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            
            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200/50 rounded-full text-purple-700 text-sm font-medium mb-6 shadow-sm">
                  <Shield className="h-4 w-4 animate-pulse" style={{ animationDuration: '2s' }} />
                  <span>Enterprise-Grade Security</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-zinc-900">
                  Your Data,
                  <span className="bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent"> Always Protected</span>
                </h2>
                
                <p className="text-zinc-600 text-lg leading-relaxed">
                  We prioritize privacy-by-design. All sensitive patient and donor information 
                  is encrypted and stored securely, meeting the highest healthcare compliance standards.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Lock, title: 'End-to-End Encryption', desc: 'All data encrypted in transit and at rest' },
                  { icon: Shield, title: 'HIPAA Compliant', desc: 'Meeting healthcare data regulations' },
                  { icon: Eye, title: 'Access Control', desc: 'Role-based permissions & audit logs' },
                  { icon: Clock, title: '24/7 Monitoring', desc: 'Continuous security surveillance' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className="p-5 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl hover:border-purple-300 hover:shadow-xl hover:-translate-y-2 hover:rotate-1 transition-all duration-500 shadow-lg shadow-purple-500/5"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-zinc-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-600">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-50/40 to-red-50/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-200/30 via-rose-200/20 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-zinc-900">
            Ready to Transform Your 
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"> Blood Bank?</span>
          </h2>
          <p className="text-zinc-600 text-lg mb-10 max-w-2xl mx-auto">
            Join healthcare facilities that trust our platform to manage their blood bank operations efficiently and securely.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="group relative w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1.5 flex items-center justify-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              Start Managing Today
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/hospital/login')}
              className="w-full sm:w-auto px-10 py-4 bg-white/80 backdrop-blur-sm text-zinc-800 font-semibold rounded-xl border border-zinc-200/80 hover:border-zinc-300 hover:bg-white transition-all duration-300 shadow-lg shadow-zinc-900/5 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Hospital Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/50 bg-gradient-to-b from-white/50 to-zinc-100/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Droplets className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">Blood Bank MS</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
              <a href="#security" className="hover:text-zinc-900 transition-colors">Security</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
            </div>
            
            <p className="text-sm text-zinc-400">
              © 2025 Blood Bank Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
