import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-10 text-white">
          <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="p-10 text-slate-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to AeroSync Booking. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. The Data We Collect About You</h2>
            <p className="leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
              <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of flights and hotels you have booked.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Personal Data</h2>
            <p className="leading-relaxed">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data 
              to perform the contract we are about to enter into or have entered into with you, or where it is necessary 
              for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
            <p className="leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
              used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal 
              data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
