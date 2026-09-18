import './Toggle.css';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

export const Toggle = ({ checked, onChange }: ToggleProps) => {
  return (
    <button
      className={`toggle ${checked ? 'active' : ''}`}
      onClick={onChange}
      type="button"
    >
      <span className='thumb' />
    </button>
  );
};
