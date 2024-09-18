// ! AVATAR HANDLING FLOW
// 1. Each user starts with avatar placeholder.
// 2. User can upload avatar in settings component.
// 3. In the BE the avatar url is saved to user document and sent to FE in response object.
// 4. In FE the avatar url is assigned to state variable savedAvatarUrl and saved in local storage. This allows for rendering avatar right after user uploaded the image given the logic in Avatar component.
// 5. When the user logs out the savedAvatarUrl state variable and local storage is cleared allowing avatar placeholder to take priority.
// 6. When a user logs in, the avatar url is passed in the login response object together with token and username and saved to local storage.
// 7. Because the local storage was cleared in step 4, the avatarUrl passed in the login object takes priority over savedAvatarUrl.
// 8. When user who is already logged in and previously uploaded avatar uploads it again, their previous avatar is replaced with new avatar and the cycle repeats allowing the new avatar to be rendered right after upload.
// 9. Components managing avatar: useUploadAvatar, useLogout, appSlice, Avatar.
// TODO: this setup causes the same avatar url to be saved twice in different places (user.avatarUrl, savedAvatarUrl) and respective local storage items. Explore better solutions.

// hook
import useStateSelectors from "../../../hooks/useStateSelectors"

const Avatar = () => {
  const {savedAvatarUrl, userData} = useStateSelectors()

  const generateAvatar = () => {
    // cacheBuster appends random param to image url
    // this prevents caching issues since avatar image per user has the same url, even after being updated (see BE logic)
    const cacheBuster = `?cb=${Date.now() + Math.random()}`

    if (userData) {
      // prioritize saved avatar over user avatar
      if (savedAvatarUrl) {
        return `${savedAvatarUrl}${cacheBuster}` 
      } else if (userData.avatarUrl) {
        return `${userData.avatarUrl}${cacheBuster}`
      }
    }

    // avatar placeholder
    return 'https://res.cloudinary.com/dt5azfezg/image/upload/v1725642124/avatar_placeholder_sobov5.png'
  }

  const handleError = (e) => {
    e.target.src = 'https://res.cloudinary.com/dt5azfezg/image/upload/v1725642124/avatar_placeholder_sobov5.png'
  }

  return (
    <div className="w-12 rounded-full">
      <img
        alt="Avatar image"
        src={generateAvatar()}
        // onError appends avatar placeholder to src tag to address edge cases and issues caused by racing conditions
        onError={handleError}
      />
    </div>
  )
}

export default Avatar
