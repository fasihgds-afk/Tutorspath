import React from 'react';
import {
  assignmentType,
  academicLevel,
  subject,
  deadline,
} from '../../../config/dropdown-fields.config';
import SelectField from './shared/SelectField';
import NumberStepperField from './shared/NumberStepperField';
import { LINE_SPACING_OPTIONS, CITATION_STYLES, FONT_STYLES, LANGUAGES } from '../constants/orderOptions';
import { formatWordCount } from '../utils/orderHelpers';

const INPUT_CLASS =
  'w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-md text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-primary transition-colors';
const LABEL_CLASS = 'text-slate-800 text-sm font-semibold mb-1.5 block';

// editMode=true  → only deadline / numberOfPages / lineSpacing are active
// editMode=false → all fields are active (create flow)
const OrderRequirementsForm = ({ formData, setFormData, editMode = false }) => {
  const locked = editMode; // shorthand used below
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const setPageCount = (num) => {
    const pages = Math.max(1, num);
    setFormData((prev) => ({ ...prev, pages, wordCount: formatWordCount(pages) }));
  };

  const incrementPages = () => setPageCount((parseInt(formData.pages, 10) || 1) + 1);
  const decrementPages = () => setPageCount((parseInt(formData.pages, 10) || 1) - 1);
  const handlePagesDirectInput = (e) => {
    const num = Math.max(1, parseInt(e.target.value.replace(/\D/g, ''), 10) || 1);
    setPageCount(num);
  };

  const incrementRefs = () => {
    setFormData((prev) => ({
      ...prev,
      references: Math.max(0, (parseInt(prev.references, 10) || 0) + 1),
    }));
  };
  const decrementRefs = () => {
    setFormData((prev) => ({
      ...prev,
      references: Math.max(0, (parseInt(prev.references, 10) || 0) - 1),
    }));
  };
  const handleRefsDirectInput = (e) => {
    const num = Math.max(0, parseInt(e.target.value.replace(/\D/g, ''), 10) || 0);
    setFormData((prev) => ({ ...prev, references: num }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col gap-5 shadow-xs">
      <h2 className="text-slate-900 text-base font-bold pb-3 border-b border-slate-200">
        Order Requirements
      </h2>

      {/* Edit-mode notice */}
      {locked && (
        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
          <svg className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p>
            <span className="font-bold">Editing is limited.</span> Only{' '}
            <span className="font-semibold">Deadline</span>,{' '}
            <span className="font-semibold">Number of Pages</span>,{' '}
            <span className="font-semibold">Line Spacing</span>, and{' '}
            <span className="font-semibold">Add-ons</span> can be changed after order creation.
            All other fields are locked.
          </p>
        </div>
      )}

      {/* Type of Work & Academic Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Type of Work"
          value={formData.typeOfWork}
          onChange={(e) => handleChange('typeOfWork', e.target.value)}
          disabled={locked}
        >
          {assignmentType.groups.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.options.map((o) => (
                <option key={o.value} value={o.label}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ))}
        </SelectField>

        <SelectField
          label="Academic Level"
          value={formData.academicLevel}
          onChange={(e) => handleChange('academicLevel', e.target.value)}
          disabled={locked}
        >
          {academicLevel.options.map((o) => (
            <option key={o.value} value={o.label}>
              {o.label}
            </option>
          ))}
        </SelectField>
      </div>

      {/* Subject & Deadline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Subject"
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className={!formData.subject ? 'text-slate-400' : 'text-slate-800'}
          disabled={locked}
        >
          <option value="" disabled>
            Please select subject
          </option>
          {subject.groups.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.options.map((o) => (
                <option key={o.value} value={o.label}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ))}
        </SelectField>

        {/* Deadline — always editable */}
        <SelectField
          label="Deadline"
          value={formData.deadline}
          onChange={(e) => handleChange('deadline', e.target.value)}
        >
          {deadline.options.map((o) => (
            <option key={o.value} value={o.label}>
              {o.label}
            </option>
          ))}
        </SelectField>
      </div>

      {/* Project Title */}
      <div>
        <label className={`${LABEL_CLASS} ${locked ? 'text-slate-400' : ''}`}>
          Project Title
          {locked && <span className="ml-1.5 text-xs font-normal text-slate-400">(not editable)</span>}
        </label>
        <input
          type="text"
          placeholder="Enter the title or topic of your paper"
          value={formData.projectTitle}
          onChange={(e) => handleChange('projectTitle', e.target.value)}
          disabled={locked}
          className={`${INPUT_CLASS} ${locked ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200 opacity-70' : ''}`}
        />
      </div>

      {/* Pages, Word Count, Line Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Number of Pages — always editable */}
        <NumberStepperField
          label="Number of Pages"
          value={formData.pages}
          onChange={handlePagesDirectInput}
          onIncrement={incrementPages}
          onDecrement={decrementPages}
          ariaLabel="pages"
        />

        <div>
          <label className={LABEL_CLASS}>Word Count</label>
          <input
            type="text"
            value={formData.wordCount}
            disabled
            className="w-full px-3.5 h-[42px] bg-slate-100 border border-slate-300 rounded-md text-slate-600 text-sm font-semibold"
          />
        </div>

        {/* Line Spacing — always editable */}
        <SelectField
          label="Line Spacing"
          value={formData.lineSpacing}
          onChange={(e) => handleChange('lineSpacing', e.target.value)}
          fixedHeight
        >
          {LINE_SPACING_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </SelectField>
      </div>

      {/* Project Guidelines */}
      <div>
        <label className={`${LABEL_CLASS} ${locked ? 'text-slate-400' : ''}`}>
          Project Guidelines
          {locked && <span className="ml-1.5 text-xs font-normal text-slate-400">(not editable)</span>}
        </label>
        <textarea
          rows="3"
          value={formData.guidelines}
          onChange={(e) => handleChange('guidelines', e.target.value)}
          placeholder="Tell us more about your project and its requirements..."
          disabled={locked}
          className={`${INPUT_CLASS} resize-y ${locked ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200 opacity-70' : ''}`}
        />
        <p className="text-slate-500 text-xs mt-1">
          You can send attachments and files after placing the order in your dashboard.
        </p>
      </div>

      {/* Citation Style, References, Font Style, Language */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SelectField
          label="Citation Style"
          value={formData.citationStyle}
          onChange={(e) => handleChange('citationStyle', e.target.value)}
          disabled={locked}
        >
          {CITATION_STYLES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </SelectField>

        <NumberStepperField
          label="References"
          value={formData.references}
          onChange={handleRefsDirectInput}
          onIncrement={incrementRefs}
          onDecrement={decrementRefs}
          ariaLabel="references"
          disabled={locked}
        />

        <SelectField
          label="Font Style"
          value={formData.fontStyle}
          onChange={(e) => handleChange('fontStyle', e.target.value)}
          disabled={locked}
        >
          {FONT_STYLES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </SelectField>

        <SelectField
          label="Language"
          value={formData.language}
          onChange={(e) => handleChange('language', e.target.value)}
          disabled={locked}
        >
          {LANGUAGES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </SelectField>
      </div>
    </div>
  );
};

export default OrderRequirementsForm;
