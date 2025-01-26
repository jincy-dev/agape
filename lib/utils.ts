import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//convert prisma object into regular js object

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
//format numbe with decimal places

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}
//formate errors
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name === "ZodError") {
    const fieldError = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldError.join(". ");
    //Handle zod error
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    //handle prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${
      field.charAt(0).toUpperCase() + field.slice(1)
    } is already exists`;
  } else {
    //handle other errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}
