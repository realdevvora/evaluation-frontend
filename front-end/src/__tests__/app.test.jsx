import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App.jsx';
import { ReviewContextProvider } from '../context/ReviewContext.js';
import { AuthContextProvider } from '../context/AuthContext.js';

test('renders App component', () => {
  render(
    <AuthContextProvider>
      <ReviewContextProvider>
        <App />
      </ReviewContextProvider>
    </AuthContextProvider>
  );

  // Check if something specific in your App component is rendered
  expect(screen.getByText('Course Evaluator')).toBeInTheDocument();
});