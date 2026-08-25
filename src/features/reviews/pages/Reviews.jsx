import React from 'react';
import ReviewsBanner from '../components/ReviewsBanner';
import ReviewsHeader from '../components/ReviewsHeader';
import ReviewCard from '../components/ReviewCard';
import WhyChooseUs from '../components/WhyChooseUs';
import ReviewsSupportWidget from '../components/ReviewsSupportWidget';
import { SITE_CONFIG } from '../../../config/siteConfig';
import { reviewsHome, reviewsHome1 } from '../data/reviewsData';

// Pick the correct review dataset based on the active home variant
const reviews = SITE_CONFIG.activeHome === 'home' ? reviewsHome : reviewsHome1;

const Reviews = () => {
  return (
    <main className="w-full min-h-screen bg-[#f8fafc]">
      {/* Top Banner */}
      <ReviewsBanner />

      {/* Content Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column — Reviews */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* Ratings header + sort */}
          <ReviewsHeader />

          {/* Review cards */}
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
          <WhyChooseUs />
          <ReviewsSupportWidget />
        </div>

      </div>
    </main>
  );
};

export default Reviews;
