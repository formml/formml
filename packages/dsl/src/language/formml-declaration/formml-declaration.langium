grammar FormMLDeclaration

import '../common/common'
import '../type-system/type-system'

entry FormMLDeclaration:
  (declarations+=Declaration | typeDeclarations+=TypeDeclaration /* from type-system */)+;

Declaration:
  FunctionDeclaration;

FunctionDeclaration:
  {infer AnnotationDeclaration} 'annot' 'fun' name=ID '(' (parameters+=Parameter ',')* (parameters+=Parameter)? ')' (':' returnType=Type)?;

Parameter:
  name=ID (optional?='?'? ':' type=Type)?;
