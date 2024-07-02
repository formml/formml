// Default type for formml files
declare module '*.formml' {
  export type FormData = string;
  const value: FormData;
  export default value;
}
