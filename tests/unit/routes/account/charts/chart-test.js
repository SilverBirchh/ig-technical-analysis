import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/charts/chart', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/charts/chart');
    assert.ok(route);
  });
});
