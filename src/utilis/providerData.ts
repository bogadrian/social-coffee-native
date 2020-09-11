export const providerData: {coords: any, address: any} = {
    coords: [], 
    address: '',
}


type SetPDL = (location: any) => void

export const setProviderDataWithCoords: SetPDL = (location) => {
    providerData.coords.push(location)
    console.log(providerData)
}

export const setProviderDataAddress = (address: any) => {
    providerData.address = address
}

