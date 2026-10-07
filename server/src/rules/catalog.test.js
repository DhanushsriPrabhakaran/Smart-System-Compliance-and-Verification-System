import assert from 'node:assert/strict';
import { RULE_CATALOG, uniqueRuleIds, getRulesByCourseType, COURSE_TYPES } from './ruleCatalog.js';

const validCategories = new Set(['FIELD', 'TABLE', 'MATHEMATICAL', 'CROSS_FIELD', 'DOCUMENT', 'CONTENT', 'FORMAT']);
const validSeverities = new Set(['CRITICAL', 'ERROR', 'WARNING', 'INFO']);
const validValidationTypes = new Set(['REQUIRED', 'FORMAT', 'ENUM', 'MATHEMATICAL', 'CROSS_FIELD', 'TABLE', 'CONTENT', 'DOCUMENT']);

const ids = RULE_CATALOG.map((rule) => rule.ruleId);
assert.equal(ids.length, new Set(ids).size, 'Duplicate rule IDs detected');

for (const rule of RULE_CATALOG) {
  assert.ok(rule.sourceDocument && String(rule.sourceDocument).trim(), `Missing sourceDocument for ${rule.ruleId}`);
  assert.ok(rule.courseType, `Missing courseType for ${rule.ruleId}`);
  assert.ok(validCategories.has(rule.category), `Invalid category for ${rule.ruleId}: ${rule.category}`);
  assert.ok(validSeverities.has(rule.severity), `Invalid severity for ${rule.ruleId}: ${rule.severity}`);
  assert.ok(validValidationTypes.has(rule.validationType), `Invalid validationType for ${rule.ruleId}: ${rule.validationType}`);
  assert.equal(typeof rule.implemented, 'boolean', `implemented must be boolean for ${rule.ruleId}`);
}

assert.equal(uniqueRuleIds().length, RULE_CATALOG.length, 'rule IDs are not unique');
assert.ok(getRulesByCourseType(COURSE_TYPES.THEORY).length >= 1, 'Theory rules missing');
assert.ok(getRulesByCourseType(COURSE_TYPES.THEORY_CUM_PRACTICAL).length >= 1, 'Theory-cum-practical rules missing');
assert.ok(getRulesByCourseType(COURSE_TYPES.LAB).length >= 1, 'Lab rules missing');

console.log(JSON.stringify({
  totalRules: RULE_CATALOG.length,
  byCourseType: {
    THEORY: getRulesByCourseType(COURSE_TYPES.THEORY).length,
    THEORY_CUM_PRACTICAL: getRulesByCourseType(COURSE_TYPES.THEORY_CUM_PRACTICAL).length,
    LAB: getRulesByCourseType(COURSE_TYPES.LAB).length,
  },
  byCategory: {
    FIELD: getRulesByCourseType(COURSE_TYPES.THEORY).filter((r) => r.category === 'FIELD').length + getRulesByCourseType(COURSE_TYPES.THEORY_CUM_PRACTICAL).filter((r) => r.category === 'FIELD').length + getRulesByCourseType(COURSE_TYPES.LAB).filter((r) => r.category === 'FIELD').length,
    TABLE: getRulesByCourseType(COURSE_TYPES.THEORY).filter((r) => r.category === 'TABLE').length + getRulesByCourseType(COURSE_TYPES.THEORY_CUM_PRACTICAL).filter((r) => r.category === 'TABLE').length + getRulesByCourseType(COURSE_TYPES.LAB).filter((r) => r.category === 'TABLE').length,
  },
}, null, 2));
