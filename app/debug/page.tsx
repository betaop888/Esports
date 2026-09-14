import { getSession } from '@/lib/simple-session';
import { redirect } from 'next/navigation';

export default async function DebugPage() {
  const session = await getSession();
  
  return (
    <div className="min-h-screen bg-[#fbfbfa] p-10">
      <h1 className="text-3xl font-bold mb-6">Debug Information</h1>
      
      <div className="bg-white border border-[#e7e8e9] rounded-[14px] p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Session Status</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div className="bg-white border border-[#e7e8e9] rounded-[14px] p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Environment Variables</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify({
            STEAM_API_KEY: process.env.STEAM_API_KEY ? 'SET' : 'NOT SET',
            SITE_URL: process.env.SITE_URL,
            SESSION_SECRET: process.env.SESSION_SECRET ? 'SET' : 'NOT SET',
            NODE_ENV: process.env.NODE_ENV
          }, null, 2)}
        </pre>
      </div>

      <div className="flex gap-4">
        <a href="/api/auth/steam" className="btn btn-dark px-5 py-3 bg-[#111a23] text-white rounded-[11px] font-bold">
          Test Steam Auth
        </a>
        <a href="/api/auth/me" className="btn btn-light px-5 py-3 bg-white border border-[#e7e8e9] rounded-[11px] font-bold">
          Test /api/auth/me
        </a>
        <a href="/profile" className="btn btn-light px-5 py-3 bg-white border border-[#e7e8e9] rounded-[11px] font-bold">
          Go to Profile
        </a>
      </div>
    </div>
  );
}
