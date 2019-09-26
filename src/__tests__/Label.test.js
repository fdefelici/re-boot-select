import React from "react";
import ReactDOM from "react-dom";
import { cleanup, fireEvent, render, create } from "@testing-library/react";
import Combobox from "../index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Label tests", () => {
    it("Select/deselect all labels", () => {
        const { getByText } = render(
          <Combobox
            showButtons={true}
            data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
            labels={{
              "btn.select.all": "Pick All",
              "btn.unselect.all": "Release All"
            }}
            id="123"
          ></Combobox>
        );
    
        expect(getByText(/Pick All/i)).toBeTruthy();
        expect(getByText(/Release All/i)).toBeTruthy();
      });
    
      it("No html ids", () => {
        const component = shallow(<Combobox data={["AA"]} />);
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find(".input-box").html()).toEqual(
          '<div class="input-box"><button type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-undefined"><div class="caption-text-area" id="caption-text-area-undefined">Select an item</div></span> <span class="caret"></span></button><div class="dropdown-menu "><div class="bs-searchbox hide"><input type="text" class="form-control"/></div><div class="bs-actionsbox hide"><div class="btn-group btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default select-all-button">All</button><button type="button" class="actions-btn bs-deselect-all btn btn-default deselect-all-button">Clear</button></div></div><ul class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li></ul></div></div>'
        );
      });

      it("Singular/plural labels", () => {
        const component = shallow(
          <Combobox
            isMultiSelect={true}
            showButtons={true}
            data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
            maxCaptionItems="5"
            id="123"
          ></Combobox>
        );
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
        );
    
        component.find("#rbc-menu-button-selectall-button-123").simulate("click");
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">9 items selected</div></span> <span class="caret"></span></button>'
        );
    
        component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
        );
      });

      it("Click select/deselect all with different labels - no singular and no plural", () => {
        const component = mount(
          <Combobox
            isMultiSelect={true}
            showButtons={true}
            data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
            maxCaptionItems="0"
            labels={{
              "cap.select.empty": "Select a car",
              "btn.select.all": "Pick All",
              "btn.unselect.all": "Release All"
            }}
            id="123"
          ></Combobox>
        );
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select a car</div></span>&nbsp;<span class="caret"></span></button>'
        );
    
        shallow(component.find("a").get(0)).simulate("click");
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">1 item selected</div></span>&nbsp;<span class="caret"></span></button>'
        );
    
        component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select a car</div></span>&nbsp;<span class="caret"></span></button>'
        );
      });
});
