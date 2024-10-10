const ShowErrorDetails = (props) => {
  const handleClick = () => {
    props.setState(s => !s)
  }

  return (
    <div className="flex justify-center">
      <p
        className="w-fit underline italic cursor-pointer text-sm has-hover:opacity-70 hover:opacity-100 transition"
        onClick={handleClick}
      >
        {props.label}
      </p>
    </div>
  )
}

export default ShowErrorDetails
