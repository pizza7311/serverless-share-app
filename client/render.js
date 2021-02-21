import notFound from './pages/404/404.js'
import main from './pages/main/main.js'
import file from './pages/file/file.js'
//import search from '../dist/pages/search/search.js' //검색 페이지 취소
import './index.css'

const routes = [
    { path: '/', view: () => main.mainPage() },
    { path: '/file/param', view: () => file() },
    //{ path: '/search', view: () => search() },
]

function route() {
    const routePath = getRoute()
    let rt = routes.find(el => {
        return el.path===routePath
    })

    if (!rt) {
        rt = {
            path: '',
            view: () => notFound()
        }
    }

    rt.view()
}

function getRoute() {
    const paths = location.pathname.split('/').slice(1)
    const splitPath = paths.map(el => '/' + el)

    if (splitPath.length > 1) {
        splitPath.forEach((el, i) => {
            if(i>0) splitPath[i] = '/param'
        })
    }
    return splitPath.toString().replace(/,/gm,'')
}

function navigate(url) {
    history.pushState(null, null, url)
    route()
}

window.addEventListener('DOMContentLoaded', () => {
    //바디에서 선택한 요소의 class가 버튼일때(화면전환 버튼)
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.link_btn')) {
            e.preventDefault()
            navigate(e.target.href)
        }
    })

    route()
})

window.addEventListener('popstate', route)


//라우트를 확인하여 routes에 있는 패스를 찾고 없다면 404 페이지를 디폴트로줌,
//패스에 맞는 라우트라면 해당 페이지를 랜더링하는 메소드를 실행시키는 방식으로 페이지를 구현함
//react 같은 프레임워크 없이 직접 작성한다면 html 코드에다 필요한 내용 넣어서 직접 랜더링하는 방식