hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;

hidden terminal WS: /\s+/;

// Lowest-precedence tokens
terminal ID: /[_$a-zA-Z][\w_]*/;
