import {useAuth} from '../Context/AuthContext'

export const Admin = (): JSX.Element => {

  const {signup} = useAuth()
  console.log(signup)

  return (
    <>
    <div>
      <h1>Admin</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      </p>
    </div>
    </>
  )
}