import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {
    createStore,
    applyMiddleware,
    compose
} from "redux";

import "./index.css";
import App from "./app/containers/app";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./app/reducers/index";
import sagas from "./app/sagas/index";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);
registerServiceWorker();

render(
    (<Provider store={store} className={"wrapper"} >
        <App />
    </Provider>),
    document.getElementById("root")
);
