import { inputNameElement, inputCommentElement } from './constants.js'
export function validateForm() {
    const name = inputNameElement.value.trim()
    const comment = inputCommentElement.value.trim()
    let isValid = true

    // Сброс предыдущих ошибок
    inputNameElement.classList.remove('error')
    inputCommentElement.classList.remove('error')

    if (!name) {
        inputNameElement.classList.add('error')
        isValid = false
    }

    if (!comment) {
        inputCommentElement.classList.add('error')
        isValid = false
    }

    if (!isValid) {
        alert('Пожалуйста, заполните все поля корректно.')
        return false
    }

    return true
}
