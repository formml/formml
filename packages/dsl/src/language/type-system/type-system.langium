import '../common/common'

Type:
  BuiltInType | TypeRef;

// Built-in types

BuiltInType:
  AnyType | PrimitiveType;

AnyType:
  name=ANY;

PrimitiveType:
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

// User-defined types

TypeRef:
  ref=[TypeDeclaration];

TypeDeclaration:
  TypeAliasDeclaration;

TypeAliasDeclaration:
  'type' name=ID '=' type=Type;

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
