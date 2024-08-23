export const Input = ({
  max,
  value,
  label,
  onChange,
  disabled,
  maxLength,
}: {
  max?: string;
  value: string;
  label: string;
  disabled?: boolean;
  maxLength?: number;
  onChange: (val: string) => void;
}) => {
  return (
    <div className="input-container">
      <label htmlFor="rows">{label}</label>

      <input
        min="1"
        type="number"
        value={value}
        className="input"
        max={max ?? "100"}
        placeholder={label}
        disabled={disabled}
        maxLength={maxLength ?? 3}
        id={label.toLocaleLowerCase()}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
