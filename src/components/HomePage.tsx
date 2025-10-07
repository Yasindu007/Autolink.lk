import React from 'react';
import { ArrowRight, Car, Shield, Clock, DollarSign, TrendingUp, Users, CheckCircle, Star, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (screen: 'home' | 'marketplace' | 'tracking' | 'documents' | 'checkout') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Shield,
      title: 'Transparent Pricing',
      description: 'No hidden fees. See exact costs upfront including duties, taxes, and charges.',
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Track your vehicle from purchase to delivery with live updates and notifications.',
    },
    {
      icon: DollarSign,
      title: 'Multiple Payment Options',
      description: 'Choose from cash, Letter of Credit, or flexible financing solutions.',
    },
  ];

  const stats = [
    { number: '5,000+', label: 'Vehicles Imported' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '25', label: 'Days Average Delivery' },
    { number: '50+', label: 'Partner Dealers' },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Browse & Select',
      description: 'Choose from our extensive inventory of Japanese vehicles with detailed specifications.',
      icon: Car,
    },
    {
      step: '2',
      title: 'Calculate Costs',
      description: 'Get instant landed cost calculations including all duties, taxes, and charges.',
      icon: DollarSign,
    },
    {
      step: '3',
      title: 'Secure Payment',
      description: 'Pay securely through cash, LC, or financing with escrow protection.',
      icon: Shield,
    },
    {
      step: '4',
      title: 'Track Delivery',
      description: 'Monitor your vehicle journey from Japan to your doorstep in real-time.',
      icon: Truck,
    },
  ];

  const testimonials = [
    {
      name: 'Ravi Perera',
      location: 'Colombo',
      text: 'AutoLink.lk made importing my dream car so easy. Transparent pricing and excellent service!',
      rating: 5,
    },
    {
      name: 'Saman Fernando',
      location: 'Kandy',
      text: 'Great financing options and real-time tracking. Highly recommend for vehicle imports.',
      rating: 5,
    },
    {
      name: 'Priya Silva',
      location: 'Galle',
      text: 'Professional service from start to finish. My Toyota arrived exactly as described.',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Direct Vehicle Imports from Japan to Sri Lanka
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100">
                Your trusted partner for seamless, transparent, and secure vehicle imports with end-to-end service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-gray-100"
                  onClick={() => onNavigate('marketplace')}
                >
                  Browse Vehicles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                  onClick={() => onNavigate('checkout')}
                >
                  Apply for Financing
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759200870554-cb66aa23526a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGNhcnMlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc1OTg0MTE4NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Japanese car dealership"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose AutoLink.lk?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We simplify the complex process of importing vehicles from Japan with transparency, security, and expertise.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to get your dream vehicle from Japan to Sri Lanka
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by thousands of satisfied customers across Sri Lanka
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Import Your Dream Vehicle?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust AutoLink.lk for their vehicle imports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100"
              onClick={() => onNavigate('marketplace')}
            >
              Start Browsing Vehicles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}