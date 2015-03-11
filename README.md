# archieml-peg

Parse [ArchieML](http://archieml.org) documents into JavaScript objects. This is an alternative implementation using [PEG.js](https://github.com/pegjs/pegjs). Look at the graphical [visualization](http://dundalek.com/GrammKit/#https://cdn.rawgit.com/dundalek/archieml-peg/6d882f42de57d850f72772cde9aadc7a4ee579bf/aml.parser.pegjs) of the grammar. See the code for [parser](aml.parser.pegjs) and [compiler](aml.compiler.js). It passes all the tests from the original implementation.

Be sure to also check out the [official implementation](https://github.com/newsdev/archieml-js).

## Installation

`npm install archieml-peg`

## Usage

```
<script src="dist/archieml.js"></script>

<script type="text/javascript">
  var parsed = archieml.load("key: value");
  >> {"key": "value"}
</script>
```

```
var archieml = require('archieml-peg');
var parsed = archieml.load("key: value");
>> {"key": "value"}
```

## Build

Instal dependencies `npm install`

Build `gulp build`

Development mode - watch for changes and build `gulp watch`

## Testing

Open file `test/indext.html` in a browser or run `npm test`.
