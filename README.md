# [Input Spinner](https://vsn4ik.github.io/input-spinner/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://github.com/vsn4ik/input-spinner/workflows/Test/badge.svg)](https://github.com/vsn4ik/input-spinner/actions?workflow=Test)
[![devDependency Status](https://david-dm.org/vsn4ik/input-spinner/dev-status.svg)](https://david-dm.org/vsn4ik/input-spinner?type=dev)


A Number-Spinner, Support keyboard operations and continuous changing.

## Basic usage, it's very simple
```html
<!-- // ref javascript file -->
<script src="dist/input-spinner.js"></script>

<!-- // spinner plugin DOM -->
<div data-trigger="spinner">
  <button type="button" data-spin="up">+</button>
  <input type="text" value="1" data-ruler="quantity">
  <button type="button" data-spin="down">-</button>
</div>
```

## Getting Started
Download the [production version][production] or the [development version][development].

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/input-spinner.js"></script>
<script>
  $('#spinner')
    .spinner('delay', 200) //delay in ms
    .spinner('changed', function(e, newVal, oldVal) {
      // trigger lazed, depend on delay option.
    })
    .spinner('changing', function(e, newVal, oldVal) {
      // trigger immediately
    });
</script>

<div data-trigger="spinner" id="spinner">
  <button type="button" data-spin="up">+</button>
  <input type="text" value="1" data-ruler="quantity">
  <button type="button" data-spin="down">-</button>
</div>
```

## Documentation
### Spinner options

#### delay
> delay to fire changed event in millisecond, default is 500.

#### changed
> changed event handler, the changed event is a lazy-mode event, default is null.

#### changing
> changing event handler, the changing event will be fired immediately, default is null.

### Spinning Options(setup via data-api)
#### min
> the minimum value, default is null.

#### max
> the maximum value, default is null.

#### step
> the changing-value of per-step, if passed as a function, the function will be called within the spinner object scope.

#### precision
> the precision of value

### Built-in rules
```javascript
  currency: { min: 0.00, max: null, step: 0.01, precision: 2 },
  quantity: { min: 1, max: 999, step: 1, precision:0 },
  percent:  { min: 1, max: 100, step: 1, precision:0 },
  month:    { min: 1, max: 12, step: 1, precision:0 },
  day:      { min: 1, max: 31, step: 1, precision:0 },
  hour:     { min: 0, max: 23, step: 1, precision:0 },
  minute:   { min: 1, max: 59, step: 1, precision:0 },
  second:   { min: 1, max: 59, step: 1, precision:0 }
```
Usage:
```html
<input type="text" value="1" data-rule="quantity">
```

## Examples

### Work with Bootstrap and Font Awesome

```html
<link href="dist/input-spinner.css" rel="stylesheet">

<div class="input-group spinner" data-trigger="spinner">
  <input type="text" class="form-control text-center" value="1" data-rule="quantity">
  <span class="input-group-addon">
    <a href="javascript:;" class="spin-up" data-spin="up"><i class="fa fa-caret-up"></i></a>
    <a href="javascript:;" class="spin-down" data-spin="down"><i class="fa fa-caret-down"></i></a>
  </span>
</div>
```

### Customize

#### specify a field

```html
<div data-trigger="spinner">
  <input type="text" value="0" title="this field isn't a spinning.">
  <input type="text" value="1" data-spin="spinner" data-rule="quantity" data-max="10">
</div>
```

#### Use hidden field

```html
<div data-trigger="spinner" id="spinner">
  <span id="spinner-value"></span>
  <input type="hidden" value="1" data-spin="spinner" data-rule="quantity" data-max="10">
  <a href="javascript:;" data-spin="down">-</a>
  <a href="javascript:;" data-spin="up">+</a>
</div>

<script>
  $('#spinner').spinner('changing', function(e, newVal, oldVal) {
    $('#spinner-value').html(newVal);
  });
</script>
```

#### pass step options as a function
```javascript
// To skip 0
$('#spinner').spinner({
  step: function(dir) {
    // 'this' references to the spinner object
    if ((this.oldValue === 1 && dir === 'down') || (this.oldValue === -1 && dir === 'up')) {
      return 2;
    }
    return 1;
  }
});

// or use API syntax
$('#spinner').spinner('step', function(dir) {
  // your logic here
});
```


## Copyright and license

Copyright Vasilii A., 2015&ndash;2018
Copyright xixilive, 2013&ndash;2015

Licensed under [the MIT License][license].

[license]: https://github.com/vsn4ik/input-spinner/blob/master/LICENSE
[development]: https://raw.githubusercontent.com/vsn4ik/input-spinner/master/dist/input-spinner.min.js
[production]: https://raw.githubusercontent.com/vsn4ik/input-spinner/master/dist/input-spinner.js
