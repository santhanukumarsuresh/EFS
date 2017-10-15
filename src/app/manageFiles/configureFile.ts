export class ConfigureFile {
  $key: string;
  file:File;
  name:string;
  url:string;
  progress:number;
  createdAt: Date = new Date();
  nanoTime = Date.now(); 

  constructor(file:File) {
    this.file = file;
  }
}
