export interface IAddNewComment {
    itemId: number,
    reporterId: number | null | undefined,
    message: string
}

export interface IUpdateComment {
    commentId: number,
    id: number | null | undefined,
    message: string
}

export interface IDeleteComment {
    commentId: number,
    id: number | null | undefined,
}
