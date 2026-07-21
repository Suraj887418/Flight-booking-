import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-10 text-white">
          <h1 className="text-4xl font-extrabold mb-4">Terms of Service</h1>
          <p className="text-blue-100 text-lg">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="p-10 text-slate-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using AeroSync Booking, you accept and agree to be bound by the terms and provision of this agreement. 
              In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
            <p className="leading-relaxed">
              AeroSync Booking provides users with access to a rich collection of resources, including various communications tools, 
              search services, personalized content, and booking services through its network of properties (the "Service"). 
              You understand and agree that the Service is provided "AS-IS".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Conduct</h2>
            <p className="leading-relaxed mb-4">
              You agree to not use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, or abusive.</li>
              <li>Impersonate any person or entity, including, but not limited to, an AeroSync official.</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
              <li>Intentionally or unintentionally violate any applicable local, state, national or international law.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Modifications to Service</h2>
            <p className="leading-relaxed">
              AeroSync reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, 
              the Service (or any part thereof) with or without notice. You agree that AeroSync shall not be liable to you or to any 
              third party for any modification, suspension or discontinuance of the Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
