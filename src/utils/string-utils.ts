export default class StringUtils {
  public static comma(value: number | undefined):string {
    if (value) {
      return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    return ''
  }
}