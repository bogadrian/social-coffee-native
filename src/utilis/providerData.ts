interface IProviderData {
  coords: Array<ILocation>;
  address: string;
}

export const providerData: IProviderData = {
  coords: [],
  address: ''
};

interface ILocation {
  latitude: number;
  longitude: number;
}

type SetPDL = (location: ILocation) => void;

export const setProviderDataWithCoords: SetPDL = location => {
  providerData.coords.push(location);
};

export const setProviderDataAddress = (address: string) => {
  providerData.address = address;
};
