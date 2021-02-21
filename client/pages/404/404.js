export default () => {
    const body = document.getElementById('context')

    body.innerHTML =
        `<div class='notFound'>
            <div class='error_wrapper'>
            <p class='msg_404'>페이지를 찾을수 없습니다.</><br>
            <a class='link_btn' href='/'>메인 페이지로</a>
            </div>
        </div>
`
}