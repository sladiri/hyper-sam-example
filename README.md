# SAM Pattern and HyperHTML

An app with state managment examples according to the [SAM Pattern](http://sam.js.org/). Rendering is done by [HyperHTML](https://viperhtml.js.org/).

![Example Recording](https://raw.githubusercontent.com/sladiri/hyper-sam-example/master/sam-example.gif)

## Quick Start

1.  `npm run build`
2.  `npm start`
3.  Open https://localhost:9900/

## Counter

Once the counter is started, an automatic action is called until the counter reaches zero.

## Cancellable Action

The app-container allows to cancellation of an asynchronous action. A cancelled action will not propose its data to the model.
