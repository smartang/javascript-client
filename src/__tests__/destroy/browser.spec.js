const tape = require('tape');
const map = require('lodash/map');
const pick = require('lodash/pick');

const SplitFactory = require('../../');

const fetchMock = require('fetch-mock');

const SettingsFactory = require('../../utils/settings');
const settings = SettingsFactory({
  core: {
    key: 'facundo@split.io'
  }
});

const splitChangesMock1 = require('./splitChanges.since.-1.json');
const splitChangesMock2 = require('./splitChanges.since.1500492097547.json');
const mySegmentsMock = require('./mySegments.json');
const impressionsMock = require('./impressions.json');

const delayResponse = (mock) => {
  return new Promise(res => setTimeout(res, 0)).then(() => mock);
};

fetchMock.mock(settings.url('/splitChanges?since=-1'), () => delayResponse(splitChangesMock1));
fetchMock.mock(settings.url('/splitChanges?since=1500492097547'), () => delayResponse(splitChangesMock2));

fetchMock.mock(settings.url('/mySegments/ut1'), () => delayResponse(mySegmentsMock));
fetchMock.mock(settings.url('/mySegments/ut2'), () => delayResponse(mySegmentsMock));
fetchMock.mock(settings.url('/mySegments/ut3'), () => delayResponse(mySegmentsMock));

tape('SDK destroy for BrowserJS', async function (assert) {
  // localStorage.clear();

  const config = {
    core: {
      authorizationKey: 'fake-key',
      key: 'ut1'
    }
    // mode: 'standalone',
    // storage: {
    //   type: 'LOCALSTORAGE'
    // }
  };

  const factory = SplitFactory(config);
  const client = factory.client();
  const client2 = factory.client('ut2');
  const client3 = factory.client('ut3');

  const manager = factory.manager();

  // Assert we are sending the impressions while doing the destroy
  fetchMock.post(settings.url('/testImpressions/bulk'), request => {
    return request.json().then(impressions => {
      impressions[0].keyImpressions = map(impressions[0].keyImpressions, imp => pick(imp, ['keyName', 'treatment']));

      assert.deepEqual(impressions, impressionsMock);
    });
  });

  await client.ready();

  assert.equal(client.getTreatment('Single_Test'), 'on');
  assert.equal(client2.getTreatment('Single_Test'), 'on');
  assert.equal(client3.getTreatment('Single_Test'), 'on');

  await client.destroy();
  await client2.destroy();
  await client3.destroy();

  assert.equal( client.getTreatment('Single_Test'), 'control' );
  assert.equal( client2.getTreatment('Single_Test'), 'control' );
  assert.equal( client3.getTreatment('Single_Test'), 'control' );

  assert.equal( manager.splits().length , 0 );
  assert.equal( manager.names().length ,  0 );
  assert.equal( manager.split('Single_Test') , null );

  assert.end();
});
