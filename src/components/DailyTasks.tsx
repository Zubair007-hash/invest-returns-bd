
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Play, Users, Share2, Gift, Eye, LogIn, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface BaseTask {
  id: number;
  title: string;
  description: string;
  reward: number;
  icon: React.ComponentType<any>;
  completed: boolean;
  required: boolean;
}

interface SimpleTask extends BaseTask {
  progress?: never;
  total?: never;
}

interface ProgressTask extends BaseTask {
  progress: number;
  total: number;
}

type Task = SimpleTask | ProgressTask;

interface DailyTasksProps {
  onTasksComplete: (isComplete: boolean) => void;
}

const DailyTasks: React.FC<DailyTasksProps> = ({ onTasksComplete }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'দৈনিক লগইন',
      description: 'অ্যাপে লগইন করুন এবং ৩০ সেকেন্ড থাকুন',
      reward: 10,
      icon: LogIn,
      completed: true,
      required: true,
    },
    {
      id: 2,
      title: 'বিজ্ঞাপন দেখুন',
      description: '৩টি বিজ্ঞাপন সম্পূর্ণ দেখুন',
      reward: 25,
      icon: Eye,
      completed: false,
      required: true,
      progress: 1,
      total: 3,
    },
    {
      id: 3,
      title: 'বন্ধুদের রেফার করুন',
      description: 'নতুন একজন বন্ধুকে রেফার করুন',
      reward: 50,
      icon: Users,
      completed: false,
      required: false,
    },
    {
      id: 4,
      title: 'সোশ্যাল মিডিয়া শেয়ার',
      description: 'ফেসবুকে আমাদের পোস্ট শেয়ার করুন',
      reward: 15,
      icon: Share2,
      completed: true,
      required: false,
    },
    {
      id: 5,
      title: 'দৈনিক চেক-ইন',
      description: 'চেক-ইন বোনাস সংগ্রহ করুন',
      reward: 20,
      icon: Gift,
      completed: false,
      required: true,
    },
  ]);

  const [streak, setStreak] = useState(7);
  const [totalEarned, setTotalEarned] = useState(45);

  const completedTasks = tasks.filter(task => task.completed).length;
  const requiredTasks = tasks.filter(task => task.required && task.completed).length;
  const totalRequired = tasks.filter(task => task.required).length;

  useEffect(() => {
    onTasksComplete(requiredTasks === totalRequired);
  }, [requiredTasks, totalRequired, onTasksComplete]);

  const handleCompleteTask = (taskId: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        const updatedTask: Task = { ...task, completed: true };
        
        toast({
          title: "কাজ সম্পন্ন!",
          description: `আপনি ৳${task.reward} পুরস্কার পেয়েছেন`,
        });

        setTotalEarned(prev => prev + task.reward);
        return updatedTask;
      }
      return task;
    }));
  };

  const handleWatchAd = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && 'progress' in task && 'total' in task && task.progress < task.total) {
      setTasks(prev => prev.map(t => {
        if (t.id === taskId && 'progress' in t && 'total' in t) {
          const newProgress = t.progress + 1;
          const isCompleted = newProgress >= t.total;
          
          if (isCompleted) {
            toast({
              title: "বিজ্ঞাপন দেখা সম্পন্ন!",
              description: `আপনি ৳${t.reward} পুরস্কার পেয়েছেন`,
            });
            setTotalEarned(prev => prev + t.reward);
          } else {
            toast({
              title: "বিজ্ঞাপন দেখা হয়েছে",
              description: `আরো ${t.total - newProgress}টি বিজ্ঞাপন বাকি`,
            });
          }

          const updatedTask: ProgressTask = { 
            ...t, 
            progress: newProgress, 
            completed: isCompleted 
          };
          return updatedTask;
        }
        return t;
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">সম্পন্ন কাজ</p>
                <p className="text-lg font-bold">{completedTasks}/{tasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">আজকের আয়</p>
                <p className="text-lg font-bold text-purple-600">৳{totalEarned}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">ধারাবাহিকতা</p>
                <p className="text-lg font-bold text-orange-600">{streak} দিন</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>আজকের অগ্রগতি</span>
            <Badge variant={requiredTasks === totalRequired ? "default" : "secondary"}>
              {requiredTasks}/{totalRequired} প্রয়োজনীয়
            </Badge>
          </CardTitle>
          <CardDescription>
            সকল প্রয়োজনীয় কাজ সম্পন্ন করে বোনাস পান
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(completedTasks / tasks.length) * 100} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            {completedTasks === tasks.length ? 
              'সব কাজ সম্পন্ন! অভিনন্দন!' : 
              `আরো ${tasks.length - completedTasks}টি কাজ বাকি`
            }
          </p>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const Icon = task.icon;
          const hasProgress = 'progress' in task && 'total' in task;
          
          return (
            <Card key={task.id} className={`transition-all duration-200 ${
              task.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      task.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Icon className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{task.title}</h3>
                        {task.required && (
                          <Badge variant="outline" className="text-xs">প্রয়োজনীয়</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      
                      {hasProgress && (
                        <div className="mt-2">
                          <Progress value={(task.progress / task.total) * 100} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">
                            {task.progress}/{task.total} সম্পন্ন
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">৳{task.reward}</div>
                      <div className="text-xs text-gray-500">পুরস্কার</div>
                    </div>
                    
                    {!task.completed && (
                      <Button
                        size="sm"
                        onClick={() => {
                          if (task.id === 2) {
                            handleWatchAd(task.id);
                          } else {
                            handleCompleteTask(task.id);
                          }
                        }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        {task.id === 2 && hasProgress && task.progress < task.total ? (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            দেখুন
                          </>
                        ) : (
                          'সম্পন্ন করুন'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bonus Info */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Gift className="w-6 h-6 text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-900">স্ট্রিক বোনাস</h3>
              <p className="text-sm text-purple-700">
                ৭ দিন ধারাবাহিক কাজ সম্পন্ন করলে ৳১০০ বোনাস পাবেন!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyTasks;
