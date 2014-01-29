(function($) {

  module('Spinner', {
    setup: function() {
      this.el = $('[data-trigger="spinner"]');
      this.spinUp = $("[data-spin='up']", this.el);
      this.spinDown = $("[data-spin='down']", this.el);
      this.spinner = this.el.data('spinner');
    },
    teardown: function(){
      this.el
        .spinner('delay', 500)
        .spinner('changed', null)
        .spinner('changing', null);
      this.spinner.spinning.$el.val(1);
    }
  });

  test('Spinner#value', 1, function() {
    strictEqual(this.spinner.value(), 1);
  });

  test('Spinner#delay', 2, function() {
    strictEqual(this.spinner.constructor.delay, 600);
    this.el.spinner('delay', 300, 'should plus 100');
    strictEqual(this.spinner.constructor.delay, 400);
  });

  asyncTest('Spinner#changed', 1, function() {
    var x = this.spinner.value(), y = 0;
    this.el.spinner('delay', 50).spinner('changed', function(e, newVal){
      y = newVal;
    });
    this.spinUp.click();
    setTimeout(function(){
      strictEqual(y, x+1);
      start();
    }, 200);
  });

  test('Spinner#changing', 1, function() {
    this.el.spinner('changing', function(e, newVal){
      strictEqual(newVal, 2);
    });
    this.spinUp.click();
  });

  test('spin via mouse click', 3, function() {
    strictEqual(this.spinner.value(), 1);
    this.spinUp.click();
    strictEqual(this.spinner.value(), 2);
    this.spinDown.click();
    strictEqual(this.spinner.value(), 1);
  });

  test('no spinning on disabled input', 3, function() {
      this.spinner.spinning.$el.attr('disabled', 'disabled');
      strictEqual(this.spinner.value(), 1);
      this.spinUp.click();
      strictEqual(this.spinner.value(), 1);
      this.spinner.spinning.$el.val(2);
      this.spinDown.click();
      strictEqual(this.spinner.value(), 2);
      this.spinner.spinning.$el.removeAttr('disabled', 'disabled');
  });

}(jQuery));
