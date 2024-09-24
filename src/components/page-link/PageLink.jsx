import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import classNames from "classnames"

// reducer
import { set_app_error } from "../../store/slices/appSlice"

const PageLink = (props) => {
  const dispatch = useDispatch()

  const wrapperClass = classNames('', {
    'flex justify-center': !props.className,
    [props.className]: props.className
  })

  const handleClick = () => {
    dispatch(set_app_error(null))
  }

  return (
    <div className={wrapperClass}>
      <Link
        className="inline hover:text-primary underline transition"
        to={props.to}
        onClick={handleClick}
      >
        {props.label}
      </Link>
    </div>
  )
}

export default PageLink
