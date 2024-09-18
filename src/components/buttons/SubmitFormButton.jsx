import classNames from "classnames"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"

const SubmitFormButton = (props) => {
  const {appLoading} = useStateSelectors()

  const btnClass = classNames('mt-3 text-lg shadow-lg btn btn-primary btn-wide transition', {
    'btn-disabled btn-outline': appLoading
  })
  
  return (
    <button 
      className={btnClass}
      type="submit"
    >
      {appLoading
        ? <p className="flex gap-3">
            <span className="flex gap-2 loading loading-spinner"></span>
            loading ...
          </p>
        : props.label
      }
    </button>
  )
}

export default SubmitFormButton
