type IconProps = React.HTMLAttributes<SVGElement>;

const Search: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M9.58317 18.125C4.87484 18.125 1.0415 14.2917 1.0415 9.58334C1.0415 4.87501 4.87484 1.04167 9.58317 1.04167C14.2915 1.04167 18.1248 4.87501 18.1248 9.58334C18.1248 14.2917 14.2915 18.125 9.58317 18.125ZM9.58317 2.29167C5.55817 2.29167 2.2915 5.56667 2.2915 9.58334C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58334C16.8748 5.56667 13.6082 2.29167 9.58317 2.29167Z"
      fill="#647184"
    />
    <path
      d="M18.3335 18.9587C18.1752 18.9587 18.0169 18.9004 17.8919 18.7754L16.2252 17.1087C15.9835 16.867 15.9835 16.467 16.2252 16.2254C16.4669 15.9837 16.8669 15.9837 17.1085 16.2254L18.7752 17.892C19.0169 18.1337 19.0169 18.5337 18.7752 18.7754C18.6502 18.9004 18.4919 18.9587 18.3335 18.9587Z"
      fill="#647184"
    />
  </svg>
);

export default Search;