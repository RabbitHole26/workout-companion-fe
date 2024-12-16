import { Link, useLocation } from "react-router-dom"
import classNames from "classnames"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useMediaQueries from "../../hooks/useMediaQueries"

// component
import ThemeToggler from "./ThemeToggler"
import Emoji from "../emoji/Emoji"
import Avatar from "./Avatar"
import UserList from "./lists/UserList"
import GuestList from "./lists/GuestList"
import Search from "./Search"

const Navbar = () => {
const {isLightMode, userData} = useStateSelectors()
const {isMobile, isDesktop, Desktop} = useMediaQueries()
const location = useLocation()

  const navWrapperClass = classNames('sticky top-0 flex flex-row justify-between items-center p-2 z-[2]', {
    'bg-neutral-300': isLightMode,
    'bg-neutral-700': !isLightMode
  })

  const h1Class = classNames('btn', {
    'btn-md lg:btn-lg': isMobile,
    'btn-outline btn-lg no-animation': isDesktop,
    'hover:bg-neutral-800': isLightMode,
    'hover:bg-neutral-500 hover:border-0': !isLightMode
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
          <div className="flex items-center gap-2">
            <Desktop><span>Workout Companion</span></Desktop>
            <Emoji 
              symbol='💪'
              label='Flexed biceps'
              className='text-2xl'
            />
          </div>
        </h1>
      </Link>

      <div className="flex items-center gap-2">
        {/* SEARCH */}
        <>
          {userData && location.pathname === '/' &&
            <Search />
          }
        </>
        {/* DROPDOWN */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle flex items-center avatar"
          >
            <Avatar />
          </div>
          {/* DROPDOWN ITEMS */}
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
      </div>
    </header>
  )
}

export default Navbar
