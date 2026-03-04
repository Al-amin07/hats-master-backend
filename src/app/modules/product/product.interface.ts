export interface ICapFeature {
  heading: string;
  content: string;
}

export interface ICap {
  id: string; 
  name: string;
  title: string;
  image1?: string;
  image2?: string;
  description: string;
  description2?: string;
  features: ICapFeature[];
  featuresDetails?: string;

  isActive: boolean;
  displayOrder: number;

  createdAt: string;
  updatedAt: string;
};
