export const ROUTE_URL = {
    HOME: "/",
    GALLERY: "/adoption_gallery",
    ABOUT: "/about",
    CONTACT_US: "/contact_us",
    AUTH: "/auth",
    OUR_HISTORY: "/our_history"
}

export enum PET_API_TYPE { DOG, CAT }

export abstract class BreedData { }

export class DogBreedData extends BreedData {
    breed: string
    // bredFor: string[]
    // heightRangeCM: number[]
    // lifespanRange: number[]
    // temperament: string[]
    // weightKG: number[]

    constructor(breedsObj: any) {
        console.log("About to construct from this obj: ", breedsObj)

        super()
        this.breed = breedsObj.breed
        // this.bredFor = breedsObj.bred_for.split(",").map((s: string) => s.trim())
        // this.heightRangeCM = breedsObj.height.metric.split("-").map((h: string) => parseInt(h))
        console.log("Dog Height Data: ", breedsObj.height.metric)
        // this.lifespanRange = breedsObj.life_span.split("-").map((ls: string) => parseInt(ls))
    }
}

export class CatBreedData extends BreedData {
    constructor(breedsObj: any) {
        super()
    }
}

export class PetApiData {
    id: number
    imgURL: string
    breedData: BreedData | null
    height: number
    width: number
    apiType: PET_API_TYPE

    constructor(id: number, imgURL: string, breedData: any, height: number, width: number, apiType: PET_API_TYPE) {
        this.id = id
        this.imgURL = imgURL
        this.breedData = null
        this.height = height
        this.width = width
        this.apiType = apiType

        if (apiType === PET_API_TYPE.CAT) {
            this.breedData = new CatBreedData(breedData)
        }
        else if (apiType === PET_API_TYPE.DOG) {
            this.breedData = new DogBreedData(breedData)
        }
    }
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
        console.log(apiType, obj.breeds[0])
        return new PetApiData(
            obj.id, obj.url, 
            new DogBreedData(obj),
            apiType === PET_API_TYPE.DOG ?
                new DogBreedData(obj.breeds[0]) : 
                new CatBreedData(obj.breeds[0]),
            obj.height, obj.width, apiType
        )
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