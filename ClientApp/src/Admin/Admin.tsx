import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ListGet } from '../Api/Menu'
import { useAuth } from '../Context/AuthContext'
import { IEcommerse} from '../Interface/Ecommerce'

export const Admin = (): JSX.Element => {
    const { login } = useAuth()
    const rol = login?.usuarioApi.rol.includes('admin') as boolean

    if (!rol) {
        return <Navigate to="/" />
    }

    const [products, setProducts] = useState<IEcommerse['home'][]>([])

    const GetHome = async () => {
        const data = await ListGet.home.getAll()
        setProducts(data)
    }

    const handDelete = async (button: number) => {
        const test = await ListGet.homeDelete.deleteToke(
            {
                id_home: button,
            },
        )
        console.log(test)
    }

    useEffect(() => {
        GetHome()
    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>price</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id_home}>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>
                                <button>Editar</button>
                                <button
                                    onClick={() => handDelete(item.id_home)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
