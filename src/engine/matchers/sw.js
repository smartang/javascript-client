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

const log = require('../../utils/logger')('splitio-engine:matcher');
const startsWith = require('lodash/startsWith');

function startsWithMatcherContext(ruleAttr /*: array */) /*: Function */ {
  return function startsWithMatcher(runtimeAttr /*: string */) /*: boolean */ {
    let matches = ruleAttr.some(e => startsWith(runtimeAttr, e));

    log.debug(`[startsWithMatcher] ${runtimeAttr} starts with ${ruleAttr}? ${matches}`);

    return matches;
  };
}

module.exports = startsWithMatcherContext;
