
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

const OrderRequirementsForm = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      // If line spacing changes, recalculate word count
      if (field === 'lineSpacing') {
        newData.wordCount = formatWordCount(prev.pages, value);
      }
      return newData;
    });
  };

  const setPageCount = (num) => {
    const pages = Math.max(1, num);
    setFormData((prev) => ({ ...prev, pages, wordCount: formatWordCount(pages, prev.lineSpacing) }));
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

      {/* Type of Work & Academic Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Type of Work"
          value={formData.typeOfWork}
          onChange={(e) => handleChange('typeOfWork', e.target.value)}
        >
          {assignmentType.groups.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.options.map((o) => (
                <option key={o.value} value={o.label}>{o.label}</option>
              ))}
            </optgroup>
          ))}
        </SelectField>

        <SelectField
          label="Academic Level"
          value={formData.academicLevel}
          onChange={(e) => handleChange('academicLevel', e.target.value)}
        >
          {academicLevel.options.map((o) => (
            <option key={o.value} value={o.label}>{o.label}</option>
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
        >
          <option value="" disabled>Please select subject</option>
          {subject.groups.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.options.map((o) => (
                <option key={o.value} value={o.label}>{o.label}</option>
              ))}
            </optgroup>
          ))}
        </SelectField>

        <SelectField
          label="Deadline"
          value={formData.deadline}
          onChange={(e) => handleChange('deadline', e.target.value)}
        >
          {deadline.options.map((o) => (
            <option key={o.value} value={o.label}>{o.label}</option>
          ))}
        </SelectField>
      </div>

      {/* Project Title */}
      <div>
        <label className={LABEL_CLASS}>Project Title</label>
        <input
          type="text"
          placeholder="Enter the title or topic of your paper"
          value={formData.projectTitle}
          onChange={(e) => handleChange('projectTitle', e.target.value)}
          className={INPUT_CLASS}
        />
      </div>

      {/* Pages, Word Count, Line Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <label className={LABEL_CLASS}>Project Guidelines</label>
        <textarea
          rows="3"
          value={formData.guidelines}
          onChange={(e) => handleChange('guidelines', e.target.value)}
          placeholder="Tell us more about your project and its requirements..."
          className={`${INPUT_CLASS} resize-y`}
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
        />

        <SelectField
          label="Font Style"
          value={formData.fontStyle}
          onChange={(e) => handleChange('fontStyle', e.target.value)}
        >
          {FONT_STYLES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </SelectField>

        <SelectField
          label="Language"
          value={formData.language}
          onChange={(e) => handleChange('language', e.target.value)}
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
