export interface Location {
  city: string ;
  state: string ;
  country: string;
}

export interface LocationProps {
  location?: Location|null;
  setCity: (value: string) => void;
  setState: (value: string) => void;
  setCountry: (value: string) => void;
}
