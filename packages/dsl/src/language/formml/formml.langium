grammar FormML

import '../common/common'
import '../type-system/type-system'
import '../formml-declaration/formml-declaration'

entry FormMLSchema:
  form=Form;

Form:
  'form' name=ID '{'
    (fields+=Field)+
  '}';

Field:
  (annotations+=Annotation)* type=PRIMITIVE name=ID;

Argument:
  {infer PositionalArgument} value=Literal | {infer NamedArgument} name=ID ':' value=Literal;

fragment Arguments:
  (args+=Argument ',')* (args+=Argument)?;

Annotation:
  '@' call=[AnnotationDeclaration] ('(' Arguments ')')?;


// Literals

Literal:
  NumLiteral | TextLiteral | BoolLiteral | NullLiteral;

TextLiteral:
  SQTextLiteral | DQTextLiteral;

terminal NUM_LITERAL returns number: /-?(?:0|[1-9]\d*)(?:\.[0-9]+)?/;
NumLiteral:
  value=NUM_LITERAL;

terminal SQ_TEXT_LITERAL: /'[^']*'/;
SQTextLiteral:
  value=SQ_TEXT_LITERAL;

terminal DQ_TEXT_LITERAL: /"[^"]*"/;
DQTextLiteral:
  value=DQ_TEXT_LITERAL;

BOOL_LITERAL returns boolean:
  'true' | 'false';
BoolLiteral:
  value=BOOL_LITERAL;

NullLiteral:
  {infer NullLiteral} 'null';
