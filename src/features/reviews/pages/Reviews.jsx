import React from 'react';
import ReviewsBanner from '../components/ReviewsBanner';
import ReviewsHeader from '../components/ReviewsHeader';
import ReviewCard from '../components/ReviewCard';
import WhyChooseUs from '../components/WhyChooseUs';
import ReviewsSupportWidget from '../components/ReviewsSupportWidget';

const reviews = [
  {
    id: 1,
    initial: 'E',
    name: 'Edward R.',
    title: 'Outstanding dissertation writing support',
    time: '2 hours ago',
    rating: 5,
    text: 'My dissertation chapter was excellent with a clear argument, stronger academic tone, and proper referencing. The writer followed my university guidelines closely and delivered before the deadline.',
  },
  {
    id: 2,
    initial: 'D',
    name: 'Daniel M.',
    title: 'Excellent help with my research paper',
    time: '4 hours ago',
    rating: 5,
    text: 'I needed assistance structuring a complex research paper. The expert improved my literature review, tightened the methodology section, and made the whole paper much easier to follow.',
  },
  {
    id: 3,
    initial: 'S',
    name: 'Steven T.',
    title: 'Great essay writing assistance',
    time: '1 day ago',
    rating: 5,
    text: 'My essay was polished with better flow, clearer thesis development, and accurate citations. The feedback helped me understand how to strengthen my academic writing going forward.',
  },
  {
    id: 4,
    initial: 'W',
    name: 'William B.',
    title: 'Brilliant coursework assistance',
    time: '2 days ago',
    rating: 5,
    text: 'I used TutorsPath for my business coursework and the quality exceeded my expectations. The writer followed all instructions, included proper references, and delivered everything before the deadline.',
  },
  {
    id: 5,
    initial: 'J',
    name: 'James R.',
    title: 'Nursing research paper done perfectly',
    time: '3 days ago',
    rating: 5,
    text: 'I ordered a research paper for my nursing course and the final document was very detailed and professionally written. My professor specifically appreciated the structure and referencing.',
  },
  {
    id: 6,
    initial: 'A',
    name: 'Amelia K.',
    title: 'Fast delivery and top quality',
    time: '4 days ago',
    rating: 5,
    text: 'Needed an urgent assignment done overnight. The team delivered a well-structured piece with correct citations and no plagiarism. Will definitely use again for future assignments.',
  },
];

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
