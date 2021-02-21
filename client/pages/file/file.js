import axios from 'axios'
import dayjs, { locale } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import filesize from 'filesize'
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Seoul")

axios.defaults.baseURL = process.env.API_URL
axios.defaults.withCredentials = true

export default async () => {
    //api로 file 정보 받아와서 화면 구성
    const body = document.getElementById('context')
    try {
        const res = await axios({
            method: 'get',
            url: `${location.pathname}`,
            responseType: 'json'
        })
        const data = await res.data
        body.innerHTML =
            `<div class='file_info_wrapper'>
                <div class='file_info_top'>
                    <div class='file_icon'></div>
                    <div class='file_namesize_block'>
                        <p class='file_name'>${data.originalname}</p>
                        <p class='file_size'>${filesize(data.size)}</p>
                    </div>
                </div>

            <div class='file_info_body'>
                <p>
                    이 파일은 ${dayjs.unix(data.expire).format('YYYY[년] MM[월] DD[일] HH[시] mm[분]')}에 만료 됩니다.
                </p>

            </div>
                <div class='download_wrapper'>
                    <button class='download_btn'>다운로드</button>
                </div>
            </div>

             <div class="progressModal">
                    <p class='download_msg'>파일을 다운로드 중입니다..</p>
                    <div class="circleBar"></div>
                </div>
            
    `
    } catch (err) {
        console.log(err)
        body.innerHTML = '파일이 존재하지 않거나 잘못된 url 입니다.'
    }

    const { default: init } = await import(/* webpackChunkName: "download" */'./index.js')
    init()

}
