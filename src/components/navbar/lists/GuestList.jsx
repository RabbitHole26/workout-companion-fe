import NavbarLink from "../NavbarLink"

const GuestList = () => {
  return (
    <>
      <li>
        <NavbarLink to="/signup" label='Sign up'/>
      </li>
      <li>
        <NavbarLink to="/login" label='Log in' />
      </li>
    </>
  )
}

export default GuestList
