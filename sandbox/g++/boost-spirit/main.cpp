#include <iostream>
#include <string>
#include <boost/spirit/include/qi.hpp>
#include <boost/spirit/include/phoenix_core.hpp>
#include <boost/spirit/include/phoenix_operator.hpp>

namespace qi = boost::spirit::qi;

template<class Iterator>
struct calc : qi::grammar<Iterator, double(void), qi::locals<double>, qi::space_type>
{
  calc () : calc::base_type(start)
  {
    start = add_exp[qi::_val = qi::_1];
    prim_exp
      = qi::double_[ qi::_val = qi::_1 ]
      | (qi::char_('(')
	 >> add_exp
	 >> qi::char_(')')) [ qi::_val = qi::_2 ];
    add_exp
      = (mult_exp[ qi::_a = qi::_1 ]
	 >> *(qi::char_('+') >> mult_exp[ qi::_a = qi::_a + qi::_1 ]
	      | qi::char_('-') >> mult_exp[ qi::_a = qi::_a - qi::_1 ])
	 ) [ qi::_val = qi::_a ];
    mult_exp
      = (prim_exp[ qi::_a = qi::_1 ]
	 >> *(qi::char_('*') >> prim_exp[ qi::_a = qi::_a * qi::_1 ]
	      | qi::char_('/') >> prim_exp[ qi::_a = qi::_a / qi::_1 ])
	 ) [ qi::_val = qi::_a ];
  }
  qi::rule<Iterator, double(void), qi::locals<double>, qi::space_type> start;
  qi::rule<Iterator, double(void), qi::locals<double>, qi::space_type> prim_exp;
  qi::rule<Iterator, double(void), qi::locals<double>, qi::space_type> add_exp;
  qi::rule<Iterator, double(void), qi::locals<double>, qi::space_type> mult_exp;
};

int main() {
  calc<std::string::iterator> p;
  std::string input;
  double output;

  while (!std::cin.eof()) {
    std::cout << "- ";
    getline(std::cin, input);
    std::string::iterator first = input.begin(), last = input.end();
    bool success = qi::phrase_parse(first, last, p, qi::space, output);
    if (success) {
      std::cout << "= " << output << std::endl;
    }
  }
}
