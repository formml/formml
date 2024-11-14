grammar FormMLDeclaration

import '../common/common'
import '../type-system/type-system'

entry FormMLDeclaration:
  (declarations+=Declaration | typeDeclarations+=TypeDeclaration /* from type-system */)+;

Declaration:
  FunctionDeclaration;

FunctionDeclaration:
 'fun' name=ID '(' (parameters+=Parameter ',')* (parameters+=Parameter)? ')' (':' returnType=TypeExpr)?;

Parameter:
  name=ID (optional?='?'? ':' type=TypeExpr)?;
