export const VALIDATION_STATUS = Object.freeze(['PASS', 'FAIL', 'REVIEW']);
export const VALIDATION_SEVERITY = Object.freeze(['CRITICAL', 'ERROR', 'WARNING', 'INFO']);
export const VALIDATION_CATEGORY = Object.freeze(['FIELD', 'TABLE', 'MATHEMATICAL', 'CROSS_FIELD', 'DOCUMENT', 'CONTENT', 'FORMAT']);
export const VALIDATION_TYPE = Object.freeze(['REQUIRED', 'FORMAT', 'ENUM', 'MATHEMATICAL', 'CROSS_FIELD', 'TABLE', 'CONTENT', 'DOCUMENT']);

export const VALIDATION_RESULT_FIELDS = [
  'ruleId',
  'category',
  'field',
  'severity',
  'status',
  'message',
  'explanation',
  'expected',
  'actual',
  'calculated',
  'difference',
  'page',
  'section',
  'row',
  'column',
  'boundingBox',
  'suggestion',
  'relatedFields',
];

export const createValidationResult = (overrides = {}) => ({
  ruleId: '',
  category: 'FIELD',
  field: '',
  severity: 'ERROR',
  status: 'FAIL',
  message: '',
  explanation: '',
  expected: null,
  actual: null,
  calculated: null,
  difference: null,
  page: null,
  section: '',
  row: null,
  column: null,
  boundingBox: null,
  suggestion: '',
  relatedFields: [],
  ...overrides,
});
