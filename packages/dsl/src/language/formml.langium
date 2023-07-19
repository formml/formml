grammar FormML

entry Model:
  (types+=UserType)* form=Form (types+=UserType)*;

Form:
  'form' name=ID '{'
    (fields+=Field)+
  '}';

UserType:
  'type' name=ID '{'
    (fields+=Field)+
  '}';

Field:
  (annotations+=Annotation)*
  (primitiveType=PrimitiveType | type=[UserType]) name=ID;

Annotation:
  '@' name=ID ('(' (args+=LITERAL ',')* (args+=LITERAL | ((namedArgs+=NamedArgument ',')* namedArgs+=NamedArgument?))? ')')?;

NamedArgument:
  key=ID '=' value=LITERAL;

terminal LITERAL: NUMBER | STRING | BOOLEAN;
terminal NUMBER returns number: /-?[0-9]+(\.[0-9]*)?/;
terminal STRING: /"[^"]*"|'[^']*'/;
terminal BOOLEAN returns boolean: 'true' | 'false';

PrimitiveType returns string:
  'string' | 'number' | 'boolean' | 'date';

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
