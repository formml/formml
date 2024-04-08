grammar FormML

entry FormMLSchema:
  form=Form;

Form:
  'form' name=ID '{'
    (fields+=Field)+
  '}';

Field:
  type=PrimitiveType name=ID;

PrimitiveType returns string:
  'text' | 'num' | 'decimal' | 'bool' | 'datetime';

hidden terminal WS: /\s+/;
terminal ID: /[_$a-zA-Z][\w_]*/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
