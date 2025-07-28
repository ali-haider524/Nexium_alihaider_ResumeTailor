'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('sending');

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/callback',
      },
    });

    if (error) {
      console.error('Supabase Error:', error.message);
      setStatus('error');
    } else {
      setStatus('sent');
    }
  } catch (err) {
    console.error('Network Error:', err);
    setStatus('error');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Sign In via Magic Link</h1>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Send Magic Link'}
        </button>

        {status === 'sent' && (
          <p className="mt-4 text-green-600">✅ Check your email for the magic link.</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600">❌ Failed to send magic link. Try again.</p>
        )}
      </form>
    </div>
  );
}
