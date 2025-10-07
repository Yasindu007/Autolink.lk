import React, { useState } from 'react';
import { CreditCard, DollarSign, FileText, Calculator, Shield, Landmark, User, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';

interface CheckoutPaymentProps {
  onNavigate: (screen: 'home' | 'marketplace' | 'tracking' | 'documents' | 'checkout') => void;
}

export function CheckoutPayment({ onNavigate }: CheckoutPaymentProps) {
  const [selectedVehicle] = useState({
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 28000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBjYW1yeXxlbnwxfHx8fDE3NTk4NDEx'
  });

  const [costBreakdown] = useState({
    cifValue: 28000,
    duties: 8400,
    vat: 4200,
    portCharges: 1500,
    processingFee: 500,
    total: 42600
  });

  const [financingData, setFinancingData] = useState({
    loanAmount: '35000',
    downPayment: '7600',
    interestRate: '12',
    loanTerm: '60',
    monthlyIncome: '',
    employmentType: '',
    companyName: '',
    workingYears: ''
  });

  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    nicNumber: ''
  });

  const [cashPayment, setCashPayment] = useState({
    bankName: '',
    accountHolder: '',
    paymentMethod: 'bank-transfer'
  });

  const [lcInfo, setLcInfo] = useState({
    issuingBank: '',
    beneficiaryBank: 'Sumitomo Mitsui Banking Corporation',
    lcAmount: costBreakdown.total.toString(),
    validityPeriod: '90'
  });

  const calculateEMI = () => {
    const principal = parseFloat(financingData.loanAmount) || 0;
    const rate = parseFloat(financingData.interestRate) / 100 / 12;
    const time = parseFloat(financingData.loanTerm);
    
    if (principal && rate && time) {
      const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      return emi;
    }
    return 0;
  };

  const handleSubmitFinancing = () => {
    // Handle financing application submission
    alert('Financing application submitted! You will receive a response within 24 hours.');
  };

  const handleProcessCashPayment = () => {
    // Handle cash/escrow payment
    alert('Payment instructions sent to your email. Funds will be held in escrow until vehicle delivery.');
  };

  const handleGenerateLC = () => {
    // Handle LC generation
    alert('Proforma invoice generated and sent to your bank for LC processing.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout & Payment</h1>
        <p className="text-gray-600">Complete your vehicle purchase with secure payment options</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Vehicle Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Vehicle Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <img
                  src={selectedVehicle.image}
                  alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
                  className="w-24 h-18 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </h3>
                  <p className="text-gray-600">CIF Value: ${selectedVehicle.price.toLocaleString()}</p>
                  <Badge className="mt-1">Auction Grade: 4.5</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="nicNumber">NIC Number *</Label>
                  <Input
                    id="nicNumber"
                    value={personalInfo.nicNumber}
                    onChange={(e) => setPersonalInfo({...personalInfo, nicNumber: e.target.value})}
                    placeholder="123456789V or 200012345678"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    placeholder="+94 77 123 4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={personalInfo.city}
                    onChange={(e) => setPersonalInfo({...personalInfo, city: e.target.value})}
                    placeholder="Colombo"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={personalInfo.postalCode}
                    onChange={(e) => setPersonalInfo({...personalInfo, postalCode: e.target.value})}
                    placeholder="00100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Options</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cash" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="cash" className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Cash Payment
                  </TabsTrigger>
                  <TabsTrigger value="lc" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Letter of Credit
                  </TabsTrigger>
                  <TabsTrigger value="financing" className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Financing
                  </TabsTrigger>
                </TabsList>

                {/* Cash Payment */}
                <TabsContent value="cash" className="space-y-4">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Your payment will be held in escrow until vehicle delivery and registration completion.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div>
                      <Label>Payment Method</Label>
                      <Select value={cashPayment.paymentMethod} onValueChange={(value) => setCashPayment({...cashPayment, paymentMethod: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {cashPayment.paymentMethod === 'bank-transfer' && (
                      <>
                        <div>
                          <Label htmlFor="bankName">Your Bank Name</Label>
                          <Input
                            id="bankName"
                            value={cashPayment.bankName}
                            onChange={(e) => setCashPayment({...cashPayment, bankName: e.target.value})}
                            placeholder="Commercial Bank of Ceylon"
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountHolder">Account Holder Name</Label>
                          <Input
                            id="accountHolder"
                            value={cashPayment.accountHolder}
                            onChange={(e) => setCashPayment({...cashPayment, accountHolder: e.target.value})}
                            placeholder="Same as full name above"
                          />
                        </div>
                      </>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Escrow Protection</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Funds held securely until vehicle delivery</li>
                        <li>• Released only after successful customs clearance</li>
                        <li>• Full refund if vehicle doesn't match specifications</li>
                        <li>• 24/7 escrow monitoring and support</li>
                      </ul>
                    </div>

                    <Button className="w-full" onClick={handleProcessCashPayment}>
                      <Shield className="h-4 w-4 mr-2" />
                      Process Escrow Payment
                    </Button>
                  </div>
                </TabsContent>

                {/* Letter of Credit */}
                <TabsContent value="lc" className="space-y-4">
                  <Alert>
                    <Landmark className="h-4 w-4" />
                    <AlertDescription>
                      A Letter of Credit provides secure payment guarantee through your bank.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="issuingBank">Your Bank (Issuing Bank)</Label>
                      <Select value={lcInfo.issuingBank} onValueChange={(value) => setLcInfo({...lcInfo, issuingBank: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="commercial">Commercial Bank of Ceylon</SelectItem>
                          <SelectItem value="peoples">Peoples Bank</SelectItem>
                          <SelectItem value="boc">Bank of Ceylon</SelectItem>
                          <SelectItem value="sampath">Sampath Bank</SelectItem>
                          <SelectItem value="hnb">Hatton National Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="beneficiaryBank">Beneficiary Bank (Japan)</Label>
                      <Input
                        id="beneficiaryBank"
                        value={lcInfo.beneficiaryBank}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lcAmount">LC Amount (USD)</Label>
                        <Input
                          id="lcAmount"
                          value={lcInfo.lcAmount}
                          onChange={(e) => setLcInfo({...lcInfo, lcAmount: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="validityPeriod">Validity Period (Days)</Label>
                        <Input
                          id="validityPeriod"
                          value={lcInfo.validityPeriod}
                          onChange={(e) => setLcInfo({...lcInfo, validityPeriod: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">LC Benefits</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Bank-guaranteed payment security</li>
                        <li>• International trade standard</li>
                        <li>• Automatic document verification</li>
                        <li>• Seller protection and buyer assurance</li>
                      </ul>
                    </div>

                    <Button className="w-full" onClick={handleGenerateLC}>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Proforma Invoice for LC
                    </Button>
                  </div>
                </TabsContent>

                {/* Financing */}
                <TabsContent value="financing" className="space-y-4">
                  <Alert>
                    <Calculator className="h-4 w-4" />
                    <AlertDescription>
                      Get flexible financing options with competitive interest rates from our partner banks.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="loanAmount">Loan Amount (USD)</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={financingData.loanAmount}
                        onChange={(e) => setFinancingData({...financingData, loanAmount: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="downPayment">Down Payment (USD)</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={financingData.downPayment}
                        onChange={(e) => setFinancingData({...financingData, downPayment: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        value={financingData.interestRate}
                        onChange={(e) => setFinancingData({...financingData, interestRate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="loanTerm">Loan Term (Months)</Label>
                      <Select value={financingData.loanTerm} onValueChange={(value) => setFinancingData({...financingData, loanTerm: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="36">36 Months</SelectItem>
                          <SelectItem value="48">48 Months</SelectItem>
                          <SelectItem value="60">60 Months</SelectItem>
                          <SelectItem value="72">72 Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* EMI Calculation */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Estimated Monthly EMI:</span>
                      <span className="text-xl font-bold text-blue-900">
                        ${calculateEMI().toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Payment: ${(calculateEMI() * parseFloat(financingData.loanTerm)).toFixed(2)}
                    </div>
                  </div>

                  {/* Employment Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Employment Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="monthlyIncome">Monthly Income (LKR)</Label>
                        <Input
                          id="monthlyIncome"
                          type="number"
                          value={financingData.monthlyIncome}
                          onChange={(e) => setFinancingData({...financingData, monthlyIncome: e.target.value})}
                          placeholder="150000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="employmentType">Employment Type</Label>
                        <Select value={financingData.employmentType} onValueChange={(value) => setFinancingData({...financingData, employmentType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="permanent">Permanent Employee</SelectItem>
                            <SelectItem value="contract">Contract Employee</SelectItem>
                            <SelectItem value="business">Business Owner</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="companyName">Company/Organization</Label>
                        <Input
                          id="companyName"
                          value={financingData.companyName}
                          onChange={(e) => setFinancingData({...financingData, companyName: e.target.value})}
                          placeholder="ABC Company (Pvt) Ltd"
                        />
                      </div>
                      <div>
                        <Label htmlFor="workingYears">Years of Experience</Label>
                        <Input
                          id="workingYears"
                          type="number"
                          value={financingData.workingYears}
                          onChange={(e) => setFinancingData({...financingData, workingYears: e.target.value})}
                          placeholder="5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the financing terms and conditions and authorize credit check
                    </Label>
                  </div>

                  <Button className="w-full" onClick={handleSubmitFinancing}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Submit Financing Application
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>CIF Value</span>
                  <span>${costBreakdown.cifValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duties & Taxes</span>
                  <span>${costBreakdown.duties.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT</span>
                  <span>${costBreakdown.vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Port Charges</span>
                  <span>${costBreakdown.portCharges.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>${costBreakdown.processingFee.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Landed Cost</span>
                  <span>${costBreakdown.total.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-600">
                  ≈ LKR {(costBreakdown.total * 300).toLocaleString()}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="font-semibold">What's Included:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Vehicle purchase from Japan</li>
                  <li>✓ Shipping to Sri Lanka</li>
                  <li>✓ Customs clearance</li>
                  <li>✓ All duty payments</li>
                  <li>✓ Registration assistance</li>
                  <li>✓ Insurance coordination</li>
                  <li>✓ Delivery to your location</li>
                </ul>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full mb-3"
                  onClick={() => onNavigate('marketplace')}
                >
                  ← Back to Marketplace
                </Button>
                <Button
                  className="w-full"
                  onClick={() => onNavigate('tracking')}
                >
                  Continue to Tracking
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  <span>+94 77 123 4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  <span>support@autolink.lk</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}