start = head:statement tail:('\n' s:statement {return s})* {return [head].concat(tail)}

statement
  = whitespace c:control {return c}
  / escapedLine
  / line

control
  = ':' t:('skip'i / 'endskip'i / 'end'i / 'ignore'i) [^\n]* {return [t.toLowerCase()]}
  / k:nestedKey ':' v:value {return ['objectAdd', k, v]}
  / '{' n:nestedKey '}' [^\n]* {return ['objectBegin', n]}
  / '{' whitespace '}' whitespace {return ['objectEnd']}
  / '[' n:nestedKey ']' [^\n]* {return ['arrayBegin', n]}
  / '[' whitespace ']' whitespace {return ['arrayEnd']}
  / leading:('*' whitespace) v:value {return ['arrayAdd', leading.join(''), v]}

escapedLine = '\\' l:line {return l}

line = l:(comment / [^\n])* {return ['line', l.join('')]}

comment
  = '[[' t:[^\]\n]* ']]' {return '[' + t.join('') + ']'}
  / '[' [^\]\n]* ']' {return ''}

key = k:[-_a-zA-Z0-9]+ {return k.join('')}

nestedKey = whitespace head:key tail:('.' k:key {return k})* whitespace {return [head].concat(tail)}

value = v:(comment / [^\n])+ {return v.join('')}

whitespace = [\r\t ]*
