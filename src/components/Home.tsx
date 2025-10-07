import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Car, Shield, Truck, Calculator, CreditCard, FileText, CheckCircle, Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: Shield,
      title: 'Transparent Pricing',
      description: 'No hidden fees. See all costs upfront with our detailed cost calculator.',
    },
    {
      icon: Truck,
      title: 'Real-time Tracking',
      description: 'Track your vehicle from auction to your doorstep with live updates.',
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Options',
      description: 'Cash, Letter of Credit, or flexible financing options available.',
    },
    {
      icon: FileText,
      title: 'Document Management',
      description: 'Digital document handling with secure storage and easy access.',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Browse & Select',
      description: 'Search our extensive database of Japanese vehicles',
      icon: Car,
    },
    {
      step: 2,
      title: 'Calculate Costs',
      description: 'Get instant landed cost estimates including all fees',
      icon: Calculator,
    },
    {
      step: 3,
      title: 'Choose Payment',
      description: 'Select from cash, LC, or financing options',
      icon: CreditCard,
    },
    {
      step: 4,
      title: 'Track & Receive',
      description: 'Monitor progress and receive your vehicle',
      icon: CheckCircle,
    },
  ];

  const stats = [
    { label: 'Vehicles Imported', value: '15,000+' },
    { label: 'Happy Customers', value: '8,500+' },
    { label: 'Partner Dealers', value: '200+' },
    { label: 'Average Processing Time', value: '45 days' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-700 text-blue-100">
                Direct Import Specialists
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Direct Vehicle Imports from Japan to Sri Lanka
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Access Japanese auctions, dealers, and manufacturers directly. Transparent pricing, 
                real-time tracking, and flexible payment options for your next vehicle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-gray-100"
                  onClick={() => onNavigate('marketplace')}
                >
                  Browse Vehicles
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  How It Works
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  Apply for Financing
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759200870554-cb66aa23526a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBjYW1yeXxlbnwxfHx8fDE3NTk4NDExODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Japanese car dealership"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AutoLink.lk?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make vehicle imports simple, transparent, and reliable with cutting-edge technology 
              and personalized service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="mx-auto bg-blue-100 text-blue-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              From selection to delivery in four simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="mx-auto bg-blue-900 text-white p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6 relative">
                      <Icon className="h-8 w-8" />
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full">
                      <div className="w-8 h-0.5 bg-gray-300 transform -translate-x-4"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Import Your Dream Car?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have successfully imported vehicles from Japan through AutoLink.lk
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100"
              onClick={() => onNavigate('marketplace')}
            >
              Start Browsing Vehicles
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900"
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}