import React from 'react';
// mock next/navigation's useRouter to provide a minimal router in tests
//jest.fn() is a utility in Jest, a JavaScript testing framework, that allows you to create a mock function.
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}));
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VolunteerDashboard from '../../app/user/volunteer/dashboard/page';
import { AuthProvider } from '../../context/AuthContext';

describe('Volunteer Dashboard Page', () => {
  test('renders without crashing', async () => {
    const { container } = render(
      <AuthProvider>
        <VolunteerDashboard />
      </AuthProvider>
    );
    expect(container).toBeInTheDocument();
  });
});
