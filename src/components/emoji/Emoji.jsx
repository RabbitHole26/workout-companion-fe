const Emoji = (props) => {
  return (
    <span
      role="img"
      className={props.className}
      aria-label={props.label ? props.label : ''}
      aria-hidden={props.label ? 'false' : 'true'}
    >
      {props.symbol}
    </span>
  )
}

export default Emoji
