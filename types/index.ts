import { IconType } from "react-icons";

export interface LINKSARRAY {
    id: number;
    label: string;
    href: string;
    icon?: IconType
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
    comments: {
        commentText: string,
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
    craftsmanID: number,
    firstName: string,
    lastName?: string,
    profileImageURL: string,
    shortDescription: string,
    averageRating: number,
    totalRatings: number,
    category?: {
        categoryID: number,
        categoryName: string
    }
}
