grammar FormMLDeclaration

import '../common/common'

entry FormMLDeclaration:
  (declarations+=Declaration)+;

Declaration:
  FunctionDeclaration;

FunctionDeclaration:
  {infer AnnotationDeclaration} 'annot' 'fun' name=ID '(' (parameters+=ParameterNode ',')* (parameters+=ParameterNode)? ')';

interface Parameter {
  name: string;
  type: string = "any";
}

ParameterNode returns Parameter:
  name=ID (':' type=PrimitiveType)?;
