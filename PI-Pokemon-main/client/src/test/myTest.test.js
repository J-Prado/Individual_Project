// import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "../App.js";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import { BrowserRouter } from "react-router-dom";
import { store } from "../reactRedux/store/index.js";
import { Provider } from "react-redux";
import { CreationPage } from "../components/CreationPage/creationPage.jsx";
// import nock from "nock";
import { LandingPage } from "../components/LandingPage/landingPage.jsx";
import Home from "../components/HomePage/home.jsx";
import { Detail } from "../components/CharDetail/detail.jsx";

configure({ adapter: new Adapter() });
const route = ["/", "/home", "/home/:id", "/create"];
const componentToUse = (route) => {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe("Landing Page", () => {
  it("Must Display the Landing Page", () => {
    const app = mount(componentToUse(route[0]));
    expect(app.find(LandingPage)).toHaveLength(1);
  });
});
describe("Home", () => {
  it("Must Display the Home Page only in /home", () => {
    const app = mount(componentToUse(route[1]));
    expect(app.find(Home)).toHaveLength(1);
    expect(app.find(LandingPage)).toHaveLength(0);
    expect(app.find(Detail)).toHaveLength(0);
    expect(app.find(CreationPage)).toHaveLength(0);
  });
  it("Must Display Must be used only in route '/home'", () => {
    const app = mount(componentToUse(route[0]));
    expect(app.find(Home)).toHaveLength(0);
    const app1 = mount(componentToUse(route[2]));
    expect(app1.find(Home)).toHaveLength(0);
    const app2 = mount(componentToUse(route[2]));
    expect(app2.find(Home)).toHaveLength(0);
  });
});

describe("Detail", () => {
  it("Detail must display only in /home/:id", () => {
    const app = mount(componentToUse(route[2]));
    expect(app.find(Home)).toHaveLength(0);
    expect(app.find(LandingPage)).toHaveLength(0);
    expect(app.find(Detail)).toHaveLength(1);
    expect(app.find(CreationPage)).toHaveLength(0);
  });
});
describe("Creation Page", () => {
  it("Detail must display only in '/create'", () => {
    const app = mount(componentToUse(route[3]));
    expect(app.find(Home)).toHaveLength(0);
    expect(app.find(LandingPage)).toHaveLength(0);
    expect(app.find(Detail)).toHaveLength(0);
    expect(app.find(CreationPage)).toHaveLength(1);
  });
});
