/* global readFile */
/* global registerCodeGenerator */

import Mustache from 'mustache';
import YouAreI from 'youarei';

class ElixirHTTPoisonCodeGenerator {
  static identifier = 'me.rok3.PawExtensions.ElixirHTTPoisonCodeGenerator';
  static title = 'Elixir (HTTPoison)';
  static fileExtension = 'ex';
  static languageHighlighter = 'elixir';

  escapeChars(body) {
    return body.replace(/[\\"]/g, '\\$&')
      .replace(/\r?\n|\r/g, '\\r\\n');
  }

  url(request) {
    let rawUrl = new YouAreI(request.url);
    let rawParams = new YouAreI(request.url).query_get();

    let params = [];

    for (let name of Object.keys(rawParams)) {
      params.push({name: name, value: rawParams[name]});
    }

    return {
      base: rawUrl.query_clear(),
      fullPath: request.url,
      hasParams: params.length > 0,
      params: params
    };
  }

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

  body(request) {
    const methodsWithBody = ["PATCH", "POST", "PUT"];
    const hasBody = methodsWithBody.indexOf(request.method) !== -1;

    if (request.jsonBody) {
      return {
        hasBody: hasBody,
        content: this.escapeChars(`${JSON.stringify(request.jsonBody)}`)
      };
    }

    if (request.body) {
      return {
        hasBody: hasBody,
        content: this.escapeChars(`${request.body}`)
      };
    }

    return {
      hasBody: hasBody
    };
  }

  generate(context) {
    const template = readFile('request.mustache');
    const request = context.getCurrentRequest();

    const view = {
      request: request,
      method: request.method.toLowerCase(),
      url: this.url(request),
      headers: this.headers(request),
      body: this.body(request)
    };

    return Mustache.render(template, view);
  }
}

registerCodeGenerator(ElixirHTTPoisonCodeGenerator);
