import axios from "axios";

export const useGet = async (url, param) => {
    try {
        const respons = await axios.get(url + param)
        const values = respons.data

        return values

    } catch (error) {
        return { "message": "Maaf buku anda tidak ditemukan" }
    }

}