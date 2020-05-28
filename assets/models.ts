export class Item {
  constructor(
    public id: string,
    public name: string,
    public description: string | null,
    public url: string | null,
    public imageUrl: string | null,
    public reservedBy: string | null
  ) {}
}

export class Wishlist {
  constructor(
    public id: string,
    public name: string,
    public shortname: string,
    public description: string | null,
    public owner: string,
    public imageUrl: string | null,
    public items: Item[]
  ) {}
}

export default {
  Item,
  Wishlist
}
