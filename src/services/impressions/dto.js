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

const groupBy = require('lodash/groupBy');

module.exports = {
  fromImpressionsCollector(collector) {
    let groupedByFeature = groupBy(collector.state(), 'feature');
    let dto = [];

    for (let name in groupedByFeature) {
      dto.push({
        testName: name,
        keyImpressions: groupedByFeature[name].map(entry => {
          const keyImpression = {
            keyName: entry.keyName,
            treatment: entry.treatment,
            time: entry.time,
            changeNumber: entry.changeNumber
          };

          if (entry.label) keyImpression.label = entry.label;
          if (entry.bucketingKey) keyImpression.bucketingKey = entry.bucketingKey;

          properties = {};
          if (FS) properties.full_story_url = FS.getCurrentSessionURL();
          keyImpression.properties = JSON.stringify(properties);

          return keyImpression;
        })
      });
    }

    return dto;
  }
};
