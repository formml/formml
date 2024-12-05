export default function isFormmlFile(fileName: string) {
  return fileName.endsWith('.fml') || fileName.endsWith('.formml')
}
