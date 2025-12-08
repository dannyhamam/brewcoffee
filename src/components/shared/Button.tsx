interface ButtonProps {
  displayText: string;
  symbol?: string;
  onClick: () => void;
  disabled?: boolean;
  additionalClassNames?: string;
}

export function Button({
  displayText,
  symbol,
  onClick,
  disabled = false,
  additionalClassNames = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 min-w-[90px] px-4 py-3 rounded-xl font-semibold shadow-md
        transition-all duration-200 flex items-center justify-center gap-2
        hover:shadow-lg hover:-translate-y-0.5 cursor:pointer hover:cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${additionalClassNames}`}
    >
      {symbol && <span>{symbol}</span>} {displayText}
    </button>
  );
}
