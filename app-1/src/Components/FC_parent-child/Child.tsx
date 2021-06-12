interface ChildProps {
  color: string;
  handleClick: () => void;
}

export const ChildAsFC: React.FC<ChildProps> = ({
  color,
  handleClick,
  children,
}) => {
  return (
    <div>
      <p>{color}</p>
      <button onClick={handleClick}>Click me.</button>
    </div>
  );
};
