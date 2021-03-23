import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../components/Login";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders the login component", () => {
  act(() => {
    render(
      <Router>
        <Route>
          <Login />
        </Route>
      </Router>,
      container
    );
  });
  expect(container.querySelector('[data-testid="title"]').textContent).toBe(
    "Login to Save Jobs or view your favorites!"
  );
});
