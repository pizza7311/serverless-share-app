import axios from 'axios'
import Swal from 'sweetalert2'
import { renderResult } from './main.js'
import * as progress from '../progress.js'

axios.defaults.baseURL = process.env.API_URL
axios.defaults.withCredentials = true

function uploadFile(file) {
    const modal = document.querySelector('.progressModal')
    modal.style.display = 'block'

    axios.post('/upload', { originalname: file.name }).then(res => {
        const info = res.data.preSigned
        const id=res.data.id    //도큐먼트 id
        
        const form = new FormData()
        Object.entries(info.fields).forEach(([k, v]) => {
            form.append(k, v)
        })

        form.append('file', file)

        const progressCircle = progress.createCircleBar()

        axios.request({
            method: 'POST',
            url: info.url,
            data: form,
            onUploadProgress: progress => {
                progressCircle.set(progress.loaded / progress.total)
            }
        }).then((res) => {
            //화면 중앙에 업로드 링크 보여주기
            modal.style.display = 'none'
            renderResult(id)
        }).catch(err => {
            console.log(err)   //리스폰스.data가 서버에서 전달한 메세지
            const errMsg = `업로드중 오류가 발생하였습니다.<br>업로드 가능한 파일의 최대 크기는 2GB 입니다.`
            modal.style.display = 'none'
            Swal.fire({
                title: 'Error',
                icon: 'error',
                html: errMsg
            })
        })
    })
}


export default ()=> {
    const file = document.querySelector('.input_file')
    const wrapper = document.querySelector('.file_wrapper')

    wrapper.addEventListener('click', () => {
        file.click()
    })

    wrapper.addEventListener('dragover', (e) => {
        console.log('drag')
        e.preventDefault()
    })

    wrapper.addEventListener('drop', (e) => {
        e.preventDefault()
        uploadFile(e.dataTransfer.files[0])
    })

    file.addEventListener('change', function () {
        uploadFile(this.files[0])
    })
}

