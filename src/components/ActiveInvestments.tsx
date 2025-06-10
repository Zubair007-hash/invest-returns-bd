
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, Clock } from 'lucide-react';

const ActiveInvestments = () => {
  const investments = [
    {
      id: 1,
      amount: 2000,
      returns: 3200,
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      daysLeft: 16,
      progress: 50,
    },
    {
      id: 2,
      amount: 5000,
      returns: 8000,
      startDate: '2024-12-10',
      endDate: '2025-01-09',
      daysLeft: 25,
      progress: 17,
    },
    {
      id: 3,
      amount: 1000,
      returns: 1600,
      startDate: '2024-12-05',
      endDate: '2025-01-04',
      daysLeft: 20,
      progress: 33,
    },
  ];

  return (
    <div className="space-y-4">
      {investments.map((investment) => (
        <Card key={investment.id} className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-lg">৳{investment.amount.toLocaleString()}</h4>
                <p className="text-sm text-gray-600">বিনিয়োগ</p>
              </div>
              <Badge variant="outline" className="bg-white">
                <Clock className="w-3 h-3 mr-1" />
                {investment.daysLeft} দিন বাকি
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">অগ্রগতি:</span>
                <span className="font-medium">{investment.progress}%</span>
              </div>
              <Progress value={investment.progress} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">প্রত্যাশিত রিটার্ন:</span>
                  <p className="font-semibold text-green-600">৳{investment.returns.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">লাভ:</span>
                  <p className="font-semibold text-purple-600">৳{(investment.returns - investment.amount).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {investments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>কোনো সক্রিয় বিনিয়োগ নেই</p>
          <p className="text-sm">নতুন বিনিয়োগ শুরু করুন</p>
        </div>
      )}
    </div>
  );
};

export default ActiveInvestments;
