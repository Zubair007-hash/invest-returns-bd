
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Shield, Zap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const InvestmentPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, amount: 500, returns: 800, popular: false },
    { id: 2, amount: 1000, returns: 1600, popular: true },
    { id: 3, amount: 2000, returns: 3200, popular: false },
    { id: 4, amount: 4000, returns: 6400, popular: true },
    { id: 5, amount: 6000, returns: 9600, popular: false },
    { id: 6, amount: 8000, returns: 12800, popular: false },
    { id: 7, amount: 10000, returns: 16000, popular: true },
    { id: 8, amount: 15000, returns: 24000, popular: false },
    { id: 9, amount: 20000, returns: 32000, popular: false },
  ];

  const handleInvest = (plan) => {
    setSelectedPlan(plan);
    toast({
      title: "বিনিয়োগ প্রক্রিয়া শুরু",
      description: `৳${plan.amount.toLocaleString()} এর জন্য পেমেন্ট প্রক্রিয়া শুরু হচ্ছে...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">বিনিয়োগ পরিকল্পনা</h2>
        <p className="text-gray-600">৩০ দিনে ৬০% গ্যারান্টিড রিটার্ন</p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">১০০% নিরাপদ</span>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
          <Clock className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">৩০ দিনের মেয়াদ</span>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-800">৬০% রিটার্ন</span>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
          <Zap className="w-5 h-5 text-orange-600" />
          <span className="text-sm font-medium text-orange-800">তাৎক্ষণিক সক্রিয়</span>
        </div>
      </div>

      {/* Investment Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative transition-all duration-200 hover:shadow-lg ${
            plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''
          }`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                জনপ্রিয়
              </Badge>
            )}
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                ৳{plan.amount.toLocaleString()}
              </CardTitle>
              <CardDescription>
                বিনিয়োগ পরিমাণ
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  ৳{plan.returns.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">৩০ দিন পর পাবেন</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">বিনিয়োগ:</span>
                  <span className="font-medium">৳{plan.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">লাভ:</span>
                  <span className="font-medium text-green-600">৳{(plan.returns - plan.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">রিটার্ন রেট:</span>
                  <span className="font-medium text-blue-600">৬০%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">মেয়াদ:</span>
                  <span className="font-medium">৩০ দিন</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                onClick={() => handleInvest(plan)}
              >
                এখনই বিনিয়োগ করুন
              </Button>

              <p className="text-xs text-gray-500 text-center">
                * প্রতিটি প্ল্যানে একবারই বিনিয়োগ করা যাবে
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Terms */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">বিনিয়োগের শর্তাবলী:</h3>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>• প্রতিটি প্ল্যানে শুধুমাত্র একবারই বিনিয়োগ করা যাবে</li>
            <li>• দৈনিক কাজগুলো সম্পন্ন করতে হবে</li>
            <li>• ৩০ দিন পূর্ণ হলে স্বয়ংক্রিয়ভাবে রিটার্ন যোগ হবে</li>
            <li>• bKash এর মাধ্যমে পেমেন্ট করতে হবে</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentPlans;
