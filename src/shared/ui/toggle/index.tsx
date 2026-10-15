import './toggle.css';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export const Toggle = ({ checked, onChange, disabled }: ToggleProps) => {
  return (
    <button
      className={`toggle ${checked ? 'active' : ''}`}
      onClick={onChange}
      type="button"
      aria-pressed={checked}
      disabled={disabled}
    >
      <span className="thumb" />
    </button>
  );
};
