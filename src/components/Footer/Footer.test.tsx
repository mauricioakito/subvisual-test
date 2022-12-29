import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
    it('rendes the correct footer text', () => {
        render(<Footer />);
        expect(screen.getByText('This is a application for the Subvisual Challenge code :)')).toBeInTheDocument();
    });
});
