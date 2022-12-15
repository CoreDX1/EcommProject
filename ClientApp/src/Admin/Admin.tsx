import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ListGet } from '../Api/Menu'
import { useAuth } from '../Context/AuthContext'
import { IEcommerse } from '../Interface/Ecommerce'

export const Admin = (): JSX.Element => {
    const { login } = useAuth()
    const rol = !!login?.usuarioApi.rol.includes('admin')

    if (!rol) {
        return <Navigate to="/" />
    }

    const [products, setProducts] = useState<IEcommerse['home'][]>([])

    const GetHome = async () => {
        const data = await ListGet.home.getAll()
        setProducts(data)
    }

    const handDelete = async (button: number) => {
        try {
            const axiosDelete = await ListGet.homeDelete.deleteToke({
                id_home: button,
            })
            if (axiosDelete.success) {
                GetHome()
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    useEffect(() => {
        GetHome()
    }, [])

    return (
        <div>
            <div>
            <Formik
                initialValues={{ title: '', price: 0, image: '' }}
                onSubmit={ async (values) => {
                    try {
                        const data = await ListGet.postHome.post(values)
                        if (data.success) {
                            GetHome()
                        }
                    }catch(ex){
                        console.log(ex)
                    }
                }}
            >
                {({ handleChange, handleSubmit}) => (
                    <Form className="form__form" onSubmit={handleSubmit}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                        />
                        <label>Price</label>
                        <input
                            type="text"
                            name="price"
                            onChange={handleChange}
                        />

                        <label>Image</label>
                        <input
                            type="file"
                            name="Image"
                            onChange={handleChange}
                        />
                        <button
                    type="submit"
                        >
                            Guardar
                        </button>
                    </Form>
                )}
            </Formik>
            </div>
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
