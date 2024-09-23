import { useDispatch } from "react-redux"

// reducer
import { set_app_error, set_app_loading, set_app_success } from "../../../store/slices/appSlice"
import { set_user_avatar } from "../../../store/slices/authSlice"

// hook
import useStateSelectors from "../../useStateSelectors"
import useAxiosInstance from "../../useAxiosInstance"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useUploadAvatar = () => {
  const dispatch = useDispatch()
  const {accessToken} = useStateSelectors()
  const {axiosInstance} = useAxiosInstance()

  const uploadAvatar = async (formData) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/settings/upload-avatar',
        data: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
  
      printLogInDevMode('avatarRes: ', res)
  
      if (res.status === 200) {
        dispatch(set_user_avatar(res.data))
        dispatch(set_app_success('Avatar uploaded!'))
      }
  
    } catch (error) {
      printLogInDevMode('avatarErr: ', error)
      const errorMessage = error.response.data.error
      dispatch(set_app_error(errorMessage))
    } finally {
      dispatch(set_app_loading(false))
    }
  }

  return {
    uploadAvatar
  }
}

export default useUploadAvatar
