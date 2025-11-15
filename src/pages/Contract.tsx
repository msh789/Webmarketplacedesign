import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Download,
  Send,
  Edit,
  Shield
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const contracts = [
  {
    id: 1,
    title: 'Commercial Building Structural Analysis',
    expert: 'Dr. Sarah Chen',
    client: 'Acme Construction',
    status: 'active',
    signedDate: '2025-11-15',
    amount: 5000,
    terms: 'fixed-price',
  },
  {
    id: 2,
    title: 'Environmental Impact Study',
    expert: 'Aisha Patel',
    client: 'GreenTech Corp',
    status: 'pending-signature',
    createdDate: '2025-11-14',
    amount: 8000,
    terms: 'fixed-price',
  },
  {
    id: 3,
    title: 'HVAC System Design',
    expert: 'James Wong',
    client: 'BuildSmart Inc',
    status: 'completed',
    signedDate: '2025-10-15',
    completedDate: '2025-11-10',
    amount: 3500,
    terms: 'fixed-price',
  },
];

export function Contract() {
  const [selectedContract, setSelectedContract] = useState(contracts[0]);

  const handleSign = () => {
    toast.success('Contract signed successfully!');
  };

  const handleDownload = () => {
    toast.success('Contract downloaded');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-slate-900 mb-2">Contracts & Legal</h1>
          <p className="text-xl text-slate-600">
            Manage contracts, terms, and legal documentation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contract List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-slate-900 mb-4">All Contracts</h2>
            {contracts.map((contract) => (
              <Card
                key={contract.id}
                className={`cursor-pointer transition-all ${
                  selectedContract.id === contract.id
                    ? 'border-2 border-green-600 bg-green-50'
                    : 'border-green-100 hover:border-green-300'
                }`}
                onClick={() => setSelectedContract(contract)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm text-slate-900 line-clamp-2">{contract.title}</h3>
                    <Badge
                      className={
                        contract.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : contract.status === 'pending-signature'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-slate-100 text-slate-700'
                      }
                    >
                      {contract.status === 'active' && 'Active'}
                      {contract.status === 'pending-signature' && 'Pending'}
                      {contract.status === 'completed' && 'Completed'}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{contract.expert}</p>
                  <div className="text-sm text-slate-900">${contract.amount.toLocaleString()}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contract Details */}
          <div className="lg:col-span-2">
            <Card className="border-green-100">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{selectedContract.title}</CardTitle>
                    <CardDescription>
                      Contract ID: #{selectedContract.id.toString().padStart(6, '0')}
                    </CardDescription>
                  </div>
                  <Badge
                    className={
                      selectedContract.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : selectedContract.status === 'pending-signature'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-slate-100 text-slate-700'
                    }
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {selectedContract.status === 'active' && 'Active'}
                    {selectedContract.status === 'pending-signature' && 'Pending Signature'}
                    {selectedContract.status === 'completed' && 'Completed'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Parties */}
                    <div>
                      <h3 className="text-slate-900 mb-4">Contract Parties</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600 mb-1">Client</p>
                          <p className="text-slate-900">{selectedContract.client}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600 mb-1">Expert</p>
                          <p className="text-slate-900">{selectedContract.expert}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Financial Terms */}
                    <div>
                      <h3 className="text-slate-900 mb-4">Financial Terms</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Contract Value</span>
                          <span className="text-slate-900">${selectedContract.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Payment Terms</span>
                          <span className="text-slate-900 capitalize">{selectedContract.terms.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Platform Fee (10%)</span>
                          <span className="text-slate-900">${(selectedContract.amount * 0.1).toLocaleString()}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-slate-900">Total Payout to Expert</span>
                          <span className="text-slate-900">${(selectedContract.amount * 0.9).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Dates */}
                    <div>
                      <h3 className="text-slate-900 mb-4">Important Dates</h3>
                      <div className="space-y-3">
                        {selectedContract.signedDate && (
                          <div className="flex justify-between">
                            <span className="text-slate-600">Signed Date</span>
                            <span className="text-slate-900">
                              {new Date(selectedContract.signedDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {selectedContract.completedDate && (
                          <div className="flex justify-between">
                            <span className="text-slate-600">Completed Date</span>
                            <span className="text-slate-900">
                              {new Date(selectedContract.completedDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      {selectedContract.status === 'pending-signature' && (
                        <Button className="bg-green-600 hover:bg-green-700" onClick={handleSign}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Sign Contract
                        </Button>
                      )}
                      <Button variant="outline" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      {selectedContract.status === 'pending-signature' && (
                        <Button variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Request Changes
                        </Button>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="terms" className="space-y-4">
                    <div className="p-6 bg-slate-50 rounded-lg space-y-4">
                      <h3 className="text-slate-900">Terms & Conditions</h3>
                      
                      <div className="space-y-3 text-sm text-slate-700">
                        <div>
                          <h4 className="text-slate-900 mb-2">1. Scope of Work</h4>
                          <p>
                            The Expert agrees to provide engineering services as described in the project 
                            specification. All deliverables must meet industry standards and comply with 
                            applicable regulations.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-slate-900 mb-2">2. Payment Terms</h4>
                          <p>
                            Payment will be held in escrow and released according to milestone completion. 
                            The Client agrees to review and approve deliverables within 7 business days.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-slate-900 mb-2">3. Intellectual Property</h4>
                          <p>
                            Upon final payment, all intellectual property rights for deliverables transfer 
                            to the Client. The Expert retains the right to use the work in their portfolio.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-slate-900 mb-2">4. Confidentiality</h4>
                          <p>
                            Both parties agree to maintain confidentiality of all project-related information 
                            and not disclose it to third parties without written consent.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-slate-900 mb-2">5. Dispute Resolution</h4>
                          <p>
                            Any disputes will be resolved through SETReG's mediation service. If mediation 
                            fails, disputes will be settled through binding arbitration.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                        <div className="text-sm text-slate-700">
                          <p className="text-green-700 mb-1">Protected by SETReG</p>
                          <p>
                            This contract is legally binding and protected by our escrow payment system. 
                            All transactions are secure and monitored.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="milestones" className="space-y-3">
                    {[
                      { name: 'Initial Assessment', amount: 1250, status: 'completed' },
                      { name: 'Detailed Analysis', amount: 1750, status: 'completed' },
                      { name: 'Report Draft', amount: 1500, status: 'in-progress' },
                      { name: 'Final Review', amount: 500, status: 'pending' },
                    ].map((milestone, index) => (
                      <Card key={index} className="border-green-100">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {milestone.status === 'completed' ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : milestone.status === 'in-progress' ? (
                                <Clock className="h-5 w-5 text-blue-600" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                              )}
                              <div>
                                <p className="text-slate-900">{milestone.name}</p>
                                <p className="text-sm text-slate-600">${milestone.amount.toLocaleString()}</p>
                              </div>
                            </div>
                            <Badge
                              className={
                                milestone.status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : milestone.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-slate-100 text-slate-700'
                              }
                            >
                              {milestone.status === 'completed' && 'Completed'}
                              {milestone.status === 'in-progress' && 'In Progress'}
                              {milestone.status === 'pending' && 'Pending'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
