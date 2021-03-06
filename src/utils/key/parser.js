const toString = require('lodash/toString');
const isObject = require('lodash/isObject');

/**
 * Verify type of key and return a valid object key used for get treatment for a
 * specific split.
 */
module.exports = (key: any): SplitKeyObject => {
  if (isObject(key)) {
    // If we've received an object, we will convert to string the matchingKey and bucketingKey properties
    const keyObject = {
      matchingKey: toString(key.matchingKey),
      bucketingKey: toString(key.bucketingKey)
    };
    // and if they've resulted on an empty string, we throw an error.
    if (!keyObject.bucketingKey.length || !keyObject.matchingKey.length) {
      throw 'Key object should have properties bucketingKey and matchingKey.';
    }

    return keyObject;
  }
  // In case we don't have an object, we will try to coerce the value to a string, and use it for matchingKey & bucketingKey,
  // if the coercion results on an empty string, it was an invalid value.
  const keyString = toString(key);
  if (keyString.length) {
    return {
      matchingKey: keyString,
      bucketingKey: keyString
    };
  }

  throw 'Key should be a valid string value or an object with bucketingKey and matchingKey with valid string properties.';
};
