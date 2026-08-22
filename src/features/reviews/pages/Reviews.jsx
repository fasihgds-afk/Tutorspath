import React from 'react';
import ReviewsBanner from '../components/ReviewsBanner';
import ReviewsHeader from '../components/ReviewsHeader';
import ReviewCard from '../components/ReviewCard';
import WhyChooseUs from '../components/WhyChooseUs';
import ReviewsSupportWidget from '../components/ReviewsSupportWidget';

const reviews = [
  {
    id: 1,
    initial: 'D',
    name: 'Daniel P.',
    title: 'Clear and easy to understand',
    time: '2 hours ago',
    rating: 5,
    text: 'My tutor made a difficult subject feel surprisingly simple. Every session was clear, focused, and easy to follow.',
  },
  {
    id: 2,
    initial: 'O',
    name: 'Olivia M.',
    title: 'Excellent exam preparation',
    time: '4 hours ago',
    rating: 5,
    text: 'TutorsPath helped me prepare for my exams with a study plan that actually worked for me. I felt much more confident going into the exam.',
  },
  {
    id: 3,
    initial: 'E',
    name: 'Ethan R.',
    title: 'Personalized tutoring',
    time: '1 day ago',
    rating: 5,
    text: 'The personalized attention made a huge difference. My tutor took the time to understand my weaknesses and worked on them patiently.',
  },
  {
    id: 4,
    initial: 'S',
    name: 'Sophia L.',
    title: 'Finally understood mathematics',
    time: '2 days ago',
    rating: 5,
    text: 'I was struggling with mathematics for months, but after a few sessions I finally started understanding the concepts instead of just memorizing formulas.',
  },
  {
    id: 5,
    initial: 'N',
    name: 'Noah W.',
    title: 'Knowledgeable and professional tutor',
    time: '3 days ago',
    rating: 5,
    text: 'The tutor was knowledgeable, friendly, and very professional. The lessons were interactive and never felt boring.',
  },
  {
    id: 6,
    initial: 'M',
    name: 'Michael T.',
    title: 'Great support for my child',
    time: '4 days ago',
    rating: 5,
    text: "As a parent, I wanted someone who could support my child's learning without doing the work for them. TutorsPath has been a great fit.",
  },
  {
    id: 7,
    initial: 'A',
    name: 'Aisha K.',
    title: 'Perfect university-level support',
    time: '5 days ago',
    rating: 5,
    text: 'I needed help with a university-level subject and found the right tutor quickly. The explanations were detailed and exactly at my level.',
  },
  {
    id: 8,
    initial: 'L',
    name: 'Lucas B.',
    title: 'A real boost in confidence',
    time: '6 days ago',
    rating: 5,
    text: "My tutor always came prepared and made sure I understood each topic before moving forward. I've noticed a real improvement in my confidence.",
  },
  {
    id: 9,
    initial: 'E',
    name: 'Emma J.',
    title: 'Flexible online tutoring',
    time: '1 week ago',
    rating: 5,
    text: 'TutorsPath gave me the flexibility to learn around my schedule. Being able to study online with a tutor who understood my needs was incredibly helpful.',
  },
  {
    id: 10,
    initial: 'R',
    name: 'Ryan S.',
    title: 'Focused on real understanding',
    time: '1 week ago',
    rating: 5,
    text: "What I liked most was the focus on understanding. My tutor didn't just give me answers—they taught me how to approach problems myself.",
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
