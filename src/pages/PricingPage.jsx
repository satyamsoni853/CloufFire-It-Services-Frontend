import React from 'react';
import { Check, Shield, Zap, Crown, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingPage = () => {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      description: 'Perfect for small teams and startups looking to hire their first team members.',
      features: ['2 Active Job Posts', 'Basic Applicant Tracking', 'Direct Messaging (Limited)', 'Standard Support'],
      buttonText: 'Current Plan',
      buttonStyle: 'bg-gray-100 text-gray-500 cursor-default',
      icon: <Zap className="text-blue-500" />
    },
    {
      name: 'Professional',
      price: '49',
      description: 'Ideal for growing companies with consistent hiring needs and advanced ATS requirements.',
      features: ['Unlimited Job Posts', 'Full ATS Access', 'Interview Scheduling Tools', 'AI Resume Parsing', 'Priority Support'],
      buttonText: 'Upgrade to Pro',
      buttonStyle: 'bg-[#ff7301] text-white shadow-xl shadow-orange-100 hover:bg-orange-600',
      popular: true,
      icon: <Star className="text-[#ff7301]" />
    },
    {
      name: 'Enterprise',
      price: '199',
      description: 'Custom solutions for large organizations requiring full-scale talent acquisition and analytics.',
      features: ['Custom Branding', 'Advanced Analytics', 'Dedicated Account Manager', 'API Access', 'Bulk Resume Export'],
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-black text-white hover:bg-gray-800',
      icon: <Crown className="text-purple-600" />
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 font-serif mb-4">Choose Your Growth Plan</h1>
        <p className="text-gray-500 font-medium leading-relaxed">Scale your team with Cloudfire's premium hiring tools. Choose the plan that fits your current needs and upgrade anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white rounded-[40px] border p-10 relative overflow-hidden transition-all hover:shadow-2xl ${
              plan.popular ? 'border-[#ff7301] shadow-xl scale-[1.05] z-10' : 'border-gray-100'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-8 right-[-35px] bg-[#ff7301] text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 px-12 rotate-45 shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-inner">
              {plan.icon}
            </div>

            <h3 className="text-2xl font-bold text-gray-900 font-serif mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
              <span className="text-gray-400 font-bold text-sm uppercase">/ Month</span>
            </div>
            
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 h-12 overflow-hidden">{plan.description}</p>

            <div className="space-y-4 mb-10">
              {plan.features.map(feat => (
                <div key={feat} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-orange-100 text-[#ff7301]' : 'bg-green-100 text-green-600'}`}>
                    <CheckCircle2 size={12} />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{feat}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-5 rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${plan.buttonStyle}`}>
              {plan.buttonText} {plan.price !== '0' && <ArrowRight size={16} />}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust Section */}
      <div className="bg-gray-50 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center text-3xl shadow-xl">🛡️</div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 font-serif">Secure Enterprise Billing</h4>
            <p className="text-gray-500 text-sm font-medium">PCI-DSS compliant payments with bank-grade encryption.</p>
          </div>
        </div>
        <div className="flex gap-8 grayscale opacity-40">
           <span className="font-black text-gray-800 tracking-tighter text-xl italic underline decoration-[#ff7301]">STRIPE</span>
           <span className="font-black text-gray-800 tracking-tighter text-xl">PAYPAL</span>
           <span className="font-black text-gray-800 tracking-tighter text-xl">VISA</span>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
