import React from "react";
import Daily from "./Daily";
import { mount } from "enzyme";
import { Responsive } from 'semantic-ui-react'
import DatePicker from "react-datepicker";

const mockUser = {
    uid: "ajkedfnzdsfhz8sdhfz8sd8",
}

describe("Daily tests", () => {
    let component;

    beforeEach(() => {
        component = mount(<Daily user={mockUser} />);
    });

    it("should capture the formData's name correctly", () => {
        const input = component.find('input').at(0);
        input.instance().value = 'hello';
        input.simulate('change');
        expect(component.state().formData.name).toEqual('hello')
    })

    it("should capture the formData's amount correctly", () => {
        const input = component.find('input').at(1);
        input.instance().value = 50;
        input.simulate('change');
        expect(component.state().formData.amount).toEqual("50")
    })

    it("should capture the formData's date correctly", () => {
        const dateInput = component.find(DatePicker);
        dateInput.find('input').simulate('change', {target: { value: "2020-02-16" }});
        expect(component.state().formData.date).toEqual(new Date(2020, 1, 16))
    })

    it("should capture the formData's type correctly", () => {
        expect(component.state().formData.type).toEqual('daily')
    })

    it("should capture the formData's uid correctly", () => {
        expect(component.state().formData.uid).toEqual(mockUser.uid)
    })
})