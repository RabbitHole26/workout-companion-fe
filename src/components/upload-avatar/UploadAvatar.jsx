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

  const inputClass = classNames('rounded-sm border-2 mt-3', {
    'bg-neutral-300': isLightMode,
    'bg-neutral-700': !isLightMode,
    'border-transparent': !appError,
    'border-red-500': appError
  })

  const h2Class = classNames('absolute left-10 -translate-y-1/2 bg-secondary px-2 py-1 rounded-lg', {
    'text-black': !isLightMode,
    'text-white': isLightMode
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
    <div className="relative">
      <h2 className={h2Class}>Avatar</h2>
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
    </div>
  )
}

export default UploadAvatar
