import Swal from 'sweetalert2'
import * as progress from '../progress.js'

export default () => {
    const download_btn = document.querySelector('.download_btn')
    const fileID = location.pathname.split('/')[2]
    const filename = document.querySelector('.file_name').innerText
    const progressCircle = progress.createCircleBar()
    const modal = document.querySelector('.progressModal')

    const handleError = res => {
        //200이 아니면 에러처리
        return new Promise((resolve, reject) => {
            if (res.status === 200) {
                resolve(res)
                return
            }
            reject(res)
        })
    }

    download_btn.addEventListener('click', () => {
        modal.style.display = 'block'
        //axios는 스트림을 받을수없어서 fetch로 대체
        fetch(`${process.env.API_URL}/download/${fileID}`, {credentials:'include'}).then(handleError)
            .then(async res => {
                const url = await res.text()
                fetch(url, {
                    method: 'get'
                }).then(handleError)
                    .then(async res => {
                        ///////////// 파일을 청크로 받아오는 부분
                        const contentLength = res.headers.get('Content-Length')
                        let receive=0
                        const chunks=[]
                        const reader = res.body.getReader()
                        while (true) {
                            const { done, value } = await reader.read()
                            if (done) break;
                            receive+=value.length
                            chunks.push(value)
                            progressCircle.set(receive / contentLength)
                        }
                        /////////////// 
                        const url = window.URL.createObjectURL(new Blob(chunks))
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', filename)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        modal.style.display = 'none'

                    }).catch(err => {
                        console.log(err)
                        Swal.fire({
                            title: 'Error',
                            icon: 'error',
                            html: '다운로드중 문제가 발생하였습니다.'
                        })
                    })
            }).catch(res => {
                const status = res.status
                //서버 응답에따라 에러메시지 출력
                let errMsg = ''
                switch (status) {
                    case 401:
                        errMsg = `다운로드 가능 시간이 만료되었습니다<br>페이지를 새로고침후 다시 시도하세요.`
                        break
                    case 404:
                        errMsg = `파일이 존재하지 않습니다.`
                        break
                    default:
                        errMsg = `유효하지 않은 요청입니다.`
                }

                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    html: errMsg
                })
            })
    })
}

