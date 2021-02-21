import notFound from './pages/404/404.js'
import main from './pages/main/main.js'
import file from './pages/file/file.js'
//import search from '../dist/pages/search/search.js' //�˻� ������ ���
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
    //�ٵ𿡼� ������ ����� class�� ��ư�϶�(ȭ����ȯ ��ư)
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.link_btn')) {
            e.preventDefault()
            navigate(e.target.href)
        }
    })

    route()
})

window.addEventListener('popstate', route)


//���Ʈ�� Ȯ���Ͽ� routes�� �ִ� �н��� ã�� ���ٸ� 404 �������� ����Ʈ����,
//�н��� �´� ���Ʈ��� �ش� �������� �������ϴ� �޼ҵ带 �����Ű�� ������� �������� ������
//react ���� �����ӿ�ũ ���� ���� �ۼ��Ѵٸ� html �ڵ忡�� �ʿ��� ���� �־ ���� �������ϴ� ���