export const ROUTE_URL = {
    HOME: "/",
    GALLERY: "/adoption_gallery",
    ABOUT: "/about",
    CONTACT_US: "/contact_us",
    AUTH: "/auth",
    OUR_HISTORY: "/our_history"
}

export enum PET_API_TYPE { DOG, CAT }

export interface PetApiData {
    id: number
    imgURL: string
    breeds: any
    // breeds: {
    //     name: string
    //     heightCM: number
    //     temperament: string[]
    //     weightKG: number
    // }
    
    height: number
    width: number
    apiType: PET_API_TYPE
}

export const Utils = {
    randInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    },
    lerp(a: number, b: number, t: number): number {
        return a * (1 - t) + b * t
    },
    generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    },
    getRandomDate(startDate: Date, endDate: Date): Date {
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        const randomTimestamp = startTime + Math.random() * (endTime - startTime);
        return new Date(randomTimestamp);
    },
    convertToPetApiData(obj: any, apiType: PET_API_TYPE): PetApiData {
        return {
            id: obj.id,
            imgURL: obj.url,
            breeds: obj.breeds,
            height: obj.height,
            width: obj.width,
            apiType: apiType
        } as PetApiData
    },
    durstenfeldShuffle(arr: any[]): void {
        for (var i = arr.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}

export const NAMES: string[] = [

]