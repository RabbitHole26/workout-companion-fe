import classNames from "classnames"

// hook
import useStateSelectors from "./useStateSelectors"

// util
import isArray from "../utils/isArray"

const useSetInputClass = () => {
  const {appError} = useStateSelectors()

  const setInputClass = (field) => {
    return field
      ? (
          classNames('rounded-md p-2 shadow-md border-2', {
            'border-transparent': field && !isArray(appError) || !appError.some(e => e.path === field),
            'border-red-500': field && isArray(appError) && appError.some(e => e.path === field)
          })
        )
      : (
          'rounded-md p-2 w-24 pl-8 md:w-auto'
        )
  }

  return {setInputClass}
}

export default useSetInputClass
