grammar FormMLDeclaration

import '../common/common'

entry FormMLDeclaration:
  (declarations+=Declaration)+;

Declaration:
  FunctionDeclaration;

FunctionDeclaration:
  {infer AnnotationDeclaration} 'annot' 'fun' name=ID '(' (parameters+=Parameter ',')* (parameters+=Parameter)? ')';

Parameter:
  name=ID (':' type=Type)?;


// Type system

Type:
  AnyType | PrimitiveType;

AnyType:
  name='any';

PrimitiveType:
  name=Primitive;
