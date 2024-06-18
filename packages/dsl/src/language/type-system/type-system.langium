import '../common/common'

TypeExpr:
  PrimitiveTypeExpr | CompositeTypeExpr | TypeRefExpr;

// Primitive types

PrimitiveTypeExpr:
  AnyTypeExpr | RuntimePrimitiveTypeExpr;

AnyTypeExpr:
  name=ANY;

RuntimePrimitiveTypeExpr:
  TextTypeExpr | NumTypeExpr | DecimalTypeExpr | BoolTypeExpr | DatetimeTypeExpr;

TextTypeExpr:
  name=TEXT;

NumTypeExpr:
  name=NUM;

DecimalTypeExpr:
  name=DECIMAL;

BoolTypeExpr:
  name=BOOL;

DatetimeTypeExpr:
  name=DATETIME;

// Composite types

CompositeTypeExpr:
  ObjectTypeExpr;

ObjectTypeExpr:
  '{' (properties+=Property ';')* properties+=Property? '}';

Property:
  name=ID ':' type=TypeExpr;

TypeRefExpr:
  ref=[TypeDeclaration] ('<' (typeArguments+=TypeExpr ',')* typeArguments+=TypeExpr? '>')?;

// Type declarations

TypeDeclaration:
  TypeAliasDeclaration | TypeParameterDeclaration;

TypeAliasDeclaration:
  'type' name=ID ('<' (typeParameters+=TypeParameterDeclaration ',')* typeParameters+=TypeParameterDeclaration? '>')? '=' type=TypeExpr;

TypeParameterDeclaration:
  name=ID;

// terminals

ANY returns string:
  'any';

PRIMITIVE returns string:
  TEXT | NUM | DECIMAL | BOOL | DATETIME;

TEXT returns string:
  'text';

NUM returns string:
  'num';

DECIMAL returns string:
  'decimal';

BOOL returns string:
  'bool';

DATETIME returns string:
  'datetime';
