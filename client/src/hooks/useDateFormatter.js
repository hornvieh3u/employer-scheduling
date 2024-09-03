import moment from 'moment'

export const useDateFormatter = (date) => {
    if (date === null || date === undefined) return ''
    const _ = String(moment(date).format('L')).split('/')

    return `${_[0]}/${_[1]}/${_[2]}`
}
