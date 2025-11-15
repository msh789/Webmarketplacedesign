import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Star, 
  Award,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const reviews = [
  {
    id: 1,
    from: 'Acme Construction',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AC',
    project: 'Commercial Building Structural Analysis',
    rating: 5,
    date: '2025-11-10',
    comment: 'Outstanding work! Dr. Chen provided incredibly detailed analysis and exceeded all our expectations. The structural recommendations were thorough and well-documented.',
    helpful: 12,
  },
  {
    id: 2,
    from: 'BuildSmart Inc',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BI',
    project: 'HVAC System Design',
    rating: 5,
    date: '2025-11-08',
    comment: 'Excellent communication and technical expertise. Delivered ahead of schedule with comprehensive documentation.',
    helpful: 8,
  },
  {
    id: 3,
    from: 'GreenTech Corp',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GC',
    project: 'Environmental Impact Study',
    rating: 4,
    date: '2025-11-05',
    comment: 'Very professional and knowledgeable. Minor delays in communication but overall great quality of work.',
    helpful: 5,
  },
];

export function Reviews() {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const averageRating = 4.9;
  const totalReviews = 47;
  const ratingDistribution = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 },
  ];

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }
    toast.success('Review submitted successfully!');
    setReviewText('');
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-slate-900 mb-2">Ratings & Reviews</h1>
          <p className="text-xl text-slate-600">
            Share your experience and build trust in the community
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Rating Overview */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Overall Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-5xl text-slate-900 mb-2">{averageRating}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(averageRating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-600">{totalReviews} reviews</p>
              </div>

              <div className="space-y-2">
                {ratingDistribution.map((dist) => (
                  <div key={dist.stars} className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 w-6">{dist.stars}</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Progress value={dist.percentage} className="flex-1 h-2" />
                    <span className="text-sm text-slate-600 w-10 text-right">{dist.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Write Review */}
          <div className="lg:col-span-2">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
                <CardDescription>
                  Share your experience with recently completed projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-slate-300 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="review" className="block text-sm text-slate-700 mb-2">
                    Your Review
                  </label>
                  <Textarea
                    id="review"
                    placeholder="Share details about your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleSubmitReview}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews List */}
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle>All Reviews</CardTitle>
            <CardDescription>
              Recent feedback from clients and experts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.from.substring(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-slate-900">{review.from}</h3>
                        <p className="text-sm text-slate-500">{review.project}</p>
                      </div>
                      <span className="text-sm text-slate-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        <Award className="h-3 w-3 mr-1" />
                        Verified Purchase
                      </Badge>
                    </div>

                    <p className="text-slate-700 mb-3">{review.comment}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-slate-600 hover:text-green-600 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        Helpful ({review.helpful})
                      </button>
                      <button className="flex items-center gap-1 text-slate-600 hover:text-green-600 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
