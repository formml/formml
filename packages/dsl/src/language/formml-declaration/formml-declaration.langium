grammar FormMLDeclaration

import '../common/common'

entry FormMLDeclaration:
  (declarations+=Declaration)+;

Declaration:
  FunctionDeclaration;

FunctionDeclaration:
  {infer AnnotationDeclaration} 'annot' 'fun' name=ID '(' ')';

