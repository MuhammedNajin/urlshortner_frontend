export interface ShortUrlResponse {
    id: string;
    originalUrl: string;
    shortUrl: string;
    urlCode: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  
  }


  export interface URLEntry {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  lastClicked?: Date;
}