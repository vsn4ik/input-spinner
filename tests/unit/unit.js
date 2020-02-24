document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  QUnit.test('should be defined on jquery object', function(assert) {
    assert.expect(1);
    assert.ok($.fn.spinner, 'spinner method is defined');
  });

  QUnit.module('Spinner', {
    beforeEach: function() {
      this.$el = $(`
        <div id="qunit-fixture" class="js-spinner">
          <button type="button" data-spin="up">+</button>
          <input type="text" value="1" data-ruler="quantity">
          <button type="button" data-spin="down">-</button>
        </div>
      `).spinner();

      this.$spinUp = this.$el.find('[data-spin="up"]');
      this.$spinDown = this.$el.find('[data-spin="down"]');
      this.spinner = this.$el.data('spinner');
    },
    afterEach: function() {
      this.$el
        .spinner('delay', 500)
        .spinner('changed', null)
        .spinner('changing', null);

      this.spinner.spinning.$el.val(1);
    }
  });

  QUnit.test('spinner#value', function(assert) {
    assert.expect(1);
    assert.ok(this.spinner.value() === 1);
  });

  QUnit.test('Spinner#delay', function(assert) {
    assert.expect(2);
    assert.ok(this.spinner.constructor.delay === 600);
    this.$el.spinner('delay', 300, 'should plus 100');
    assert.ok(this.spinner.constructor.delay === 400);
  });

  QUnit.test('Spinner#changed', function(assert) {
    var x = this.spinner.value();
    var y = 0;

    this.$el.spinner('delay', 50).spinner('changed', function(e, newVal) {
      y = newVal;
    });
    this.$spinUp.trigger('click');
    var done = assert.async();
    setTimeout(function() {
      assert.ok(y === x + 1);
      done();
    }, 200);
  });

  QUnit.test('Spinner#changing', function(assert) {
    this.$el.spinner('changing', function(e, newVal) {
      assert.ok(newVal === 2);
    });
    this.$spinUp.trigger('click');
  });

  QUnit.test('spin via mouse click', function(assert) {
    assert.ok(this.spinner.value() === 1);
    this.$spinUp.trigger('click');
    assert.ok(this.spinner.value() === 2);
    this.$spinDown.trigger('click');
    assert.ok(this.spinner.value() === 1);
  });

  QUnit.test('pass step as a function', function(assert) {
    assert.ok(this.spinner.value() === 1);
    this.spinner.spinning.options.step = function(dir) { //to skip 0
      if ((this.oldValue === 1 && dir === 'down') || (this.oldValue === -1 && dir === 'up')) {
        return 2;
      }

      return 1;
    };
    this.$spinDown.trigger('click');
    assert.ok(this.spinner.value() === -1);
    this.$spinUp.trigger('click');
    assert.ok(this.spinner.value() === 1);
  });

  QUnit.test('no spinning on disabled input', function(assert) {
    this.spinner.spinning.$el.prop('disabled', true);
    assert.ok(this.spinner.value() === 1);
    this.$spinUp.trigger('click');
    assert.ok(this.spinner.value() === 1);
    this.spinner.spinning.$el.val(2);
    this.$spinDown.trigger('click');
    assert.ok(this.spinner.value() === 2);
    this.spinner.spinning.$el.prop('disabled', false);
  });
});
