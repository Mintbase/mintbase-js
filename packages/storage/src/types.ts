export type ReferenceObject = {
  title?: string;
  description?: string;
  media?: File | string;
  media_type?: string;
  animation_url?: File | string;
  document?: File | string;
  attributes?: Trait[];
  category?: string;
  tags?: string[];
  extra?: Trait[];
  history?: string[]
}

export type Trait = {
  display_type: string;
  trait_type: string;
  value: number;
}

export type ArweaveResponse = {
  id: string;
  block: string;
  name: string;
  mimeType: string;
  media_url?: string;
};
