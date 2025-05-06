import React from 'react';
import Layout from '../components/Layout';

const CallToAction = () => {
  return (
    <Layout>
      <div className="p-8 max-w-5xl mx-auto text-center text-gray-800">
        {/* Hero Section */}
        <h1 className="text-4xl font-bold mb-4 text-[#6EC6A8]">Take the First Step</h1>
        <p className="text-lg mb-8">
          Join thousands of others who have already taken control of their financial future.
        </p>
        <button className="px-8 py-3 bg-[#6EC6A8] text-white font-semibold rounded hover:bg-[#5EB89B] transition duration-300 mb-16">
          Get Started
        </button>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 border rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
              <p>Get personalized financial advice from experienced professionals to help you reach your goals faster.</p>
            </div>
            <div className="p-6 border rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p>Our platform is designed with simplicity in mind—no jargon, no stress, just results.</p>
            </div>
            <div className="p-6 border rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p>Your data is protected with end-to-end encryption and strict privacy policies.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <p className="italic">"This platform changed how I manage my money. I finally feel in control!"</p>
              <p className="mt-4 font-semibold">— Alex M.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <p className="italic">"Intuitive, powerful, and genuinely helpful. Highly recommend to anyone!"</p>
              <p className="mt-4 font-semibold">— Sarah L.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="text-left space-y-6">
            <div>
              <h3 className="text-xl font-bold">Is this service really free?</h3>
              <p>Yes! You can get started without paying anything. Premium features are available, but optional.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Is my information secure?</h3>
              <p>Absolutely. We use industry-standard security measures to ensure your data stays safe and private.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">How do I get started?</h3>
              <p>Click the "Get Started" button above and follow the steps. It only takes a few minutes!</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-[#6EC6A8]">Your future is one click away.</h2>
          <button className="px-8 py-3 bg-[#6EC6A8] text-white font-semibold rounded hover:bg-[#5EB89B] transition duration-300">
            Join Now
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CallToAction;
