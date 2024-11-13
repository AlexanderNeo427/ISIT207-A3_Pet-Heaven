import axios from "axios"

export const ROUTE_URL = {
    HOME: "/",
    GALLERY: "/adoption_gallery",
    PET_DETAIL: "/pet_detail",
    CHECKOUT: "/checkout",
    ABOUT: "/about",
    CONTACT_US: "/contact_us",
    AUTH: "/auth",
    OUR_HISTORY: "/our_history",
    RECEIPT: "/receipt",
    PET_RELEASE: "/pet_release"
}

// export const LOCAL_STORAGE_KEY = {
//     PAYMENT_AMOUNT: "PAYMENT_AMOUNT"
// }

export enum PET_API_TYPE { DOG, CAT }

export class BreedData {
    breed_id: string
    breed: string
    lifespan: string
    weight: string
    temperaments: string[]

    constructor(breedsObj: any) {
        this.breed_id = breedsObj.id
        this.breed = breedsObj.name
        this.lifespan = breedsObj.life_span
        this.weight = breedsObj.weight.metric
        this.temperaments = breedsObj.temperament.split(",").map((t: string) => t.trim())
    }
}

export class DogBreedData extends BreedData {
    bredFor: string[]
    height: string

    constructor(breedsObj: any) {
        super(breedsObj)
        this.bredFor = breedsObj.bred_for
        this.height = breedsObj.height.metric
    }
}

export class CatBreedData extends BreedData {
    description: string

    constructor(breedsObj: any) {
        super(breedsObj)
        this.description = breedsObj.description
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
        return new PetApiData(
            obj.id, obj.url, obj.breeds[0],
            obj.height, obj.width, apiType
        )
    },
    durstenfeldShuffle(arr: any[]): void {
        for (let i = arr.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    },
    async getBatchPetAPIData(count: number): Promise<PetApiData[]> {
        const imageCount = Math.ceil(count / 2)
        try {
            const catApiRes = await axios.get(
                `https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=${imageCount}`, {
                headers: { 'x-api-key': import.meta.env.VITE_CAT_API_KEY }
            })
            const dogApiRes = await axios.get(
                `https://api.thedogapi.com/v1/images/search?has_breeds=1&limit=${imageCount}`, {
                headers: { 'x-api-key': import.meta.env.VITE_DOG_API_KEY }
            })
            return [
                ...catApiRes.data
                    .map((obj: any) => Utils.convertToPetApiData(obj, PET_API_TYPE.CAT))
                    .filter((petData: PetApiData) => !petData.imgURL.endsWith('.gif')),
                ...dogApiRes.data
                    .map((obj: any) => Utils.convertToPetApiData(obj, PET_API_TYPE.DOG))
                    .filter((petData: PetApiData) => !petData.imgURL.endsWith('.gif'))
            ]
        }
        catch (err: any) {
            console.error("Error fetching from API: ", err.message)
        }
        return []
    },
    async getOnePetApiData(petApiType: PET_API_TYPE, petID: string | number, breedID: string): Promise<PetApiData> {
        const imgEndpointURL = petApiType === PET_API_TYPE.DOG ?
            `https://api.thedogapi.com/v1/images/${petID}` :
            `https://api.thecatapi.com/v1/images/${petID}`

        const breedEndpointURL = petApiType === PET_API_TYPE.DOG ?
            `https://api.thedogapi.com/v1/breeds/${breedID}` :
            `https://api.thecatapi.com/v1/breeds/${breedID}`

        try {
            const imgRes = await axios.get(imgEndpointURL, {
                headers: {
                    'x-api-key': petApiType === PET_API_TYPE.DOG ?
                        import.meta.env.VITE_DOG_API_KEY :
                        import.meta.env.VITE_CAT_API_KEY
                }
            })
            const breedRes = await axios.get(breedEndpointURL, {
                headers: {
                    'x-api-key': petApiType === PET_API_TYPE.DOG ?
                        import.meta.env.VITE_DOG_API_KEY :
                        import.meta.env.VITE_CAT_API_KEY
                }
            })
            const imgData = imgRes.data
            const breedData = breedRes.data
            return new PetApiData(
                imgData.id, imgData.url, breedData, imgData.height, imgData.width, petApiType
            )
        }
        catch (err: any) {
            console.log("Error fetching from Pet API: ", err.message)
            return {} as PetApiData
        }
    }
}
