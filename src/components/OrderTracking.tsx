import React, { useState } from 'react';
import { Package, Truck, Ship, FileCheck, CheckCircle, Clock, MapPin, Bell, Mail, MessageSquare, Phone, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

export function OrderTracking() {
  const [selectedOrder, setSelectedOrder] = useState('ORD-2024-001');
  
  const orders = [
    {
      id: 'ORD-2024-001',
      vehicle: '2020 Toyota Camry',
      status: 'In Transit',
      currentLocation: 'Colombo Port',
      estimatedDelivery: '2024-01-15',
      progress: 75
    },
    {
      id: 'ORD-2024-002', 
      vehicle: '2019 Honda Civic',
      status: 'Customs Clearance',
      currentLocation: 'Customs Department',
      estimatedDelivery: '2024-01-20',
      progress: 60
    }
  ];

  const trackingStages = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Payment confirmed and order processed',
      icon: Package,
      status: 'completed',
      date: '2023-12-01',
      time: '10:30 AM'
    },
    {
      id: 2,
      title: 'Payment Verified',
      description: 'Escrow payment received and verified',
      icon: CheckCircle,
      status: 'completed',
      date: '2023-12-01',
      time: '02:15 PM'
    },
    {
      id: 3,
      title: 'Shipped from Japan',
      description: 'Vehicle loaded on vessel "Mitsui Express"',
      icon: Ship,
      status: 'completed',
      date: '2023-12-05',
      time: '08:00 AM'
    },
    {
      id: 4,
      title: 'In Transit',
      description: 'Currently en route to Colombo Port',
      icon: Truck,
      status: 'current',
      date: '2023-12-15',
      time: '06:30 AM',
      details: 'Expected arrival: Jan 10, 2024'
    },
    {
      id: 5,
      title: 'Customs Clearance',
      description: 'Processing customs documentation',
      icon: FileCheck,
      status: 'upcoming',
      date: '',
      time: ''
    },
    {
      id: 6,
      title: 'Registration Complete',
      description: 'Vehicle registered in your name',
      icon: CheckCircle,
      status: 'upcoming',
      date: '',
      time: ''
    },
    {
      id: 7,
      title: 'Delivered',
      description: 'Vehicle delivered to your location',
      icon: CheckCircle,
      status: 'upcoming',
      date: '',
      time: ''
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'update',
      title: 'Vessel Departure Update',
      message: 'Your vehicle has departed from Tokyo Port and is en route to Colombo.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'document',
      title: 'Document Upload Required',
      message: 'Please upload your NIC copy for customs clearance.',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Confirmation',
      message: 'Your escrow payment has been confirmed and secured.',
      time: '3 days ago',
      read: true
    }
  ];

  const [notificationSettings, setNotificationSettings] = useState({
    sms: true,
    email: true,
    push: false
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'current':
        return Clock;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'current':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-400 bg-gray-100';
    }
  };

  const currentOrder = orders.find(order => order.id === selectedOrder);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracking</h1>
        <p className="text-gray-600">Monitor your vehicle import progress in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Tracking Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedOrder === order.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.vehicle}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.status === 'In Transit' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">
                          ETA: {order.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{order.progress}%</span>
                      </div>
                      <Progress value={order.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Status */}
          {currentOrder && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Current Status: {currentOrder.status}
                </CardTitle>
                <CardDescription>
                  Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Current Location:</span>
                      <span className="font-semibold">{currentOrder.currentLocation}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-3">
                      <span>Estimated Delivery:</span>
                      <span className="font-semibold">{currentOrder.estimatedDelivery}</span>
                    </div>
                    <Progress value={currentOrder.progress} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tracking Timeline</CardTitle>
              <CardDescription>Detailed progress of your vehicle import</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trackingStages.map((stage, index) => {
                  const StatusIcon = getStatusIcon(stage.status);
                  const isLast = index === trackingStages.length - 1;
                  
                  return (
                    <div key={stage.id} className="relative flex items-start">
                      {/* Connector Line */}
                      {!isLast && (
                        <div 
                          className={`absolute left-6 top-12 w-0.5 h-16 ${
                            stage.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                          }`} 
                        />
                      )}
                      
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(stage.status)}`}>
                        <StatusIcon className="h-6 w-6" />
                      </div>
                      
                      {/* Content */}
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{stage.title}</h3>
                          {stage.date && (
                            <div className="text-right text-sm text-gray-500">
                              <div>{stage.date}</div>
                              <div>{stage.time}</div>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{stage.description}</p>
                        {stage.details && (
                          <p className="text-blue-600 mt-1 text-sm">{stage.details}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <FileCheck className="h-4 w-4 mr-2" />
                View Documents
              </Button>
              <Button className="w-full" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button className="w-full" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Delivery
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-start space-x-3">
                      {notification.type === 'update' && <Truck className="h-5 w-5 text-blue-600 mt-0.5" />}
                      {notification.type === 'document' && <FileCheck className="h-5 w-5 text-amber-600 mt-0.5" />}
                      {notification.type === 'payment' && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Notifications
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="sms">SMS Updates</Label>
                </div>
                <Switch
                  id="sms"
                  checked={notificationSettings.sms}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, sms: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="email">Email Updates</Label>
                </div>
                <Switch
                  id="email"
                  checked={notificationSettings.email}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, email: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="push">Push Notifications</Label>
                </div>
                <Switch
                  id="push"
                  checked={notificationSettings.push}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, push: checked})}
                />
              </div>
              <Button variant="outline" className="w-full mt-4">
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Support Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  <span>+94 77 123 4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  <span>tracking@autolink.lk</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  <span>24/7 Support Available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}