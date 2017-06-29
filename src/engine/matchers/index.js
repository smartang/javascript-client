/**
Copyright 2016 Split Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/
'use strict';

const types = require('./types').enum;

const allMatcher = require('./all');
const segmentMatcher = require('./segment');
const whitelistMatcher = require('./whitelist');
const eqMatcher = require('./eq');
const gteMatcher = require('./gte');
const lteMatcher = require('./lte');
const betweenMatcher = require('./between');
const equalToSetMatcher = require('./eq_set');
const containsAllSetMatcher = require('./cont_all');
const containsAnySetMatcher = require('./cont_any');
const partOfSetMatcher = require('./part_of');
const swMatcher = require('./sw');
const ewMatcher = require('./ew');
const containsStrMatcher = require('./cont_str');
const dependencyMatcher = require('./dependency');

/**
 * Matcher factory.
 */
function MatcherFactory(matcherDto: Matcher, storage: SplitStorage): Function {
  let {
    type,
    value
  } = matcherDto;

  let matcherFn;

  if (type === types.ALL) {
    matcherFn = allMatcher(value);
  } else if (type === types.SEGMENT) {
    matcherFn = segmentMatcher(value, storage);
  } else if (type === types.WHITELIST) {
    matcherFn = whitelistMatcher(value);
  } else if (type === types.EQUAL_TO) {
    matcherFn = eqMatcher(value);
  } else if (type === types.GREATER_THAN_OR_EQUAL_TO) {
    matcherFn = gteMatcher(value);
  } else if (type === types.LESS_THAN_OR_EQUAL_TO) {
    matcherFn = lteMatcher(value);
  } else if (type === types.BETWEEN) {
    matcherFn = betweenMatcher(value);
  } else if (type === types.EQUAL_TO_SET) {
    matcherFn = equalToSetMatcher(value);
  } else if (type === types.CONTAINS_ANY_OF_SET) {
    matcherFn = containsAnySetMatcher(value);
  } else if (type === types.CONTAINS_ALL_OF_SET) {
    matcherFn = containsAllSetMatcher(value);
  } else if (type === types.PART_OF_SET) {
    matcherFn = partOfSetMatcher(value);
  } else if (type === types.STARTS_WITH) {
    matcherFn = swMatcher(value);
  } else if (type === types.ENDS_WITH) {
    matcherFn = ewMatcher(value);
  } else if (type === types.CONTAINS_STRING) {
    matcherFn = containsStrMatcher(value);
  } else if (type === types.IN_SPLIT_TREATMENT) {
    matcherFn = dependencyMatcher(value, storage);
  }

  return matcherFn;
}

module.exports = MatcherFactory;
