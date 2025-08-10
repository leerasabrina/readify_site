import React from 'react';
import { useNavigate } from 'react-router';

const Privacy = () => {
    const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white rounded shadow-md">
        <button
        className="btn btn-sm btn-outline mb-4"
        onClick={() => navigate('/')}
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information when you use our website.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address, and any other details you provide when using our services.
      </p>

      <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
      <p className="mb-4">
        The information we collect is used to improve our services, communicate with you, and ensure a secure and personalized experience.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
      <p className="mb-4">
        Our website may use cookies to enhance user experience. You can control cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Third-Party Services</h2>
      <p className="mb-4">
        We may share information with trusted third-party service providers who assist us in operating the website and providing services.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal information. Please contact us if you wish to exercise these rights.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please contact us at <a href="mailto:lsabrinahossain@gmail.com" className="text-blue-600 hover:underline">support@readify.com</a>.
      </p>
    </div>
  );
};

export default Privacy;
