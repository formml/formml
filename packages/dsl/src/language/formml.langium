grammar FormML

entry FormML:
  form=Form;

Form:
  'form' name=ID '{'
    (fields+=Field)+
  '}';

Field:
  type=PrimitiveType name=ID;

PrimitiveType returns string:
  'Text' | 'Number' | 'Currency' | 'Boolean' | 'Date';

hidden terminal WS: /\s+/;
terminal ID: /[_$a-zA-Z][\w_]*/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
