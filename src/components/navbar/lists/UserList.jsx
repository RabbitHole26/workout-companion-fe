// hook
import useLogout from "../../../hooks/api/auth/useLogout"

// component
import NavbarLink from "../NavbarLink"

// util
import removeDropdownFocus from "../../../utils/removeDropdownFocus"

const UserList = () => {
  const {logout} = useLogout()

  const handleClick = () => {
    logout()
    removeDropdownFocus()
  }

  return (
    <>
      <li>
        <NavbarLink to="/settings" label="Settings"/>
      </li>
      <li>
        <p
          className="text-lg"
          onClick={handleClick}
        >
          Log out
        </p>
      </li>
    </>
  )
}

export default UserList
