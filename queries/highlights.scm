(interface_decl
  name: (identifier) @type)

(struct_decl
  name: (identifier) @type)

(function_decl
  name: (identifier) @function)

(field_decl
  name: (identifier) @property)

(parameter
  name: (identifier) @variable.parameter)

(var_decl
  name: (identifier) @variable)

(call_expr
  function: (identifier) @function.call)

(string_literal) @string

(comment) @comment

