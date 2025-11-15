import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Award, 
  Star, 
  Crown, 
  Zap,
  CheckCircle,
  Lock,
  TrendingUp,
  Shield,
  MessageSquare,
  Eye,
  Percent,
  BadgeCheck
} from 'lucide-react';

const currentUser = {
  level: 'Silver',
  points: 7500,
  nextLevelPoints: 10000,
  completedProjects: 15,
  rating: 4.7
};

const levels = [
  {
    name: 'Bronze',
    icon: Award,
    color: 'bg-orange-500',
    borderColor: 'border-orange-200',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    points: '0 - 2,499',
    requirements: 'New account',
    benefits: [
      'Basic profile visibility',
      'Bid on up to 5 projects/month',
      'Standard support',
      'Basic analytics',
      '5% platform fee',
      'Profile badge'
    ]
  },
  {
    name: 'Silver',
    icon: Star,
    color: 'bg-slate-400',
    borderColor: 'border-slate-200',
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-700',
    points: '2,500 - 9,999',
    requirements: '5+ completed projects, 4.5+ rating',
    benefits: [
      'Enhanced profile visibility',
      'Bid on up to 15 projects/month',
      'Priority support',
      'Advanced analytics',
      '4% platform fee',
      'Silver badge',
      'Featured in search results',
      'Access to premium projects'
    ]
  },
  {
    name: 'Gold',
    icon: Crown,
    color: 'bg-yellow-500',
    borderColor: 'border-yellow-200',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    points: '10,000 - 24,999',
    requirements: '20+ completed projects, 4.7+ rating',
    benefits: [
      'Premium profile visibility',
      'Unlimited project bids',
      'Dedicated account manager',
      'Premium analytics & insights',
      '3% platform fee',
      'Gold badge',
      'Top search placement',
      'Exclusive project invitations',
      'Early access to new features',
      'Quarterly performance bonus'
    ]
  },
  {
    name: 'Platinum',
    icon: Zap,
    color: 'bg-purple-500',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    points: '25,000+',
    requirements: '50+ completed projects, 4.8+ rating',
    benefits: [
      'Maximum profile visibility',
      'Unlimited project bids',
      'VIP support 24/7',
      'Enterprise analytics suite',
      '2% platform fee',
      'Platinum badge',
      'Guaranteed top placement',
      'Direct client matching',
      'Private networking events',
      'Monthly performance bonus',
      'Marketing & PR support',
      'Custom contract terms'
    ]
  }
];

