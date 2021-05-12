export interface IUserProfileButtonItem {
    text: string;
    buttonState?: boolean
}

export interface IUserProfileItems {
    [name: string] : IUserProfileButtonItem | string
}