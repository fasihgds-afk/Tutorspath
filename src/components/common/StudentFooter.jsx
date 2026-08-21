import React from 'react';
import { Link } from 'react-router-dom';

const StudentFooter = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 py-6 px-4 sm:px-6 lg:px-8 text-center mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Line 1: Copyright & Legal Policy Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 font-medium">
          <span>&copy; {new Date().getFullYear()} Tutorsfy. All rights reserved.</span>
          <span className="text-slate-300 select-none">•</span>
          <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span className="text-slate-300 select-none">•</span>
          <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          <span className="text-slate-300 select-none">•</span>
          <Link to="#" className="hover:text-primary transition-colors">Academic Integrity</Link>
        </div>

        {/* Line 2: Educational Disclaimer */}
        <p className="text-[11.5px] text-slate-400 max-w-4xl mx-auto leading-relaxed">
          Disclaimer: The research, editing, and model writing services provided on this platform are intended strictly for educational reference and academic guidance purposes.
        </p>
      </div>
    </footer>
  );
};

export default StudentFooter;
