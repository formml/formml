import '../common/common'

Type:
  PrimitiveType | CompositeType | TypeRef;

// Primitive types

PrimitiveType:
  AnyType | RuntimePrimitiveType;

AnyType:
  name=ANY;

RuntimePrimitiveType:
  TextType | NumType | DecimalType | BoolType | DatetimeType;

TextType:
  name=TEXT;

NumType:
  name=NUM;

DecimalType:
  name=DECIMAL;

BoolType:
  name=BOOL;

DatetimeType:
  name=DATETIME;

// Composite types

CompositeType:
  ObjectType;

ObjectType:
  '{' (properties+=Property ';')* properties+=Property? '}';

Property:
  name=ID ':' type=Type;

// Named types

TypeRef:
  ref=[TypeDeclaration];

TypeDeclaration:
  TypeAliasDeclaration | TypeParameterDeclaration;

TypeAliasDeclaration:
  'type' name=ID ('<' (typeParameters+=TypeParameterDeclaration ',')* typeParameters+=TypeParameterDeclaration? '>')? '=' type=Type;

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
