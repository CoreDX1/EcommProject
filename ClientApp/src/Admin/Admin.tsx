import { Navigate } from 'react-router-dom'
import { IEcommerse } from '../Interface/Ecommerce'

interface Prop{
  usuario : IEcommerse["loginResponse"] | null
}

export const Admin = ({usuario} : Prop): JSX.Element => {
  if(usuario == null) {
    return <Navigate to="/" />
  }

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