import { Navigate } from 'react-router-dom'

interface Prop{
  usuario : {
     password : string,
    name : string
  }  | null
}

export const Admin = ({usuario} : Prop): JSX.Element => {
  if(usuario == null) {
    return <Navigate to="/" />
  }

  // console.log(usuario)

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