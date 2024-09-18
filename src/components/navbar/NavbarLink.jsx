import { Link } from "react-router-dom"
// import { useDispatch } from "react-redux"

// reducer
// import { set_app_error } from "../../store/reducer/slices/appSlice.js"

// hook
// import useStateSelectors from "../../hooks/useStateSelectors.js"

// util
import removeDropdownFocus from "../../utils/removeDropdownFocus.js"

const NavbarLink = (props) => {
  // const {appError} = useStateSelectors()
  // const dispatch = useDispatch()

  const handleClick = () => {
    removeDropdownFocus()

    // if (appError)
    //   dispatch(set_app_error(null))
  }

  return (
    <Link 
      to={props.to}
      onClick={handleClick}
      className="text-lg"
    >
      {props.label}
    </Link>
  )
}

export default NavbarLink
