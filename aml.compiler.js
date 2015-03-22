(function() {

/* sets value of an object recursively, key is an array of strings */
function set(obj, key, val, overwrite) {
  if (!key)
    return;
  if (obj instanceof Array)
    return setArray(obj, key, val, overwrite);
  if (key.length === 1)
    return obj[key] = val;
  if (typeof obj[key[0]] !== 'object')
    obj[key[0]] = {}; // create missing objects as we traverse down
  set(obj[key[0]], key.slice(1), val, overwrite);
}

/* helper to handle array functionality */
function setArray(obj, key, val, overwrite) {
  // when the target is string we just set the value (update using `:end`)
  if (typeof obj[0] === 'string')
    return obj[key] = val;
  // now we will set the key of a last object
  var lastItem = obj[obj.length - 1];
  if (!overwrite && (!lastItem || get(lastItem, key))) {
    // when the array is empty or a duplicate key is encountered, a new item in the array is started
    lastItem = {};
    obj.push(lastItem);
  }
  set(lastItem, key, val);
}

/* gets value of an object recursively, key is an array of strings */
function get(obj, key) {
  if (!key.length)
    return obj;
  return get(obj && obj[key[0]], key.slice(1));
}

function compile(tokens) {
  var scope = [];   // holds the current scope where data is inserted to
  var buf = [];     // buffer to hold text for appending functionality `:end`
  var lastKey = null; // last location text was inserted, used with buffer for append functionality
  var out = {};
  var token;
  while (token = tokens.shift()) {
    switch (token[0]) {
      case 'objectAdd':
      case 'arrayAdd':
        var target = get(out, scope);
        var isObjectOrComplexArray = !(target instanceof Array) || (!target.length || typeof target[0] === 'object');
        var isSimpleArray = target instanceof Array && (!target.length || typeof target[0] === 'string');
        if (token[0] === 'objectAdd' && isObjectOrComplexArray) {
          lastKey = scope.concat(token[1]);
          set(out, lastKey, token[2].trim());
        } else if (token[0] === 'arrayAdd' && isSimpleArray) {
          lastKey = scope.concat([target.length]);
          target.push(token[2].trim());
        } else {
          buf.push(token[1] + (token[0] === 'objectAdd' ? ':' : '') + token[2]);
          break;
        }
        buf = [token[2]];
        break;
      case 'objectBegin':
        scope = token[1];
        set(out, scope, get(out, scope) || {});
        lastKey = null;
        break;
      case 'arrayBegin':
        scope = token[1];
        var previous = get(out, scope);
        if (!previous || !(previous instanceof Array)) {
          set(out, scope, []);
        }
        lastKey = null;
        break;
      case 'objectEnd':
      case 'arrayEnd':
        scope = []; break;
      case 'line': buf.push(token[1]); break;
      case 'end':
        set(out, lastKey, buf.join('\n').trim(), true);
        buf = [];
        break;
      case 'skip': while (tokens[0] && tokens[0][0] !== 'endskip') tokens.shift(); break;
      case 'ignore': return out;
    }
  }
  return out;
}

return compile;

})();
