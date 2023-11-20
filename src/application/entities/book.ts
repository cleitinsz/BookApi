interface BookProps {
  id?: string;
  title: string;
  description: string;
  bar_code: string;
}

export class Book {
  private _id: string;
  private props: BookProps;

  constructor(props: BookProps, id?: string) {
    if (id) {
      this._id = id;
    }
    this.props = props;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public set bar_code(bar_code: string) {
    this.props.bar_code = bar_code;
  }

  public get bar_code(): string {
    return this.props.bar_code;
  }
}
