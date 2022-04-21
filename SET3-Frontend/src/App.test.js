import { render, screen } from '@testing-library/react';
import App from './Example/App';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Weather forecast/i);
    expect(linkElement).toBeInTheDocument();
});
