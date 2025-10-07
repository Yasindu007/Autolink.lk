import React, { useState } from 'react';
import { Car, Calculator, ShoppingCart, FileText, Home, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './components/ui/dialog';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { HomePage } from './components/HomePage';
import { VehicleMarketplace } from './components/VehicleMarketplace';
import { OrderTracking } from './components/OrderTracking';
import { DocumentCenter } from './components/DocumentCenter';
import { CheckoutPayment } from './components/CheckoutPayment';

type Screen = 'home' | 'marketplace' | 'tracking' | 'documents' | 'checkout';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', icon: Home, screen: 'home' as Screen },
    { name: 'Browse Vehicles', icon: Car, screen: 'marketplace' as Screen },
    { name: 'Track Order', icon: ShoppingCart, screen: 'tracking' as Screen },
    { name: 'Documents', icon: FileText, screen: 'documents' as Screen },
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomePage onNavigate={setCurrentScreen} />;
      case 'marketplace':
        return <VehicleMarketplace onNavigate={setCurrentScreen} />;
      case 'tracking':
        return <OrderTracking />;
      case 'documents':
        return <DocumentCenter />;
      case 'checkout':
        return <CheckoutPayment onNavigate={setCurrentScreen} />;
      default:
        return <HomePage onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-900" />
              <span className="ml-2 text-xl font-bold text-blue-900">AutoLink.lk</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCurrentScreen(item.screen)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentScreen === item.screen
                      ? 'text-blue-900 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Contact Info & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-1" />
                  +94 77 123 4567
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-1" />
                  info@autolink.lk
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
                onClick={() => setCurrentScreen('checkout')}
              >
                Get Financing
              </Button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold text-gray-900">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setCurrentScreen(item.screen);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-left transition-colors ${
                      currentScreen === item.screen
                        ? 'text-blue-900 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </button>
                ))}
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    setCurrentScreen('checkout');
                    setMobileMenuOpen(false);
                  }}
                >
                  Get Financing
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-64px)]">
        {renderScreen()}
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Car className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">AutoLink.lk</span>
              </div>
              <p className="text-blue-100 mb-4">
                Your trusted partner for direct vehicle imports from Japan to Sri Lanka.
              </p>
              <div className="flex items-center space-x-2 text-blue-100">
                <MapPin className="h-4 w-4" />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-blue-100">
                <li>Vehicle Import</li>
                <li>Financing Solutions</li>
                <li>Document Processing</li>
                <li>Customs Clearance</li>
                <li>Registration</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-blue-100">
                <li>How It Works</li>
                <li>Cost Calculator</li>
                <li>Track Your Order</li>
                <li>FAQ</li>
                <li>Contact Us</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-blue-100">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +94 77 123 4567
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@autolink.lk
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100">
            <p>&copy; 2024 AutoLink.lk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}