import { Link } from "react-router-dom"
import { isMobile } from "react-device-detect"
import classNames from "classnames"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"

// component
import ThemeToggler from "./ThemeToggler"
import Emoji from "../emoji/Emoji"
import Avatar from "./avatar/Avatar"
import UserList from "./lists/UserList"
import GuestList from "./lists/GuestList"

const Navbar = () => {
const {isLightMode, userData} = useStateSelectors()

  const navWrapperClass = classNames('sticky top-0 flex flex-row justify-between items-center p-2 z-[2]', {
    'bg-neutral-300': isLightMode,
    'bg-neutral-700': !isLightMode
  })

  const h1Class = classNames('btn', {
    'btn-md lg:btn-lg': isMobile,
    'btn-outline btn-lg no-animation': !isMobile
  })

  const ulClass = classNames('menu menu-sm gap-1 dropdown-content rounded-box z-[2] mt-3 p-2 shadow', {
    'bg-neutral-300': isLightMode,
    'bg-neutral-700': !isLightMode
  })

  return (
    <header className={navWrapperClass}>
      {/* APP LOGO */}
      <Link to='/'>
        <h1 className={h1Class}>
          <>
            {isMobile
              ? (
                  <Emoji
                    symbol='💪'
                    label='Flexed biceps'
                    className='text-2xl'
                  />
                )
              : (
                  <div className="flex items-center gap-2">
                    <span>Workout Companion</span>
                    <Emoji 
                      symbol='💪'
                      label='Flexed biceps'
                      className='text-2xl'
                    />
                  </div>
                ) 
            }
          </>
        </h1>
      </Link>

      {/* DROPDOWN */}
      <div className="dropdown dropdown-end">
        <div 
          tabIndex={0} 
          role="button" 
          className="btn btn-ghost btn-circle flex items-center avatar"
        >
          <Avatar />
        </div>

        {/* LIST ITEMS */}
        <ul tabIndex={0} className={ulClass}>
          <li>
            <ThemeToggler />
          </li>
          <>
            {userData
              ? <UserList />
              : <GuestList />
            }
          </>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
