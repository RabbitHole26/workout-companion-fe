// hook
import useStateSelectors from "../../hooks/useStateSelectors"

const Avatar = () => {
  const {userData} = useStateSelectors()

  return (
    <div className="w-12 avatar rounded-full">
      <img
        alt="Avatar image"
        src={userData?.avatarUrl || 'https://res.cloudinary.com/dt5azfezg/image/upload/v1725642124/avatar_placeholder_sobov5.png'}
      />
    </div>
  )
}

export default Avatar
