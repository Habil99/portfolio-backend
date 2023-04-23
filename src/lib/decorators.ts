import { registerDecorator } from "class-validator";

export function IsSocialType() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isSocialType",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: "Invalid social type",
      },
      validator: {
        validate(value: any) {
          return typeof value === "object" && value.link && typeof value.link === "string" && value.icon && typeof value.icon === "string";
        },
      },
    });
  };
}
