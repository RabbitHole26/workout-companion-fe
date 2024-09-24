import { useState } from "react"
import { useDispatch } from "react-redux"
import classNames from "classnames"

// reducer
import { set_app_loading } from "../../store/slices/appSlice"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useUploadAvatar from "../../hooks/api/settings/useUploadAvatar"

// util
import SubmitFormButton from "../buttons/SubmitFormButton"

const UploadAvatar = () => {
  const dispatch = useDispatch()
  const {isLightMode, appError} = useStateSelectors()
  const {uploadAvatar} = useUploadAvatar()

  // local state
  const [file, setFile] = useState(null)

  const inputClass = classNames('rounded-sm border-2', {
    'bg-neutral-300': isLightMode,
    'bg-neutral-700': !isLightMode,
    'border-transparent': !appError,
    'border-red-500': appError
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(set_app_loading(true))

    const formData = new FormData()
    formData.append('avatar', file)

    await uploadAvatar(formData, setFile)
  }
  
  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <form 
      className="flex flex-col gap-3 items-center p-3 mx-2 border-2 border-primary rounded-lg" 
      onSubmit={handleSubmit}
    >
      <input 
        type="file"
        name="avatar"
        className={inputClass}
        onChange={handleChange} 
      />
      <SubmitFormButton label='Upload avatar' />
    </form>
  )
}

export default UploadAvatar
