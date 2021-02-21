import ProgressBar from 'progressbar.js'

export const createCircleBar = () => {
    return new ProgressBar.Circle(document.querySelector('.circleBar'), {
        color: '#aaa',
        strokeWidth: 8,
    })
}