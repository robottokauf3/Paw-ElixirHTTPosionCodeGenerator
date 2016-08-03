/* global readFile */
/* global registerCodeGenerator */

import Mustache from 'mustache';

class ElixirHTTPoisonCodeGenerator {
  static identifier = 'me.rok3.PawExtensions.ElixirHTTPoisonCodeGenerator';
  static title = 'Elixir (HTTPoison)';
  static fileExtension = 'ex';

  generate(context) {
    const template = readFile('request.mustache');
    const request = context.getCurrentRequest();

    const view = {
      request: request
    };

    return Mustache.render(template, view);
  }
}

registerCodeGenerator(ElixirHTTPoisonCodeGenerator);
