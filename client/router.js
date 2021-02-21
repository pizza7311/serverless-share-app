function route() {
    const routePath = getRoute()
    let rt = routes.find(el => {
        return el.path === routePath
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
            if (i > 0) splitPath[i] = '/param'
        })
    }
    return splitPath.toString().replace(/,/gm, '')
}

function navigate(url) {
    history.pushState(null, null, url)
    route()
}

export default {
    getRoute: getRoute,
    route: route,
    navigate:navigate
}