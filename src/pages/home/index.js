import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rate from '../../component/rate/index.';
import { FaHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useGet } from '../../component/API';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
    const [book, setBook] = useState([])
    const [param, setParam] = useState('all')
    const [countFavorite, setCountFav] = useState('')
    const [bookFavorite, setBookFav] = useState([])
    const navigate = useNavigate()

    const notify = (message, type) => type(message, { autoClose: 3000, });

    const GetData = async () => {
        const data = await useGet("https://www.googleapis.com/books/v1/volumes?q=", param)

        if (data.items !== undefined) {
            setBook(data.items)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Buku anda tidak ditemukan...",
            })
        }
    }

    const getFavorites = async () => {
        try {
            const respons = await axios.get("https://buku-backend-j59701t74-hastinx.vercel.app/favorite")
            if (respons.data !== undefined) {
                setCountFav(respons.data.length)
                setBookFav(respons.data.map(e => e['bookid']))
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Maaf buku anda tidak ditemukan',
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Maaf buku anda tidak ditemukan',
            })
        }


    }



    const addFavorite = async (e) => {

        try {
            const responsById = await axios.get("https://www.googleapis.com/books/v1/volumes/" + e.currentTarget.id)

            const values = responsById.data;
            const data = {
                "bookid": values.id,
                "title": values.volumeInfo.title,
                "author": values.volumeInfo.authors,
                "rating": values.volumeInfo.ratingsCount,
                "imgurl": values.volumeInfo.imageLinks.thumbnail
            }
            const headers = {
                'Content-Type': 'application/json'
            }


            await axios.post("https://buku-backend-j59701t74-hastinx.vercel.app/favorite", data, {
                headers: headers
            })

            getFavorites()
            notify("Anda telah menambah buku favorit anda", toast.success)
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
            getFavorites()
            notify("Anda telah menghapus buku dari favorit anda", toast.error)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
    }

    const viewFavorite = (e) => {
        e.preventDefault()
        navigate('/favorite')
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            GetData()
        }
    }

    useEffect(() => {
        GetData();
        getFavorites();
    }, [])
    return (
        <>
            <ToastContainer />
            <div className='bg-dark vh-100'>
                <div className="d-flex flex-row justify-content-between align-items-center bg-light px-5 py-3">
                    <div className="fs-2 fw-bold">BUKU</div>
                    <div className='d-flex header-search-box'>
                        <input className="form-control" type="text" placeholder="Cari buku anda di sini..." onChange={(e) => setParam(e.target.value)} onKeyPress={handleKeyPress} />
                    </div>
                    <div className='d-flex align-items-center header-favorite fs-5' onClick={viewFavorite}><div className="header-favorite-badge">{countFavorite}</div>Favorites</div>
                </div>
                <div className='d-flex flex-wrap gap-4 justify-content-center mt-5 bg-dark'>
                    {book.map(i =>


                        <div key={i.id}>
                            <div className="card" style={{ width: '300px', height: '100%' }} >

                                <img src={i.volumeInfo.imageLinks.thumbnail} className="card-img-top" alt="Placeholder image" style={{ width: '300px', height: '450px' }} />

                                <div className="card-body d-grid gap-3">
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <h5 className="card-title">{i.volumeInfo.title}</h5>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <p className="card-text">{i.volumeInfo.authors}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-8 d-flex align-items-center justify-content-start'>
                                            <Rate rating={i.volumeInfo.ratingsCount ? i.volumeInfo.ratingsCount : 0} />
                                        </div>
                                        <div className='col-md-4 d-flex align-items-center justify-content-center'>
                                            <FaHeart className={bookFavorite.includes(i.id) ? 'favorite-active' : 'favorite'} onClick={bookFavorite.includes(i.id) ? deleteFavorite : addFavorite} id={i.id} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

        </>
    )
}

export default Home