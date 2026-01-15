"use client";

import React, { useState } from 'react';
import { Clock, Calendar, Repeat, Plus, Trash2, Edit2, Play, Pause, CheckCircle, AlertCircle } from 'lucide-react';

interface ScheduledTask {
  id: string;
  name: string;
  type: string;
  frequency: string;
  time: string;
  days?: string[];
  status: 'active' | 'paused';
  lastRun?: string;
  nextRun: string;
}

const AEOTaskScheduler = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState<ScheduledTask[]>([
    {
      id: '1',
      name: 'Brand Mention Check',
      type: 'Brand Monitoring',
      frequency: 'daily',
      time: '09:00',
      status: 'active',
      lastRun: '2024-01-14 09:00',
      nextRun: '2024-01-15 09:00'
    },
    {
      id: '2',
      name: 'Competitor Analysis',
      type: 'Competitor Tracking',
      frequency: 'weekly',
      time: '14:00',
      days: ['Monday', 'Thursday'],
      status: 'active',
      lastRun: '2024-01-11 14:00',
      nextRun: '2024-01-15 14:00'
    },
    {
      id: '3',
      name: 'Answer Engine Crawl',
      type: 'Visibility Monitoring',
      frequency: 'hourly',
      time: 'Every hour',
      status: 'paused',
      lastRun: '2024-01-14 13:00',
      nextRun: 'Paused'
    }
  ]);

  const [taskForm, setTaskForm] = useState({
    name: '',
    type: 'Brand Monitoring',
    frequency: 'daily',
    time: '09:00',
    days: [] as string[],
    hour: '1'
  });

  const taskTypes = [
    'Brand Monitoring',
    'Competitor Tracking',
    'Visibility Monitoring',
    'Content Analysis',
    'Answer Quality Check',
    'Entity Recognition'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAddTask = () => {
    const newTask: ScheduledTask = {
      id: Date.now().toString(),
      name: taskForm.name,
      type: taskForm.type,
      frequency: taskForm.frequency,
      time: taskForm.frequency === 'hourly' ? `Every ${taskForm.hour} hour(s)` : taskForm.time,
      days: taskForm.frequency === 'weekly' ? taskForm.days : undefined,
      status: 'active',
      nextRun: 'Scheduled'
    };
    setTasks([...tasks, newTask]);
    setShowAddTask(false);
    setTaskForm({
      name: '',
      type: 'Brand Monitoring',
      frequency: 'daily',
      time: '09:00',
      days: [],
      hour: '1'
    });
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'active' ? 'paused' : 'active' }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleDay = (day: string) => {
    setTaskForm(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-indigo-50 to-fuchsia-50" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-violet-200/40 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent mb-2">
              Task Scheduler
            </h1>
            <p className="text-xl text-zinc-600">Schedule automated AEO checks and monitoring tasks</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-zinc-600 text-sm mb-1">Active Tasks</div>
                  <div className="text-3xl font-bold text-zinc-900">{tasks.filter(t => t.status === 'active').length}</div>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-zinc-600 text-sm mb-1">Paused Tasks</div>
                  <div className="text-3xl font-bold text-zinc-900">{tasks.filter(t => t.status === 'paused').length}</div>
                </div>
                <Pause className="w-10 h-10 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-zinc-600 text-sm mb-1">Total Tasks</div>
                  <div className="text-3xl font-bold text-zinc-900">{tasks.length}</div>
                </div>
                <Clock className="w-10 h-10 text-indigo-500" />
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-zinc-600 text-sm mb-1">Next Run</div>
                  <div className="text-lg font-bold text-zinc-900">In 45 min</div>
                </div>
                <AlertCircle className="w-10 h-10 text-violet-500" />
              </div>
            </div>
          </div>

          {/* Add Task Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              className="px-8 py-4 bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Schedule New Task
            </button>
          </div>

          {/* Add Task Form */}
          {showAddTask && (
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/30 shadow-lg">
              <h2 className="text-2xl font-bold text-zinc-800 mb-6">Create New Scheduled Task</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task Name */}
                <div className="md:col-span-2">
                  <label className="block text-zinc-700 font-semibold mb-2">Task Name</label>
                  <input
                    type="text"
                    value={taskForm.name}
                    onChange={(e) => setTaskForm({...taskForm, name: e.target.value})}
                    placeholder="e.g., Daily Brand Monitoring"
                    className="w-full bg-white/50 text-zinc-900 rounded-xl p-4 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                {/* Task Type */}
                <div>
                  <label className="block text-zinc-700 font-semibold mb-2">Task Type</label>
                  <select
                    value={taskForm.type}
                    onChange={(e) => setTaskForm({...taskForm, type: e.target.value})}
                    className="w-full bg-white/50 text-zinc-900 rounded-xl p-4 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    {taskTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-zinc-700 font-semibold mb-2">Frequency</label>
                  <select
                    value={taskForm.frequency}
                    onChange={(e) => setTaskForm({...taskForm, frequency: e.target.value})}
                    className="w-full bg-white/50 text-zinc-900 rounded-xl p-4 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {/* Time/Hour Selection */}
                {taskForm.frequency === 'hourly' ? (
                  <div className="md:col-span-2">
                    <label className="block text-zinc-700 font-semibold mb-2">Every X Hours</label>
                    <input
                      type="number"
                      min="1"
                      max="23"
                      value={taskForm.hour}
                      onChange={(e) => setTaskForm({...taskForm, hour: e.target.value})}
                      className="w-full bg-white/50 text-zinc-900 rounded-xl p-4 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                ) : (
                  <div className="md:col-span-2">
                    <label className="block text-zinc-700 font-semibold mb-2">Time</label>
                    <input
                      type="time"
                      value={taskForm.time}
                      onChange={(e) => setTaskForm({...taskForm, time: e.target.value})}
                      className="w-full bg-white/50 text-zinc-900 rounded-xl p-4 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                )}

                {/* Weekly Day Selection */}
                {taskForm.frequency === 'weekly' && (
                  <div className="md:col-span-2">
                    <label className="block text-zinc-700 font-semibold mb-2">Select Days</label>
                    <div className="flex flex-wrap gap-3">
                      {weekDays.map(day => (
                        <button
                          key={day}
                          onClick={() => toggleDay(day)}
                          className={`px-5 py-3 rounded-xl font-medium transition ${
                            taskForm.days.includes(day)
                              ? 'bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 text-white shadow-lg'
                              : 'bg-white/50 text-zinc-700 border border-zinc-300 hover:border-indigo-400'
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddTask}
                  disabled={!taskForm.name || (taskForm.frequency === 'weekly' && taskForm.days.length === 0)}
                  className="px-8 py-3 bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Create Task
                </button>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="px-8 py-3 bg-white/50 rounded-xl border border-zinc-300 text-zinc-700 font-semibold hover:bg-white/70 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Scheduled Tasks List */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
            <h2 className="text-2xl font-bold text-zinc-800 mb-6">Scheduled Tasks</h2>
            
            <div className="space-y-4">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-zinc-900">{task.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          task.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {task.status === 'active' ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        <div className="flex items-center text-zinc-600">
                          <Repeat className="w-4 h-4 mr-2 text-indigo-500" />
                          <span className="text-sm">
                            <span className="font-semibold">Type:</span> {task.type}
                          </span>
                        </div>
                        <div className="flex items-center text-zinc-600">
                          <Clock className="w-4 h-4 mr-2 text-violet-500" />
                          <span className="text-sm">
                            <span className="font-semibold">Frequency:</span> {task.frequency}
                          </span>
                        </div>
                        <div className="flex items-center text-zinc-600">
                          <Calendar className="w-4 h-4 mr-2 text-sky-500" />
                          <span className="text-sm">
                            <span className="font-semibold">Time:</span> {task.time}
                          </span>
                        </div>
                        {task.days && (
                          <div className="flex items-center text-zinc-600">
                            <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                            <span className="text-sm">
                              <span className="font-semibold">Days:</span> {task.days.map(d => d.slice(0, 3)).join(', ')}
                            </span>
                          </div>
                        )}
                      </div>

                      {task.lastRun && (
                        <div className="mt-3 text-sm text-zinc-500">
                          Last run: {task.lastRun} • Next run: {task.nextRun}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`p-3 rounded-xl transition hover:scale-110 ${
                          task.status === 'active'
                            ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                        }`}
                        title={task.status === 'active' ? 'Pause' : 'Resume'}
                      >
                        {task.status === 'active' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button
                        className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition hover:scale-110"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition hover:scale-110"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-indigo-50 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-indigo-900 mb-2">About Scheduled Tasks</h3>
                <p className="text-indigo-700 text-sm">
                  All scheduled tasks run automatically at the specified times. You can pause, edit, or delete tasks at any time. 
                  Tasks continue running in the background even when you're not logged in. Make sure to configure appropriate 
                  monitoring frequencies based on your AEO optimization needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AEOTaskScheduler;