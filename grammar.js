module.exports = grammar({
  name: 'jlang',

  extras: $ => [/\s/, $.comment],

  rules: {
    source_file: $ => repeat($._top_level_item),

    _top_level_item: $ => choice(
      $.interface_decl,
      $.struct_decl,
      $.function_decl
    ),

    interface_decl: $ => seq(
      'interface',
      $.identifier,
      '{',
      repeat($.function_signature),
      '}'
    ),

    struct_decl: $ => seq(
      'struct',
      $.identifier,
      optional(seq('->', $.identifier)),
      '{',
      repeat($.field_decl),
      '}'
    ),

    field_decl: $ => seq($.identifier, $.type, ';'),

    function_signature: $ => seq(
      $.type,
      $.identifier,
      '(',
      ')',
      ';'
    ),

    function_decl: $ => seq(
      $.type,
      $.identifier,
      '->',
      $.parameter,
      $.block
    ),

    parameter: $ => seq($.type, $.identifier),

    block: $ => seq(
      '{',
      repeat($._statement),
      '}'
    ),

    _statement: $ => choice(
      $.var_decl,
      $.if_statement,
      $.call_expr,
      $.expression_stmt
    ),

    var_decl: $ => seq(
      'var',
      $.identifier,
      $.type,
      '=',
      $.cast_expr,
      ';'
    ),

    cast_expr: $ => seq(
      '(',
      'struct',
      $.identifier,
      '*',
      ')',
      $.call_expr
    ),

    call_expr: $ => seq(
      $.identifier,
      '(',
      optional($.args),
      ')',
      ';'
    ),

    args: $ => seq($.expr, repeat(seq(',', $.expr))),

    expr: $ => choice(
      $.identifier,
      $.string_literal
    ),

    if_statement: $ => seq(
      'if',
      '(',
      $.expr,
      ')',
      $.block,
      optional(seq('else', $.block))
    ),

    expression_stmt: $ => seq($.expr, ';'),

    type: $ => seq($.identifier, optional('*')),

    identifier: $ => /[a-zA-Z_]\w*/,

    string_literal: $ => /"[^"]*"/,

    comment: _ => /\/\/.*/
  }
});
