//검색페이지 취소
export default () => {
    const btn = document.querySelector('.searchButton')

    btn.addEventListener('click', function(e){
        const fileID = document.querySelector('.searchTerm').value
        if (fileID.length < 1) {
            alert('파일 아이디를 입력해주세요.')
            return
        }

        const moveTo = `/file/${fileID}`
        this.children[0].href = moveTo
    }, {    //이벤트 캡쳐링으로 자식태그 a 까지 click 전파됨
        capture:true
        })
}
