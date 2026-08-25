import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/siteConfig';

const TopWritersSection = () => {
  const writers = [
    {
      id: 1,
      name: 'Karen R. Rose.',
      degree: 'PhD in Management',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: '4.9/5',
      experience: '8+',
      orders: '1,329+',
      successRate: '98%',
      reviews: '5.3K+',
      tags: ['Business & Management', 'Research Papers', 'Case Studies', 'Marketing'],
      extraTags: '+2 More',
    },
    {
      id: 2,
      name: 'Christopher A. Jones.',
      degree: 'PhD in Computer Science',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: '4.9/5',
      experience: '7+',
      orders: '1,195+',
      successRate: '97%',
      reviews: '4.7K+',
      tags: ['Computer Science', 'Programming', 'AI & ML', 'Data Structures'],
      extraTags: '+2 More',
    },
    {
      id: 3,
      name: 'David M. Cannaday.',
      degree: 'PhD in Economics',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: '4.8/5',
      experience: '6+',
      orders: '1,073+',
      successRate: '96%',
      reviews: '4.2K+',
      tags: ['Economics', 'Finance', 'Statistical Analysis', 'Maths'],
      extraTags: '+2 More',
    },
  ];

  return (
    <section className="w-full bg-[#f8f9fc] py-10 px-4 sm:px-6 lg:px-8" id="top-writers">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">

        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-1.5 bg-primary-soft text-brand-purple px-3.5 py-1 rounded-full text-[13px] font-semibold mb-4 shadow-xs border border-primary-border">
          <svg className="w-4 h-4 text-brand-purple" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd"></path>
          </svg>
          Our Top Tutors
        </div>

        {/* Main Heading */}
        <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-gray-900 text-center tracking-tight leading-snug max-w-[800px] mb-2.5">
          Meet Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-primary">
            Top 3 Tutors
          </span>{' '}
          out of 500+ PhD Tutors
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] sm:text-[15px] text-gray-600 text-center max-w-[600px] mb-8 font-medium">
          Handpicked experts with proven records of success in academic tutoring across various subjects.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full max-w-[1040px]">
          {writers.map((writer) => (
            <div
              key={writer.id}
              className="bg-white rounded-[20px] p-5 shadow-xs border border-card-border flex flex-col justify-between relative hover:shadow-sm transition-shadow"
            >
              <div>
                {/* Top Profile Row */}
                <div className="flex items-start justify-between relative mb-3.5 gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200">
                      <img src={writer.avatar} alt={writer.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="text-[15px] font-bold text-gray-900 whitespace-nowrap truncate">{writer.name}</h3>
                        {/* Verified Badge Icon */}
                        <svg className="w-4 h-4 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.99 14l-4.2-4.2 1.41-1.41 2.79 2.79 7.21-7.21 1.41 1.41-8.62 8.62z" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex text-amber-400 text-[12px]">★★★★★</div>
                        <span className="text-[12px] font-bold text-gray-900">{writer.rating}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium mt-0.5 whitespace-nowrap">{writer.degree}</p>
                    </div>
                  </div>

                  {/* Experience Badge */}
                  <div className="bg-primary-soft text-brand-purple px-2.5 py-1 rounded-lg text-center shrink-0 border border-primary-border ml-2">
                    <div className="text-[13px] font-extrabold leading-none">{writer.experience}</div>
                    <div className="text-[8px] font-bold text-brand-purple uppercase tracking-wider mt-0.5 whitespace-nowrap">Years Exp.</div>
                  </div>
                </div>

                {/* Stats Divider Box */}
                <div className="bg-gray-50 rounded-xl p-2.5 grid grid-cols-3 gap-1.5 border border-gray-100 mb-3.5 text-center">
                  <div>
                    <div className="text-[13px] font-extrabold text-gray-900">{writer.orders}</div>
                    <div className="text-[10px] text-gray-500 font-medium mt-0.5">Sessions</div>
                  </div>
                  <div className="border-x border-gray-200">
                    <div className="text-[13px] font-extrabold text-gray-900">{writer.successRate}</div>
                    <div className="text-[10px] text-gray-500 font-medium mt-0.5">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold text-gray-900">{writer.reviews}</div>
                    <div className="text-[10px] text-gray-500 font-medium mt-0.5">Reviews</div>
                  </div>
                </div>

                {/* Specialized in Section */}
                <div className="mb-4">
                  <h4 className="text-[11px] font-bold text-gray-700 mb-2">Specialized in</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {writer.tags.map((tag, i) => (
                      <span key={i} className="bg-primary-soft text-brand-purple text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                    <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded-md">
                      {writer.extraTags}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopWritersSection;
