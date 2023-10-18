import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer"; // Import create from react-test-renderer
import PopulatedNavBar from "./src/components/PopulatedNavBar";

describe("Jest Snapshot testing suite", () => {
  it("Should have a dropdown after hovering over", async () => {
    render(<PopulatedNavBar />);
    
    fireEvent.mouseEnter(screen.getByText('Articles'));
    
    const component = renderer.create(<PopulatedNavBar />); // Create a component instance
    expect(component.toJSON()).toMatchSnapshot();
  });
});
