import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

// hook
import useSetInputClass from "../../hooks/useSetInputClass"
import useSearchExercises from "../../hooks/api/search/useSearchExercises"
import classNames from "classnames"

const Search = () => {
  const {setInputClass} = useSetInputClass()
  const {searchExercises} = useSearchExercises()
  const debouncedTimeoutRef = useRef(null) // ref to store debounced timeout

  // local state
  const [searchTerm, setSearchTerm] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const [searching, setSearching] = useState(false)

  const iconClass = classNames('absolute top-1/2 -translate-y-1/2 text-lg left-2 text-primary', {
    'animate-pulse transition': searching
  })

  // call debounced search function when searchTerm changes to prevent searchExercise endpoint calls on each keystroke
  useEffect(() => {
    // prevent search from fetching skills when the component mounts for the first time
    if (!isMounted) return setIsMounted(true)

    // clear previous timeout if exists
    if (debouncedTimeoutRef.current) clearTimeout(debouncedTimeoutRef.current)

    // set a new timeout (delay in ms)
    debouncedTimeoutRef.current = setTimeout(async () => {
      setSearching(true)
      await searchExercises(searchTerm) // call api controller
      setSearching(false)
    }, 700)

    // clean up function to clear the timeout before next effect
    return () => {
      clearTimeout(debouncedTimeoutRef.current)
    }
  }, [searchTerm])

  return (
    <div className="relative">
      <FontAwesomeIcon 
        // className="absolute text-lg top-1/2 left-2 -translate-y-1/2 text-primary"
        className={iconClass}
        icon={faMagnifyingGlass} 
      />
      <input 
        className={setInputClass(false)}
        type="text" 
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
  )
}

export default Search
