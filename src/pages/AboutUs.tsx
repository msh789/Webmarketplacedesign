import { Card, CardContent } from '../components/ui/card';
import { Target, Heart, Globe, TrendingUp, Users, Award } from 'lucide-react';
import logoImage from 'figma:asset/0b02f3ba1aacf3b6bb856b4f4a79b14ac009355c.png';

export function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src={logoImage} alt="SETReG" className="h-40 mb-8" style={{ filter: 'brightness(0) invert(1)' }} />
              <h1 className="text-5xl mb-6">Pioneering the Green Revolution</h1>
              <p className="text-xl text-green-50">
                SETReG (Sustainable Engineering Talent Registry) is transforming how engineering projects connect with top talent worldwide.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">10K+</div>
                  <div className="text-green-100">Engineering Experts</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">5K+</div>
                  <div className="text-green-100">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">50+</div>
                  <div className="text-green-100">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">98%</div>
                  <div className="text-green-100">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-green-600 mb-4" />
                <h2 className="text-2xl text-slate-900 mb-4">Our Mission</h2>
                <p className="text-slate-700">
                  To revolutionize how engineering talent connects with impactful projects worldwide, 
                  creating sustainable solutions that benefit both people and planet. We empower 
                  professionals to do their best work while helping organizations access the 
                  expertise they need to succeed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 text-green-600 mb-4" />
                <h2 className="text-2xl text-slate-900 mb-4">Our Vision</h2>
                <p className="text-slate-700">
                  A world where engineering expertise flows freely across borders, where sustainable 
                  innovation is accessible to all, and where every project contributes to a greener, 
                  more equitable future. We envision SETReG as the global standard for engineering 
                  collaboration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Sustainability',
                description: 'Environmental responsibility is at the heart of our platform. We prioritize green projects and sustainable practices in everything we do.'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'We believe in the power of collaboration. Our platform fosters a supportive global community of engineering professionals.'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'We maintain the highest standards for quality, professionalism, and expertise, ensuring exceptional outcomes for all projects.'
              },
              {
                icon: Shield,
                title: 'Trust',
                description: 'Transparency, security, and integrity form the foundation of every interaction on our platform.'
              },
              {
                icon: TrendingUp,
                title: 'Innovation',
                description: 'We continuously evolve our platform with cutting-edge technology to better serve our community.'
              },
              {
                icon: Heart,
                title: 'Impact',
                description: 'Every project should make a difference. We connect talent with work that creates positive change in the world.'
              }
            ].map((value, index) => (
              <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-slate-900 mb-2 text-xl">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-slate-900 mb-8 text-center">Our Story</h2>
          
          <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
            <p>
              SETReG was founded in 2020 by a team of engineers who recognized a critical gap in 
              the global marketplace: there was no dedicated platform connecting sustainable engineering 
              projects with qualified professionals who share a commitment to environmental responsibility.
            </p>
            
            <p>
              What started as a small network of environmental engineers has grown into a thriving 
              global community of over 10,000 professionals spanning civil, mechanical, electrical, 
              chemical, and software engineering disciplines. Our members have completed thousands of 
              projects across 50+ countries, collectively contributing to a more sustainable future.
            </p>
            
            <p>
              Today, SETReG stands as the premier marketplace for green engineering solutions. We've 
              facilitated over $100M in project value, helped launch countless sustainable initiatives, 
              and built a reputation for excellence, trust, and impact.
            </p>
            
            <p>
              But we're just getting started. As climate challenges intensify and the demand for 
              sustainable solutions grows, SETReG is positioned to be the bridge between innovation 
              and implementation, between vision and reality, between today's challenges and tomorrow's 
              solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Team (placeholder) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-slate-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-slate-600">
              Meet the people driving SETReG's mission forward
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Sarah Chen', role: 'CEO & Co-Founder', specialty: 'Environmental Engineering' },
              { name: 'Michael Rodriguez', role: 'CTO & Co-Founder', specialty: 'Software Architecture' },
              { name: 'Aisha Patel', role: 'Head of Operations', specialty: 'Industrial Engineering' },
              { name: 'James O\'Connor', role: 'Head of Trust & Safety', specialty: 'Systems Engineering' }
            ].map((member, index) => (
              <Card key={index} className="text-center border-green-100">
                <CardContent className="p-6">
                  <div className="bg-green-100 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-green-600 mb-2">{member.role}</p>
                  <p className="text-xs text-slate-500">{member.specialty}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">Join Our Mission</h2>
          <p className="text-xl text-green-50 mb-8">
            Be part of the global community building a sustainable future through engineering excellence
          </p>
        </div>
      </section>
    </div>
  );
}

// Add Shield import
import { Shield } from 'lucide-react';