import { v1 as uuid } from 'uuid'
import { html } from 'common-tags'
import { type Request, type Response } from 'express'
import { renderToStaticMarkup } from 'react-dom/server'
import { App } from '../../components/app.js'

const dummyCache = new Map<string, string>()

export async function renderApp(req: Request, res: Response) {
  const newUserId = uuid()

  if (dummyCache.has(newUserId)) {
    return res.send(dummyCache.get(newUserId))
  }

  const app = renderToStaticMarkup(<App />)
  dummyCache.set(newUserId, app)

  return res.send(
    html`
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
    `
  )
}

// export function renderAppInitialize() {
// 
// }
