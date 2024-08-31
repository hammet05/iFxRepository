export interface CredentialsUserDto {
    email:string;
    userName: string;
    password:string;
}

export interface ResponseAuthenticationDto {
    token:string;
    expiration: Date;
}