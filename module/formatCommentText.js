import { sanitizeText } from './utilities/sanitizeText.js'
export function formatCommentText(text) {
    // Разделяем текст на строки
    const lines = text.split('\n')

    // Обрабатываем каждую строку
    return lines
        .map((line) => {
            // Если строка начинается с >, оставляем как есть (но экранируем остальное)
            if (line.startsWith('>')) {
                return '&gt;' + sanitizeText(line.substring(1))
            }
            // Иначе полностью экранируем строку
            return sanitizeText(line)
        })
        .join('<br>') // Объединяем строки с <br> для переносов
}
