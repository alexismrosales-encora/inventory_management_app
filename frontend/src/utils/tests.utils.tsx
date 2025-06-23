import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AppProviders } from '../context/AppProviders'; // Import your provider composer

/**
 * Custom render function for testing.
 *
 * This function wraps the UI component with all the necessary context providers
 * from AppProviders, ensuring that any component under test has access to the
 * contexts it needs to render properly.
 *
 * @param {ReactElement} ui - The React component to render.
 * @param {Omit<RenderOptions, 'wrapper'>} [options] - RTL render options, excluding the wrapper.
 */
const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  // Use the real AppProviders component as the wrapper.
  return render(ui, { wrapper: AppProviders, ...options });
};

// Re-export everything from react-testing-library
export * from '@testing-library/react';

// Override the export of `render` with our custom one
export { renderWithProviders as render };
