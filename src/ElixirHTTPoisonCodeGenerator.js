/* global readFile */
/* global registerCodeGenerator */

import Mustache from 'mustache';

class ElixirHTTPoisonCodeGenerator {
  static identifier = 'me.rok3.PawExtensions.ElixirHTTPoisonCodeGenerator';
  static title = 'Elixir (HTTPoison)';
  static fileExtension = 'ex';

  headers(request) {
    const headerNames = Object.keys(request.headers);

    let headers = [];

    for (let name of headerNames) {
      headers.push({name: name, value: request.headers[name]});
    }

    return {
      hasHeaders: headerNames.length > 0,
      headers: headers
    };
  }

  generate(context) {
    const template = readFile('request.mustache');
    const request = context.getCurrentRequest();

    const view = {
      request: request,
      headers: this.headers(request)
    };

    return Mustache.render(template, view);
  }
}

registerCodeGenerator(ElixirHTTPoisonCodeGenerator);
