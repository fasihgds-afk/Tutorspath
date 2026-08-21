import React from 'react';

const OrderRequirementsForm = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const incrementPages = () => {
    setFormData((prev) => {
      const newPages = Math.max(1, (parseInt(prev.pages, 10) || 1) + 1);
      return { ...prev, pages: newPages, wordCount: `${newPages * 275} Words` };
    });
  };

  const decrementPages = () => {
    setFormData((prev) => {
      const newPages = Math.max(1, (parseInt(prev.pages, 10) || 1) - 1);
      return { ...prev, pages: newPages, wordCount: `${newPages * 275} Words` };
    });
  };

  const handlePagesDirectInput = (e) => {
    const num = Math.max(1, parseInt(e.target.value.replace(/\D/g, ''), 10) || 1);
    setFormData((prev) => ({ ...prev, pages: num, wordCount: `${num * 275} Words` }));
  };

  const incrementRefs = () => {
    setFormData((prev) => ({ ...prev, references: Math.max(0, (parseInt(prev.references, 10) || 0) + 1) }));
  };

  const decrementRefs = () => {
    setFormData((prev) => ({ ...prev, references: Math.max(0, (parseInt(prev.references, 10) || 0) - 1) }));
  };

  const handleRefsDirectInput = (e) => {
    const num = Math.max(0, parseInt(e.target.value.replace(/\D/g, ''), 10) || 0);
    setFormData((prev) => ({ ...prev, references: num }));
  };

  const selectClass = 'w-full px-3 py-2.5 bg-white border border-slate-300 text-slate-900 text-sm appearance-none focus:outline-none focus:border-primary cursor-pointer';
  const inputClass = 'w-full px-3 py-2.5 bg-white border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-primary';
  const labelClass = 'text-slate-800 text-sm font-semibold mb-1 block';

  return (
    <div className="bg-white border border-slate-200 p-5 flex flex-col gap-5">
      <h2 className="text-slate-900 text-base font-bold pb-3 border-b border-slate-200">
        Order Details
      </h2>

      {/* Type of Work */}
      <div>
        <label className={labelClass}>Type of Work</label>
        <div className="relative">
          <select value={formData.typeOfWork} onChange={(e) => handleChange('typeOfWork', e.target.value)} className={selectClass}>
            <option>Short Essay</option>
            <option>Research Paper</option>
            <option>Term Paper</option>
            <option>Dissertation</option>
            <option>Case Study</option>
            <option>Coursework</option>
            <option>Assignment</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
      </div>

      {/* Academic Level */}
      <div>
        <label className={labelClass}>Academic Level</label>
        <div className="relative">
          <select value={formData.academicLevel} onChange={(e) => handleChange('academicLevel', e.target.value)} className={selectClass}>
            <option>High School</option>
            <option>Undergraduate</option>
            <option>Master's</option>
            <option>Doctoral</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className={labelClass}>Subject</label>
        <div className="relative">
          <select value={formData.subject} onChange={(e) => handleChange('subject', e.target.value)} className={`${selectClass} ${!formData.subject ? 'text-slate-400' : 'text-slate-900'}`}>
            <option value="" disabled>Please select subject</option>
            <option>English Literature</option>
            <option>History</option>
            <option>Business Administration</option>
            <option>Computer Science</option>
            <option>Economics</option>
            <option>Psychology</option>
            <option>Law</option>
            <option>Nursing</option>
            <option>Engineering</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
      </div>

      {/* Project Title */}
      <div>
        <label className={labelClass}>Project Title</label>
        <input type="text" placeholder="Enter the title of your project" value={formData.projectTitle} onChange={(e) => handleChange('projectTitle', e.target.value)} className={inputClass} />
      </div>

      {/* Deadline */}
      <div>
        <label className={labelClass}>Deadline</label>
        <div className="relative">
          <select value={formData.deadline} onChange={(e) => handleChange('deadline', e.target.value)} className={selectClass}>
            <option value="15 days">15 days / Sep 5, 2026</option>
            <option value="7 days">7 days</option>
            <option value="3 days">3 days</option>
            <option value="24 hours">24 hours</option>
            <option value="12 hours">12 hours</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
      </div>

      {/* Pages, Word Count, Line Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Number of Pages */}
        <div>
          <label className={labelClass}>Number of Pages</label>
          <div className="flex items-center border border-slate-300 overflow-hidden">
            <button type="button" onClick={decrementPages} className="bg-primary text-white w-10 py-2.5 font-bold hover:bg-primary-hover cursor-pointer text-lg leading-none">−</button>
            <input type="text" value={formData.pages} onChange={handlePagesDirectInput} className="flex-1 text-center py-2.5 text-slate-900 text-sm font-bold focus:outline-none border-0" />
            <button type="button" onClick={incrementPages} className="bg-primary text-white w-10 py-2.5 font-bold hover:bg-primary-hover cursor-pointer text-lg leading-none">+</button>
          </div>
        </div>

        {/* Word Count */}
        <div>
          <label className={labelClass}>Word Count</label>
          <input type="text" value={formData.wordCount} disabled className="w-full px-3 py-2.5 bg-slate-100 border border-slate-300 text-slate-500 text-sm font-medium" />
        </div>

        {/* Line Spacing */}
        <div>
          <label className={labelClass}>Line Spacing</label>
          <div className="relative">
            <select value={formData.lineSpacing} onChange={(e) => handleChange('lineSpacing', e.target.value)} className={selectClass}>
              <option>Double Line Space</option>
              <option>Single Line Space</option>
              <option>1.5 Line Space</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>
        </div>
      </div>

      {/* Project Guidelines */}
      <div>
        <label className={labelClass}>Project Guidelines</label>
        <textarea rows="3" value={formData.guidelines} onChange={(e) => handleChange('guidelines', e.target.value)} placeholder="Tell us more about your project and its requirements" className={`${inputClass} resize-y`} />
        <p className="text-slate-400 text-xs mt-1">You can send attachments after processing the order.</p>
      </div>

      {/* Citation Style */}
      <div>
        <label className={labelClass}>Citation Style</label>
        <div className="relative">
          <select value={formData.citationStyle} onChange={(e) => handleChange('citationStyle', e.target.value)} className={selectClass}>
            <option>Non Specific</option>
            <option>APA</option>
            <option>MLA</option>
            <option>Chicago</option>
            <option>Harvard</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
      </div>

      {/* References */}
      <div>
        <label className={labelClass}>References</label>
        <div className="flex items-center border border-slate-300 overflow-hidden w-36">
          <button type="button" onClick={decrementRefs} className="bg-primary text-white w-10 py-2.5 font-bold hover:bg-primary-hover cursor-pointer text-lg leading-none">−</button>
          <input type="text" value={formData.references} onChange={handleRefsDirectInput} className="flex-1 text-center py-2.5 text-slate-900 text-sm font-bold focus:outline-none border-0" />
          <button type="button" onClick={incrementRefs} className="bg-primary text-white w-10 py-2.5 font-bold hover:bg-primary-hover cursor-pointer text-lg leading-none">+</button>
        </div>
      </div>

      {/* Font Style */}
      <div>
        <label className={labelClass}>Font Style</label>
        <div className="relative">
          <select value={formData.fontStyle} onChange={(e) => handleChange('fontStyle', e.target.value)} className={selectClass}>
            <option>Calibri (Standard)</option>
            <option>Times New Roman</option>
            <option>Arial</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
      </div>

      {/* Language */}
      <div>
        <label className={labelClass}>Language</label>
        <div className="relative">
          <select value={formData.language} onChange={(e) => handleChange('language', e.target.value)} className={selectClass}>
            <option>US English</option>
            <option>UK English</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
      </div>

    </div>
  );
};

export default OrderRequirementsForm;
