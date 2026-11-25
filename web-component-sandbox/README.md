# Web component sandbox

A plain HTML page for trying the `<sourceloop-workflow-element>` web component
without an Angular app. It loads the element straight from the build output in
`projects/workflows-element/dist`, so there is no copy to keep in sync.

## Run it

From the repository root:

```bash
npm ci --ignore-scripts
npm run elementBuild
npx http-server . -p 4200 -c-1
```

Then open http://localhost:4200/web-component-sandbox/index.html.

Serve the repository root rather than this folder, because the page loads
`../projects/workflows-element/dist/workflows-element.js` and `styles.css`.
