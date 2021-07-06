import P from 'prop-types';
import './styles.css';

export const Button = ({ title, onClick, disabled = false }) => (
  <button disabled={disabled} className="button" onClick={onClick}>
    {title}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  title: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