export function UserLevels() {
  const currentLevelIndex = levels.findIndex(l => l.name === currentUser.level);
  const progressToNext = ((currentUser.points - 2500) / (currentUser.nextLevelPoints - 2500)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-slate-900 mb-4">Membership Levels</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Grow your profile, earn more points, and unlock exclusive benefits as you progress through our membership tiers
          </p>
        </div>

        {/* Current Level Card */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white mb-12">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Current Level</span>
              <Badge className="bg-green-600 hover:bg-green-700">
                <TrendingUp className="h-4 w-4 mr-1" />
                Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-6">
              <div className={`${levels[currentLevelIndex].bgColor} p-6 rounded-full`}>
                {(() => {
                  const Icon = levels[currentLevelIndex].icon;
                  return <Icon className={`h-16 w-16 ${levels[currentLevelIndex].textColor}`} />;
                })()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl text-slate-900">{currentUser.level}</h2>
                  <Badge className={`${levels[currentLevelIndex].color} hover:opacity-90`}>
                    Level {currentLevelIndex + 1}
                  </Badge>
                </div>
                <p className="text-slate-600 mb-4">
                  {currentUser.points.toLocaleString()} points • {currentUser.completedProjects} projects completed
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progress to Gold</span>
                    <span className="text-slate-900">
                      {currentUser.points.toLocaleString()} / {currentUser.nextLevelPoints.toLocaleString()} points
                    </span>
                  </div>
                  <Progress value={progressToNext} className="h-3" />
                  <p className="text-sm text-slate-500">
                    {(currentUser.nextLevelPoints - currentUser.points).toLocaleString()} points to go!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="text-center">
                <div className="text-2xl text-slate-900 mb-1">{currentUser.completedProjects}</div>
                <div className="text-sm text-slate-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-slate-900 mb-1">{currentUser.rating}</div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-slate-900 mb-1">4%</div>
                <div className="text-sm text-slate-600">Platform Fee</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Earn Points */}
        <Card className="border-green-100 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
              How to Earn Points & Level Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-xl text-slate-900 mb-1">+500</div>
                <div className="text-sm text-slate-600">Complete a project</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Star className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-xl text-slate-900 mb-1">+100</div>
                <div className="text-sm text-slate-600">Receive 5-star review</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <BadgeCheck className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-xl text-slate-900 mb-1">+200</div>
                <div className="text-sm text-slate-600">Verify identity</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-xl text-slate-900 mb-1">+50</div>
                <div className="text-sm text-slate-600">Quick response (&lt; 2hrs)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Levels */}
        <div className="grid lg:grid-cols-2 gap-6">
          {levels.map((level, index) => {
            const Icon = level.icon;
            const isCurrent = level.name === currentUser.level;
            const isUnlocked = index <= currentLevelIndex;
            const isNext = index === currentLevelIndex + 1;

            return (
              <Card
                key={level.name}
                className={`relative ${level.borderColor} ${
                  isCurrent ? 'ring-2 ring-green-500' : ''
                } ${!isUnlocked && 'opacity-75'}`}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 hover:bg-green-700">
                      Current Level
                    </Badge>
                  </div>
                )}
                {isNext && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 hover:bg-blue-700">
                      Next Level
                    </Badge>
                  </div>
                )}

                <CardHeader className={level.bgColor}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`${level.color} p-3 rounded-full`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{level.name}</CardTitle>
                        <p className="text-sm text-slate-600 mt-1">{level.points} points</p>
                      </div>
                    </div>
                    {!isUnlocked && <Lock className="h-6 w-6 text-slate-400" />}
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h4 className="text-sm text-slate-900 mb-2">Requirements:</h4>
                    <p className="text-sm text-slate-600">{level.requirements}</p>
                  </div>

                  <div>
                    <h4 className="text-sm text-slate-900 mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {level.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className={`h-4 w-4 mr-2 flex-shrink-0 mt-0.5 ${
                            isUnlocked ? 'text-green-600' : 'text-slate-400'
                          }`} />
                          <span className={isUnlocked ? 'text-slate-700' : 'text-slate-500'}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <Card className="border-green-100 mt-12">
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 text-slate-900">Feature</th>
                    {levels.map(level => (
                      <th key={level.name} className="text-center p-3">
                        <div className={`inline-flex items-center justify-center ${level.bgColor} px-3 py-1 rounded-full`}>
                          <span className={level.textColor}>{level.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 text-slate-700">Monthly Project Bids</td>
                    <td className="text-center p-3">5</td>
                    <td className="text-center p-3">15</td>
                    <td className="text-center p-3">Unlimited</td>
                    <td className="text-center p-3">Unlimited</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 text-slate-700">Platform Fee</td>
                    <td className="text-center p-3">5%</td>
                    <td className="text-center p-3">4%</td>
                    <td className="text-center p-3">3%</td>
                    <td className="text-center p-3">2%</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 text-slate-700">Support Level</td>
                    <td className="text-center p-3">Standard</td>
                    <td className="text-center p-3">Priority</td>
                    <td className="text-center p-3">Dedicated</td>
                    <td className="text-center p-3">VIP 24/7</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 text-slate-700">Profile Visibility</td>
                    <td className="text-center p-3">Basic</td>
                    <td className="text-center p-3">Enhanced</td>
                    <td className="text-center p-3">Premium</td>
                    <td className="text-center p-3">Maximum</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 text-slate-700">Performance Bonus</td>
                    <td className="text-center p-3">—</td>
                    <td className="text-center p-3">—</td>
                    <td className="text-center p-3"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                    <td className="text-center p-3"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-700">Marketing Support</td>
                    <td className="text-center p-3">—</td>
                    <td className="text-center p-3">—</td>
                    <td className="text-center p-3">—</td>
                    <td className="text-center p-3"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-green-200 bg-gradient-to-br from-green-600 to-green-700 text-white mt-12">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-green-100" />
            <h2 className="text-2xl mb-2">Ready to Level Up?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Complete more projects, maintain high ratings, and unlock exclusive benefits as you grow your engineering career on SETReG
            </p>
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
              View Available Projects
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}