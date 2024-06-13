grammar FormML

import '../common/common'
import '../formml-declaration/formml-declaration'

entry FormMLSchema:
  form=Form;

Form:
  'form' name=ID '{'
    (fields+=Field)+
  '}';

Field:
  (annotations+=Annotation)* type=Primitive name=ID;

Argument:
  {infer PositionalArgument} value=Literal | {infer NamedArgument} name=ID ':' value=Literal;

fragment Arguments:
  (args+=Argument ',')* (args+=Argument)?;

Annotation:
  '@' call=[AnnotationDeclaration] ('(' Arguments ')')?;


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
