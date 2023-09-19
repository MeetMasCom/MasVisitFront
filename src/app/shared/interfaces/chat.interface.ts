export interface ChatI {
    date: string
    message: MessageI[]
}

export interface MessageI {
    data: string
    current: boolean
}