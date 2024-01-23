type IconProps = React.HTMLAttributes<SVGElement>;

const Arrow: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
    <path
      d="M8.00001 11.6998C7.53335 11.6998 7.06668 11.5198 6.71335 11.1664L2.36668 6.81977C2.17335 6.62643 2.17335 6.30643 2.36668 6.1131C2.56001 5.91977 2.88001 5.91977 3.07335 6.1131L7.42001 10.4598C7.74001 10.7798 8.26001 10.7798 8.58001 10.4598L12.9267 6.1131C13.12 5.91977 13.44 5.91977 13.6333 6.1131C13.8267 6.30643 13.8267 6.62643 13.6333 6.81977L9.28668 11.1664C8.93335 11.5198 8.46668 11.6998 8.00001 11.6998Z"
      fill="#647184"
    />
  </svg>
);

export default Arrow;