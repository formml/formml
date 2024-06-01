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
  '@' name=ID ('(' (args+=Literal ',')* (args+=Literal)? ')')?;

PrimitiveType returns string:
  'text' | 'num' | 'decimal' | 'bool' | 'datetime';


// Literals

Literal:
  Number_ | SQString | DQString | Boolean | Null;

terminal NUMBER returns number: /-?(?:0|[1-9]\d*)(?:\.[0-9]+)?/;
Number_:
  value=NUMBER;

terminal SQ_STRING: /'[^']*'/;
SQString:
  value=SQ_STRING;

terminal DQ_STRING: /"[^"]*"/;
DQString:
  value=DQ_STRING;

BOOLEAN returns boolean:
  'true' | 'false';
Boolean:
  value=BOOLEAN;

Null:
  {infer Null} 'null';

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;

hidden terminal WS: /\s+/;

// Lowest-precedence tokens
terminal ID: /[_$a-zA-Z][\w_]*/;
