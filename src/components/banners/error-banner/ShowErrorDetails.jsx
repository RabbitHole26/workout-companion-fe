import classNames from "classnames"
import { isMobile } from "react-device-detect"

const ShowErrorDetails = (props) => {
  const handleClick = () => {
    props.setState(s => !s)
  }

  const pClass = classNames('w-fit underline italic cursor-pointer', {
    'text-sm': isMobile,
    'text-md opacity-70 hover:opacity-100': !isMobile
  })

  return (
    <div className="flex justify-center">
      <p
        className={pClass}
        onClick={handleClick}
      >
        {props.label}
      </p>
    </div>
  )
}

export default ShowErrorDetails
