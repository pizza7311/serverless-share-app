//검색페이지 취소
export default async () => {
    const body = document.getElementById('context')
    body.innerHTML =
        `
        <a class='link_btn' href='/'>main</a>

        <div class="search_wrapper">
        <div class="search_bar" >
            <input type="text" class="searchTerm" placeholder="Enter URL Here">
                <button type="submit" class="searchButton">
                    <a class='link_btn'>검색</a>
                </button>
        </div>
        </div>`


    const {default:init} = await import(/* webpackChunkName: "search" */'./index')
    init()

}
