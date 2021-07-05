import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe('<Button />', () => {
    it('should render the button with the text "load more"', () => {
        render(<Button title="load more" />);

        expect.assertions(1);

        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeInTheDocument();
    });

    it('should a call funtion on button click', () => {
        const fn = jest.fn();
        render(<Button title="load more" onClick={fn} />);

        const button = screen.getByRole('button', { name: /load more/i });
        
        userEvent.click(button);
        expect(fn).toHaveBeenCalledTimes(1);
    })
    
    it('should be disabled when disabled is true', () => {
        render(<Button title="load more" disabled={true} />);
        
        expect.assertions(1);
        expect(screen.getByRole('button', { name: /load more/i })).toBeDisabled();
    })

    it('should be enabled when disabled is false', () => {
        render(<Button title="load more" disabled={false} />);
        
        expect.assertions(1);
        expect(screen.getByRole('button', { name: /load more/i })).toBeEnabled();
    })
})