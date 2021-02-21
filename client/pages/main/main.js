exports.mainPage = async () => {
    const body = document.getElementById('context')

    body.innerHTML =
        `
        <div class="file_wrapper">
        <input type="file" class="input_file" />
        <div class="description_wrapper">
            <p class="description_text">클릭 또는 파일을 올려놓으세요.</p>
        </div>
        </div>
        

        <div class="progressModal">
            <p class='download_msg'>파일을 업로드 중입니다..</p>
            <div class="circleBar"></div>
        </div>`

    const { default: init } = await import(/* webpackChunkName: "upload" */'./index')
    init()
}

exports.renderResult = (id) => {
    const body = document.getElementById('context')
    body.innerHTML =
        `
        <div class='done_wrapper'>
        <div class='done_icon'>
            <img src='/statics/images/doneIcon.png' />
        </div>
        <div>
            <p class='file_url'>${process.env.PAGE_URL}/${id}</p>
            <p>이 페이지를 벗어나면 더이상 링크를 확인할수 없습니다.</p>
        </div>
        <button class='copy_btn'>링크복사</button>
        <a class='link_btn' href='/'>메인페이지</a>
        </div>
        `
    //클립보드 복사
    document.querySelector('.copy_btn').addEventListener('click', () => {
        const dummy = document.createElement("textarea")
        document.body.appendChild(dummy)
        dummy.value = `${process.env.PAGE_URL}/file/${id}`
        dummy.select()
        document.execCommand("copy")
        document.body.removeChild(dummy)
    })
}