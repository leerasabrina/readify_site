import React from 'react';
import { useNavigate } from 'react-router';

const Terms = () => {
    const navigate=useNavigate();
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <button
        className="btn btn-sm btn-outline mb-4"
        onClick={() => navigate('/')}
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to Readify! These terms and conditions outline the rules and regulations for the use of our website.
      </p>

      <h1 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h1>
      <p className="mb-4">
        By accessing this website, you agree to be bound by these Terms and Conditions and our Privacy Policy.
        If you do not agree to these terms, please do not use our website.
      </p>

      <h1 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h1>
      <p className="mb-4">
        You are granted a limited license to access and use the website for personal and non-commercial purposes only.
        You agree not to use the website for any illegal or unauthorized purpose.
      </p>

      <h1 className="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property</h1>
      <p className="mb-4">
        All content, trademarks, and data on this website are the property of Readify or its licensors.
        You may not reproduce, duplicate, copy, sell, or exploit any content without prior written permission.
      </p>

      <h1 className="text-2xl font-semibold mt-8 mb-4">4. User Conduct</h1>
      <p className="mb-4">
        You agree to use the website responsibly and not engage in activities that may harm or disrupt the service.
      </p>

      <h1 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h1>
      <p className="mb-4">
        Readify is provided “as is” without warranties of any kind.
        We are not liable for any damages arising from the use of our website.
      </p>

      <h1 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h1>
      <p className="mb-4">
        We reserve the right to modify these terms at any time.
        Your continued use of the website after changes constitutes acceptance of the new terms.
      </p>

      <h1 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h1>
      <p>
        If you have any questions about these Terms and Conditions, please contact us at 
        <a href="mailto:lsabrinahossain@gmail.com" className="text-blue-600 hover:underline ml-1">support@readify.com</a>.
      </p>
    </div>
  );
};

export default Terms;
