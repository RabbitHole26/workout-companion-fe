import classNames from "classnames"

// hook
import useStateSelectors from "./useStateSelectors"

// util
import isArray from "../utils/isArray"

const useSetInputClass = () => {
  const {appError} = useStateSelectors()

  const setInputClass = (field) => {
    return classNames('rounded-md p-2 shadow-md border-2', {
      'border-transparent': !isArray(appError) || !appError.some(e => e.path === field),
      'border-red-500': isArray(appError) && appError.some(e => e.path === field)
    })
  }

  return {setInputClass}
}

export default useSetInputClass
