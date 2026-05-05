import React, { useState } from 'react';
import { apiRequest } from '../utils/api';
import { BookOpen, CheckCircle2, Clock, Award, Star, BarChart, ArrowRight, Timer, Layout, Code, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ASSESSMENTS = [
  { id: 'react', title: 'React.js Advanced', category: 'Frontend', questions: 25, time: '30 mins', difficulty: 'Advanced', icon: <Layout className="text-blue-500" /> },
  { id: 'python', title: 'Python Backend Mastery', category: 'Backend', questions: 30, time: '45 mins', difficulty: 'Intermediate', icon: <Code className="text-green-600" /> },
  { id: 'sql', title: 'SQL & Database Design', category: 'Data', questions: 20, time: '25 mins', difficulty: 'Intermediate', icon: <BarChart className="text-purple-600" /> },
  { id: 'cloud', title: 'AWS Cloud Fundamentals', category: 'Cloud', questions: 35, time: '50 mins', difficulty: 'Intermediate', icon: <ShieldCheck className="text-orange-500" /> },
];

const AssessmentsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [takingTest, setTakingTest] = useState(null);
  const [testStep, setTestStep] = useState(0); // 0: intro, 1: questions, 2: result
  const [score, setScore] = useState(0);

  const startTest = (test) => {
    setTakingTest(test);
    setTestStep(0);
  };

  const submitTest = async () => {
    const finalScore = Math.floor(Math.random() * 10) + 15; // Mock score
    setScore(finalScore);
    setTestStep(2);
    
    try {
      await apiRequest('/submit-assessment', {
        method: 'POST',
        body: JSON.stringify({
          skill: takingTest.title,
          score: finalScore,
          total_questions: takingTest.questions
        })
      });
      toast.success("Assessment verified and added to your profile!");
    } catch (err) {
      console.error(err);
    }
  };

  if (takingTest) {
    return (
      <div className="fixed inset-0 bg-white z-[500] flex flex-col">
        {/* Test Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">{takingTest.icon}</div>
            <div>
              <h2 className="font-bold text-gray-900">{takingTest.title}</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{takingTest.category} Assessment</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
              <Timer size={18} className="text-[#ff7301]" />
              {testStep === 1 ? '18:42 Remaining' : takingTest.time}
            </div>
            {testStep !== 2 && (
              <button onClick={() => setTakingTest(null)} className="text-gray-400 hover:text-red-500 font-bold text-sm px-4 py-2 rounded-xl hover:bg-red-50 transition-all">Quit Test</button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50/50 flex justify-center p-6 md:p-12">
          <div className="max-w-3xl w-full">
            {testStep === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100 text-center">
                <div className="w-24 h-24 bg-orange-50 rounded-[32px] flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner">🎯</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Assessment Instructions</h1>
                <p className="text-gray-500 font-medium mb-10 leading-relaxed">This assessment consists of {takingTest.questions} multiple-choice questions. You have {takingTest.time} to complete it. Once started, the timer cannot be paused.</p>
                <div className="grid grid-cols-2 gap-4 mb-10 text-left">
                  <InstructionItem text="No internet searches allowed" />
                  <InstructionItem text="One attempt per 30 days" />
                  <InstructionItem text="Verification badge on pass" />
                  <InstructionItem text="Score percentile comparison" />
                </div>
                <button onClick={() => setTestStep(1)} className="w-full bg-[#ff7301] text-white py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95">Start Assessment Now</button>
              </motion.div>
            )}

            {testStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Question 12 of 25</span>
                    <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                       <div className="w-[48%] h-full bg-[#ff7301] rounded-full"></div>
                    </div>
                 </div>
                 <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-2xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-10 leading-snug">Which of the following is used in React to manage side effects like API calls or subscriptions?</h3>
                    <div className="space-y-4">
                       <Option label="A" text="useState" />
                       <Option label="B" text="useEffect" active />
                       <Option label="C" text="useContext" />
                       <Option label="D" text="useReducer" />
                    </div>
                    <div className="flex justify-between mt-12">
                       <button className="px-8 py-4 text-gray-400 font-bold hover:bg-gray-50 rounded-2xl transition-all">Previous</button>
                       <button onClick={submitTest} className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95">Next Question</button>
                    </div>
                 </div>
              </motion.div>
            )}

            {testStep === 2 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100 text-center">
                <div className="w-24 h-24 bg-green-50 rounded-[32px] flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner">🏆</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Assessment Completed!</h1>
                <p className="text-green-600 font-bold uppercase tracking-widest text-[10px] mb-8">Verified Candidate Badge Earned</p>
                
                <div className="flex justify-center gap-10 mb-12">
                   <div>
                      <p className="text-4xl font-bold text-gray-900">{score}/{takingTest.questions}</p>
                      <p className="text-xs font-bold text-gray-400 uppercase mt-2">Your Score</p>
                   </div>
                   <div className="w-[1px] h-16 bg-gray-100"></div>
                   <div>
                      <p className="text-4xl font-bold text-[#ff7301]">Top 5%</p>
                      <p className="text-xs font-bold text-gray-400 uppercase mt-2">Percentile</p>
                   </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-3xl mb-10 text-sm text-gray-600 font-medium">
                   ✨ This result has been automatically added to your profile as a "Verified Skill" to attract premium employers.
                </div>

                <button onClick={() => setTakingTest(null)} className="w-full bg-black text-white py-5 rounded-[24px] font-bold text-lg hover:bg-gray-800 transition-all active:scale-95">Back to Dashboard</button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-serif">Skill Assessments</h1>
          <p className="text-gray-500 font-medium">Verify your expertise and stand out with verification badges.</p>
        </div>
        <div className="bg-orange-50 px-6 py-3 rounded-2xl border border-orange-100 flex items-center gap-3">
          <Award className="text-[#ff7301]" size={20} />
          <span className="text-sm font-bold text-[#ff7301]">3 Badges Earned</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 pb-1">
        {['all', 'frontend', 'backend', 'design'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold capitalize transition-all relative ${activeTab === tab ? 'text-[#ff7301]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab}
            {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#ff7301]" />}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ASSESSMENTS.map((test) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden group flex flex-col"
          >
            <div className="p-8 flex-1">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:bg-[#ff7301]/5 group-hover:scale-110 transition-all duration-500">
                {test.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{test.title}</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">{test.category} • {test.difficulty}</p>
              
              <div className="space-y-4 mb-8">
                <Stat icon={<BookOpen size={14}/>} text={`${test.questions} Questions`} />
                <Stat icon={<Clock size={14}/>} text={test.time} />
                <Stat icon={<Star size={14}/>} text="Earn verification badge" />
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={() => startTest(test)}
                className="w-full bg-white border border-gray-200 text-gray-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#ff7301] hover:text-white hover:border-[#ff7301] transition-all shadow-sm active:scale-95 group/btn cursor-pointer"
              >
                Take Assessment <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Stat = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
    <div className="text-[#ff7301] opacity-60">{icon}</div>
    {text}
  </div>
);

const InstructionItem = ({ text }) => (
  <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
    <div className="w-2 h-2 bg-[#ff7301] rounded-full"></div>
    {text}
  </div>
);

const Option = ({ label, text, active }) => (
  <button className={`w-full flex items-center gap-6 p-6 rounded-[24px] border-2 transition-all group ${active ? 'border-[#ff7301] bg-[#ff7301]/5' : 'border-gray-50 hover:border-gray-100 hover:bg-gray-50'}`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${active ? 'bg-[#ff7301] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-white'}`}>{label}</div>
    <span className={`text-base font-bold ${active ? 'text-gray-900' : 'text-gray-600'}`}>{text}</span>
  </button>
);

export default AssessmentsPage;
