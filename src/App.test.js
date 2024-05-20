import { render, screen } from '@testing-library/react';
import SamuraiJSApp from "./App";
import {createRoot} from "react-dom/client";

test('renders learn react link', () => {
  render(<SamuraiJSApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders without crashing', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<SamuraiJSApp/>);
  root.unmount();
});