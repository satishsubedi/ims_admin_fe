import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated 404 SVG or Illustration */}
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-slate-200 tracking-tighter select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-xl">
               <span className="text-2xl font-bold text-slate-800">Page Not Found</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-slate-600 text-lg">
            Oops! The page you're looking for seems to have vanished into thin air.
          </p>
          <p className="text-slate-500 text-sm italic">
            "Not all who wander are lost, but it looks like you might be."
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="pt-12 flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-slate-200 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
