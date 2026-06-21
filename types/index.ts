import { IconType } from "react-icons";

export interface LINKSARRAY {
    id: number;
    label: string;
    href: string;
    icon?: IconType
    type?: "customer"|"craftsman"
}


export interface PortfolioType {
    craftsmanID: number,
    personID: number,
    firstName: string,
    lastName: string,
    profileImageURL: string,
    bannerImageURL: string,
    shortDescription: string,
    aboutDescription: string,
    introVideoURL: string,
    yearsOfExperience: number,
    locationText: string,
    isAvailable: boolean,
    createdAt: string,
    averageRating: number,
    totalRatings: number,
    workImages: {
        imageID: string,
        imageURL: string
    }[],
    skills: {
        skillID: number,
        skillName: string
    }[],
    ratings: {
        rate: number,
        ratingMessage: string,
        personName: string,
        createdAt: string
    }[],
    isVerifyEmail: number,
    categoryID: number,
    categoryName: string
}


export interface verifyEmailType {
    email: string;
    code: string;
}

export interface resetPasswordType {
    resetToken: string;
    newPassword: string;
}

export interface CraftsmanType {
    personID: number,
    craftsmanID: number,
    firstName: string,
    lastName?: string,
    profileImageURL: string,
    shortDescription: string,
    locationText: string,
    averageRating: number,
    totalRatings: number,
    categoryName: string;
}

export interface CraftsmanByCategoryType {
    personID: number,
    craftsmanID: number,
    firstName: string,
    lastName: string,
    profileImageURL: string,
    shortDescription: string,
    locationText: string,
    averageRating: number,
    totalRatings: number
}



export interface allRequetsType {
    requestID: number,
    fullName: string,
    profileImageURL: string,
    status: number,
    createdAt: string
} 


export interface updateReqStatusType {
    requestId: number;
    status: number;
}

export interface PersonType {
    personID: number;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    role: string;
}

export interface CategoryType {
    categoryID: number;
    categoryName: string;
}

export interface SkillType {
    skillID: number;
    skillName: string;
}


export interface ClientRequestType {
    requestID: number;
    clientID: number;
    craftsmanID: number;
    completedAt: string;
    requestTitle: string | null;
    requestDescription: string | null;
    createdAt: string;
    status: number;
    profileImageUrl: string | null;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    email: string;
}

export interface AddRatingPayload {
    craftsmanID: number;
    rate: number;
    ratingMessage: string;
}


