import { jsx as _jsx } from "react/jsx-runtime";
import { v1 as uuid } from 'uuid';
import { html } from 'common-tags';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../../components/app.js';
const sessionUsers = new Set();
export async function renderApp(req, res) {
    const newUserId = uuid();
    const app = renderToStaticMarkup(_jsx(App, {}));
    sessionUsers.add(`${newUserId}${app}`);
    res.send(html `
      <!DOCTYPE html>
      <html>
        <head>
          <title>App</title>
          <link rel="stylesheet" href="/assets/index.css" />
        </head>

        <body>
          <div id="root">${app}</div>
        </body>

        <script src="/assets/bundle.js"></script>
      </html>
    `);
}
