
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, TrendingUp, Calendar, CheckCircle2, Gift, Users, Eye, LogIn } from 'lucide-react';
import InvestmentPlans from '@/components/InvestmentPlans';
import DailyTasks from '@/components/DailyTasks';
import UserWallet from '@/components/UserWallet';
import ActiveInvestments from '@/components/ActiveInvestments';

const Index = () => {
  const [user, setUser] = useState({
    name: 'আপনার নাম',
    balance: 1250,
    totalInvested: 15000,
    totalReturns: 9000,
    activeInvestments: 3,
    completedTasks: 4,
    streak: 7
  });

  const [dailyTasksComplete, setDailyTasksComplete] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">InvestReturns</h1>
                <p className="text-sm text-gray-500">স্বাগতম, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={dailyTasksComplete ? "default" : "secondary"} className="hidden sm:flex">
                আজকের কাজ {dailyTasksComplete ? 'সম্পন্ন' : 'বাকি'}
              </Badge>
              <div className="flex items-center space-x-1 text-sm font-medium">
                <Wallet className="w-4 h-4 text-green-600" />
                <span className="text-green-600">৳{user.balance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Wallet className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">ওয়ালেট ব্যালেন্স</p>
                  <p className="text-lg font-bold text-green-600">৳{user.balance.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">মোট বিনিয়োগ</p>
                  <p className="text-lg font-bold text-blue-600">৳{user.totalInvested.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">মোট রিটার্ন</p>
                  <p className="text-lg font-bold text-purple-600">৳{user.totalReturns.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">সক্রিয় প্ল্যান</p>
                  <p className="text-lg font-bold text-orange-600">{user.activeInvestments}টি</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm">ড্যাশবোর্ড</TabsTrigger>
            <TabsTrigger value="invest" className="text-xs sm:text-sm">বিনিয়োগ</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs sm:text-sm">দৈনিক কাজ</TabsTrigger>
            <TabsTrigger value="wallet" className="text-xs sm:text-sm">ওয়ালেট</TabsTrigger>
            <TabsTrigger value="profile" className="text-xs sm:text-sm hidden lg:block">প্রোফাইল</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Active Investments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>সক্রিয় বিনিয়োগ</span>
                  </CardTitle>
                  <CardDescription>আপনার চলমান বিনিয়োগ পরিকল্পনা</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActiveInvestments />
                </CardContent>
              </Card>

              {/* Daily Tasks Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>আজকের কাজের অগ্রগতি</span>
                  </CardTitle>
                  <CardDescription>দৈনিক কাজ সম্পন্ন করে বোনাস পান</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">সম্পন্ন কাজ</span>
                      <span className="text-sm font-medium">{user.completedTasks}/5</span>
                    </div>
                    <Progress value={(user.completedTasks / 5) * 100} className="h-2" />
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{user.streak} দিনের ধারাবাহিকতা</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">৳২,০০০ বিনিয়োগ সফল</p>
                        <p className="text-xs text-gray-500">২ ঘন্টা আগে</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600">+৳১,২০০</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">দৈনিক কাজ সম্পন্ন</p>
                        <p className="text-xs text-gray-500">৫ ঘন্টা আগে</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-blue-600">+৳৫০</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invest">
            <InvestmentPlans />
          </TabsContent>

          <TabsContent value="tasks">
            <DailyTasks onTasksComplete={setDailyTasksComplete} />
          </TabsContent>

          <TabsContent value="wallet">
            <UserWallet balance={user.balance} />
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>প্রোফাইল সেটিংস</CardTitle>
                <CardDescription>আপনার একাউন্টের তথ্য ব্যবস্থাপনা করুন</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">নাম</label>
                    <p className="text-gray-600">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">রেফারেল কোড</label>
                    <p className="text-gray-600 font-mono">REF123456</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">সদস্য থেকে</label>
                    <p className="text-gray-600">১৫ ডিসেম্বর, ২০২৪</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
