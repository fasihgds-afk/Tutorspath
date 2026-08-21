import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavbar from '../components/navigation/StudentNavbar';
import StudentFooter from '../components/common/StudentFooter';

const StudentLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8fafc]">
      {/* Student Navigation Header */}
      <StudentNavbar />

      {/* Main Student Screen Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Student 2-Line Footer */}
      <StudentFooter />
    </div>
  );
};

export default StudentLayout;
