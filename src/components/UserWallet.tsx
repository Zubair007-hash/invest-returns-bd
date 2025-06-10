
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, Plus, Minus, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const UserWallet = ({ balance }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bkash');

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 1200,
      description: '৳২,০০০ বিনিয়োগের রিটার্ন',
      date: '2024-12-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      amount: 2000,
      description: 'বিনিয়োগ প্ল্যান ক্রয়',
      date: '2024-12-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      amount: 50,
      description: 'দৈনিক কাজের পুরস্কার',
      date: '2024-12-14',
      status: 'completed'
    },
    {
      id: 4,
      type: 'credit',
      amount: 800,
      description: '৳৫০০ বিনিয়োগের রিটার্ন',
      date: '2024-12-13',
      status: 'completed'
    },
    {
      id: 5,
      type: 'debit',
      amount: 500,
      description: 'bKash এ টাকা তোলা',
      date: '2024-12-12',
      status: 'completed'
    },
  ];

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount <= 0) {
      toast({
        title: "ভুল পরিমাণ",
        description: "সঠিক পরিমাণ লিখুন",
        variant: "destructive"
      });
      return;
    }

    if (amount > balance) {
      toast({
        title: "অপর্যাপ্ত ব্যালেন্স",
        description: "আপনার ওয়ালেটে পর্যাপ্ত টাকা নেই",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "উত্তোলনের আবেদন জমা",
      description: `৳${amount} উত্তোলনের জন্য আবেদন প্রক্রিয়াধীন`,
    });
    setWithdrawAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="w-6 h-6" />
            <span>ওয়ালেট ব্যালেন্স</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">৳{balance.toLocaleString()}</div>
          <p className="text-green-100">উপলব্ধ টাকা</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">লেনদেনের ইতিহাস</TabsTrigger>
          <TabsTrigger value="withdraw">টাকা তুলুন</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক লেনদেন</CardTitle>
              <CardDescription>আপনার সকল আর্থিক কার্যক্রম</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownRight className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.status === 'completed' ? 'সম্পন্ন' : 'প্রক্রিয়াধীন'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>টাকা তুলুন</CardTitle>
              <CardDescription>আপনার bKash নম্বরে টাকা পাঠান</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">উত্তোলনের পরিমাণ</label>
                <Input
                  type="number"
                  placeholder="পরিমাণ লিখুন"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  সর্বনিম্ন: ৳১০০ | সর্বোচ্চ: ৳{balance.toLocaleString()}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">পেমেন্ট পদ্ধতি</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedMethod === 'bkash' 
                        ? 'border-pink-500 bg-pink-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMethod('bkash')}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">bKash</span>
                    </div>
                  </button>

                  <button
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedMethod === 'bank' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMethod('bank')}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">ব্যাংক</span>
                    </div>
                  </button>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                onClick={handleWithdraw}
                disabled={!withdrawAmount}
              >
                <Minus className="w-4 h-4 mr-2" />
                টাকা তুলুন
              </Button>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>বিজ্ঞপ্তি:</strong> উত্তোলনের আবেদন ২৪ ঘন্টার মধ্যে প্রক্রিয়া করা হবে।
                  ৳১০ সার্ভিস চার্জ কাটা হবে।
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserWallet;
