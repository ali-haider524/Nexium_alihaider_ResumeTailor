import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js'; // ✅ Add this line

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null); // ✅ Fix typing here
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push('/login');
      } else {
        setUser(data.user);
      }
    }
    getUser();
  }, []);

  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
      <div className="bg-white rounded shadow p-4">
        <p>Your tailored resumes will appear here.</p>
      </div>
      <button
        onClick={() => router.push('/resume/new')}
        className="mt-6 bg-orange-500 text-white px-4 py-2 rounded"
      >
        + New Resume
      </button>
    </div>
  );
}
