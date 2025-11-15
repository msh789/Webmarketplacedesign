import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  CreditCard, 
  DollarSign, 
  Download,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const transactions = [
  {
    id: 1,
    type: 'payment',
    description: 'Payment to Dr. Sarah Chen',
    project: 'Commercial Building Analysis',
    amount: -3250,
    status: 'completed',
    date: '2025-11-14',
  },
  {
    id: 2,
    type: 'payment',
    description: 'Payment to Aisha Patel',
    project: 'Environmental Impact Study',
    amount: -2400,
    status: 'completed',
    date: '2025-11-12',
  },
  {
    id: 3,
    type: 'refund',
    description: 'Refund from cancelled project',
    project: 'Industrial Facility Review',
    amount: 1500,
    status: 'completed',
    date: '2025-11-10',
  },
  {
    id: 4,
    type: 'deposit',
    description: 'Account deposit',
    project: null,
    amount: 10000,
    status: 'completed',
    date: '2025-11-08',
  },
  {
    id: 5,
    type: 'payment',
    description: 'Milestone payment pending',
    project: 'HVAC System Design',
    amount: -1200,
    status: 'pending',
    date: '2025-11-15',
  },
];

export function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const balance = 12850;
  const pendingPayments = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalSpent = transactions.filter(t => t.type === 'payment' && t.status === 'completed').reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const handleAddPaymentMethod = () => {
    toast.success('Payment method added successfully!');
  };

  const handleWithdraw = () => {
    toast.success('Withdrawal initiated. Funds will arrive in 2-3 business days.');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-slate-900 mb-2">Payments & Billing</h1>
          <p className="text-xl text-slate-600">
            Manage your payments with secure Stripe processing
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Available Balance</p>
                <div className="bg-green-100 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl text-slate-900 mb-2">${balance.toLocaleString()}</p>
              <Button variant="outline" size="sm" onClick={handleWithdraw}>
                Withdraw Funds
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Pending Payments</p>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-3xl text-slate-900">${pendingPayments.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Total Spent</p>
                <div className="bg-slate-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-slate-600" />
                </div>
              </div>
              <p className="text-3xl text-slate-900">${totalSpent.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Saved Cards */}
                <div className="p-4 border-2 border-green-200 rounded-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <CreditCard className="h-6 w-6" />
                    <Badge className="bg-white/20 text-white hover:bg-white/30">Primary</Badge>
                  </div>
                  <p className="text-sm opacity-80 mb-1">Visa ending in</p>
                  <p className="text-xl tracking-wider">•••• 4242</p>
                  <p className="text-sm opacity-80 mt-3">Expires 12/26</p>
                </div>

                <Button variant="outline" className="w-full">
                  + Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Add Funds
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View all your payment activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Transactions</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="deposits">Deposits</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-3">
                    {transactions.map((transaction) => (
                      <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                  </TabsContent>

                  <TabsContent value="payments" className="space-y-3">
                    {transactions
                      .filter((t) => t.type === 'payment')
                      .map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                      ))}
                  </TabsContent>

                  <TabsContent value="deposits" className="space-y-3">
                    {transactions
                      .filter((t) => t.type === 'deposit')
                      .map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stripe Info */}
        <Card className="mt-6 border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-lg">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-slate-900 mb-1">Secure Payment Processing</h3>
                  <p className="text-sm text-slate-600">
                    All transactions are secured by Stripe with industry-leading encryption and fraud protection
                  </p>
                </div>
              </div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
                alt="Stripe" 
                className="h-8 opacity-60"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TransactionItem({ transaction }: { transaction: any }) {
  const isPositive = transaction.amount > 0;
  
  return (
    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-100' : 'bg-slate-100'}`}>
          {isPositive ? (
            <ArrowDownLeft className="h-5 w-5 text-green-600" />
          ) : (
            <ArrowUpRight className="h-5 w-5 text-slate-600" />
          )}
        </div>
        <div>
          <p className="text-slate-900">{transaction.description}</p>
          {transaction.project && (
            <p className="text-sm text-slate-500">{transaction.project}</p>
          )}
          <p className="text-xs text-slate-400">{new Date(transaction.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-lg ${isPositive ? 'text-green-600' : 'text-slate-900'}`}>
          {isPositive ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
        </p>
        <Badge
          className={
            transaction.status === 'completed'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }
        >
          {transaction.status === 'completed' ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <Clock className="h-3 w-3 mr-1" />
          )}
          {transaction.status}
        </Badge>
      </div>
    </div>
  );
}
