import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Rate from '../../component/rate/index.';
import { FaHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const FavoritePage = () => {
    const [book, setBook] = useState([])
    const navigate = useNavigate()

    const notify = (message, type) => type(message, { autoClose: 3000, });

    const getData = async () => {
        try {
            const respons = await axios.get("https://buku-backend-j59701t74-hastinx.vercel.app/favorite")
            setBook(respons.data)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
    }

    const deleteFavorite = async (e) => {
        try {
            await axios.delete("https://buku-backend-j59701t74-hastinx.vercel.app/favorite/" + e.currentTarget.id)
            getData();
            notify("Anda telah menghapus buku dari favorit anda", toast.error)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
    }

    const back = () => {
        navigate('/')
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <ToastContainer />
            <div className="d-flex flex-row justify-content-between align-items-center bg-light px-5 py-3">
                <div className="fs-2 fw-bold">BUKU</div>

                <div className='d-flex align-items-center header-favorite fs-5' onClick={back}>Back</div>
            </div>
            <div className='d-flex flex-wrap gap-4 justify-content-center mt-5'>
                {book.length < 1 ? <span className='fs-3 fw-bold'> Anda belum memilih buku favorit anda...</span> : ''}
                {book.map(i =>


                    <div key={i.id}>
                        <div className="card" style={{ width: '300px', height: '100%' }} >

                            <img src={i.imgurl} className="card-img-top" alt="Placeholder image" style={{ width: '300px', height: '450px' }} />

                            <div className="card-body d-grid gap-3">
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <h5 class="card-title">{i.title}</h5>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <p class="card-text">{i.authors}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-8 d-flex align-items-center justify-content-start'>
                                        <Rate rating={i.rating ? i.rating : 0} />
                                    </div>
                                    <div className='col-md-4 d-flex align-items-center justify-content-center'>
                                        <FaHeart className='favorite-active' onClick={deleteFavorite} id={i.bookid} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default FavoritePage;