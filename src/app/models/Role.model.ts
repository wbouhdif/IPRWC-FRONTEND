export class Role{
  id: string | undefined;
  name: string;

    constructor(id: string | undefined, name: string) {
        this.id = id;
        this.name = name;
    }
}
