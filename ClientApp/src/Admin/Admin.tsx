import axios from 'axios';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListGet } from '../Api/Menu';
import { IEcommerse } from '../Interface/Ecommerce';

export const Admin = (): JSX.Element => {
    const [products, setProducts] = useState<IEcommerse['home'][]>([]);
    const [file, setFile] = useState<File | undefined>();
    const [filename , setFilename] = useState<string>();

    const navigate = useNavigate();

    const GetHome = async () => {
        const data = await ListGet.home.getAll();
        setProducts(data);
    };

    const handDelete = async (button: number): Promise<void> => {
        try {
            const axiosDelete = await ListGet.homeDelete.deleteToke({
                id_home: button,
            });
            if (axiosDelete.success) {
                GetHome();
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    interface Ivalue {
    title: string;
    price: number;
    image: string;
    }
    
    const ValidateValue = ({ image, price, title }: Ivalue): boolean => {
    if (image.length > 0) {
    throw new Error('La imagen no puede estar vacia');
    }
    if (price === 0 || typeof price === 'string') {
    throw new Error('El precio no puede estar vacio');
    }
    if (!title.length) {
    throw new Error('El titulo no puede estar vacio');
    }
    return true;
    };

    useEffect(() => {
        GetHome();
    }, []);

    return (
        <div>
            <div>
                <Formik
                    initialValues={{ title: '', price: 0, image: "" }}
                    onSubmit={async values => {
                        ValidateValue(values) ? alert('Todo bien') : alert('Error');
                        try {
                            const response = await ListGet.postHome.post({
                                title: values.title,
                                price: values.price,
                                image: filename as string,
                            });
                            const formData = new FormData();
                            formData.append('formFile', file as File);
                            formData.append('filename', filename as string);
                             await axios.post(
                                'http://localhost:5020/api/UploadImagen',
                                formData
                            );
                            // console.log(resImagne);
                            if (response.success) {
                                alert('Todo bien');
                            }
                        } catch (ex) {
                            alert(ex);
                        }
                    }}>
                    {({ handleChange, handleSubmit }) => (
                        <Form className='form__form' onSubmit={handleSubmit}>
                            <label>Title</label>
                            <input
                                type='text'
                                name='title'
                                onChange={handleChange}
                            />
                            <label>Price</label>
                            <input
                                type='number'
                                name='price'
                                accept='image/*'
                                onChange={handleChange}
                            />

                            <label>Image</label>
                            <input
                                type='file'
                                name='file'
                                onChange={event => {
                                    if (
                                        event.target.files &&
                                        event.target.files[0]
                                    ) {
                                        // console.log(event.target.files[0]);
                                        setFile(event.target.files[0]);
                                        setFilename(event.target.files[0].name);
                                    }
                                }}
                            />
                            <button type='submit'>Guardar</button>
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
                    {products.map(item => (
                        <tr key={item.id_home}>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/admin/${
                                                item.id_home
                                            }-${item.title.replace(/\s/g, '-')}`
                                        )
                                    }>
                                    Editar
                                </button>
                                <button
                                    onClick={() => handDelete(item.id_home)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
