import React from "react";
import Dashboard from "./Dashboard";
import { mount } from "enzyme";
import { Header } from "semantic-ui-react"


describe("Dashboard tests", () => {
    let component;

    beforeEach(() => {
        component = mount(<Dashboard />);
    });

    it("it should render and contain 2 Header components", () => {
        expect(component.find(Header).length).toEqual(2);
    })
})