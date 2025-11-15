import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck,
  Star,
  Award,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// This would normally come from route params or state
const selectedExpert = {
  name: 'Dr. Sarah Chen',
  title: 'Senior Structural Engineer',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  level: 'Platinum',
  rating: 4.9,
  reviews: 47,
  hourlyRate: 150,
  completedProjects: 47,
};

export function Checkout() {
  const navigate = useNavigate();
  const [hours, setHours] = useState(20);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = selectedExpert.hourlyRate * hours;
  const platformFee = subtotal * 0.1; // 10% platform fee
  const total = subtotal + platformFee;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Stripe payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment successful! Contract initiated with expert.');
      navigate('/dashboard');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-slate-900 mb-2">Secure Checkout</h1>
          <p className="text-xl text-slate-600">
            Complete your payment to hire this expert
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>
                  All transactions are secure and encrypted via Stripe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Hours Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="hours">Estimated Hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="1"
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                      required
                    />
                    <p className="text-sm text-slate-500">
                      You can add more hours later or set up hourly billing
                    </p>
                  </div>

                  <Separator />

                  {/* Card Information */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-slate-900">Card Details</h3>
                      <div className="flex gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                            maxLength={4}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Security Notice */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-start space-x-3">
                      <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-green-900 mb-1">Secure Payment Processing</p>
                        <p className="text-green-700">
                          Your payment information is encrypted and processed securely through Stripe. 
                          Funds are held in escrow until project milestones are completed.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing Payment...</>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Pay ${total.toLocaleString()} Securely
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Lock className="h-4 w-4" />
                    <span>Powered by</span>
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
                      alt="Stripe" 
                      className="h-4 opacity-60"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Terms */}
            <Card className="border-green-100">
              <CardContent className="p-6">
                <p className="text-sm text-slate-600">
                  By completing this payment, you agree to SETReG's{' '}
                  <a href="#" className="text-green-600 hover:text-green-700">Terms of Service</a> and{' '}
                  <a href="#" className="text-green-600 hover:text-green-700">Payment Policy</a>. 
                  Funds will be held in escrow and released upon milestone completion.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Expert Card */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Hiring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-green-100">
                      <AvatarImage src={selectedExpert.avatar} />
                      <AvatarFallback>
                        {selectedExpert.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-slate-900 truncate">{selectedExpert.name}</h3>
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{selectedExpert.title}</p>
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        <Award className="h-3 w-3 mr-1" />
                        {selectedExpert.level}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm pt-3 border-t border-slate-100">
                    <div className="flex items-center text-slate-600">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                      <span className="text-slate-900">{selectedExpert.rating}</span>
                      <span className="mx-1">·</span>
                      <span>{selectedExpert.reviews} reviews</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Breakdown */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-slate-700">
                    <span>Expert Rate</span>
                    <span>${selectedExpert.hourlyRate}/hour</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Estimated Hours</span>
                    <span>{hours} hours</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Platform Fee (10%)</span>
                    <span>${platformFee.toLocaleString()}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-slate-900 pt-2">
                    <span>Total</span>
                    <span className="text-xl">${total.toLocaleString()}</span>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm">
                    <p className="text-blue-900">
                      💡 <strong>Escrow Protection:</strong> Your payment is secured until work is completed and approved.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="space-y-3 text-sm">
                    {[
                      { icon: ShieldCheck, text: '256-bit SSL Encryption' },
                      { icon: Lock, text: 'Secure Escrow Payment' },
                      { icon: CheckCircle, text: 'Money-back Guarantee' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-slate-700">
                        <item.icon className="h-4 w-4 text-green-600" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
