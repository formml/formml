grammar FormML

entry FormMLSchema:
  form=Form;

Form:
  'form' name=ID '{'
    (fields+=Field)+
  '}';

Field:
  (annotations+=Annotation)* type=PrimitiveType name=ID;

Annotation:
  '@' name=ID ('(' (args+=Literal)? ')')?;

PrimitiveType returns string:
  'text' | 'num' | 'decimal' | 'bool' | 'datetime';

hidden terminal WS: /\s+/;
terminal ID: /[_$a-zA-Z][\w_]*/;

// Literals

Literal:
  Number_ | SQString | DQString;

terminal NUMBER returns number: /-?(?:0|[1-9]\d*)(?:\.[0-9]+)?/;
Number_:
  value=NUMBER;

terminal SQ_STRING: /'[^']*'/;
SQString:
  value=SQ_STRING;

terminal DQ_STRING: /"[^"]*"/;
DQString:
  value=DQ_STRING;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
